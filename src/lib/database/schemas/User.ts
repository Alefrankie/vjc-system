import bcrypt from 'bcryptjs'
import mongoose, { Model, SchemaTypeOptions } from 'mongoose'
import { UserGendersEnum } from '../../enums/UserGendersEnum'
import { UserRolesEnum } from '../../enums/UserRolesEnum'
import { UserStatusEnum } from '../../enums/UserStatusEnum'

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
	status: UserStatusEnum
	role: UserRolesEnum
	gender: UserGendersEnum
	locked: boolean
	comparePassword: () => Promise<boolean>
}

const UserSchema = new Schema(
	{
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
			type: String
		},
		email: {
			type: String
		},
		address: {
			type: String
		},
		status: {
			type: String,
			enum: UserStatusEnum,
			default: UserStatusEnum.OFFLINE
		},
		role: {
			type: String,
			enum: UserRolesEnum,
			default: UserRolesEnum.USER
		},
		gender: {
			type: String,
			enum: UserGendersEnum
		},
		locked: {
			type: Boolean,
			default: true
		}
	},
	{
		toJSON: {
			transform: (_document: Document, ret: SchemaTypeOptions<IUser>) => {
				delete ret.__v
				delete ret.password
				ret._id = String(ret._id) as any
			}
		}
	}
)

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

export const User: Model<IUser> = mongoose.models.User || model<IUser>('User', UserSchema)
