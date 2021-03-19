import { ClientModify } from 'components/modules/invoices/Clients/ClientModify'
import { ModalAlert } from 'components/Elements/ModalAlert'
import { GetServerSideProps } from 'next'
import { fetchOneCustomerById } from 'services/customers'
import Admin from 'layouts/Admin'

type Props = {
  currentCustomer: any
  error: string
}

function PageComponent ({ currentCustomer, error }: Props): React.ReactElement {
  return (
    <>
      {error && (
        <div>
          <ModalAlert tittle='Clientes' message={error} status='success' />
        </div>
      )}
      <ClientModify currentCustomer={currentCustomer} />
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({
  query: { customerId }
}) => {
  try {
    const { customer } = await fetchOneCustomerById({
      customerId: String(customerId),
      customerType: 'client'
    })
    return {
      props: {
        currentCustomer: customer
      }
    }
  } catch ({ message }) {
    return {
      props: {
        error: message
      }
    }
  }
}

PageComponent.layout = Admin

export default PageComponent
