import { OrderForm } from 'components/modules/shopping/orderForm'
import { GetServerSideProps } from 'next'
import { fetchPreferences } from 'services/preferences'
import { PreferencesT } from 'types'

type Props = {
  customerId: string
  preferences: PreferencesT
}

function OrderPage ({ customerId, preferences }: Props) {
  return (
    <>
      <OrderForm
        module='Shopping'
        customerId={customerId}
        customerType='provider'
        preferences={preferences}
      />
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({
  query: { customerId }
}) => {
  const { preferences } = await fetchPreferences()
  return {
    props: {
      customerId: customerId !== undefined ? customerId : null,
      preferences
    }
  }
}

export default OrderPage
