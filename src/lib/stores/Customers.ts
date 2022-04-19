import type { ICustomer } from '$lib/database/schemas/Customer'
import { writable } from 'svelte/store'

const defaultValues: ICustomer[] = []

const createStore = () => {
	const { subscribe, set, update } = writable(defaultValues)

	return {
		subscribe,
		set: (data: ICustomer[]) => {
			set(data)
		},
		remove: (data: ICustomer) => {
			update((store) => store.filter((e) => e._id !== data._id))
		}
	}
}

export const Customers = createStore()
