import { Order } from '$lib/database/schemas/Order'
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
