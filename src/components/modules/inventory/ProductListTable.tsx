import { faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { NoRegisteredItems } from 'components/Elements/NoRegisteredItems'
import { useUser } from 'context'
import Router from 'next/router'
import { PreferencesT, ProductT } from 'types'
import { useExchangeQuantity } from 'hooks'

type Props = {
  deleteProduct: any
  preferences: PreferencesT
  products: ProductT[]
}
export function ProductListTable({
  deleteProduct,
  preferences: { exchangeRate, retailRate },
  products
}: Props): React.ReactElement {
  const { user } = useUser()

  return (
    <>
      <div className='mt-5 px-3 w-full'>
        <p className='border w-full rounded-t border-b-0 p-2 text-gray-400 font-semibold'>
          Productos en Inventario
        </p>
        <div className='flex flex-col border rounded relative'>
          <div className='-my-2 overflow-x-auto overflow-y-auto sm:-mx-6 lg:-mx-8'>
            <div className='py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8'>
              <div
                className='shadow overflow-y-auto border-b border-gray-200 sm:rounded-lg'
                style={{ maxHeight: '60vh' }}
              >
                <table className='min-w-full divide-y divide-gray-200'>
                  <thead className='bg-gray-50'>
                    <tr className='bg-gray-100'>
                      <th
                        scope='col'
                        className='py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider'
                      >
                        #
                      </th>

                      <th
                        scope='col'
                        className='py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                      >
                        Descripción
                      </th>

                      <th
                        scope='col'
                        className='py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                      >
                        Cantidad
                      </th>

                      <th
                        scope='col'
                        className='px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                      >
                        Precio Al Mayor
                      </th>

                      <th
                        scope='col'
                        className='px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                      >
                        Precio Al Detal
                      </th>

                      <th
                        scope='col'
                        className='px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                        hidden={user?.privileges === 'User'}
                      ></th>
                    </tr>
                  </thead>

                  {products.length > 0 && (
                    <tbody>
                      {products.map((e: ProductT, index: number) => (
                        <tr
                          key={index}
                          className='text-xs uppercase hover:bg-gray-300 hover:text-blue-500 hover:font-semibold hover:scale-110 cursor-pointer'
                        >
                          <td className='py-2 whitespace-nowrap text-center'>
                            {e.productCode}
                          </td>

                          <td className='py-2 whitespace-nowrap'>
                            {e.productName}
                          </td>

                          <td className='py-2 whitespace-nowrap'>
                            {e.quantity > 0
                              ? `${e.quantity} ${e.unit}`
                              : 'Agotado'}
                          </td>
                          <td className='py-2 whitespace-nowrap'>
                            {e.unitaryPrice === 0
                              ? 'No Disponible'
                              : `${useExchangeQuantity(
                                e.unitaryPrice,
                                exchangeRate
                              )} Bs.S / ${useExchangeQuantity(
                                e.unitaryPrice
                              )} $`}
                          </td>
                          <td className='py-2 whitespace-nowrap'>
                            {e.retailPrice === 0
                              ? 'No Disponible'
                              : `${useExchangeQuantity(
                                e.retailPrice,
                                retailRate
                              )} Bs.S / ${useExchangeQuantity(
                                e.retailPrice
                              )} $`}
                          </td>

                          <td
                            className='whitespace-nowrap text-center text-sm font-medium flex'
                            hidden={user?.privileges === 'User'}
                          >
                            <button
                              className='px-4 py-2 focus:outline-none | text-blue-500 text-lg cursor-pointer'
                              role='menuitem'
                              onClick={() =>
                                Router.push(
                                  `/admin/inventory/updateProduct/${e.productId}`
                                )
                              }
                            >
                              <FontAwesomeIcon
                                icon={faPencilAlt}
                              />
                            </button>

                            <button
                              className='px-4 py-2 focus:outline-none | text-red-500 text-lg cursor-pointer'
                              role='menuitem'
                              onClick={() => deleteProduct(e.productId)}
                            >
                              <FontAwesomeIcon
                                icon={faTrash}
                              />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  )}

                  {products.length <= 0 && (
                    <tbody>
                      <tr>
                        <td colSpan={6}>
                          <NoRegisteredItems message='No se encontraron registros' />
                        </td>
                      </tr>
                    </tbody>
                  )}
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
