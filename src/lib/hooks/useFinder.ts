import { Fetch } from '$lib/stores/Fetch'
import { Products } from '$lib/stores/Products'

let timeoutId = null
type Entity = 'products' | 'orders' | 'customers'

export const useFinder = (e, entity: Entity) => {
	if (timeoutId) {
		clearTimeout(timeoutId)
	}

	timeoutId = setTimeout(async () => {
		const { data } = await Fetch.get(`/api/${entity}/filter/?key=${e.target.value}`)

		entity == 'products' && Products.set(data)
	}, 200)
}
