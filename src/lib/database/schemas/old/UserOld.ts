import mongoose, { model, Schema, Document } from 'mongoose'
import bcrypt from 'bcryptjs'

export interface IUser extends Document {
	name: string
	lastName: string
	dniType: string
	dni: string
	username: string
	password: string
	privileges: number
	comparePassword: () => Promise<boolean>
}

export const UserOldSchema = new Schema({
	name: {
		type: String,
		trim: true
	},
	lastName: {
		type: String,
		trim: true
	},
	dniType: {
		type: String,
		trim: true
	},
	dni: {
		type: String,
		unique: true,
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
		type: Number,
		trim: true,
		default: 2
	}
})

UserOldSchema.pre<IUser>('save', async function (next) {
	const user = this
	if (!user.isModified('password')) return next()
	const hash = bcrypt.hashSync(user.password, 10)
	user.password = hash
})

UserOldSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
	const user = <IUser>this
	return await bcrypt.compareSync(user.password, password)
}

export default mongoose.models.UserOlds || model<IUser>('userolds', UserOldSchema)
