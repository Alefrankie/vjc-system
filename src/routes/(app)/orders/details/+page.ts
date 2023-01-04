import type { IOrder } from '$lib/database/schemas/Order'
import { httpService } from '$lib/services/Http.service'
import type { PageLoad } from './$types'

export const load: PageLoad = async ({ params }: any) => {
	const order = await httpService.get<IOrder>(`/api/orders/${params.id}`)
	return { order }
}
