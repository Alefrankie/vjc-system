import { json, type RequestHandler } from '@sveltejs/kit'

import { Customer } from '$lib/database/schemas/Customer'

export const GET: RequestHandler = async ({ params }) => {
	const { id } = params

	const data = await Customer.findOne({
		_id: id
	}).populate('orders')

	if (!data) return json({ message: 'Cliente No Encontrado' }, { status: 404 })

	return json({
		data
	})
}

export const PATCH: RequestHandler = async ({ request, params }) => {
	const { id } = params
	const body = await request.json()

	if (body.phone.length < 10) {
		return json({ message: 'Phone number is not valid!' }, { status: 400 })
	}

	if (body.dni.includes('-')) {
		// eslint-disable-next-line prefer-destructuring
		body.dni = body.dni.split('-')[1]
	}

	const data = await Customer.findByIdAndUpdate(id, body)

	return json({ data, message: 'Cliente Actualizado' })
}

export const DELETE: RequestHandler = async ({ params }) => {
	const { id } = params

	const dataFound = await Customer.findById(id)
	if (!dataFound) return json({ message: 'Cliente No Encontrado' }, { status: 404 })

	// await Customer.findByIdAndDelete(id)

	return json({ message: 'Registro Removido' })
}
