import mongoose, { model, Schema, Document } from 'mongoose'
import bcrypt from 'bcryptjs'

export interface IUser extends Document {
  userId: string
  name: string
  lastName: string
  dni: string
  username: string
  password: string
  privileges: string
  comparePassword: () => Promise<boolean>
}

const UserSchema = new Schema({
  userId: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  name: {
    type: String,
    required: false,
    trim: true
  },
  lastName: {
    type: String,
    required: false,
    trim: true
  },
  dni: {
    type: String,
    unique: true,
    required: false,
    trim: true
  },
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    trim: true
  },
  privileges: {
    type: String,
    required: true,
    trim: true,
    default: 'User'
  }
})

UserSchema.pre<IUser>('save', async function (next) {
  const user = this
  if (!user.isModified('password')) return next()
  const hash = bcrypt.hashSync(user.password, 10)
  user.password = hash
})

UserSchema.methods.comparePassword = async function (
  password: string
): Promise<boolean> {
  const user = <IUser>this
  return await bcrypt.compareSync(user.password, password)
}

export default mongoose.models.User || model<IUser>('User', UserSchema)
