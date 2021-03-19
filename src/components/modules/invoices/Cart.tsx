import { faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { NoRegisteredItems } from 'components/Elements/NoRegisteredItems'
import { useInvoice } from 'context'
import { useExchangeQuantity } from 'hooks'
import { ProductT } from 'types'
type Props = {
  invoiceType: String
}

export function Cart({ invoiceType }: Props): React.ReactElement {
  const {
    cart,
    setState,
    products,
    invoice: { exchangeRate }
  } = useInvoice()

  const deleteProductFromCart = (
    productCode: string,
    quantityRequested: number
  ): void => {
    const productFound = products.find(
      (e: ProductT) => e.productCode === productCode
    )

    if (productFound) {
      setState({
        products: [...products],
        ...((productFound.quantity += Number(quantityRequested)) as {}),
        cart: cart.filter((e: ProductT) => e.productCode !== productCode)
      })
    }
  }

  const modifyProductFromCart = (
    productCode: string,
    quantityRequested: number
  ): void => {
    const productFound = cart.find(
      (e: ProductT) => e.productCode === productCode
    )

    if (productFound) {
      setState({
        products: [...products],
        ...((productFound.quantity += Number(quantityRequested)) as {}),
        cart: cart.filter((e: ProductT) => e.productCode !== productCode)
      })

      setState({
        oneProduct: productFound,
        available: true
      })
    }
  }

  const formatterPercent = new Intl.NumberFormat('es-ES', { style: 'percent' })
  return (
    <>
      <div>
        <p className='border w-full rounded-t border-b-0 p-2 text-gray-400 font-semibold'>
          Carrito
        </p>
        <div className='flex flex-col border rounded relative'>
          <div className='-my-2 overflow-x-auto overflow-y-auto sm:-mx-6 lg:-mx-8'>
            <div className='py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8 '>
              <div
                className='shadow overflow-hidden border-b border-gray-200 sm:rounded-lg'
                style={{ maxHeight: '300px' }}
              >
                <table className='min-w-full divide-y divide-gray-200 text-left text-xs font-medium text-gray-500 uppercase'>
                  <thead className='bg-gray-50'>
                    <tr className='bg-gray-100'>
                      <th
                        scope='col'
                        className='py-3 text-center tracking-wider'
                      >
                        #
                      </th>
                      <th scope='col' className='py-3 tracking-wider'>
                        Descripción
                      </th>
                      <th scope='col' className='py-3 tracking-wider'>
                        Cantidad Requerida
                      </th>
                      <th scope='col' className='px-3 py-3 tracking-wider'>
                        {invoiceType.includes('Retail') && 'Precio Al Detal'}
                        {invoiceType.includes('Wholesale') && 'Precio Al Mayor'}
                      </th>
                      <th
                        scope='col'
                        className='px-3 py-3 tracking-wider'
                      >
                        Descuento
                      </th>
                      <th scope='col' className='px-3 py-3 tracking-wider'>
                        Monto
                      </th>
                      <th scope='col' className='px-3 py-3 tracking-wider'></th>
                    </tr>
                  </thead>

                  {cart.length > 0 && (
                    <tbody>
                      {cart.map((e: ProductT, index: number) => (
                        <tr key={index} className='uppercase'>
                          <td className='py-2 whitespace-nowrap text-center'>
                            {e.productCode}
                          </td>

                          <td className='py-2 whitespace-nowrap'>
                            {e.productName}
                          </td>

                          <td className='py-2 whitespace-nowrap'>
                            {`${e.quantityRequested} ${e.unit}`}
                          </td>

                          <td className='py-2 whitespace-nowrap'>
                            {`${useExchangeQuantity(
                              e.productPrice
                            )} $ / ${useExchangeQuantity(
                              e.productPrice,
                              exchangeRate
                            )} Bs.S`}
                          </td>

                          <td
                            className='py-2 whitespace-nowrap'
                          >
                            {formatterPercent.format(e.productDiscount || 0)}
                          </td>

                          <td className='py-2 whitespace-nowrap'>
                            {`${useExchangeQuantity(
                              e.productPrice * e.quantityRequested -
                              e.productPrice *
                              e.quantityRequested *
                              e.productDiscount
                            )} $ / ${useExchangeQuantity(
                              e.productPrice * e.quantityRequested -
                              e.productPrice *
                              e.quantityRequested *
                              e.productDiscount,
                              exchangeRate
                            )} Bs.S`}
                          </td>

                          <td className='whitespace-nowrap flex'>
                            <button
                              className='px-1 py-2 hover:bg-gray-100 focus:outline-none w-full'
                              role='menuitem'
                              onClick={() =>
                                modifyProductFromCart(
                                  e.productCode,
                                  e.quantityRequested
                                )
                              }
                            >
                              <FontAwesomeIcon
                                icon={faPencilAlt}
                                className='text-blue-500 text-base cursor-pointer'
                              />
                            </button>

                            <button
                              className='px-1 py-2 hover:bg-gray-100 focus:outline-none w-full'
                              role='menuitem'
                              onClick={() =>
                                deleteProductFromCart(
                                  e.productCode,
                                  e.quantityRequested
                                )
                              }
                            >
                              <FontAwesomeIcon
                                icon={faTrash}
                                className='text-red-500 text-base cursor-pointer'
                              />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  )}

                  {cart.length <= 0 && (
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
