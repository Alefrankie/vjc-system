import { ModalAlert } from 'components/Elements/ModalAlert'
import { HeaderAdmin } from 'components/Headers/HeaderAdmin'
import { ProductForm } from 'components/modules/inventory/ProductForm'
import { useUser } from 'context'
import Admin from 'layouts/Admin'
import { GetServerSideProps } from 'next'
import { fetchPreferences } from 'services/preferences'
import { getOneProductFromApi, updateProductFromApi } from 'services/products'
import { PreferencesT, ProductT } from 'types'

type Props = {
  currentProduct: ProductT
  preferences: PreferencesT
  error: string
}

function PageComponent({
  preferences,
  currentProduct,
  error
}: Props): React.ReactElement {
  const { user } = useUser()
  if (user?.privileges === 'User') {
    return (
      <ModalAlert
        tittle='Preferencias'
        redirect='/admin/dashboard'
        message={
          'Usted no posee los privilegios necesarios para ingresar a éste módulo.'
        }
        status='failed'
      />
    )
  }

  if (error) {
    return <ModalAlert tittle='Productos' message={error} status='failed' />
  }
  return (
    <>
      <HeaderAdmin />
      <ProductForm
        currentProduct={currentProduct}
        onSendProduct={updateProductFromApi}
        preferences={preferences}
      />
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({
  query: { productId }
}) => {
  try {
    const { product } = await getOneProductFromApi({
      keyword: String(productId)
    })
    const { preferences } = await fetchPreferences()
    return {
      props: {
        currentProduct: product,
        preferences
      }
    }
  } catch ({ message }) {
    return {
      props: { error: message }
    }
  }
}
PageComponent.layout = Admin

export default PageComponent
