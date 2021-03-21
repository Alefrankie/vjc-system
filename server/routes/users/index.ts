import { Router } from 'express'
import checkSessionActiveUseCase from './checkSessionActiveUseCase'
import deleteUser from './deleteUser'
import findAllUsers from './findAllUsers'
import findLikeUsersUseCase from './findLikeUsersUseCase'
import findOneUserUseCase from './findOneUserUseCase'
import logout from './logout'
import signIn from './signIn'
import singUp from './singUp'
import WhoAmI from './whoAmI'
import Update from './update'
import { isLoggedIn } from '../../middlewares'

const router = Router()

router.use('/checkSessionActiveUseCase', checkSessionActiveUseCase)
router.use('/deleteUser', deleteUser)
router.use('/findAllUsers', findAllUsers)
router.use('/findLikeUsersUseCase', findLikeUsersUseCase)
router.use('/findOneUserUseCase', findOneUserUseCase)
router.use('/logout', logout)
router.use('/signIn', signIn)
router.use('/singUp', singUp)
router.use('/update', isLoggedIn, Update)
router.use('/whoAmI', isLoggedIn, WhoAmI)

export default router
