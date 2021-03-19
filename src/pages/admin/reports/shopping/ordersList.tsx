import { OrdersListTable } from 'components/modules/shopping/ordersList/OrdersListTable'
import { useUser } from 'context'
import { Loading } from 'components/Elements/Loading'
import { ValidateSession } from 'components/Elements/ValidateSession'

function PageComponent () {
  const { user, isLoading } = useUser()

  if (!user) {
    return <ValidateSession />
  }

  if (isLoading) {
    return <Loading />
  }

  return (
    <>
      <OrdersListTable invoiceType='allOrders' />
    </>
  )
}

export default PageComponent
