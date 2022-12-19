import { Product } from '$lib/database/schemas/Product'
import type { RequestHandler } from '@sveltejs/kit'
import fs from 'fs'

// async function getPreferences() {
// 	const preferences = await JSON.parse(
// 		fs.readFileSync('./src/pages/api/preferences/preferences.json').toString()
// 	)
// 	return preferences
// }

// export const get: RequestHandler = async () => {

// 	const responsePromises = []
// 	const responsePromise = Product.find().sort({ productName: 1 })
// 	responsePromises.push(responsePromise)

// 	const response = await Promise.all(responsePromises)

// 	// Looking few quantities
// 	const preferences = await getPreferences()

// 	const { limitUnits, limitLts, limitKgs, limitGr } = preferences
// 	const myQuantities = []
// 	let countQuantities = 0

// 	if (limitUnits !== null) {
// 		myQuantities.push(limitUnits)
// 		countQuantities++
// 	}

// 	if (limitLts !== null) {
// 		myQuantities.push(limitLts)
// 		countQuantities++
// 	}
// 	if (limitKgs !== null) {
// 		myQuantities.push(limitKgs)
// 		countQuantities++
// 	}
// 	if (limitGr !== null) {
// 		myQuantities.push(limitGr)
// 		countQuantities++
// 	}

// 	const minQuantities = Math.min.apply(null, myQuantities)
// 	const maxQuantities = Math.max.apply(null, myQuantities)

// 	const checkQuantity = response[0].filter(
// 		(e: { quantity: number }) => e.quantity < maxQuantities || e.quantity <= minQuantities
// 	)

// 	if (countQuantities !== 4) {
// 		return {
// 			body: {
// 				message: 'Please, check the inventory quantities',
// 				data: checkQuantity
// 			}
// 		}
// 	}

// 	if (checkQuantity.length >= 1) {
// 		return {
// 			body: {
// 				message: 'Please, check the inventory quantities',
// 				data: checkQuantity
// 			}
// 		}
// 	}
// }
