import type { IOrder } from '$lib/database/schemas/Order'
import type { IProduct } from '$lib/database/schemas/Product'

export const getPrice = (product: IProduct) => {
	return product.price * product.requested
}

export const getDiscount = (product: IProduct) => {
	return product.price * product.requested * product.discount
}

export const getSubTotal = (cart: IProduct[]) => {
	let accumulator = 0

	for (const i of cart) {
		accumulator += getPrice(i)
	}
	return accumulator
}

export const getDiscountTotal = (cart: IProduct[]) => {
	let accumulator = 0

	for (const i of cart) {
		accumulator += getDiscount(i)
	}
	return accumulator
}

export const getTotal = (cart: IProduct[]) => {
	let accumulator = 0

	for (const i of cart) {
		accumulator += getPrice(i) - getDiscount(i)
	}
	return accumulator
}

export const getIva = (cart: IProduct[]) => {
	let accumulator = 0

	for (const i of cart) {
		accumulator += getPrice(i) - getDiscount(i)
	}
	return accumulator * 0.16
}

export const getRevenues = (orders: IOrder[]): { dollars: number; bolivars: number } => {
	let dollars = 0
	let bolivars = 0

	orders.map((e: IOrder) => {
		dollars += getTotal(e.cart)
	})

	orders.map((e: IOrder) => {
		bolivars += getTotal(e.cart) * e.rate
	})

	return { dollars, bolivars }
}

export const getBestOrder = (orders: IOrder[]) => {
	let dollars = 0
	let bolivars = 0
	let rate = 0
	orders.map((e: IOrder) => {
		if (getTotal(e.cart) > dollars) {
			dollars = getTotal(e.cart)
		}
	})

	orders.map((e: IOrder) => {
		if (getTotal(e.cart) > bolivars) {
			bolivars = getTotal(e.cart)
			rate = e.rate
		}
	})

	return { dollars, bolivars: bolivars * rate }
}
