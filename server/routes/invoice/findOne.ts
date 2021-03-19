import { Request, Response, Router } from 'express'
import Invoice from '../../schemas/Invoice'
import Lote from '../../schemas/Lote'
const router = Router()

router.post(
  '/',
  async (req: Request, res: Response): Promise<Response> => {
    const { invoiceId } = req.body

    if (!invoiceId) {
      return res.status(200).json({
        error: "You don't must let void fields"
      })
    }

    const invoiceFound = await Invoice.findOne({ invoiceId })
    if (!invoiceFound) {
      return res.status(200).json({ error: 'Invoice not found!' })
    }

    const { items } = await Lote.findOne({
      loteId: invoiceId
    })

    invoiceFound._doc.subTotal = 0

    await JSON.parse(items).filter((elementLote: any) => {
      const { productPrice, quantityRequested, productDiscount } = elementLote

      return (invoiceFound._doc.subTotal +=
        productPrice * quantityRequested -
        productPrice * quantityRequested * productDiscount)
    })

    return res
      .status(200)
      .json({ invoice: invoiceFound, lote: JSON.parse(items) })
  }
)

export default router
