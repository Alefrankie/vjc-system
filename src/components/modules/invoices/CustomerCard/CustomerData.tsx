import { useInvoice } from 'context'
import { useEffect, useCallback } from 'react'
import { fetchOneCustomerById } from 'services/customers'

type Props = {
  customerId: string
  customerType: string
  setResponse: any
}

export function CustomerData ({
  customerId = '',
  customerType,
  setResponse
}: Props): React.ReactElement {
  const { setState, oneCustomer } = useInvoice()

  const getCustomer = useCallback(async (): Promise<any> => {
    try {
      const { customer } = await fetchOneCustomerById({
        customerId,
        customerType
      })
      setState({ oneCustomer: customer })
    } catch (err) {
      setResponse({ text: 'Cliente no encontrado', status: 'failed' })
    }
  }, [customerId, customerType, setResponse, setState])

  useEffect(() => {
    if (customerId) {
      getCustomer()
    }
  }, [customerId, getCustomer])

  return (
    <div className='customer-data'>
      <label>
        {customerType === 'client' ? 'Cliente: ' : 'Proveedor: '}
        {oneCustomer?.fullName}
      </label>

      {customerType === 'client' && (
        <label>Razón Social: {oneCustomer?.socialReason}</label>
      )}

      <label>
        Contacto: {oneCustomer?.contact && `+58 ${oneCustomer?.contact}`}
      </label>
      <label>Dirección: {oneCustomer?.address}</label>

      <label>C.I/RIF: {oneCustomer?.dni}</label>
    </div>
  )
}

// const MemoizedCustomerData = memo(CustomerData)
// export { MemoizedCustomerData as CustomerData }
