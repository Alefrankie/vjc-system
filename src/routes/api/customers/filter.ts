import type { RequestHandler } from '@sveltejs/kit'
import { dbConnect } from '$lib/database/mongo'
import { Customer } from '$lib/database/schemas/Customer'

export const get: RequestHandler = async ({ url }) => {
	await dbConnect()

	const key = url.searchParams.get('key')

	if (!key.length) {
		const [data] = await Promise.all([Customer.find()])
		return { body: { data } }
	}

	const [data] = await Promise.all([
		Customer.find({
			$or: [
				{
					dni: {
						$regex: '.*' + key + '.*'
					}
				},
				{
					firstName: {
						$regex: '.*' + key + '.*'
					}
				},
				{
					lastName: {
						$regex: '.*' + key + '.*'
					}
				},
				{
					address: {
						$regex: '.*' + key + '.*'
					}
				},
				{
					phone: {
						$regex: '.*' + key + '.*'
					}
				}
			]
		})
	])
	return { body: { data } }
}
