import { Router } from 'express'
import { checkInventoryQuantitiesUseCase } from './checkInventoryQuantitiesUseCase'
import { codeProductGenerator } from './codeProductGenerator'
import { deleteProductUseCase } from './deleteProductUseCase'
import { findAllProducts } from './findAllProducts'
import findLikeProducts from './findLikeProducts'
import { findOneProduct } from './findOneProduct'
import { registerProductUseCase } from './registerProductUseCase'
import { updateProduct } from './updateProduct'
// import { isLoggedIn} from '../../middlewares'

const router = Router()

router.use(
  '/checkInventoryQuantitiesUseCase',

  checkInventoryQuantitiesUseCase
)
router.use('/codeProductGenerator', codeProductGenerator)
router.use('/deleteProductUseCase', deleteProductUseCase)
router.use('/findAllProducts', findAllProducts)
router.use('/findLikeProducts', findLikeProducts)
router.use('/findOneProduct', findOneProduct)
router.use('/registerProductUseCase', registerProductUseCase)
router.use('/updateProduct', updateProduct)

export { router as Inventory }
