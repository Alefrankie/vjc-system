import { Router } from 'express'
import { Inventory } from './inventory'
import { Invoice } from './invoice'
import { Preferences } from './preferences'
import { Users } from './users'

const router = Router()

router.use('/inventory', Inventory)
router.use('/invoice', Invoice)
router.use('/preferences', Preferences)
router.use('/users', Users)

export { router as MyRoutes }
