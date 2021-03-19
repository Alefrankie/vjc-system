import { Request, Response, Router } from 'express'
import { useGetDate } from '../../src/hooks'
import Invoice from '../schemas/Invoice'
import Lote from '../schemas/Lote'
const router = Router()

router.get(
  '/',
  async (_req: Request, res: Response): Promise<Response> => {
    // InvoiceType: Sale:Retail
    // InvoiceType: Sale:Wholesale
    // InvoiceType: Sale:All
    // InvoiceType: Sale:Today

    const { invoicesFound, itemsFound } = await findingItemsAtLotes(
      'DeliveryNote:All',
      'DeliveryNote'
    )
    return res.status(200).json({ invoices: invoicesFound, lotes: itemsFound })
  }
)

const findingSales = async (
  invoiceType: string,
  searchTo: string
): Promise<any> => {
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
    }).sort({ controlNumber: -1 })
  }

  if (invoiceType.includes('All')) {
    responsePromise = Invoice.find({
      $or: [
        { invoiceType: `${searchTo}:Retail` },
        { invoiceType: `${searchTo}:Wholesale` }
      ]
    }).sort({ controlNumber: -1 })
  }

  if (invoiceType.includes('Retail') || invoiceType.includes('Wholesale')) {
    responsePromise = Invoice.find({
      invoiceType
    }).sort({ controlNumber: -1 })
  }

  responsePromisesSales.push(responsePromise)
  const [invoicesFound] = await Promise.all(responsePromisesSales)

  return invoicesFound
}

const findingItemsAtLotes = async (
  invoiceType: string,
  searchTo: string
): Promise<any> => {
  // InvoiceType: Sale:Retail
  // InvoiceType: Sale:Wholesale
  // InvoiceType: Sale:All
  // InvoiceType: Sale:Today
  let itemsFound: any = []
  const invoicesFound = await findingSales(invoiceType, searchTo)

  const responsePromisesLotes: any[] = []
  const responsePromise = Lote.find()
  responsePromisesLotes.push(responsePromise)
  const [lotesFromDataBase] = await Promise.all(responsePromisesLotes)

  lotesFromDataBase.map(({ items }: { items: string }) => {
    return itemsFound.push(JSON.parse(items))
  })
  //   await invoicesFound.map((elementSale: any) => {
  //     elementSale._doc = {
  //       ...elementSale._doc,
  //       subTotal: 0
  //     }
  //     console.log('\n\n\n\n\n\n\n', itemsFound)
  //     itemsFound.map((elementLote: any) => {
  //       // console.log('\n\n\n\n\n\n\n', elementLote)
  //       const {
  //         productPrice,
  //         quantityRequested,
  //         productDiscount,
  //         invoiceId
  //       } = elementLote

  //       return (
  //         elementSale._doc.invoiceId === invoiceId &&
  //         (elementSale._doc.subTotal +=
  //           productPrice * quantityRequested -
  //           productPrice * quantityRequested * productDiscount)
  //       )
  //     })
  //   })

  return { invoicesFound, itemsFound }
}

export default router
