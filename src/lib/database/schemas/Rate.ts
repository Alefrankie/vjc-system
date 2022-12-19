import mongoose, { Model } from 'mongoose'

const { model, Schema } = mongoose

export interface IRate extends Document {
	_id: string
	name: string
	value: string
}

const RateSchema = new Schema({
	name: {
		type: String
	},
	value: {
		type: Number
	}
})

export const Rate: Model<IRate> = mongoose.models.Lote || model<IRate>('Rate', RateSchema)
