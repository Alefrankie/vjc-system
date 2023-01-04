import { OrderTypeEnum } from '$lib/enums/OrderTypeEnum'
import { OrderVolumeEnum } from '$lib/enums/OrderVolumeEnum'
import { PayConditionEnum } from '$lib/enums/PayConditiomEnum'
import mongoose from 'mongoose'
import type { RequestHandler } from './$types'

import { Customer } from '$lib/database/schemas/Customer'
import { InvoiceOldSchema } from '$lib/database/schemas/old/InvoiceOld'
import { LoteOldSchema } from '$lib/database/schemas/old/LoteOld'
import type { IOrder } from '$lib/database/schemas/Order'
import type { ICart } from '$lib/database/schemas/Product'
import { HttpErrorEnum } from '$lib/enums/HttpError.enum'

// eslint-disable-next-line max-lines-per-function, max-statements
const scriptInvoice = async () => {
	const InvoiceOld = mongoose.model('invoice', InvoiceOldSchema)
	const LoteOld = mongoose.model('lote', LoteOldSchema)
	const Order = mongoose.model('Order')
	const Customer = mongoose.model('Customer')
	const invoices = await InvoiceOld.find().lean()

	await Order.deleteMany({})

	// eslint-disable-next-line max-statements, max-lines-per-function
	invoices.map(async (e: any) => {
		const [dia, mes, anio] = e.invoiceDate.split('-')
		try {
			const customerFound = await Customer.findOne({ phone: e.contact })
			if (customerFound) {
				const newOrder = {
					code: e.controlNumber.split('°').at(1),
					rate: e.exchangeRate > 1_000_000 ? e.exchangeRate / 1_000_000 : e.exchangeRate,
					type: '' as OrderTypeEnum.SALE,
					volume: '' as OrderVolumeEnum.WHOLESALE,
					status: Boolean(e.status),
					cart: [] as ICart[],
					payCondition:
						e.payCondition === 'Credito' ? PayConditionEnum.CREDIT : PayConditionEnum.CASH,
					customer: '' as any,
					createdAt: new Date(`${mes}-${dia}-${anio}`)
				} as IOrder

				const [type, volume] = e.invoiceType.split(':')
				newOrder.volume = String(volume).toLowerCase() as OrderVolumeEnum
				if (type === 'Sales') {
					newOrder.type = OrderTypeEnum.SALE
					newOrder.volume = OrderVolumeEnum.WHOLESALE
				}
				if (type === 'Budget') {
					newOrder.type = OrderTypeEnum.BUDGET
				}
				if (type === 'DeliveryNote') {
					newOrder.type = OrderTypeEnum.DELIVERY_NOTE
				}

				newOrder.customer = customerFound._id

				const lote = await LoteOld.findOne({
					loteId: e.invoiceId
				}).lean()

				const items = JSON.parse(lote?.items)

				const cart: ICart[] = []
				for (const i of items) {
					cart.push({
						unit: String(i.unit),
						code: String(i.productCode),
						name: String(i.productName),
						price: Number(i.productPrice),
						discount: Number(i.productDiscount),
						requested: Number(i.quantityRequested)
					})
				}

				newOrder.cart = cart

				const newData = new Order(newOrder)
				await newData.save()
			}
		} catch (error) {
			console.log(error)
		}
	})

	const customers = await Customer.find()
	for await (const e of customers) {
		const ordersFound = await Order.find({ customer: e._id })

		if (ordersFound.length) {
			await Customer.findByIdAndUpdate(e._id, { orders: ordersFound })
		}
	}
}

// FindAll
export const GET: RequestHandler = async ({ params }) => {
	const { id } = params

	// await scriptInvoice()

	const data = await Customer.findOne({
		_id: id
	}).populate('orders')

	if (!data) return new Response(HttpErrorEnum.RESOURCE_NOT_FOUND, { status: 404 })

	return new Response(
		JSON.stringify({
			data
		})
	)
}

export const PATCH: RequestHandler = async ({ request, params }) => {
	const { id } = params
	const body = await request.json()

	if (body.phone.length < 10) {
		return new Response(HttpErrorEnum.INVALID_REQUEST, { status: 400 })
	}

	if (body.dni.includes('-')) {
		// eslint-disable-next-line prefer-destructuring
		body.dni = body.dni.split('-')[1]
	}

	const data = await Customer.findByIdAndUpdate(id, body)

	return new Response(JSON.stringify(data))
}

export const DELETE: RequestHandler = async ({ params }) => {
	const { id } = params

	const dataFound = await Customer.findById(id)
	if (!dataFound) return new Response(HttpErrorEnum.RESOURCE_NOT_FOUND, { status: 404 })

	// await Customer.findByIdAndDelete(id)

	return new Response(JSON.stringify({ message: 'Registro Removido' }))
}
