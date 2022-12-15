import { dbConnect } from '$lib/database/mongo'
import { Customer } from '$lib/database/schemas/Customer'
import type { RequestHandler } from '@sveltejs/kit'
// import { Order } from '$lib/database/schemas/Order'

// FindAll
export const get: RequestHandler = async ({ params }) => {
	await dbConnect()

	const { id } = params

	const data = await Customer.findOne({
		dni: {
			$regex: `.*${id}`
		}
	}).populate('orders')

	if (!data) return { status: 404, body: { message: 'Cliente No Encontrado' } }

	return {
		body: {
			data
		}
	}
}

export const patch: RequestHandler = async ({ request, params }) => {
	await dbConnect()

	const { id } = params
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const body = await request.json()

	if (body.phone.length < 10) {
		return { status: 400, body: { message: 'Phone number is not valid!' } }
	}

	if (body.dni.includes('-')) {
		body.dni = body.dni.split('-')[1]
	}

	const customerFound = await Customer.findByIdAndUpdate(id, body)
	return { body: { data: customerFound, message: 'Cliente Actualizado' } }
}

export const del: RequestHandler = async ({ params }) => {
	const { id } = params

	const dataFound = await Customer.findById(id)
	if (!dataFound) return { status: 404, body: { message: 'Cliente No Encontrado' } }

	// await Customer.findByIdAndDelete(id)

	return {
		body: { message: 'Registro Removido' }
	}
}
