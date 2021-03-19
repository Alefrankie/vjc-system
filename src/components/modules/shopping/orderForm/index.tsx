import { ConfirmationPane } from 'components/modules/invoices/ConfirmationPane'
import { CustomerCard } from 'components/modules/invoices/CustomerCard'
import { PreferencesT } from 'types'
import { Cart } from './Cart'

type Props = {
  module: string
  customerId: string
  customerType: string
  preferences: PreferencesT
}

export function OrderForm({
  customerId,
  customerType,
  preferences,
  module
}: Props) {
  return (
    <>
      {/* {message && (
        <ModalAlert tittle='Compras' message={message} status='success' />
      )}
      {error && <ModalAlert tittle='Compras' message={error} status='failed' />} */}

      <CustomerCard customerType={customerType} customerId={customerId} />

      <Cart />

      <ConfirmationPane invoiceType={module} preferences={preferences} />
    </>
  )
}
