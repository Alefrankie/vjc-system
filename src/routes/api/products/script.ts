import ProductOld from '$lib/database/schemas/old/ProductOld'
import { Product } from '$lib/database/schemas/Product'
import type { RequestHandler } from '@sveltejs/kit'

// code: string
// name: string
// price: number
// quantity: number
// unit: string

export const get: RequestHandler = async () => {
	const [data] = await Promise.all([ProductOld.find().lean()])
	await Product.deleteMany({})

	await Promise.all(
		data.map(async (e) => {
			e.code = e.productCode
			e.name = e.productName
			e.price = 0

			delete e._id
			delete e.productId

			const newData = new Product(e)
			await newData.save()
		})
	)

	return {
		body: { data }
	}
}
