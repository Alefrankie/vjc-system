import { Request, Response, Router } from 'express'
import Product from '../../schemas/Product'
const router = Router()

type Body = {
  productId: string
}
router.get(
  '/',
  async (req: Request, res: Response): Promise<Response> => {
    const { productId } = <Body>req.query

    if (!productId) {
      return res
        .status(400)
        .send('You must indicate a Product ID.')
    }

    const product = await Product.findOne({
      productId
    })
    
    if (!product) {
      return res.status(404).send('Product not found!')
    }
    return res.json({ product })
  }
)
export { router as findOneProduct }
