import { User } from '$lib/database/schemas/User'
import { json, type RequestHandler } from '@sveltejs/kit'
import cookie from 'cookie'

export const POST: RequestHandler = async ({ request }) => {
	const { _id } = await request.json()

	await User.findByIdAndUpdate(_id, { status: false })

	return json(
		{
			message: 'User out successfully'
		},
		{
			headers: {
				'Set-Cookie': cookie.serialize('userId', '', {
					path: '/',
					expires: new Date(0)
				})
			}
		}
	)
}
