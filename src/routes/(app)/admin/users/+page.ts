import { Fetch } from '$lib/stores/Fetch'
import type { PageLoad } from './$types'

export const load: PageLoad = async ({ url: { origin } }) => {
	const { data } = await Fetch.get(`${origin}/api/users/`)
	return {
		users: data
	}
}
