import type { ICustomer } from '$lib/database/schemas/Customer'
import { httpService } from '$lib/services/Http.service'
import type { PageLoad } from './$types'

export const load: PageLoad = async ({ params }) => {
	const customer = await httpService.get<ICustomer>(`/api/customers/${params.id}`)
	return { customer }
}
