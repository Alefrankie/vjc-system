import type { IUser } from '$lib/database/schemas/User'
import { httpService } from '$lib/services/Http.service'
import type { PageLoad } from './$types'

export const load: PageLoad = async ({ params }) => {
	const user = await httpService.get<IUser>(`/api/users/${params.id}`)
	return {
		user
	}
}
