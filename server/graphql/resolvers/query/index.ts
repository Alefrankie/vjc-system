import { findAllInvoices } from './invoices'
import { IResolvers } from 'graphql-tools'

async function getAllProduct (_parent: any, _data: Object, { Product }: any) {
  const responsePromises = []
  const responsePromise = Product.find().sort({ productName: 1 })
  responsePromises.push(responsePromise)

  const [products] = await Promise.all(responsePromises)
  return products
}

export const Query: IResolvers = {
  getAllProduct,
  findAllInvoices
}
