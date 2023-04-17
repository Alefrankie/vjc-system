import { Rate } from '$lib/database/schemas/Rate'
import { json, type RequestHandler } from '@sveltejs/kit'

export const GET: RequestHandler = async () => {
	const Retail = await Rate.findOne({ name: 'Retail' })
	const Wholesale = await Rate.findOne({ name: 'Wholesale' })

	return json({ data: { Retail: Retail?.value, Wholesale: Wholesale?.value } })
}

export const POST: RequestHandler = async ({ request }) => {
	const { name, value } = await request.json()
	// console.log(url,searchParams.get("name-query-param"))
	const data = await Rate.findOne({ name })

	if (data) {
		await Rate.findOneAndUpdate({ name }, { value })
		return json({ data, message: 'Tasa Actualizada' })
	}

	const rate = new Rate({ name: String(name), value: Number(value) })
	await rate.save()

	return json({ data: rate, message: 'Tasa Actualizada' })
}
