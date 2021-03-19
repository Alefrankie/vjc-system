import { Request, Response, Router } from 'express'
import { useGetDate } from '../../../src/hooks'
import Invoice from '../../schemas/Invoice'
import Lote from '../../schemas/Lote'
const router = Router()

router.post(
  '/',
  async (req: Request, res: Response): Promise<Response> => {
    const { invoiceType, searchTo, currentPage } = req.body
    console.log(req.body)
    // InvoiceType: Sale:Retail
    // InvoiceType: Sale:Wholesale
    // InvoiceType: Sale:All
    // InvoiceType: Sale:Today

    if (!invoiceType) {
      return res.status(403).send("You don't must let void fields!")
    }

    const { invoicesFound, itemsFound } = await findingSales(
      invoiceType,
      searchTo,
      currentPage
    )

    return res.status(200).json({ invoices: invoicesFound, lotes: itemsFound })
  }
)

const findingSales = async (
  invoiceType: string,
  searchTo: string,
  currentPage: number = 1
): Promise<any> => {
  const perPage = 50
  // InvoiceType: Sale:Retail
  // InvoiceType: Sale:Wholesale
  // InvoiceType: Sale:All

  const responsePromisesSales: any[] = []
  let responsePromise: any

  if (invoiceType.includes('Today')) {
    responsePromise = Invoice.find({
      $or: [
        { invoiceType: `${searchTo}:Retail` },
        { invoiceType: `${searchTo}:Wholesale` }
      ],
      invoiceDate: useGetDate()
    })
      .skip(perPage * currentPage - perPage)
      .limit(perPage)
      .sort({ controlNumber: -1 })
  }

  if (invoiceType.includes('All')) {
    responsePromise = Invoice.find({
      $or: [
        { invoiceType: `${searchTo}:Retail` },
        { invoiceType: `${searchTo}:Wholesale` }
      ]
    })
      .skip(perPage * currentPage - perPage)
      .limit(perPage)
      .sort({ controlNumber: -1 })
  }

  if (invoiceType.includes('Retail') || invoiceType.includes('Wholesale')) {
    responsePromise = Invoice.find({
      invoiceType
    })
      .skip(perPage * currentPage - perPage)
      .limit(perPage)
      .sort({ controlNumber: -1 })
  }

  responsePromisesSales.push(responsePromise)
  const [invoicesFound] = await Promise.all(responsePromisesSales)
  const { itemsFound } = await findingItemsAtLotes(invoicesFound)

  return { invoicesFound, itemsFound }
}

const findingItemsAtLotes = async (invoicesFound: any[]): Promise<any> => {
  // InvoiceType: Sale:Retail
  // InvoiceType: Sale:Wholesale
  // InvoiceType: Sale:All
  // InvoiceType: Sale:Today

  let itemsFound: any = []

  const responsePromisesLotes: any[] = []
  invoicesFound.map((e: any) => {
    let responsePromise = Lote.findOne({ loteId: e.invoiceId })
    responsePromisesLotes.push(responsePromise)
  })

  const lotesFromDataBase = await Promise.all(responsePromisesLotes)

  lotesFromDataBase.map((element: any) => {
    const { items } = element
    JSON.parse(items).map((e: any) => itemsFound.push(e))
  })

  invoicesFound.forEach((elementSale: any) => {
    elementSale._doc.subTotal = 0
    itemsFound.map((elementLote: any) => {
      // console.log('\n\n\n\n\n\n\nElement LOTE', elementLote)
      const {
        productPrice,
        quantityRequested,
        productDiscount,
        invoiceId
      } = elementLote

      if (elementSale._doc.invoiceId === invoiceId) {
        elementSale._doc.subTotal +=
          productPrice * quantityRequested -
          productPrice * quantityRequested * productDiscount
      }
    })
  })

  return { itemsFound }
}

export default router
