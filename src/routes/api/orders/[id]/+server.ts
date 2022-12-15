import { dbConnect } from '$lib/database/mongo'
import { Order } from '$lib/database/schemas/Order'
// import { Product } from '$lib/database/schemas/Product'
import type { RequestHandler } from '@sveltejs/kit'

// FindAll
export const get: RequestHandler = async ({ params }) => {
	await dbConnect()

	const { id } = params
	const data = await Order.findById(id).populate('customer')
	if (!data)
		return {
			status: 404,
			body: {
				message: 'Orden no encontrada!'
			}
		}

	return {
		body: { data }
	}
}

// export const patch: RequestHandler = async ({ request, params }) => {
// 	await dbConnect()

// 	const { id } = params
// 	// eslint-disable-next-line @typescript-eslint/no-explicit-any
// 	const body = await request.json()

// 	const dataFound = await Order.findByIdAndUpdate(id, body)
// 	return { status: 400, body: { data: dataFound, message: 'Data Updated Successfully' } }
// }

// export const del: RequestHandler = async ({ params }) => {
// 	const { id } = params

// 	const invoiceFound = await Order.findByIdAndDelete(id)

// 	if (!invoiceFound) throw new Error('Invoice not found!')

// 	await Rate.deleteOne({ loteId: id })

// 	const { items } = await Rate.findOne({ loteId: invoiceFound.invoiceId })

// 	JSON.parse(items).forEach(async (e) => {
// 		const productFound = await Product.findOne({
// 			productId: e.productId
// 		})

// 		await Product.updateOne(
// 			{ productId: productFound.productId },
// 			{
// 				quantity: Number(productFound.quantity) + Number(e.quantityRequested)
// 			}
// 		)
// 	})

// 	// await User.findByIdAndDelete(id)

// 	return {
// 		body: { message: 'Data deleted successfully' }
// 	}
// }
