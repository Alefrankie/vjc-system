import type { RequestHandler } from '@sveltejs/kit'
import { Customer } from '$lib/database/schemas/Customer'

export const GET: RequestHandler = async ({ url }) => {
	const key = url.searchParams.get('key')

	if (!key?.length) {
		const data = await Customer.find()
		return new Response(JSON.stringify({ data }))
	}

	const [data] = await Promise.all([
		Customer.find({
			$or: [
				{
					dni: {
						$regex: `.*${key}.*`
					}
				},
				{
					firstName: {
						$regex: `.*${key}.*`
					}
				},
				{
					lastName: {
						$regex: `.*${key}.*`
					}
				},
				{
					address: {
						$regex: `.*${key}.*`
					}
				},
				{
					phone: {
						$regex: `.*${key}.*`
					}
				}
			]
		})
	])
	return new Response(JSON.stringify({ data }))
}
