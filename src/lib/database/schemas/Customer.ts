import type { IOrder } from './Order'
import mongoose from 'mongoose'

const { model, Schema } = mongoose

export interface ICustomer extends Document {
	_id: string
	firstName: string
	lastName: string
	address: string
	dniType: string
	dni: string
	phone: string
	email: string
	gender: string
	socialReason: string
	orders: IOrder[]
}

const CustomerSchema = new Schema({
	firstName: {
		type: String
	},
	lastName: {
		type: String
	},
	address: {
		type: String
	},
	dniType: {
		type: String
	},
	dni: {
		type: String
	},
	phone: {
		type: String
	},
	email: {
		type: String
	},
	gender: {
		type: String
	},
	orders: [{ type: Schema.Types.ObjectId, ref: 'Order' }],
	socialReason: {
		type: String
	}
})

CustomerSchema.set('toJSON', {
	transform: (_document: Document, returnedObject: SchemaTypeOptions<ICustomer>) => {
		delete returnedObject.__v
	}
})

export const Customer = mongoose.models.Customer || model<ICustomer>('Customer', CustomerSchema)
