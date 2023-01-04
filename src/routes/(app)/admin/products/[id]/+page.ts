import type { IProduct } from '$lib/database/schemas/Product'
import { httpService } from '$lib/services/Http.service'
import type { PageLoad } from '.svelte-kit/types/src/routes/(app)/admin/products/[id]/$types'

export const load: PageLoad = async ({ params }) => {
	const product = await httpService.get<IProduct>(`/api/products/${params.id}`)
	return { product }
}
