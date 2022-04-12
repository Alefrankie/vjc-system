import type { IProduct } from '$lib/database/schemas/Product'
import { writable } from 'svelte/store'

const defaultValues: IProduct[] = []
const createStore = () => {
	const { subscribe, update, set } = writable(defaultValues)

	return {
		subscribe,
		set: (data: IProduct[]) => {
			set(data)
		},
		remove: (product: IProduct) => {
			update((store) => store.filter((e) => e._id !== product._id))
		},
		add: (product: IProduct) => {
			update((store) => [...store, product])
			//
		}
	}
}

export const ProductStore = createStore()
