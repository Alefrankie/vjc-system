import { Request, Response, Router } from 'express'
import Customer from '../../../schemas/Customers'
const handler = Router()

handler.put(
  '/',
  async (req: Request, res: Response): Promise<Response> => {
    try {
      const { currentCustomer } = req.body
      const { customerId, customerType } = currentCustomer

      if (!customerId || !customerType) {
        return res
          .status(400)
          .send('Datos insuficientes para realizar la solicitud.')
      }

      if (currentCustomer.contact.length < 10) {
        return res.status(400).send('Phone number is not valid!')
      }

      if (customerType === 'client') {
        if (
          currentCustomer.firstName.length > 20 ||
          currentCustomer.dni.length > 12 ||
          currentCustomer.address.length > 255 ||
          currentCustomer.contact.length > 11
        ) {
          return res
            .status(400)
            .send('You do not break the limit of characters')
        }
      }

      if (customerType === 'provider') {
        if (
          currentCustomer.name.length > 20 ||
          currentCustomer.dni.length > 12 ||
          currentCustomer.address.length > 255 ||
          currentCustomer.contact.length > 11
        ) {
          return res
            .status(400)
            .send('You do not break the limit of characters')
        }
        req.body.fullName = `${currentCustomer.name}`
        req.body.socialReason = `${currentCustomer.name}`
      }

      if (currentCustomer.contact.length === 11) {
        req.body.currentCustomer.contact = currentCustomer.contact.slice(1)
      }

      await Customer.updateOne(
        { customerId: customerId },
        req.body.currentCustomer
      )

      return res.status(201).send(`Customer Updated Successfully`)
    } catch ({ message }) {
      return res.status(400).send(message)
    }
  }
)

export default handler
