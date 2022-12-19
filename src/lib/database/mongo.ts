import mongoose from 'mongoose'
import { MONGO_URI } from '$env/static/private'
import { UserOldSchema } from './schemas/old/UserOld'
import { ProductOldSchema } from './schemas/old/ProductOld'
import { CustomerOldSchema } from './schemas/old/CustomerOld'
import { InvoiceOldSchema } from './schemas/old/InvoiceOld'
import { LoteOldSchema } from './schemas/old/LoteOld'
import type { IOrder } from './schemas/Order'
import type { ICustomer } from './schemas/Customer'
import type { ICart, IProduct } from './schemas/Product'
import dayjs from 'dayjs'
import { OrderVolumeEnum } from '$lib/enums/OrderVolumeEnum'
import { OrderTypeEnum } from '$lib/enums/OrderTypeEnum'
import { PayConditionEnum } from '$lib/enums/PayConditiomEnum'

export const jwtSecret = 'someSecretToken'

export const MONGODB_URI = MONGO_URI
// export const MONGODB_URI: string =
// 	process.env.MONGODB_URI || 'mongodb+srv://Diwaii:Diwaii@cluster0.gwm77.mongodb.net/vjcimport';

if (!MONGODB_URI) {
	throw new Error('Please define the MONGODB_URI environment variable inside .env.local')
}

// const scriptUsers = async () => {
// 	const UserOld = mongoose.model('userolds', UserOldSchema)
// 	const User = mongoose.model('User')

// 	const users = await UserOld.find().lean()
// 	await User.deleteMany({})

// 	users.map(async (e: any) => {
// 		e.firstName = e.name

// 		delete e._id
// 		delete e.name
// 		delete e.userId
// 		delete e.privileges
// 		delete e.dniType
// 		delete e.status

// 		const newData = new User(e)
// 		await newData.save()
// 	})
// }
// const scriptProducts = async () => {
// 	const ProductOld = mongoose.model('productolds', ProductOldSchema)
// 	const Product = mongoose.model('Product')

// 	const products = await ProductOld.find().lean()
// 	await Product.deleteMany({})

// 	products.map(async (e: any) => {
// 		e.code = e.productCode
// 		e.name = e.productName
// 		e.price = 0

// 		delete e._id
// 		delete e.productId

// 		const newData = new Product(e)
// 		await newData.save()
// 	})
// }

// // eslint-disable-next-line max-lines-per-function
// const scriptCustomer = async () => {
// 	const CustomerOld = mongoose.model('customerolds', CustomerOldSchema)
// 	const Customer = mongoose.model('Customer')

// 	const customers = await CustomerOld.find().lean()
// 	await Customer.deleteMany({})

// 	// eslint-disable-next-line max-lines-per-function, max-statements
// 	customers.map(async (e: any) => {
// 		e.phone = e.contact

// 		// Actualizando el DNI
// 		if (e.dniType) {
// 			e.dniType = e.dniType.slice(0, 1)
// 		}

// 		if (e.dni.includes('V-')) {
// 			// eslint-disable-next-line @typescript-eslint/no-unused-vars
// 			const [dniType, dni] = e.dni.split('V-')
// 			e.dniType = 'V'
// 			e.dni = dni
// 		}

// 		if (e.dni.includes('G-')) {
// 			// eslint-disable-next-line @typescript-eslint/no-unused-vars
// 			const [dniType, dni] = e.dni.split('G-')

// 			e.dniType = 'G'
// 			e.dni = dni
// 		}

// 		if (e.dni.includes('J-')) {
// 			// eslint-disable-next-line @typescript-eslint/no-unused-vars
// 			const [dniType, dni] = e.dni.split('J-')

// 			e.dniType = 'J'
// 			e.dni = dni
// 		}

// 		// ===============================

// 		// ACTUALIZANDO EL NOMBRE
// 		if (e.fullName && e.dniType.includes('V')) {
// 			const [firstName, lastName] = e.fullName.split(' ')
// 			e.firstName = firstName
// 			e.lastName = lastName
// 		}

// 		// Actualizando la Razón Social
// 		if (e.dniType.includes('V')) {
// 			delete e.socialReason
// 		}

// 		delete e._id
// 		delete e.customerId
// 		delete e.contact
// 		delete e.customerType

// 		const newData = new Customer(e)
// 		await newData.save()
// 	})
// }
// eslint-disable-next-line max-lines-per-function

export async function dbConnect() {
	const opts = {
		bufferCommands: false,
		useNewUrlParser: true,
		useUnifiedTopology: true,
		forceServerObjectId: true
	}

	const connection = await mongoose.connect(MONGODB_URI, opts).then((mongo) => mongo)

	// await scriptUsers()
	// await scriptProducts()
	// await scriptInvoice()
	// await scriptCustomer()
	return connection
}
