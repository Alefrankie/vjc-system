import { ProviderModify } from 'components/modules/shopping/providers/ProvidersModify'
import { ModalAlert } from 'components/Elements/ModalAlert'
import { GetServerSideProps } from 'next'
import { fetchOneCustomerById } from 'services/customers'

type Props = {
  currentCustomer: any
}

function UpdateProviderPage ({ currentCustomer }: Props): React.ReactElement {
  return (
    <>
      {!currentCustomer && (
        <div>
          <ModalAlert
            tittle='Proveedores'
            message='Por Favor, Indique Un Proveedor'
            status='success'
          />
        </div>
      )}
      <ProviderModify currentCustomer={currentCustomer} />
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({
  query: { customerId }
}) => {
  let currentCustomer: any
  try {
    const { customer } = await fetchOneCustomerById({
      customerId: String(customerId),
      customerType: 'provider'
    })
    currentCustomer = customer
  } catch ({ message }) {
    currentCustomer = null
  }
  return {
    props: {
      currentCustomer
    }
  }
}

export default UpdateProviderPage
