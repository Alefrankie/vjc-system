import { Fetch } from '$lib/stores/Fetch'
import { OrderStore } from '$lib/stores/OrderStore'
import type { PageLoad } from './$types'

export const load: PageLoad = async ({ params }) => {
	const { data: order } = await Fetch.get(`/api/orders/${params.id}`)
	OrderStore.setOrder(order)
}
