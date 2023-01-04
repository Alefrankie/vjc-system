import type { RequestHandler } from '@sveltejs/kit'
import { Customer } from '$lib/database/schemas/Customer'

export const GET: RequestHandler = async ({ url }) => {
	const key = url.searchParams.get('key')

	if (!key?.length) {
		const data = await Customer.find()
		return new Response(JSON.stringify(data))
	}

	const [data] = await Promise.all([
		Customer.find({
			$or: [
				{
					dni: {
						$regex: new RegExp(`^${key.toLowerCase()}`, 'iu')
					}
				},
				{
					firstName: {
						$regex: new RegExp(`^${key.toLowerCase()}`, 'iu')
					}
				},
				{
					firstName: {
						$regex: new RegExp(`^${key.toLowerCase()}`, 'iu')
					},
					lastName: {
						$regex: new RegExp(`^${key.toLowerCase()}`, 'iu')
					}
				},
				{
					lastName: {
						$regex: new RegExp(`^${key.toLowerCase()}`, 'iu')
					}
				},
				{
					address: {
						$regex: new RegExp(`^${key.toLowerCase()}`, 'iu')
					}
				},
				{
					phone: {
						$regex: new RegExp(`^${key.toLowerCase()}`, 'iu')
					}
				}
			]
		})
	])
	return new Response(JSON.stringify(data))
}
