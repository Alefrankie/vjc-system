import { json, type RequestHandler } from '@sveltejs/kit'
import { Product } from '$lib/database/schemas/Product'

export const GET: RequestHandler = async ({ url }) => {
	const key = url.searchParams.get('key')

	if (!key) {
		const data = await Product.find().sort({
			name: 1
		})

		return json({ data })
	}

	const data = await Product.find({
		$or: [
			{
				name: {
					$regex: new RegExp(`^${key.toLowerCase()}`, 'iu')
				}
			}
		]
	}).sort({
		name: 1
	})

	return json({ data })
}
