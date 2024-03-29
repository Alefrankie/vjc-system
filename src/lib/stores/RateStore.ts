import { writable } from 'svelte/store'

const createStore = () => {
	const { subscribe, update } = writable({ Retail: 0, Wholesale: 0 })

	return {
		subscribe,
		setRetail: (data: number) => {
			update((store) => {
				store.Retail = data
				return store
			})
		},
		setWholesale: (data: number) => {
			update((store) => {
				store.Wholesale = data
				return store
			})
		}
	}
}

export const RateStore = createStore()
