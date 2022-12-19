import { Fetch } from '$lib/stores/Fetch'
import { ProductStore } from '$lib/stores/ProductStore'

let timeoutId
type Entity = 'products' | 'orders' | 'customers'

export const useFinder = (e, entity: Entity) => {
	if (timeoutId) {
		clearTimeout(timeoutId)
	}

	timeoutId = setTimeout(async () => {
		const { data } = await Fetch.get(`/api/${entity}/filter/?key=${e.target.value}`)

		entity == 'products' && ProductStore.set(data)
	}, 200)
}
