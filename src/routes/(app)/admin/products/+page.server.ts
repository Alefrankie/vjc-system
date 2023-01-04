import { Fetch } from '$lib/stores/Fetch'
import { ProductStore } from '$lib/stores/ProductStore'
import { RateStore } from '$lib/stores/RateStore'

export const load = async ({ locals: { session }, url: { origin } }: any) => {
	await Fetch.get(`${origin}/api/rates`).then(({ data: { Retail, Wholesale } }) => {
		RateStore.setWholesale(Wholesale)
		RateStore.setRetail(Retail)
	})

	await Fetch.get(`${origin}/api/products`).then(({ data }) => {
		ProductStore.set(data)
	})

	return {
		session
	}
}
