import { Rate } from '$lib/database/schemas/Rate'
import type { RequestHandler } from '@sveltejs/kit'

export const get: RequestHandler = async () => {
	const Retail = await Rate.findOne({ name: 'Retail' })
	const Wholesale = await Rate.findOne({ name: 'Wholesale' })

	return {
		body: { data: { Retail: Retail.value, Wholesale: Wholesale.value } }
	}
}

export const post: RequestHandler = async ({ request }) => {
	const { name, value } = await request.json()

	console.log(name, value)
	await Rate.findOneAndUpdate({ name }, { value })

	const data = await Rate.findOne({ name })

	return {
		body: { data, message: 'Tasa Actualizada' }
	}
}
