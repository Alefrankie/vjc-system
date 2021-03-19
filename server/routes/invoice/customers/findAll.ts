import { Request, Response, Router } from 'express'
import Customer from '../../../schemas/Customers'
const router = Router()

router.post(
  '/',
  async (req: Request, res: Response): Promise<Response> => {
    const { customerType } = <{ customerType: string }>req.body

    const responsePromises = []
    const responsePromise = Customer.find({
      customerType
    })
    responsePromises.push(responsePromise)

    const [customers] = await Promise.all(responsePromises)
    if (![customers]) {
      return res.status(404).send('Customers Not Found!')
    }

    return res.status(200).json({ customers })
  }
)

export { router as findAll }
