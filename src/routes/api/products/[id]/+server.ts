import { json, type RequestHandler } from '@sveltejs/kit'
import { Product } from '$lib/database/schemas/Product'

export const GET: RequestHandler = async ({ params }) => {
	const { id } = params

	const data = await Product.findById(id)

	if (!data)
		return json(
			{
				message: 'Not found!'
			},
			{ status: 404 }
		)

	return json({ data })
}

export const PATCH: RequestHandler = async ({ request, params }) => {
	const { id } = params
	const body = await request.json()

	const data = await Product.findByIdAndUpdate(id, body)

	return json(
		JSON.stringify({
			data,
			message: 'Producto Actualizado'
		})
	)
}

export const DELETE: RequestHandler = async ({ params }) => {
	const { id } = params
	const data = await Product.findById(id)
	if (!data)
		return json(
			{
				message: 'Not found!'
			},
			{ status: 404 }
		)

	await Product.findByIdAndDelete(id)

	return json({
		data,
		message: 'Producto removido'
	})
}
