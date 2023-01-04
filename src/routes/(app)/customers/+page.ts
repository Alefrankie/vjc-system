import type { ICustomer } from '$lib/database/schemas/Customer'
import { httpService } from '$lib/services/Http.service'
import { CustomerStore } from '$lib/stores/CustomerStore'
import type { PageLoad } from './$types'

export const load: PageLoad = async () => {
	const customers = await httpService.get<ICustomer[]>(`/api/customers`)
	CustomerStore.set(customers)
}
