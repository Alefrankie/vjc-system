import { ProviderForm } from 'components/modules/shopping/providers/ProviderForm'
import { ProvidersList } from 'components/modules/shopping/providers/ProvidersList'
import { fetchAllCustomers } from 'services/customers'
import { ModalAlert } from 'components/Elements/ModalAlert'
import { useResponse } from 'hooks/useResponse'
import { useState } from 'react'
import { CustomerT } from 'types'
import { GetServerSideProps } from 'next'

type Props = {
  customers: CustomerT[]
}
function ProviderPage ({ customers }: Props) {
  const { response, setResponse } = useResponse()
  const [currentCustomers, setCurrentCustomers] = useState(customers)
  return (
    <>
      {response && (
        <ModalAlert
          message={response.text}
          tittle='Facturas'
          status={response.status}
          setResponse={setResponse}
        />
      )}
      <ProviderForm />
      <br />
      <ProvidersList
        customers={currentCustomers}
        setCustomers={setCurrentCustomers}
        setResponse={setResponse}
      />
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (): Promise<any> => {
  try {
    const { customers } = await fetchAllCustomers({
      customerType: 'provider'
    })
    return { props: { customers } }
  } catch ({ message }) {
    return { props: { customers: [] } }
  }
}
export default ProviderPage
