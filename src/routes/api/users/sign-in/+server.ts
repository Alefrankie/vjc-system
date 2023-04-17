import { User } from '$lib/database/schemas/User'
import { UserStatusEnum } from '$lib/enums/UserStatusEnum'
import { json, type RequestHandler } from '@sveltejs/kit'
import bcrypt from 'bcryptjs'
import cookie from 'cookie'

export const POST: RequestHandler = async ({ request }) => {
	const { username, password } = await request.json()

	const user = await User.findOne({ username })
	if (!user) return json({ message: 'User not found!' }, { status: 404 })
	if (user.locked)
		return json(
			{ message: 'User locked!' },
			{
				status: 402
			}
		)

	if (!bcrypt.compareSync(password, user.password)) {
		return json(
			{
				message: 'Incorrect password!'
			},
			{ status: 402 }
		)
	}

	user.status = UserStatusEnum.ONLINE
	user.save()

	return json(
		{
			data: user,
			message: 'User logged successfully'
		},
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
