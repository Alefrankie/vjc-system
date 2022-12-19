import { Order } from '$lib/database/schemas/Order'
import { Product } from '$lib/database/schemas/Product'
import type { RequestHandler } from '@sveltejs/kit'

export const GET: RequestHandler = async ({ params }) => {
	const { id } = params
	const data = await Order.findById(id).populate('customer')
	if (!data)
		return new Response(JSON.stringify({ message: 'Orden no encontrada!' }), { status: 404 })

	return new Response(JSON.stringify({ data }))
}

export const PATCH: RequestHandler = async ({ request, params }) => {
	const { id } = params
	const body = await request.json()

	const data = await Order.findByIdAndUpdate(id, body)

	return new Response(JSON.stringify({ data }))
}

export const DELETE: RequestHandler = async ({ params }) => {
	const { id } = params
	const order = await Order.findByIdAndUpdate(id, { status: false })
	if (!order) return new Response(JSON.stringify({ message: 'Not Found!' }), { status: 404 })

	for await (const e of order.cart) {
		const productFound = await Product.findOne({ code: e.code })

		await Product.findByIdAndUpdate(e._id, {
			quantity: Number(productFound.quantity) + Number(e.requested)
		})
	}

	return new Response(JSON.stringify({ data: order }))
}
