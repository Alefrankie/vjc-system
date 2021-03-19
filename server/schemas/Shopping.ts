import mongoose, { model, Schema, Document } from 'mongoose'

export interface IShopping extends Document {
  shoppingId: string
  controlNumber: string
  fullName: string
  address: string
  dni: string
  contact: string
  invoiceDate: string
  status: boolean
  payCondition: string
}

const ShoppingSchema = new Schema({
  shoppingId: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
    trim: true
  },
  controlNumber: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
    trim: true
  },
  fullName: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
    trim: true
  },
  address: {
    type: String,
    unique: true,
    required: true,
    uppercase: true,
    trim: true
  },
  dni: {
    type: String,
    unique: true,
    required: true,
    uppercase: true,
    trim: true
  },
  contact: {
    type: String,
    unique: true,
    required: true,
    uppercase: true,
    trim: true
  },
  invoiceDate: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
    trim: true
  },
  status: {
    type: Boolean,
    unique: true,
    required: true,
    uppercase: true,
    trim: true,
    default: true
  },
  payCondition: {
    type: String,
    unique: true,
    required: true,
    uppercase: true,
    trim: true,
    default: 'De Contado'
  }
})

export default mongoose.models.Shopping ||
  model<IShopping>('Shopping', ShoppingSchema)
