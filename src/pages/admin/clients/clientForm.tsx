import { ClientForm } from 'components/modules/invoices/Clients/ClientForm'
import { ModalAlert } from 'components/Elements/ModalAlert/index'
import { useResponse } from 'hooks/useResponse'
import Admin from 'layouts/Admin'

function PageComponent () {
  const { response, setResponse } = useResponse()
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
      <ClientForm />
    </>
  )
}

PageComponent.layout = Admin

export default PageComponent
