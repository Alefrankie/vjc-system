import type { RequestHandler } from '@sveltejs/kit'
import { User } from '$lib/database/schemas/User'
import bcrypt from 'bcryptjs'

export const GET: RequestHandler = async ({ params }) => {
	const { id } = params

	const data = await User.findById(id)
	if (!data) return new Response(JSON.stringify({ message: 'Not Found!' }), { status: 404 })

	return new Response(JSON.stringify({ data }))
}

export const PATCH: RequestHandler = async ({ request, params }) => {
	const { id } = params
	const body = await request.json()

	if (body.password) {
		body.password = bcrypt.hashSync(body.password, 10)
	}

	await User.findByIdAndUpdate(id, body)
	const data = await User.findById(id)

	return new Response(JSON.stringify({ data, message: 'User modified!' }))
}

export const DELETE: RequestHandler = async ({ params }) => {
	const { id } = params

	const dataFound = await User.findById(id)
	if (!dataFound) return new Response(JSON.stringify({ message: 'Not Found!' }), { status: 404 })

	await User.findByIdAndDelete(id)

	return new Response(JSON.stringify({ message: 'Usuario Removido' }))
}