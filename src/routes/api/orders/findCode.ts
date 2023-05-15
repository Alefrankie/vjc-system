import { Order } from '$lib/database/schemas/Order'
import type { OrderTypeEnum } from '$lib/enums/OrderTypeEnum'
import type { OrderVolumeEnum } from '$lib/enums/OrderVolumeEnum'

// eslint-disable-next-line max-statements

// eslint-disable-next-line max-statements
export async function findCode(type: OrderTypeEnum, volume: OrderVolumeEnum) {
	const orderFound = await Order.findOne({
		type,
		volume
	}).sort({ code: -1 })

	if (!orderFound?.code) {
		return 0
	}

	const ordersToNumber = await Order.find({ code: 10000, type, volume })

	let codeK = 9999
	for await (const e of ordersToNumber) {
		codeK = Number(codeK + 1)

		await e.updateOne({ code: codeK })
		// Order.findByIdAndUpdate(e.id)
		console.log(e.code)
	}

	// const series = makeCode(Number(orderFound.code))

	return orderFound.code + 1
}
