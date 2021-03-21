import { Router } from 'express'
import getStats from './getStats'
const services = Router()

services.use('/getStats', getStats)

export default services
