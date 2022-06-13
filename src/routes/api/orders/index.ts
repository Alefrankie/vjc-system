import { dbConnect } from '$lib/database/mongo'
import '$lib/database/schemas/Customer'
import { IOrder, Order } from '$lib/database/schemas/Order'
import type { RequestHandler } from '@sveltejs/kit'
import { findCode } from './findCode'

export const get: RequestHandler = async () => {
	await dbConnect()

	const [data] = await Promise.all([Order.find().limit(1).sort({ code: -1 }).populate('customer')])

	const count = await Order.count()

	return {
		body: { data, count },
	}
}

export const post: RequestHandler = async ({ request }) => {
	await dbConnect()
	const { order }: { order: IOrder } = await request.json()

	if (order.type === 'Sale') {
		delete order.volume
	}

	// SAVING INVOICE AT DATABASE
	// order.code = await findCode(Order, order.code)

	// console.log(order)

	const newOrder = await new Order({
		code: order.code,
		rate: order.rate,
		type: order.type,
		volume: order.type !== 'Sale' ? order.type : undefined,
		customer: order.customer._id,
		cart: order.cart,
	})
	console.log(newOrder)

	await newOrder.save()

	return {
		body: {
			message: 'Orden Registrada',
			data: order,
		},
	}
}
