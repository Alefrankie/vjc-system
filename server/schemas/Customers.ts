import mongoose, { model, Schema, Document } from 'mongoose'

export interface ICustomer extends Document {
  customerId: string
  fullName: string
  address: string
  dni: string
  contact: string
  socialReason: string
  customerType: string
}

const CustomerSchema = new Schema({
  customerId: {
    type: String,
    required: true,
    trim: true
  },
  firstName: {
    type: String,
    trim: true
  },
  lastName: {
    type: String,
    trim: true
  },
  fullName: {
    type: String,
    trim: true
  },
  address: {
    type: String,
    required: true,
    uppercase: true,
    trim: true
  },
  dniType: {
    type: String,
    required: true,
    uppercase: true,
    trim: true
  },
  dni: {
    type: String,
    required: true,
    trim: true
  },
  contact: {
    type: String,
    required: true,
    trim: true
  },
  socialReason: {
    type: String,
    uppercase: true,
    trim: true
  },
  customerType: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  }
})

export default mongoose.models.Customer ||
  model<ICustomer>('Customer', CustomerSchema)
