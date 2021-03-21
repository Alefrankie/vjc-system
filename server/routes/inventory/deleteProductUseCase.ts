import { Request, Response, Router } from 'express'
import Product from '../../schemas/Product'
const router = Router()

router.delete(
  '/',
  async (req: Request, res: Response): Promise<Response> => {
    const { productId } = req.query

    if (!productId) {
      return res.status(400).send('You must indicate a ProductId')
    }

    await Product.deleteOne({
      productId
    })

    return res.status(200).send({ success: 'Product deleted successfully' })
  }
)

export default router
