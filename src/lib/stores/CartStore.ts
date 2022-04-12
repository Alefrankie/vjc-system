import type { IProduct } from '$lib/database/schemas/Product'
import { writable } from 'svelte/store'

const defaultValues: IProduct[] = []

const createStore = () => {
	const { subscribe, update, set } = writable(defaultValues)

	return {
		subscribe,
		remove: (product: IProduct) => {
			update((store) => store.filter((e) => e._id !== product._id))
		},
		add: (product: IProduct) => {
			product.discount = 0
			product.requested = 0
			update((store) => [...store, product])
		},
		update: (item: IProduct, value: number, property: 'requested' | 'discount') => {
			update((store) => {
				store = store.filter((e) => {
					if (e === item) e[property] = Number(value)
					return e
				})
				return store
			})
		},
		wipe: () => {
			set([])
		}
	}
}

export const CartStore = createStore()
