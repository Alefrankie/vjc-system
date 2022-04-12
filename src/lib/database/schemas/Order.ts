import type { ICustomer } from '$lib/database/schemas/Customer'
import type { IProduct } from '$lib/database/schemas/Product'
import mongoose from 'mongoose'

const { model, Schema } = mongoose

export interface IOrder extends Document {
	_id: string
	code: string
	date: string
	rate: number
	type: string
	volume: string
	status: boolean
	cart: IProduct[]
	payCondition: string
	customer: ICustomer
	createdAt: string
}

const OrderSchema = new Schema({
	code: {
		type: String,
		required: true
	},
	rate: {
		type: Number
	},
	type: {
		type: String
	},
	volume: {
		type: String
	},
	status: {
		type: Boolean,
		default: true
	},
	createdAt: {
		type: String,
		default: new Date().toISOString()
	},
	payCondition: {
		type: String,
		default: 'Contado'
	},
	customer: { type: Schema.Types.ObjectId, ref: 'Customer' },
	cart: {
		type: Object
	}
})

export const Order = mongoose.models.Invoice || model<IOrder>('Order', OrderSchema)
