import * as bcrypt from 'bcryptjs'
import mongoose from 'mongoose'

const { model, Schema } = mongoose

export interface IUser extends Document {
	_id: string
	firstName: string
	lastName: string
	dniType: string
	dni: string
	username: string
	password: string
	phone: string
	email: string
	address: string
	status: string
	role: number
	gender: number
	locked: boolean
	createdAt: Date
	comparePassword: () => Promise<boolean>
}

const UserSchema = new Schema({
	firstName: {
		type: String
	},
	lastName: {
		type: String
	},
	dniType: {
		type: String
	},
	dni: {
		type: String,
		unique: true
	},
	username: {
		type: String,
		unique: true,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	phone: {
		type: String,
		unique: true
	},
	email: {
		type: String,
		unique: true
	},
	address: {
		type: String
	},
	status: {
		type: Boolean,
		default: false
	},
	role: {
		type: String,
		default: 'User'
	},
	gender: {
		type: String,
		default: 'User'
	},
	locked: {
		type: Boolean,
		default: true
	},
	createdAt: {
		type: Date,
		default: Date.now
	}
})

UserSchema.pre<IUser>('save', async function (next) {
	const user = this
	if (!user.isModified('password')) return next()
	const hash = await bcrypt.hashSync(user.password, 10)
	user.password = hash
})

UserSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
	const user = <IUser>this
	return bcrypt.compareSync(user.password, password)
}

UserSchema.set('toJSON', {
	transform: (_document: Document, returnedObject: SchemaTypeOptions<IUser>) => {
		delete returnedObject.__v
		delete returnedObject.password
	}
})

export const User = mongoose.models.User || model<IUser>('User', UserSchema)
