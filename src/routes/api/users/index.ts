import { dbConnect } from '$lib/database/mongo'
import { User } from '$lib/database/schemas/User'
import type { RequestHandler } from '@sveltejs/kit'

export const get: RequestHandler = async () => {
	await dbConnect()

	const [users] = await Promise.all([User.find()])

	return {
		body: { data: users }
	}
}

export const post: RequestHandler = async ({ request }) => {
	await dbConnect()
	const body = await request.json(),
		{ dni, username } = body,
		dataFound = await User.findOne({ $or: [{ dni }, { username }] })
	if (dataFound) {
		return { status: 400, body: { message: `El usuario ya se encuentra registrado` } }
	}

	const newData = new User(body)
	await newData.save()

	return {
		body: { data: newData, message: 'Usuario Registrado' }
	}
}
