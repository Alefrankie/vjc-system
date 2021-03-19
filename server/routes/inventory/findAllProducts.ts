import { Request, Response, Router } from 'express'
import Product from '../../schemas/Product'
const router = Router()

router.get(
  '/',
  async (_req: Request, res: Response): Promise<Response> => {
    const responsePromises = []
    const responsePromise = Product.find().sort({ productName: 1 })
    responsePromises.push(responsePromise)

    const [products] = await Promise.all(responsePromises)
    return res.status(200).json({ products })
  }
)

export { router as findAllProducts }
