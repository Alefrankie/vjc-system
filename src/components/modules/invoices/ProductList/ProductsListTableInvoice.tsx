import { useExchangeQuantity } from 'hooks'
import { ProductT } from 'types'
import { NoRegisteredItems } from '../../../Elements/NoRegisteredItems'

type Props = {
  invoiceType: string
  makeRequestQuantity: any
  preferences: any
  products: ProductT[]
}

export function ProductsListTableInvoice({
  invoiceType,
  makeRequestQuantity,
  preferences: { exchangeRate, retailRate },
  products
}: Props): React.ReactElement {

  return (
    <>
      <div className='mt-5 w-2/3'>
        <p className='border w-full rounded-t border-b-0 p-2 text-gray-400 font-semibold'>
          Lista de Productos
        </p>
        <div className='flex flex-col border rounded'>
          <div className='-my-2 overflow-x-auto overflow-y-auto sm:-mx-6 lg:-mx-8'>
            <div className='py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8'>
              <div
                className='shadow overflow-y-auto border-b border-gray-200 sm:rounded-lg'
                style={{ maxHeight: '300px' }}
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
                        className='py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider'
                      >
                        Descripción
                      </th>
                      <th
                        scope='col'
                        className='py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                      >
                        Status
                      </th>
                      <th
                        scope='col'
                        className='py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider'
                      >
                        {invoiceType.includes('Retail') && 'Precio al Detal'}
                        {invoiceType.includes('Wholesale') && 'Precio Al Mayor'}
                      </th>
                    </tr>
                  </thead>

                  {products.length > 0 && (
                    <tbody>
                      {products.map((e: ProductT, index: number) => (
                        <tr
                          key={index}
                          className='text-xs uppercase hover:bg-gray-300 hover:text-blue-500 hover:font-semibold hover:scale-110 cursor-pointer'
                          hidden={
                            invoiceType.includes('Retail') &&
                              e.retailPrice === 0
                              ? true
                              : false
                          }
                          onClick={() => makeRequestQuantity(e)}
                        >
                          <td className='py-2 whitespace-nowrap text-center'>
                            {e.productCode}
                          </td>

                          <td className='py-2 whitespace-nowrap'>
                            {e.productName}
                          </td>

                          <td className='py-2 pr-2 text-right whitespace-nowrap'>
                            {e.quantity > 0 ? (
                              `${useExchangeQuantity(e.quantity)} ${e.unit}`
                            ) : (
                                <p className='text-red-500 font-bold'>
                                  ¡Agotado!
                                </p>
                              )}
                          </td>

                          <td className='py-2 pr-2 text-right whitespace-nowrap'>
                            {invoiceType.includes('Retail') &&
                              `${useExchangeQuantity(
                                e.retailPrice,
                                retailRate
                              )} Bs.S`}

                            {invoiceType.includes('Wholesale') &&
                              `${useExchangeQuantity(
                                e.unitaryPrice
                              )} $ / ${useExchangeQuantity(
                                e.unitaryPrice,
                                exchangeRate
                              )} Bs.S`}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  )}

                  {products.length <= 0 && (
                    <tbody>
                      <tr>
                        <td colSpan={4}>
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

// const MemoizedProductsListTableInvoice = memo(ProductsListTableInvoice)
// export { MemoizedProductsListTableInvoice as ProductsListTableInvoice }
