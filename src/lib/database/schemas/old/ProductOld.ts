import mongoose, { model, Schema, Document } from 'mongoose'

export interface IProduct extends Document {
	productCode: string
	productName: string
	unitaryPrice: number
	retailPrice: number
	quantity: number
	unit: string
}

export const ProductOldSchema = new Schema({
	productCode: {
		type: String,
		unique: true,
		required: true,
		uppercase: true,
		trim: true
	},
	productName: {
		type: String,
		unique: true,
		required: true,
		uppercase: true,
		trim: true
	},
	unitaryPrice: {
		type: Number,
		required: true,
		trim: true
	},
	retailPrice: {
		type: Number,
		required: true,
		trim: true
	},
	quantity: {
		type: Number,
		required: true,
		trim: true
	},
	unit: {
		type: String,
		required: true,
		uppercase: true,
		trim: true
	}
})

export default mongoose.models.ProductsOld || model<IProduct>('productolds', ProductOldSchema)
