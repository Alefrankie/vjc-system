import { dbConnect } from '$lib/database/mongo'
import { Customer } from '$lib/database/schemas/Customer'
import { Order } from '$lib/database/schemas/Order'
import type { Handle } from '@sveltejs/kit'
import cookie from 'cookie'

// eslint-disable-next-line max-statements
export const handle: Handle = async ({ event, resolve }) => {
	await dbConnect()
	await Order.init()
	await Customer.init()

	const cookies = cookie.parse(event.request.headers.get('cookie') || '')
	event.locals.user = {}
	event.locals.user.authenticated = false
	if (cookies.user) {
		event.locals.user = JSON.parse(cookies.user)
		event.locals.user.authenticated = true
	}

	const response = await resolve(event)

	return response
}

export const getSession = ({ locals }) => locals.user
