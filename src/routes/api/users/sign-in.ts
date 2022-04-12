import { dbConnect } from '$lib/database/mongo'
import { User } from '$lib/database/schemas/User'
import type { RequestHandler } from '@sveltejs/kit'
import * as bcrypt from 'bcryptjs'
import cookie from 'cookie'
// import jwt from 'jwt-simple'

export const post: RequestHandler = async ({ request }) => {
	await dbConnect()

	const { username, password } = await request.json()

	const user = await User.findOne({ username })
	if (!user) return { status: 404, body: { message: 'User not found!' } }
	if (user.status) return { status: 402, body: { message: 'El usuario ya se encuentra online' } }
	if (user.locked) return { status: 402, body: { message: 'El usuario se encuentra bloqueado' } }

	if (!bcrypt.compareSync(password, user.password)) {
		return {
			status: 402,
			body: {
				message: 'Contraseña Incorrecta!'
			}
		}
	}

	await User.findByIdAndUpdate(user._id, { status: true })

	const headers = {
		'Set-Cookie': cookie.serialize('user', JSON.stringify(user), {
			httpOnly: true,
			maxAge: 60 * 60 * 24 * 7,
			sameSite: 'lax',
			path: '/'
		})
	}

	return {
		headers,
		body: {
			data: user,
			message: 'User logged successfully'
		}
	}

	// return {
	// 	status: 200,
	// 	headers: {
	// 			'Set-Cookie': serialize('user', '', {
	// 					path: '/',
	// 					expires: new Date(0),
	// 			}),
	// 	},
}

// const createToken = (currentUser) => {
// 	const payLoad = {
// 		currentUser: currentUser._id
// 	}

// 	return jwt.encode(payLoad, process.env.JWT_SECRET || 'someSecretToken')
// }
