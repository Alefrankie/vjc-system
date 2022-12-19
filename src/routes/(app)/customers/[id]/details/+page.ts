import { Fetch } from '$lib/stores/Fetch'
import type { PageLoad } from './$types'
export const load: PageLoad = async ({ params }: any) => {
	const { data: customer } = await Fetch.get(`/api/customers/${params.id}`)
	return { customer }
}
