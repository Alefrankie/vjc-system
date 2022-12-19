import { Fetch } from '$lib/stores/Fetch'
import type { PageLoad } from './$types'

export const load: PageLoad = async ({ params, url: { origin } }: any) => {
	const { data: order } = await Fetch.get(`${origin}/api/orders/${params.id}`)
	return { order }
}
