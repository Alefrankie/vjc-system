import { Order } from '$lib/database/schemas/Order'
import type { OrderTypeEnum } from '$lib/enums/OrderTypeEnum'
import type { OrderVolumeEnum } from '$lib/enums/OrderVolumeEnum'

const findingCode = async (type: OrderTypeEnum, volume: OrderVolumeEnum): Promise<any> => {
	const [orderFound] = await Order.find({
		type,
		volume
	})
		.sort({ code: -1 })
		.limit(1)

	if (!orderFound) {
		return '0000'
	}

	return orderFound.code
}

// eslint-disable-next-line max-statements
function makeCode(Serie: number): string {
	const cont = 1
	let code = ''

	if (Serie < 9) {
		const can = cont + Serie
		code = `000${can}`
		// 0009
		return code
		// return 0001 or 0009
	}

	if (Serie >= 9 && Serie < 99) {
		const can = cont + Serie
		code = `00${can}`
		// from 0010 to 0099
		return code
		// return 0010 or 0099
	}

	if (Serie >= 99 && Serie < 999) {
		const can = cont + Serie
		code = `0${can}`
		// 0100 && 0999
		return code
		// return 0100 or 0999
	}

	return String(Number(cont + Serie))
}

export async function findCode(type: OrderTypeEnum, volume: OrderVolumeEnum) {
	let c = ''

	const codeFound = await findingCode(type, volume)

	if (!codeFound) {
		c = '0001'
		return c
	}

	c = codeFound.slice(2)

	const series = makeCode(Number(c))

	const code = `${series}`
	return code
}
