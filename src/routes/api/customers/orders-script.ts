import { Customer } from '$lib/database/schemas/Customer'
import { Order } from '$lib/database/schemas/Order'
import type { RequestHandler } from '@sveltejs/kit'

// FindAll
export const get: RequestHandler = async () => {
	const [customers] = await Promise.all([Customer.find().populate('orders')])
	const [orders] = await Promise.all([Order.find().populate('customer')])

	for await (const e of customers) {
		e.orders = []
		for await (const order of orders) {
			if (order.customer.phone === e.phone) {
				e.orders.push(order._id)
			}
		}
		console.log(e._id)
		await Customer.findByIdAndUpdate(e._id, { orders: e.orders })
	}
	console.log('Ready')

	return {
		body: {
			ready: 'Ready'
		}
	}
}
