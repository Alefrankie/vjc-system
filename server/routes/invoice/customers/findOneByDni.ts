import { Request, Response, Router } from 'express'
import Customer from '../../../schemas/Customers'
const router = Router()

router.post(
  '/',
  async (req: Request, res: Response): Promise<Response> => {
    const { customerType, keyword } = req.body

    if (customerType === '' || keyword === '') {
      return res.status(400).send('Please fill all fields!')
    }
    const customerFound = await Customer.findOne({
      customerType,
      dni: {
        $regex: '.*' + keyword.toUpperCase() + '.*'
      }
    })

    if (!customerFound) {
      return res.status(400).send('Customer Not Found!')
    }

    return res.status(200).json({ customer: customerFound })
  }
)
export default router
