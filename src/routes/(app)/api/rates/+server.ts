import { Rate } from '$lib/database/schemas/Rate'
import type { RequestHandler } from './$types'

export const GET: RequestHandler = async () => {
	const Retail = await Rate.findOne({ name: 'Retail' })
	const Wholesale = await Rate.findOne({ name: 'Wholesale' })

	return new Response(
		JSON.stringify({ data: { Retail: Retail?.value, Wholesale: Wholesale?.value } })
	)
}

export const POST: RequestHandler = async ({ request }) => {
	const { name, value } = await request.json()
	// console.log(url,searchParams.get("name-query-param"))
	const data = await Rate.findOne({ name })

	if (data) {
		await Rate.findOneAndUpdate({ name }, { value })
		return new Response(JSON.stringify({ data, message: 'Tasa Actualizada' }))
	}

	const rate = new Rate({ name: String(name), value: Number(value) })
	await rate.save()

	return new Response(JSON.stringify({ data: rate, message: 'Tasa Actualizada' }))
}
