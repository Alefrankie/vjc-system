import UserOld from '$lib/database/schemas/old/UserOld'
import { User } from '$lib/database/schemas/User'
import type { RequestHandler } from '@sveltejs/kit'

// firstName: string
// lastName: string
// dniType: string
// dni: string
// username: string
// password: string
// phone: string
// address: string
// status: string
// role: number

export const get: RequestHandler = async () => {
	const [users] = await Promise.all([UserOld.find().lean()])
	await User.deleteMany({})

	await Promise.all(
		users.map(async (e) => {
			e.firstName = e.name

			delete e._id
			delete e.name
			delete e.userId
			delete e.privileges
			delete e.dniType
			delete e.status

			const newData = new User(e)
			await newData.save()
		})
	)

	return {
		body: { data: users }
	}
}
