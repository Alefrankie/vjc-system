import { Request, Response, Router } from 'express'
import Invoice from '../../schemas/Invoice'
import Lote from '../../schemas/Lote'
import Product from '../../schemas/Product'
const router = Router()

type ProductT = {
  invoiceDate: string
  invoiceType: string
  loteId: string
  productCode: string
  productDiscount: number
  productId: string
  productName: string
  productPrice: number
  quantity: number
  quantityRequested: number
  retailPrice: number
  saleId: string
  unit: string
  unitaryPrice: number
  total: number
}

router.post(
  '/',
  async (req: Request, res: Response): Promise<Response> => {
    const { invoiceId, newStatus } = req.body

    if (!invoiceId) {
      return res.status(400).send("You don't must let void fields")
    }

    const invoiceFound = await Invoice.findOne({
      invoiceId
    })

    if (!invoiceFound) {
      return res.status(404).send('Invoice not found!')
    }

    await Invoice.updateOne({ invoiceId }, { status: newStatus })

    const { items } = await Lote.findOne({ loteId: invoiceId })

    JSON.parse(items).forEach(async (e: ProductT) => {
      const productFound = await Product.findOne({
        productId: e.productId
      })

      if (!newStatus) {
        await Product.updateOne(
          { productId: productFound.productId },
          {
            quantity:
              Number(productFound.quantity) + Number(e.quantityRequested)
          }
        )
      }

      if (newStatus) {
        await Product.updateOne(
          { productId: productFound.productId },
          {
            quantity:
              Number(productFound.quantity) - Number(e.quantityRequested)
          }
        )
      }
    })

    return res.status(200).json({ message: 'Operation successfully' })
  }
)

export default router
