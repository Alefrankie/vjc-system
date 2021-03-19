import {
  createContext,
  ReactNode,
  useContext,
  useMemo,
  useReducer
} from 'react'
import { CustomerT, InvoiceT, ProductT } from 'types'

type IUseInvoice = {
  available: boolean
  cart: ProductT[] | any
  customers: CustomerT[]
  invoice: InvoiceT
  invoiceType: string
  isLoading: boolean
  lotes: ProductT[]
  oneCustomer: CustomerT
  oneProduct: ProductT
  sales: any
  setState: any
  products: ProductT[]
}

const InvoiceContext = createContext({} as IUseInvoice)

type Props = {
  children: ReactNode
}

export function InvoiceProvider ({ children }: Props): React.ReactElement {
  const [
    {
      available,
      cart,
      customers,
      invoice,
      invoiceType,
      isLoading,
      lotes,
      oneCustomer,
      oneProduct,
      sales,
      products
    },
    setState
  ] = useReducer(Reducer, {
    available: false,
    cart: [],
    customers: [],
    invoice: {},
    invoiceType: 'allSales',
    isLoading: true,
    lotes: [],
    oneCustomer: null,
    oneProduct: null,
    sales: [],
    products: []
  })

  function Reducer (prevState: any, state: any) {
    return { ...prevState, ...state }
  }

  const value = useMemo(() => {
    return {
      available,
      cart,
      customers,
      invoice,
      invoiceType,
      isLoading,
      lotes,
      oneCustomer,
      oneProduct,
      sales,
      setState,
      products
    }
  }, [
    available,
    cart,
    customers,
    invoice,
    invoiceType,
    isLoading,
    lotes,
    oneCustomer,
    oneProduct,
    sales,
    products
  ])

  return (
    <InvoiceContext.Provider value={value}>{children}</InvoiceContext.Provider>
  )
}

export function useInvoice (): IUseInvoice {
  const context = useContext(InvoiceContext)
  if (!context) {
    throw new Error('useInvoice debe estar dentro del Proveedor')
  }
  return context
}
