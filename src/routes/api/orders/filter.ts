import { Order } from '$lib/database/schemas/Order'
import type { RequestHandler } from '@sveltejs/kit'

export const post: RequestHandler = async ({ request }) => {
	const body = await request.json()
	const { query, limit } = body
	// InvoiceType: Sale:Retail
	// InvoiceType: Sale:Wholesale
	// InvoiceType: Sale:All
	// InvoiceType: Sale:Today

	let data = await Order.find(query).limit(limit).sort({ code: -1 }).populate('customer')

	const count = await Order.count()

	data = await Promise.all(
		data.map((item) => {
			if (item.code < 3408) item.rate /= 1_000_000

			if (item.type === 'DeliveryNote') item.type = 'Nota de Entrega'
			if (item.type === 'Sale') item.type = 'Factura Fiscal'
			if (item.type === 'Budget') item.type = 'Presupuesto'

			if (item.volume === 'Wholesale') item.volume = 'Al Mayor'
			if (item.volume === 'Retail') item.volume = 'Al Detal'
			return item
		})
	)

	return {
		body: { data, count }
	}
}
