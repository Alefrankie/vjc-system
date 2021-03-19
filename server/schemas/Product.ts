import mongoose, { model, Schema, Document } from 'mongoose'

export interface IProduct extends Document {
  productId: string
  productCode: string
  productName: string
  unitaryPrice: number
  retailPrice: number
  quantity: number
  unit: string
}

const ProductSchema = new Schema({
  productId: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
    trim: true
  },
  productCode: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
    trim: true
  },
  productName: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
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

export default mongoose.models.Product ||
  model<IProduct>('Product', ProductSchema)
