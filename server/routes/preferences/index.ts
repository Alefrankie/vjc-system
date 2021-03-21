import { Router } from 'express'
import findAll from './findAll'
import save from './save'
import { isLoggedIn } from '../../middlewares'

const router = Router()

router.use('/findAll', findAll)
router.use('/save', isLoggedIn, save)

export default router
