import { ModalAlert } from 'components/Elements/ModalAlert'
import { OneInvoiceReport } from 'components/modules/invoices/OneInvoiceReport'
import Admin from 'layouts/Admin'
import { GetServerSideProps } from 'next'
import { fetchOneInvoice } from 'services/invoice'
import { fetchPreferences } from 'services/preferences'
import { InvoiceT, PreferencesT, ProductT } from 'types'

type Props = {
  error: string
  invoice: InvoiceT
  lote: ProductT[]
  preferences: PreferencesT
}
function PageComponent ({ error, invoice, lote, preferences }: Props) {
  if (error) {
    return <ModalAlert tittle='Facturas' message={error} status='failed' />
  }

  return (
    <OneInvoiceReport invoice={invoice} lote={lote} preferences={preferences} />
  )
}

export const getServerSideProps: GetServerSideProps = async ({
  query: { invoiceId }
}) => {
  try {
    const { preferences } = await fetchPreferences()
    const { invoice, lote } = await fetchOneInvoice({
      invoiceId: String(invoiceId)
    })
    return {
      props: {
        invoice,
        lote,
        preferences
      }
    }
  } catch ({ message }) {
    console.error(message)
    return {
      props: { error: message }
    }
  }
}

PageComponent.layout = Admin

export default PageComponent
