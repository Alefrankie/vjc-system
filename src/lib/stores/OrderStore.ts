import type { ICustomer } from '$lib/database/schemas/Customer'
import type { IOrder } from '$lib/database/schemas/Order'
import type { ICart } from '$lib/database/schemas/Product'
import { OrderTypeEnum } from '$lib/enums/OrderTypeEnum'
import { OrderVolumeEnum } from '$lib/enums/OrderVolumeEnum'
import { PayConditionEnum } from '$lib/enums/PayConditiomEnum'
import { get, writable } from 'svelte/store'
import { RateStore } from './RateStore'

const defaultValues = {
	customer: {} as ICustomer,
	rate: 0,
	type: OrderTypeEnum.DELIVERY_NOTE,
	volume: OrderVolumeEnum.RETAIL,
	cart: [] as ICart[],
	code: '',
	payCondition: PayConditionEnum.CASH
} as IOrder

// eslint-disable-next-line max-lines-per-function
const createStore = () => {
	const { subscribe, set, update } = writable(defaultValues as IOrder)

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
			set(defaultValues as IOrder)
		}
	}
}

export const OrderStore = createStore()
