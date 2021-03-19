import { Request, Response, Router } from 'express'
import { Query } from 'mongoose'
import Invoice, { IInvoice } from '../schemas/Invoice'
import Product, { IProduct } from '../schemas/Product'
const router = Router()

router.get(
  '/',
  async (_req: Request, res: Response): Promise<Response> => {
    const products = await findingProductsNumber()
    const retailInvoices = await findingInvoicesNumber('DeliveryNote:Retail')
    const wholesaleInvoices = await findingInvoicesNumber(
      'DeliveryNote:Wholesale'
    )

    return res.status(200).json({
      products,
      allInvoices: Number(retailInvoices) + Number(wholesaleInvoices),
      retailInvoices,
      wholesaleInvoices
    })
  }
)

const findingInvoicesNumber = async (invoiceType: string): Promise<Number> => {
  const responsePromisesSales: Query<Array<IInvoice>, IInvoice>[] = []

  const responsePromise = Invoice.find({
    invoiceType
  })

  responsePromisesSales.push(responsePromise)
  const [invoicesFound] = await Promise.all(responsePromisesSales)

  const invoicesNumber = invoicesFound.length

  return invoicesNumber
}

const findingProductsNumber = async (): Promise<Number> => {
  const responsePromisesSales: Query<Array<IProduct>, IProduct>[] = []

  const responsePromise = Product.find()

  responsePromisesSales.push(responsePromise)
  const [products] = await Promise.all(responsePromisesSales)

  const productsNumber = products.length

  return productsNumber
}

export default router
