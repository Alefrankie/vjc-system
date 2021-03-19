import { Request, Response, Router } from 'express'
import { ProductT } from 'types'
import { findControlNumber } from './findControlNumber'
import Invoice from '../../schemas/Invoice'
import Product from '../../schemas/Product'
import Lote from '../../schemas/Lote'

const router = Router()
router.post(
  '/',
  async (req: Request, res: Response): Promise<Response> => {
    try {
      const { cart, invoice } = req.body

      if (!cart || !invoice) {
        return res.status(400).send("You don't must let void fields")
      }

      const invoiceFound = await Invoice.findOne({
        invoiceId: invoice.invoiceId
      })

      if (invoiceFound) {
        return res.status(400).send('Invoice already exists!')
      }

      // SAVING INVOICE AT DATABASE
      invoice.controlNumber = await findControlNumber({
        invoiceType: invoice.invoiceType
      })
      console.log(req.body)
      const newInvoice = new Invoice(invoice)
      await newInvoice.save()

      cart.forEach((item: any) => {
        item.invoiceId = invoice.invoiceId
      })

      const newLote = new Lote({
        loteId: invoice.invoiceId,
        items: JSON.stringify(cart)
      })
      await newLote.save()

      cart.forEach(async (e: ProductT) => {
        const productFound = await Product.findOne({
          productId: e.productId
        })
        await Product.updateOne(
          { productId: productFound.productId },
          { quantity: productFound.quantity - e.quantityRequested }
        )
      })

      return res.status(201).send('Invoice Saved Successfully.')
    } catch ({ message }) {
      console.log(message)
      return res.status(400).send(message)
    }
  }
)

export default router
