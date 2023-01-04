import { httpService } from '$lib/services/Http.service'
import type { PageLoad } from './$types'

export const load: PageLoad = async () => {
	const users = await httpService.get('/api/users/')

	return {
		users
	}
}
