import { InvoiceHeader } from 'components/Headers/InvoiceHeader'
import { Cart } from 'components/modules/invoices/Cart'
import { ConfirmationPane } from 'components/modules/invoices/ConfirmationPane'
import { ProductsList } from 'components/modules/invoices/ProductList'
import Admin from 'layouts/Admin'
import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { fetchPreferences } from 'services/preferences'
import { getAllProductsFromApi } from 'services/products'
import { PreferencesT, ProductT } from 'types'
import { useEffect } from 'react'
import { useInvoice } from 'context'

type Props = {
  invoiceType: string
  customerId: string
  preferences: PreferencesT
  products: ProductT[]
}

function PageComponent({
  invoiceType,
  customerId,
  preferences,
  products
}: Props): React.ReactElement {
  const { setState } = useInvoice()
  useEffect(() => {
    return () => {
      setState({
        cart: [],
        oneCustomer: null,
        invoice: {}
      })
    }
  }, [invoiceType])
  return (
    <>
      <InvoiceHeader customerType='client' customerId={customerId} />
      {/* Page content */}
      <div className='my-5 px-5'>
        <Head>
          {invoiceType.includes('Sales') && <title>VJC Import | Factura Fiscal</title>}
          {invoiceType.includes('DeliveryNote') && <title>VJC Import | Nota de Entrega</title>}
          {invoiceType.includes('Budget') && <title>VJC Import | Presupuesto</title>}
        </Head>

        <ProductsList
          invoiceType={invoiceType}
          preferences={preferences}
          products={products}
        />

        <Cart invoiceType={invoiceType} />

        <ConfirmationPane invoiceType={invoiceType} preferences={preferences} />
      </div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({
  query: { customerId, invoiceType }
}) => {
  const { preferences } = await fetchPreferences()
  const { products } = await getAllProductsFromApi()
  return {
    props: {
      invoiceType,
      customerId: customerId || null,
      preferences,
      products
    }
  }
}

PageComponent.layout = Admin

export default PageComponent
