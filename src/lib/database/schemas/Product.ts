import mongoose, { SchemaTypeOptions } from 'mongoose'

const { model, Schema } = mongoose

export interface ICart {
	_id: string
	unit: string
	code: string
	name: string
	price: number
	discount: number
	requested: number
}

export interface IProduct extends Document {
	_id: string
	code: string
	name: string
	price: number
	quantity: number
	requested: number
	discount: number
	unit: string
}

const ProductSchema = new Schema({
	code: {
		type: String,
		required: true,
		uppercase: true
	},
	name: {
		type: String,
		required: true,
		uppercase: true
	},
	price: {
		type: Number
	},
	quantity: {
		type: Number,
		required: true
	},
	unit: {
		type: String,
		required: true,
		uppercase: true
	}
})

ProductSchema.set('toJSON', {
	transform: (_document: Document, returnedObject: SchemaTypeOptions<IProduct>) => {
		delete returnedObject.__v
	}
})

export const Product = mongoose.models.Product || model<IProduct>('Product', ProductSchema)
