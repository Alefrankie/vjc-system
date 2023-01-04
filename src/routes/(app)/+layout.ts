import { AppConfig } from '$lib/configuration/app.config'
import type { IProduct } from '$lib/database/schemas/Product'
import { httpService } from '$lib/services/Http.service'
import { ProductStore } from '$lib/stores/ProductStore'
import { RateStore } from '$lib/stores/RateStore'

export const load = async ({ data: { session } }: any) => {
	console.log(AppConfig)
	const { Retail, Wholesale } = await httpService.get<{ Retail: number; Wholesale: number }>(
		`/api/rates`
	)
	RateStore.setWholesale(Wholesale)
	RateStore.setRetail(Retail)

	const products = await httpService.get<IProduct[]>(`/api/products`)
	ProductStore.set(products)

	return {
		session
	}
}
