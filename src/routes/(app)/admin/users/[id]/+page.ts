import { Fetch } from '$lib/stores/Fetch'
import type { PageLoad } from './$types'

export const load: PageLoad = async ({ params }) => {
	const { data } = await Fetch.get(`/api/users/${params.id}`)
	return {
		user: data
	}
}
