import '$lib/database/schemas/Customer'
import { type IOrder, Order } from '$lib/database/schemas/Order'
import { Product } from '$lib/database/schemas/Product'
import type { RequestHandler } from '@sveltejs/kit'
import { findCode } from './findCode'

export const GET: RequestHandler = async () => {
	const data = await Order.find().limit(1).sort({ code: -1 }).populate('customer')

	const count = await Order.count()

	return new Response(JSON.stringify({ data, count }))
}

export const POST: RequestHandler = async ({ request }) => {
	const { order }: { order: IOrder } = await request.json()

	order.code = await findCode(order.type, order.volume)

	const newOrder = new Order({
		code: order.code,
		rate: order.rate,
		type: order.type,
		volume: order.volume,
		customer: order.customer._id,
		cart: order.cart
	})

	await newOrder.save()

	for await (const e of order.cart) {
		const productFound = await Product.findById(e._id)

		await Product.findByIdAndUpdate(e._id, {
			quantity: Number(productFound.quantity) - Number(e.requested)
		})
	}

	return new Response(JSON.stringify({ message: 'Orden Registrada', data: newOrder }))
}
