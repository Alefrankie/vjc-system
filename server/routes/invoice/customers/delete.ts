import { Request, Response, Router } from 'express'
import Customer from '../../../schemas/Customers'
const router = Router()

router.delete(
  '/',
  async (req: Request, res: Response): Promise<Response> => {
    try {
      const { customerId, customerType } = <
        { customerId: string; customerType: string }
      >req.body

      if (customerId === '' || customerType === '') {
        return res
          .status(400)
          .send("You must don't let void fields")
      }

      const dataFound = await Customer.deleteOne({
        customerId,
        customerType
      })

      if (!dataFound) {
        return res
          .status(404)
          .send('Registers not found')
      }

      return res.json({
        message: 'Register deleted successfully'
      })
      
    } catch ({ message }) {
      return res.send('Error deleting user: ' + message)
    }
  }
)

export { router as Delete }
