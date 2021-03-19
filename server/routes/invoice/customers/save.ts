import { Request, Response, Router } from 'express'
import Customer from '../../../schemas/Customers'
const router = Router()

router.post(
  '/',
  async (req: Request, res: Response): Promise<Response> => {
    const {
      firstName,
      dni,
      address,
      contact,
      customerType
    } = req.body

    if (contact.length < 10 || contact.length > 11) {
      return res
        .status(400)
        .send('Phone number is not valid!')
    }

    if (customerType === 'provider') {
      if (
        firstName.length > 20 ||
        dni.length > 12 ||
        address.length > 255 ||
        contact.length > 11
      ) {
        return res.status(400).send('You do not break the limit of characters')
      }
      req.body.firstName = firstName
      req.body.socialReason = firstName
    }

    if (contact.length === 11) {
      req.body.contact = contact.slice(1)
    }

    const dataFound = await Customer.findOne({ dni: req.body.dni })
    if (dataFound) {
      return res.status(400).send(`Customer already registered`)
    }

    const newCustomer = new Customer(req.body)
    await newCustomer.save()

    return res.status(201).json({
      message: `Registered Successfully`
    })
  }
)

export { router as save }

