import { Router } from 'express'
import Delete from './delete'
import findAll from './findAll'
import findOneByDni from './findOneByDni'
import findOneById from './findOneById'
import save from './save'
import Update from './update'
import { isLoggedIn } from '../../../middlewares'

const router = Router()

router.use('/delete', isLoggedIn, Delete)
router.use('/findAll', findAll)
router.use('/findOneByDni', findOneByDni)
router.use('/findOneById', findOneById)
router.use('/save', isLoggedIn, save)
router.use('/update', isLoggedIn, Update)

export default router
