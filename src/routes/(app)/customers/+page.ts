import { CustomerStore } from '$lib/stores/CustomerStore'
import { Fetch } from '$lib/stores/Fetch'

export const load = async () => {
	const { data: customers } = await Fetch.get('/api/customers')
	CustomerStore.set(customers)
}
