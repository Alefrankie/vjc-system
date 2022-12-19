import { Fetch } from '$lib/stores/Fetch'
import type { PageLoad } from './$types'
export const load: PageLoad = async ({ params, url: { origin } }) => {
	const { data: customer } = await Fetch.get(`${origin}/api/customers/${params.id}`)
	return { customer }
}
