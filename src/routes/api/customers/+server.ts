import { Customer } from '$lib/database/schemas/Customer'
import { json, type RequestHandler } from '@sveltejs/kit'

export const GET: RequestHandler = async () => {
	const data = await Customer.find()

	return json({ data })
}

// eslint-disable-next-line max-statements
export const POST: RequestHandler = async ({ request }) => {
	const body = await request.json()
	const { dni, phone } = body

	if (phone.length < 10 || phone.length > 11) {
		return json(
			{ message: 'El Teléfono es inválido' },
			{
				status: 400
			}
		)
	}

	if (phone.length === 11) {
		body.phone = phone.slice(1)
	}

	const customer = await Customer.findOne({ dni })
	if (customer) {
		return json(
			{ message: 'El cliente ya se encuentra Registrado' },
			{
				status: 400
			}
		)
	}
	const data = new Customer(body)
	await data.save()

	return json({ data, message: 'Cliente Registrado' })
}
