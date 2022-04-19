import { writable } from 'svelte/store'

interface defaultValues {
	Retail: number
	Wholesale: number
	Rate: number
}

const defaultValues = { Retail: 0, Wholesale: 0, Rate: 0 }

const createStore = () => {
	const { subscribe, update } = writable(defaultValues)

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
		},
		setRate: (data: number) => {
			update((store) => {
				store.Rate = data
				return store
			})
		}
	}
}

export const Rates = createStore()
