import { Product } from '$lib/database/schemas/Product'
import type { RequestHandler } from '@sveltejs/kit'

export const get: RequestHandler = async ({ params }) => {
	const { id } = params

	// if (!id) {
	// 	const [data] = await Promise.all([
	// 		Product.find().sort({
	// 			productName: 1
	// 		})
	// 	])
	// 	return { body: { data } }
	// }

	const [data] = await Promise.all([
		Product.find({
			$or: [
				{
					productName: {
						$regex: `.*${  id  }.*`
					}
				}
			]
		}).sort({
			productName: 1
		})
	])
	return { body: { data } }
}
