import type { IOrder } from '$lib/database/schemas/Order'
import { httpService } from '$lib/services/Http.service'
import { OrderStore } from '$lib/stores/OrderStore'
import type { PageLoad } from './$types'

export const load: PageLoad = async ({ params }) => {
	const order = await httpService.get<IOrder>(`/api/orders/${params.id}`)

	OrderStore.setOrder(order)
}
