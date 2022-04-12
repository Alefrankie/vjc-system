import { Product } from '$lib/database/schemas/Product'
import type { RequestHandler } from '@sveltejs/kit'

// FindAll
export const get: RequestHandler = async ({ params }) => {
	const { id } = params

	const data = await Product.findById(id)

	if (!data) return { status: 404 }

	return {
		body: {
			data
		}
	}
}

export const patch: RequestHandler = async ({ request, params }) => {
	const { id } = params
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const body = await request.json()

	console.log(body)

	const dataFound = await Product.findByIdAndUpdate(id, body)
	return { body: { data: dataFound, message: 'Producto Actualizado' } }
}

export const del: RequestHandler = async ({ params }) => {
	const { id } = params
	const dataFound = await Product.findById(id)
	if (!dataFound) return { status: 404, body: { message: 'Not Found!' } }

	await Product.findByIdAndDelete(id)

	return {
		body: { message: 'Producto removido' }
	}
}
