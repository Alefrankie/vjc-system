import { ClientsList } from 'components/modules/invoices/Clients/ClientsList'
import { ModalAlert } from 'components/Elements/ModalAlert/index'
import { useResponse } from 'hooks/useResponse'
import { GetServerSideProps } from 'next'
import { useState } from 'react'
import { fetchAllCustomers } from 'services/customers'
import { CustomerT } from 'types'
import Admin from 'layouts/Admin'
import { OnKeySearchLocal } from 'components/Elements/OnKeySearchLocal'

type Props = {
  customers: CustomerT[]
}

function PageComponent ({ customers }: Props): React.ReactElement {
  const { response, setResponse } = useResponse()
  const [currentCustomers, setCurrentCustomers] = useState(customers)
  return (
    <div className='px-5 shadow-inner'>
      {response && (
        <ModalAlert
          message={response.text}
          tittle='Facturas'
          status={response.status}
          setResponse={setResponse}
        />
      )}
      <OnKeySearchLocal
        setState={setCurrentCustomers}
        array={currentCustomers}
        where='customers'
      />

      <ClientsList
        customers={currentCustomers}
        setCustomers={setCurrentCustomers}
        setResponse={setResponse}
      />
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (): Promise<any> => {
  try {
    const { customers } = await fetchAllCustomers({
      customerType: 'client'
    })
    return { props: { customers } }
  } catch ({ message }) {
    console.log({ message })
    return { props: { customers: [] } }
  }
}

PageComponent.layout = Admin

export default PageComponent
