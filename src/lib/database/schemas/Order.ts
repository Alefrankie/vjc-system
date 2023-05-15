import type { ICustomer } from '$lib/database/schemas/Customer'
import type { ICart } from '$lib/database/schemas/Product'
import { OrderTypeEnum } from '$lib/enums/OrderTypeEnum'
import { OrderVolumeEnum } from '$lib/enums/OrderVolumeEnum'
import { PayConditionEnum } from '$lib/enums/PayConditiomEnum'
import mongoose, { Model } from 'mongoose'

const { model, Schema } = mongoose

export interface IOrder extends Document {
	_id: string
	code: number
	rate: number
	type: OrderTypeEnum
	volume: OrderVolumeEnum
	status: boolean
	cart: ICart[]
	payCondition: PayConditionEnum
	customer: ICustomer
	createdAt: Date
}

const OrderSchema = new Schema(
	{
		code: {
			type: Number,
			required: true
		},
		rate: {
			type: Number
		},
		type: {
			type: String,
			enum: OrderTypeEnum
		},
		volume: {
			type: String,
			enum: OrderVolumeEnum
		},
		status: {
			type: Boolean,
			default: true
		},
		payCondition: {
			type: String,
			enum: PayConditionEnum,
			default: PayConditionEnum.CASH
		},
		customer: { type: Schema.Types.ObjectId, ref: 'Customer' },
		cart: {
			type: Object
		}
	},
	{ timestamps: true }
)

export const Order: Model<IOrder> = mongoose.models.Order || model<IOrder>('Order', OrderSchema)
