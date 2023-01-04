import { Order } from '$lib/database/schemas/Order'
import { OrderTypeEnum } from '$lib/enums/OrderTypeEnum'
import type { RequestHandler } from '@sveltejs/kit'

export const POST: RequestHandler = async ({ request }) => {
	const body = await request.json()
	const { query, limit, page } = body

	const data = await Order.find({
		...query,
		type: [OrderTypeEnum.DELIVERY_NOTE, OrderTypeEnum.SALE],
		status: true
	})
		.limit(limit)
		.skip(limit * page - limit)
		.sort({ code: -1 })
		.populate('customer')

	return new Response(JSON.stringify(data))
}
