import { Router } from 'express'
import ChangeStatus from './changeStatus'
import Delete from './delete'
import FindAll from './findAll'
import FindAllRangeDate from './findAllRangeDate'
import FindOne from './findOne'
import SaveInvoice from './saveInvoice'
import { Customers } from './customers'
import { isLoggedIn } from '../../middlewares'

const router = Router()

router.use('/delete', isLoggedIn, Delete)
router.use('/changeStatus', isLoggedIn, ChangeStatus)
router.use('/findAll', isLoggedIn, FindAll)
router.use('/findAllRangeDate', isLoggedIn, FindAllRangeDate)
router.use('/findOne', FindOne)
router.use('/saveInvoice', isLoggedIn, SaveInvoice)
router.use('/customers', Customers)

export { router as Invoice }
