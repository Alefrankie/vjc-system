import { User } from '$lib/database/schemas/User'
import type { RequestHandler } from '@sveltejs/kit'
import * as bcrypt from 'bcryptjs'

// FindAll
export const get: RequestHandler = async ({ params }) => {
	const { id } = params

	const user = await User.findById(id)
	if (!user) return { status: 404 }

	return {
		body: {
			data: user
		}
	}
}

export const patch: RequestHandler = async ({ request, params }) => {
	const { id } = params
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const body = await request.json()

	if (body.password) {
		body.password = bcrypt.hashSync(body.password, 10)
	}

	await User.findByIdAndUpdate(id, body)
	const data = await User.findById(id)

	return {
		body: { data, message: 'Usuario Modificado' }
	}
}

export const del: RequestHandler = async ({ params }) => {
	const { id } = params

	const dataFound = await User.findById(id)
	if (!dataFound) return { status: 404, body: { message: 'Not Found!' } }

	await User.findByIdAndDelete(id)

	return {
		body: { message: 'Usuario Removido' }
	}
}
