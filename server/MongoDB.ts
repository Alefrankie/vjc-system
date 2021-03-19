import mongoose, { ConnectionOptions } from 'mongoose'
import { DATABASEMONGO } from './config'
const { URI } = DATABASEMONGO

const DbOptions: ConnectionOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  forceServerObjectId: true
}

mongoose
  .connect(URI, DbOptions)
  .then(() => console.log('Database is connected'))
  .catch(({ message }) => console.log('Error in mongo DB is: ' + message))

const connection = mongoose.connection

connection.once('open', () => {
  console.log('Mongodb Connection Established')
})

connection.on('error', err => {
  console.log({ err })
  process.exit(0)
})
