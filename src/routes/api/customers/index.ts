import { Customer } from '$lib/database/schemas/Customer'
import type { RequestHandler } from '@sveltejs/kit'
export const get: RequestHandler = async () => {
	const [data] = await Promise.all([Customer.find()])

	return {
		body: { data }
	}
}

export const post: RequestHandler = async ({ request }) => {
	const body = await request.json()
	const { dni, phone } = body

	if (phone.length < 10 || phone.length > 11) {
		return { status: 400, body: { message: 'El Teléfono es inválido' } }
	}

	if (phone.length === 11) {
		body.phone = phone.slice(1)
	}

	const dataFound = await Customer.findOne({ dni })
	if (dataFound) {
		return { status: 400, body: { message: 'El cliente ya se encuentra Registrado' } }
	}
	const newData = new Customer(body)
	await newData.save()
	return {
		body: { data: newData, message: 'Cliente Registrado' }
	}
}
