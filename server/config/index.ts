export default {
  jwtSecret: process.env.JWT_SECRET || 'someSecretToken'
}

type Props = {
  HOST: string
  DATABASE_NAME: string
  USERNAME: string
  PASSWORD: string
}

export const DATABASE: Props = {
  HOST: 'localhost',
  DATABASE_NAME: 'vjcimport',
  USERNAME: 'root',
  PASSWORD: 'Ajma30089812'
}

type PropsMongoDB = {
  URI: string
  USERNAME: string
  PASSWORD: string
}

export const DATABASEMONGO: PropsMongoDB = {
  URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/vjcimport',
  USERNAME: process.env.MONGODB_USER || '',
  PASSWORD: process.env.MONGODB_PASSWORD || ''
}
