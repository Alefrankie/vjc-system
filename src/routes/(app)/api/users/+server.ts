import { User } from '$lib/database/schemas/User'
import type { RequestHandler } from './$types'

export const GET: RequestHandler = async () => {
	const users = await User.find()

	return new Response(JSON.stringify({ data: users }))
}

export const POST: RequestHandler = async ({ request }) => {
	const body = await request.json()
	const { dni, username } = body
	const dataFound = await User.findOne({ $or: [{ dni }, { username }] })
	if (dataFound) {
		return new Response(JSON.stringify({ message: 'User already exist!' }), { status: 400 })
	}

	const user = new User(body)
	await user.save()

	return new Response(JSON.stringify({ message: 'User registered successfully' }))
}
