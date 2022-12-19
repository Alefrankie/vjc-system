import type { IOrder } from '$lib/database/schemas/Order'
import type { ICart } from '$lib/database/schemas/Product'

export const getPrice = (product: ICart) => {
	return product.price * product.requested
}

export const getDiscount = (product: ICart) => {
	return product.price * product.requested * product.discount
}

export const getSubTotalByCart = (cart: ICart[]) => {
	return cart.reduce((prev, e) => prev + e.price * e.requested, 0)
}

export const getDiscountTotal = (cart: ICart[]) => {
	return cart.reduce((prev, e) => prev + getDiscount(e), 0)
}

export const getTotalByCart = (cart: ICart[]) => {
	return cart.reduce((prev, e) => {
		const itemPriceByQuantity = e.price * e.requested
		const discountByItem = itemPriceByQuantity * e.discount
		return prev + itemPriceByQuantity - discountByItem
	}, 0)
}

export const getIvaByCart = (cart: ICart[]) => {
	const accumulator = cart.reduce((prev, e) => prev + getPrice(e) - getDiscount(e), 0)
	return accumulator * 0.16
}

export const getRevenues = (orders: IOrder[]): { dollars: number; bolivars: number } => {
	const dollars = orders.reduce((prev, e) => prev + getTotalByCart(e.cart), 0)
	const bolivars = orders.reduce((prev, e) => prev + getTotalByCart(e.cart) * e.rate, 0)

	return { dollars, bolivars }
}

export const getBestOrder = (orders: IOrder[]): { dollars: number; bolivars: number } => {
	const { bestOrder, rate } = orders.reduce(
		(prev, e) => {
			if (getTotalByCart(e.cart) > prev.bestOrder) {
				return {
					bestOrder: getTotalByCart(e.cart),
					rate: e.rate
				}
			}

			return prev
		},
		{
			bestOrder: 0,
			rate: 0
		}
	)

	return { dollars: bestOrder, bolivars: bestOrder * rate }
}
