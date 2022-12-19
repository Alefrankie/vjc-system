import { User } from '$lib/database/schemas/User'
import { UserStatusEnum } from '$lib/enums/UserStatusEnum'
import type { RequestHandler } from '@sveltejs/kit'
import bcrypt from 'bcryptjs'
import cookie from 'cookie'

export const GET: RequestHandler = () => new Response(JSON.stringify({ works: 'works' }))

export const POST: RequestHandler = async ({ request }) => {
	const { username, password } = await request.json()

	const user = await User.findOne({ username })
	if (!user) return new Response(JSON.stringify({ message: 'User not found!' }), { status: 404 })
	if (user.status === UserStatusEnum.ONLINE)
		return new Response(JSON.stringify({ message: 'User already online', user }), {
			status: 402
		})
	if (user.locked)
		return new Response(JSON.stringify({ message: 'User locked!' }), {
			status: 402
		})

	if (!bcrypt.compareSync(password, user.password)) {
		return new Response(
			JSON.stringify({
				message: 'Incorrect password!'
			}),
			{ status: 402 }
		)
	}

	user.status = UserStatusEnum.ONLINE
	user.save()

	return new Response(
		JSON.stringify({
			data: user,
			message: 'User logged successfully'
		}),
		{
			headers: {
				'Set-Cookie': cookie.serialize('userId', user._id, {
					httpOnly: true,
					maxAge: 60 * 60 * 24 * 7,
					sameSite: 'lax',
					path: '/'
				})
			}
		}
	)
}
