import { Customer } from '$lib/database/schemas/Customer'
import CustomerOld from '$lib/database/schemas/old/CustomerOld'
import type { RequestHandler } from '@sveltejs/kit'

// firstName: string
// lastName: string
// address: string
// dniType: string
// dni: string
// phone: string
// email: string
// gender: string
// socialReason: string

export const get: RequestHandler = async () => {
	const [data] = await Promise.all([CustomerOld.find().lean()])
	await Customer.deleteMany({})

	await Promise.all(
		data.map(async (e) => {
			e.phone = e.contact

			// Actualizando el DNI
			if (e.dniType) {
				e.dniType = e.dniType.slice(0, 1)
			}

			if (e.dni.includes('V-')) {
				// eslint-disable-next-line @typescript-eslint/no-unused-vars
				const [dniType, dni] = e.dni.split('V-')
				e.dniType = 'V'
				e.dni = dni
			}

			if (e.dni.includes('G-')) {
				// eslint-disable-next-line @typescript-eslint/no-unused-vars
				const [dniType, dni] = e.dni.split('G-')

				e.dniType = 'G'
				e.dni = dni
			}

			if (e.dni.includes('J-')) {
				// eslint-disable-next-line @typescript-eslint/no-unused-vars
				const [dniType, dni] = e.dni.split('J-')

				e.dniType = 'J'
				e.dni = dni
			}

			// ===============================

			// ACTUALIZANDO EL NOMBRE
			if (e.fullName && e.dniType.includes('V')) {
				const [firstName, lastName] = e.fullName.split(' ')
				e.firstName = firstName
				e.lastName = lastName
			}

			// Actualizando la Razón Social
			if (e.dniType.includes('V')) {
				delete e.socialReason
			}

			delete e._id
			delete e.customerId
			delete e.contact
			delete e.customerType

			const newData = new Customer(e)
			await newData.save()
		})
	)
	console.log('Ready')

	return {
		body: { data }
	}
}
