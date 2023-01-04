import { User } from '$lib/database/schemas/User'
import { HttpErrorEnum } from '$lib/enums/HttpError.enum'
import type { RequestHandler } from './$types'

export const GET: RequestHandler = async () => {
	const users = await User.find()

	if (!users.length) {
		return new Response(HttpErrorEnum.RESOURCE_NOT_FOUND, { status: 404 })
	}

	return new Response(JSON.stringify(users))
}

export const POST: RequestHandler = async ({ request }) => {
	const body = await request.json()
	const { dni, username } = body
	const dataFound = await User.findOne({ $or: [{ dni }, { username }] })
	if (dataFound) {
		return new Response(HttpErrorEnum.RESOURCE_ALREADY_EXIST, { status: 400 })
	}

	const user = new User(body)
	await user.save()

	return new Response(JSON.stringify({ message: 'User registered successfully' }))
}
