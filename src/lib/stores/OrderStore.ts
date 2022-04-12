import { get, writable } from 'svelte/store'
import { RateStore } from './RateStore'

const defaultValues = {
	customer: null,
	rate: 0,
	type: 'DeliveryNote',
	volume: 'Retail',
	cart: [],
	code: '',
	payCondition: '',
	createdAt: ''
}

const createStore = () => {
	const { subscribe, set, update } = writable(defaultValues)

	return {
		subscribe,
		setOrder: (data) => {
			set(data)
		},
		setRate: (data) => {
			update((store) => {
				store.rate = data
				return store
			})
		},
		setCustomer: (data) => {
			update((store) => {
				store.customer = data
				return store
			})
		},
		setType: (data) => {
			update((store) => {
				store.type = data
				return store
			})
		},
		setCart: (data) => {
			update((store) => {
				store.cart = data
				return store
			})
		},
		setVolume: (data) => {
			update((store) => {
				store.volume = data
				return store
			})

			if (data === 'Retail') {
				update((store) => {
					store.rate = get(RateStore).Retail
					return store
				})
			}

			if (data === 'Wholesale') {
				update((store) => {
					store.rate = get(RateStore).Wholesale
					return store
				})
			}
		},
		wipe: () => {
			set(defaultValues)
		}
	}
}

export const OrderStore = createStore()
