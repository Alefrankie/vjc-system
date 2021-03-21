import { Router } from 'express'
import Inventory from './inventory'
import Invoice from './invoice'
import Preferences from './preferences'
import Users from './users'

const myRoutes = Router()

myRoutes.use('/inventory', Inventory)
myRoutes.use('/invoice', Invoice)
myRoutes.use('/preferences', Preferences)
myRoutes.use('/users', Users)

export default myRoutes
