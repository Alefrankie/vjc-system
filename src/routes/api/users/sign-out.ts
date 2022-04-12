import { User } from '$lib/database/schemas/User'
import type { RequestHandler } from '@sveltejs/kit'
import cookie from 'cookie'
// import jwt from 'jwt-simple'

export const post: RequestHandler = async ({ request }) => {
	const { _id } = await request.json()

	await User.findByIdAndUpdate(_id, { status: false })

	const headers = {
		'Set-Cookie': cookie.serialize('user', '', {
			path: '/',
			expires: new Date(0)
		})
	}

	return {
		headers,
		body: {
			message: 'User out successfully'
		}
	}
}
