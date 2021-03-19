import mongoose, { model, Schema, Document } from 'mongoose'

export interface IInvoice extends Document {
  invoiceId: string
  controlNumber: string
  fullName: string
  dni: string
  address: string
  contact: string
  socialReason: string
  exchangeRate: number
  invoiceType: string
  invoiceDate: string
  status: true
  payCondition: string
}

const InvoiceSchema = new Schema({
  invoiceId: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  controlNumber: {
    type: String,
    required: true,
    trim: true
  },
  fullName: {
    type: String,
    trim: true
  },
  address: {
    type: String,
    trim: true
  },
  dni: {
    type: String,
    trim: true
  },
  contact: {
    type: String,
    trim: true
  },
  invoiceDate: {
    type: String,
    lowercase: true,
    trim: true
  },
  socialReason: {
    type: String,
    trim: true
  },
  exchangeRate: {
    type: Number,
    required: true,
    trim: true
  },
  invoiceType: {
    type: String,
    required: true,
    trim: true
  },
  status: {
    type: Boolean,
    required: true,
    default: true
  },
  payCondition: {
    type: String,
    required: true,
    trim: true,
    default: 'De Contado'
  }
})

export default mongoose.models.Invoice ||
  model<IInvoice>('Invoice', InvoiceSchema)
