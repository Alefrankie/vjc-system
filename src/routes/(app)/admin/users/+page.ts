import { Fetch } from '$lib/stores/Fetch'

export const load = async () => {
	const { data } = await Fetch.get(`/api/users/`)
	return {
		users: data
	}
}
