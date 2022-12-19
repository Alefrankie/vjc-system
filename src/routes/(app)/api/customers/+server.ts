import { Customer } from '$lib/database/schemas/Customer'
import type { RequestHandler } from '@sveltejs/kit'

export const GET: RequestHandler = async () => {
	const data = await Customer.find()

	return new Response(JSON.stringify({ data }))
}

// eslint-disable-next-line max-statements
export const POST: RequestHandler = async ({ request }) => {
	const body = await request.json()
	const { dni, phone } = body

	if (phone.length < 10 || phone.length > 11) {
		return new Response(JSON.stringify({ message: 'El Teléfono es inválido' }), {
			status: 400
		})
	}

	if (phone.length === 11) {
		body.phone = phone.slice(1)
	}

	const customer = await Customer.findOne({ dni })
	if (customer) {
		return new Response(JSON.stringify({ message: 'El cliente ya se encuentra Registrado' }), {
			status: 400
		})
	}
	const data = new Customer(body)
	await data.save()

	return new Response(JSON.stringify({ data, message: 'Cliente Registrado' }))
}
