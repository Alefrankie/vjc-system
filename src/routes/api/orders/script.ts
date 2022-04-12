import { Customer } from '$lib/database/schemas/Customer'
import InvoiceOld from '$lib/database/schemas/old/InvoiceOld'
import LoteOld from '$lib/database/schemas/old/LoteOld'
import { Order } from '$lib/database/schemas/Order'
import type { RequestHandler } from '@sveltejs/kit'

// code: string
// date: string
// rate: string
// type: string
// volume: string
// status: true
// payCondition: string

export const get: RequestHandler = async () => {
	const [invoices] = await Promise.all([InvoiceOld.find().lean()])
	const [customers] = await Promise.all([Customer.find().lean()])
	await Order.deleteMany({})

	console.time()
	await Promise.all(
		invoices.map(async (e) => {
			// Agregando el Cliente

			// let customer = null
			for await (const i of customers) {
				if (e.contact === i.phone || e.address === i.address) {
					e.customer = i._id
					// customer = i
				}
			}

			// console.log(e.contact)
			// console.log(customer)

			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const [_, code] = e.controlNumber.split('N°')
			e.code = code
			e.rate = e.exchangeRate

			const [dd, mm, yyyy] = e.invoiceDate.split('-')
			e.createdAt = new Date(`${yyyy}-${mm}-${dd}`).toISOString()

			// Actualizando el invoiceType
			if (e.invoiceType.match('Sale' + '.*')) {
				e.type = 'Sale'
			} else {
				const [type, volume] = e.invoiceType.split(':')
				e.type = type
				e.volume = volume
			}

			// Actualizando el Status
			if (e.status === '1') {
				e.status = true
			} else {
				e.status = false
			}

			// Agregando los productos

			const lote = await LoteOld.findOne({
				loteId: e.invoiceId
			}).lean()

			const items = JSON.parse(lote.items)

			for await (const i of items) {
				i.code = i.productCode
				i.name = i.productName
				i.price = i.productPrice
				i.discount = i.productDiscount
				i.requested = i.quantityRequested
				delete i.productId
				delete i.unitaryPrice
				delete i.retailPrice
				delete i.createdAt
				delete i.updatedAt
				delete i.invoiceType
				delete i.invoiceId
				delete i.productPrice
				delete i.productDiscount
				delete i.productCode
				delete i.quantityRequested
				delete i.productName
				delete i.quantity
			}

			e.cart = items

			// ================================

			delete e._id

			const newData = new Order(e)
			await newData.save()
			// await Customer.findByIdAndUpdate(customer._id, { orders: [...customer.orders, newData._id] })
			console.timeLog()
		})
	)

	console.timeEnd()
	console.log('Ready')

	return {
		body: { invoices }
	}
}
