import { Request, Response, Router } from 'express'
import Product from '../../schemas/Product'

const router = Router()

router.post(
  '/',
  async (req: Request, res: Response): Promise<Response | void> => {
    const { value } = req.body

    const responsePromises = []

    if (value === '') {
      const responsePromise = Product.find()
      responsePromises.push(responsePromise)
      const [products] = await Promise.all(responsePromises)
      return res.status(200).json({ products })
    }

    const responsePromise = await Product.find({
      productName: {
        $regex: '.*' + value + '.*'
      }
    })

    responsePromises.push(responsePromise)
    const [products] = await Promise.all(responsePromises)
    console.log(products)
    return res.status(200).json({ products })
  }
)

export default router
