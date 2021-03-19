import { Request, Response, Router } from 'express'
import Customer from '../../../schemas/Customers'
const handler = Router()

handler.post(
  '/',
  async (req: Request, res: Response): Promise<Response> => {
    const { customerId, customerType } = req.body
    const customerFound = await Customer.findOne({
      customerId,
      customerType
    })
    if (!customerFound) {
      return res.status(404).send('Customer Not Found!' )
    }
    return res.status(200).json({ customer: customerFound })
  }
)
export { handler as findOneById }
