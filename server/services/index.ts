import { Router } from 'express'
import getStats from './getStats'
const router = Router()

router.use('/getStats', getStats)

export { router as Services }
