import { Fetch } from '$lib/stores/Fetch'
import type { PageLoad } from './$types'

export const load: PageLoad = async ({ params, url: { origin } }) => {
	const { data } = await Fetch.get(`${origin}/api/users/${params.id}`)
	return {
		user: data
	}
}
