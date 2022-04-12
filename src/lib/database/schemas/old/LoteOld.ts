import mongoose, { model, Schema, Document } from 'mongoose'

export interface ILote extends Document {
	loteId: string
	items: string
}

const LoteSchema = new Schema({
	loteId: {
		type: String,
		unique: true,
		required: true,
		trim: true
	},
	items: {
		type: Object,
		required: true,
		trim: true
	}
})

export default mongoose.models.Lote || model<ILote>('lote', LoteSchema)
