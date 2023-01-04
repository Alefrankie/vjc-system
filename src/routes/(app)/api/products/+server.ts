import { Product } from '$lib/database/schemas/Product'
import { HttpErrorEnum } from '$lib/enums/HttpError.enum'
import type { RequestHandler } from '@sveltejs/kit'

export const GET: RequestHandler = async () => {
	const data = await Product.find().sort({ name: 1 })

	return new Response(JSON.stringify(data))
}

export const POST: RequestHandler = async ({ request }) => {
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
		return new Response(HttpErrorEnum.RESOURCE_ALREADY_EXIST, { status: 400 })
	}

	const newData = new Product(body)
	await newData.save()

	return new Response(JSON.stringify(newData))
}
