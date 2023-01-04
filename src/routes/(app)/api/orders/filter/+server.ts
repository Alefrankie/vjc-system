import { Order } from '$lib/database/schemas/Order'
import type { RequestHandler } from '@sveltejs/kit'

export const GET: RequestHandler = async ({ url }) => {
	const key = url.searchParams.get('key')
	const limit = url.searchParams.get('limit')

	if (!key) {
		const data = await Order.find().sort({ code: -1 }).limit(Number(limit)).populate('customer')

		return new Response(JSON.stringify({ data }))
	}

	const data = await Order.find({
		$or: [
			{
				code: {
					$regex: new RegExp(`^${key.toLowerCase()}`, 'iu')
				}
			}
		]
	})
		.sort({ code: -1 })
		.limit(Number(limit))
		.populate('customer')

	return new Response(JSON.stringify({ data, count: data.length }))
}

export const POST: RequestHandler = async ({ request }) => {
	const body = await request.json()
	const { query, limit } = body

	const data = await Order.find({ ...query })
		.sort({ code: -1 })
		.limit(limit)
		.populate('customer')

	const count = await Order.count()

	return new Response(JSON.stringify({ data, count }))
}
