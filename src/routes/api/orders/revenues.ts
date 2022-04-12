import { Order } from '$lib/database/schemas/Order'
import type { RequestHandler } from '@sveltejs/kit'

export const post: RequestHandler = async ({ request }) => {
	const body = await request.json()
	const { query, limit, page } = body
	// InvoiceType: Sale:Retail
	// InvoiceType: Sale:Wholesale
	// InvoiceType: Sale:All
	// InvoiceType: Sale:Today

	const data = await Order.find({ ...query, type: { $not: { $regex: 'Budget' } } })
		.limit(limit)
		.skip(limit * page - limit)
		.sort({ code: -1 })
		.populate('customer')

	const count = await Order.count()

	return {
		body: { data, count }
	}
}
