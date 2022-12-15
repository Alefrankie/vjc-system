import type { RequestHandler } from '@sveltejs/kit'
import { dbConnect } from '$lib/database/mongo'
import { Product } from '$lib/database/schemas/Product'

export const get: RequestHandler = async ({ url }) => {
	await dbConnect()

	const key = url.searchParams.get('key')

	if (!key) {
		const [data] = await Promise.all([
			Product.find().sort({
				name: 1
			})
		])
		return { body: { data } }
	}

	const [data] = await Promise.all([
		Product.find({
			$or: [
				{
					name: {
						$regex: `.*${key}.*`
					}
				}
			]
		}).sort({
			name: 1
		})
	])

	return { body: { data } }
}
