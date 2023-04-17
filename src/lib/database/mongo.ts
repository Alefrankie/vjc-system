import { MONGO_URI } from '$env/static/private'
import mongoose from 'mongoose'

export const jwtSecret = 'someSecretToken'

export const MONGODB_URI = MONGO_URI

if (!MONGODB_URI) {
	throw new Error('Please define the MONGODB_URI environment variable inside .env.local')
}

export async function dbConnect() {
	const opts = {
		bufferCommands: false,
		useNewUrlParser: true,
		useUnifiedTopology: true,
		forceServerObjectId: true
	}

	const connection = await mongoose.connect(MONGODB_URI, opts).then((mongo) => mongo)

	return connection
}
