import { User } from '$lib/database/schemas/User'
import { json, type RequestHandler } from '@sveltejs/kit'

export const GET: RequestHandler = async () => {
	const users = await User.find()

	return json({ data: users })
}

export const POST: RequestHandler = async ({ request }) => {
	const body = await request.json()
	const { dni, username } = body
	const dataFound = await User.findOne({ $or: [{ dni }, { username }] })
	if (dataFound) {
		return json({ message: 'User already exist!' }, { status: 400 })
	}

	const user = new User(body)
	await user.save()

	return json({ message: 'User registered successfully' })
}
