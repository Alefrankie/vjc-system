export type UserT = {
  dni: string
  lastName: string
  name: string
  password: string
  privileges: string
  userId: string
  username: string
}

export type InvoiceT = {
  address: string
  budgetDate: string
  budgetId: string
  contact: string
  controlNumber: string
  deliveryNoteDate: string
  deliveryNoteId: string
  dni: string
  exchangeRate: number
  fullName: string
  invoiceDate: string
  invoiceId: string
  invoiceType: string
  payCondition: string
  saleId: string
  saleType: string
  shoppingId: string
  socialReason: string
  status: boolean
  subTotal: number
}

export type ProductT = {
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

export type PreferencesT = {
  exchangeRate: number
  preferenceId: string
  retailRate: number
  ivaRate: number
  typeUnit: number
  limitLts: number
  limitUnits: number
  limitKgs: number
  limitGr: number
}

export type CustomerT = {
  address: string
  contact: string
  customerId: string
  customerType: string
  dniType: string
  dni: string
  firstName: string
  lastName: string
  fullName: string
  socialReason: string
}
