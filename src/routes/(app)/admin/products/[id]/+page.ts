import { Fetch } from '$lib/stores/Fetch'
import type { PageLoad } from '.svelte-kit/types/src/routes/(app)/admin/products/[id]/$types'

export const load: PageLoad = async ({ params, url: { origin } }) => {
	const { data: product } = await Fetch.get(`${origin}/api/products/${params.id}`)
	return { product }
}
