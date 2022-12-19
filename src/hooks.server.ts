/* eslint-disable require-atomic-updates */
import { dbConnect } from '$lib/database/mongo'
import { Customer } from '$lib/database/schemas/Customer'
import { Order } from '$lib/database/schemas/Order'
import { Product } from '$lib/database/schemas/Product'
import { Rate } from '$lib/database/schemas/Rate'
import { User } from '$lib/database/schemas/User'
import type { Handle } from '@sveltejs/kit'

// eslint-disable-next-line max-statements
export const handle: Handle = async ({ event, resolve }) => {
	await dbConnect()
	await User.init()
	await Customer.init()
	await Order.init()
	await Product.init()
	await Rate.init()

	const userId = event.cookies.get('userId')

	if (!userId) {
		event.locals.authenticated = false
		return resolve(event)
	}

	const session = await User.findById(userId)

	event.locals.session = session?.toJSON()
	event.locals.authenticated = true

	const response = await resolve(event)

	return response
}
