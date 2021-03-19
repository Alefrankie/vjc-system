import { HeaderAdmin } from 'components/Headers/HeaderAdmin'
import { ProductForm } from 'components/modules/inventory/ProductForm'
import { ModalAlert } from 'components/Elements/ModalAlert'
import { useUser } from 'context'
import Admin from 'layouts/Admin'
import { GetServerSideProps } from 'next'
import { fetchPreferences } from 'services/preferences'
import { addProduct as createProduct } from 'services/products'
import { PreferencesT } from 'types'

type Props = {
  preferences: PreferencesT
}

function PageComponent ({ preferences }: Props): React.ReactElement {
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

  return (
    <>
      <HeaderAdmin />
      <ProductForm onSendProduct={createProduct} preferences={preferences} />
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const { preferences } = await fetchPreferences()
  return { props: { preferences } }
}

PageComponent.layout = Admin

export default PageComponent
