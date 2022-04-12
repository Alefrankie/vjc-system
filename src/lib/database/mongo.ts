import mongoose from 'mongoose'

export const jwtSecret: string = process.env.JWT_SECRET || 'someSecretToken'

// export const MONGODB_URI: string =
// 	process.env.MONGODB_URI || 'mongodb+srv://Diwaii:Diwaii@cluster0.gwm77.mongodb.net/vjcimport'
export const MONGODB_URI: string = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/vjcimport'

if (!MONGODB_URI) {
	throw new Error('Please define the MONGODB_URI environment variable inside .env.local')
}

let cached = global.mongoose

if (!cached) {
	cached = global.mongoose = { conn: null, promise: null }
}

export async function dbConnect() {
	if (cached.conn) {
		return cached.conn
	}

	if (!cached.promise) {
		const opts = {
			bufferCommands: false,
			useNewUrlParser: true,
			useUnifiedTopology: true,
			forceServerObjectId: true
		}

		cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongo) => mongo)
	}
	cached.conn = await cached.promise
	return cached.conn
}
