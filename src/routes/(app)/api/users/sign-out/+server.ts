import { User } from '$lib/database/schemas/User'
import type { RequestHandler } from '@sveltejs/kit'
import cookie from 'cookie'

export const POST: RequestHandler = async ({ request }) => {
	const { _id } = await request.json()

	await User.findByIdAndUpdate(_id, { status: false })

	return new Response(
		JSON.stringify({
			message: 'User out successfully'
		}),
		{
			headers: {
				'Set-Cookie': cookie.serialize('user', '', {
					path: '/',
					expires: new Date(0)
				})
			}
		}
	)
}
