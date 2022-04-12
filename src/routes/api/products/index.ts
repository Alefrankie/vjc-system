import { Product } from '$lib/database/schemas/Product'
import type { RequestHandler } from '@sveltejs/kit'
export const get: RequestHandler = async () => {
	const [data] = await Promise.all([Product.find().sort({ name: 1 })])

	return {
		body: { data }
	}
}

export const post: RequestHandler = async ({ request }) => {
	const body = await request.json()

	if (
		await Product.findOne({
			$or: [
				{
					code: body.code
				},
				{
					name: body.name
				}
			]
		})
	) {
		return { status: 400, body: { message: 'Product already exists' } }
	}

	const newData = new Product(body)
	await newData.save()

	return {
		body: { data: newData, message: 'Data registered successfully' }
	}
}
