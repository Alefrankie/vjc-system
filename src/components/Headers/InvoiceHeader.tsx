import { ModalAlert } from 'components/Elements/ModalAlert'
import { FindCustomer } from 'components/modules/invoices/CustomerCard/FindCustomer'
import { useInvoice } from 'context'
import { useResponse } from 'hooks/useResponse'
import Router from 'next/router'
import { useCallback, useEffect } from 'react'
import { fetchOneCustomerById } from 'services/customers'

type Props = {
  customerId: string
  customerType: string
}

function InvoiceHeader({
  customerType,
  customerId
}: Props): React.ReactElement {
  const { response, setResponse } = useResponse()

  const { setState, oneCustomer } = useInvoice()

  const getCustomer = useCallback(async (): Promise<any> => {
    try {
      const { customer } = await fetchOneCustomerById({
        customerId,
        customerType
      })
      setState({ oneCustomer: customer })
    } catch (err) {
      setState({ oneCustomer: {} })
      setResponse({ text: 'Cliente no encontrado', status: 'failed' })
    }
  }, [customerId, customerType, setResponse, setState])

  useEffect(() => {
    if (customerId) {
      getCustomer()
    }
  }, [customerId, getCustomer])

  return (
    <>
      <div className='relative' style={{ minHeight: '20rem' }}>
        <div
          className='absolute h-full w-full bg-cover'
          style={{
            backgroundImage: 'url(/img/theme/profile-cover.jpg)',
            backgroundRepeat: 'no-repeat',
            zIndex: -1
          }}
        >
          <span className='absolute w-full h-full bg-gradient-to-r from-purple-400 via-red-500 to-purle-500 opacity-50' />
        </div>
        {/* Header container */}
        <main className='p-5'>
          <FindCustomer customerType={customerType} />
          <div className='mt-5 text-white'>
            <h1 className='text-3xl'>
              Hola
              {oneCustomer
                ? oneCustomer?.dniType
                  ? oneCustomer?.dniType.includes('V-')
                    ? `, ${oneCustomer?.firstName} ${oneCustomer?.lastName}`
                    : `, ${oneCustomer?.socialReason}`
                  : oneCustomer?.dni.includes('V-')
                    ? `, U-${oneCustomer?.fullName}`
                    : `, U-${oneCustomer?.socialReason}`
                : ''}
            </h1>

            <h1 className='my-3 antialiased'>
              Contacto: {oneCustomer?.contact && `+58 ${oneCustomer?.contact}`}
            </h1>

            <h1 className='my-3'>
              C.I/RIF:{' '}
              {oneCustomer?.dniType
                ? `${oneCustomer?.dniType} ${oneCustomer?.dni}`
                : oneCustomer?.dni}
            </h1>

            <h1 className='my-3'>Dirección: {oneCustomer?.address}</h1>
            {oneCustomer?.customerId && (
              <button
                className='border-2 border-white rounded-full bg-blue-500 px-5 py-2 hover:bg-yellow-500 transition ease-in-out duration-300 focus:outline-none'
                onClick={() =>
                  Router.push(
                    `/admin/clients/updateClient/${oneCustomer.customerId}`
                  )
                }
              >
                Modificar Cliente
              </button>
            )}
          </div>
        </main>
        {response && (
          <ModalAlert
            message={response.text}
            tittle='Facturas'
            status={response.status}
            setResponse={setResponse}
          />
        )}
      </div>
    </>
  )
}

export { InvoiceHeader }
