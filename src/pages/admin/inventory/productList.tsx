import { ProductListTable } from 'components/modules/inventory/ProductListTable'
import { ModalAlert } from 'components/Elements/ModalAlert'
import { OnKeySearchLocal } from 'components/Elements/OnKeySearchLocal'
import { useResponse } from 'hooks/useResponse'
import Admin from 'layouts/Admin'
import { GetServerSideProps } from 'next'
import { useState } from 'react'
import { fetchPreferences } from 'services/preferences'
import { deleteProductToApi, getAllProductsFromApi } from 'services/products'
import { PreferencesT, ProductT } from 'types'

type Props = {
  setState: any
  products: ProductT[]
  preferences: PreferencesT
}
function PageIndex ({ products, preferences }: Props): React.ReactElement {
  const [currentProducts, setCurrentProducts] = useState(products)
  const { response, setResponse } = useResponse()

  const deleteProduct = async (productId: string) => {
    const { error, message } = await deleteProductToApi({ keyword: productId })
    if (error) {
      setResponse({ text: error, status: 'failed' })
      return
    }
    setResponse({ text: message, status: 'success' })
    setCurrentProducts(
      currentProducts.filter(
        (e: { productId: string }) => e.productId !== productId
      )
    )
  }

  return (
    <div className='container mx-auto shadow-inner'>
      <div className='my-3 px-3'>
        <OnKeySearchLocal
          setState={setCurrentProducts}
          array={currentProducts}
          where='products'
        />
      </div>

      <ProductListTable
        deleteProduct={deleteProduct}
        preferences={preferences}
        products={currentProducts}
      />

      {response && (
        <div>
          <ModalAlert
            tittle='Productos'
            message={response.text}
            status={response.status}
          />
        </div>
      )}
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const { preferences } = await fetchPreferences()
  const { products } = await getAllProductsFromApi()
  return { props: { products, preferences } }
}

PageIndex.layout = Admin

export default PageIndex
