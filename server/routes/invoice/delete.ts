import { Request, Response, Router } from 'express'
import Invoice from '../../schemas/Invoice'
import Lote from '../../schemas/Lote'
const router = Router()

router.delete(
  '/',
  async (req: Request, res: Response): Promise<Response> => {
    try {
      console.log(req.query)
      const { invoiceId } = req.query

      if (!invoiceId) {
        return res.status(400).send('You must indicate an InvoiceId.')
      }

      const invoiceFound = await Invoice.findOne({ invoiceId })
      if (!invoiceFound) {
        return res.status(200).send('Invoice not found!')
      }

      await Invoice.deleteOne({ invoiceId })

      await Lote.deleteOne({ loteId: invoiceId })

      return res.status(200).send(`Invoice deleted successfully`)
    } catch ({ message }) {
      return res.status(400).send(message)
    }
  }
)

export default router
