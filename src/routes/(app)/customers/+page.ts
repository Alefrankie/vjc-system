import { CustomerStore } from '$lib/stores/CustomerStore'
import { Fetch } from '$lib/stores/Fetch'
import type { PageLoad } from './$types'

export const load: PageLoad = async ({ url: { origin } }) => {
	const { data: customers } = await Fetch.get(`${origin}/api/customers`)
	CustomerStore.set(customers)
}
