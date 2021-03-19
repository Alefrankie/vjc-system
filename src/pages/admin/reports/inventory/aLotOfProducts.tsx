import { NoRegisteredItems } from 'components/Elements/NoRegisteredItems'
import Admin from 'layouts/Admin'
import { GetServerSideProps } from 'next'
import { fetchPreferences } from 'services/preferences'
import { getAllProductsFromApi } from 'services/products'
import { PreferencesT, ProductT } from 'types'
import { useExchangeQuantity } from 'hooks'

type Props = {
  products: ProductT[]
  preferences: PreferencesT
}

function PageComponent ({ products, preferences }: Props) {
  const { exchangeRate, retailRate } = preferences

  if (products.length < 1) {
    return (
      <>
        <NoRegisteredItems message='No existen productos registrados' />
      </>
    )
  }

  return (
    <>
      <div className='flex flex-col border rounded print:border-none p-5 print:p-0'>
        <div className='overflow-y-auto sm:-mx-6 lg:-mx-8 print:overflow-hidden'>
          <div className='align-middle min-w-full sm:px-6 lg:px-8'>
            <div className='overflow-y-auto sm:rounded-lg print:border-none'>
              <table
                className='min-w-full'
                style={{ fontSize: '0.71rem', lineHeight: '0rem' }}
              >
                <thead className='bg-gray-50'>
                  <tr className='bg-gray-100 font-medium text-left text-gray-500 uppercase'>
                    <th scope='col' className='px-2 py-3 tracking-wider'>
                      #
                    </th>

                    <th scope='col' className='py-3 tracking-wider'>
                      Código
                    </th>
                    <th scope='col' className='py-3 tracking-wider'>
                      Descripción
                    </th>
                    <th scope='col' className='py-3 tracking-wider'>
                      Cantidad
                    </th>
                    <th scope='col' className='py-3 tracking-wider'>
                      Precio Al Mayor
                    </th>
                    <th scope='col' className='py-3 tracking-wider'>
                      Precio Al Detal
                    </th>
                  </tr>
                </thead>

                {products.length > 0 && (
                  <tbody>
                    {products.map((e: ProductT, index: number) => (
                      <tr key={index} className=''>
                        <td className='py-2 whitespace-nowrap text-center'>
                          {index + 1}
                        </td>

                        <td className='py-2 whitespace-nowrap'>
                          {e.productCode}
                        </td>

                        <td className='py-2 whitespace-nowrap'>
                          {e.productName}
                        </td>
                        <td className='py-2 whitespace-nowrap'>
                          {e.quantity ? `${e.quantity} ${e.unit}` : 'Agotado'}
                        </td>
                        <td className='py-2 whitespace-nowrap'>
                          {e.unitaryPrice === 0
                            ? 'N/A'
                            : `${useExchangeQuantity(
                                e.unitaryPrice,
                                exchangeRate
                              )} Bs.S / ${useExchangeQuantity(
                                e.unitaryPrice
                              )} $`}
                        </td>

                        <td className='py-2 whitespace-nowrap'>
                          {e.retailPrice === 0
                            ? 'N/A'
                            : `${useExchangeQuantity(
                                e.retailPrice,
                                retailRate
                              )} Bs.S / ${useExchangeQuantity(
                                e.retailPrice
                              )} $`}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                )}

                {products.length <= 0 && (
                  <tbody>
                    <tr>
                      <td colSpan={7}>
                        <NoRegisteredItems message='No se encontraron registros' />
                      </td>
                    </tr>
                  </tbody>
                )}
              </table>
            </div>
          </div>
        </div>
        <button
          className='print:hidden focus:outline-none bg-green-500 text-white rounded px-3 py-2 font-semibold hover:bg-yellow-500 transform duration-300'
          onClick={() => window.print()}
          style={{
            position: 'fixed',
            top: '4rem',
            right: '1rem'
          }}
        >
          Imprimir
        </button>
      </div>
    </>
  )
}

PageComponent.layout = Admin

export const getServerSideProps: GetServerSideProps = async () => {
  const { preferences } = await fetchPreferences()
  const { products } = await getAllProductsFromApi()
  return { props: { products, preferences } }
}

export default PageComponent
