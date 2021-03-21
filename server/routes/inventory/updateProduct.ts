import { Request, Response, Router } from 'express'
import Product from '../../schemas/Product'
const router = Router()

router.put(
  '/',
  async (req: Request, res: Response): Promise<Response> => {
    const { productId } = req.body

    if (!productId) {
      return res.status(400).send('You must indicate a Product ID')
    }

    await Product.updateOne({ productId }, req.body)

    return res.status(200).json({
      success: 'Operation successfully.'
    })
  }
)

export default router
