import { faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { NoRegisteredItems } from 'components/Elements/NoRegisteredItems'
import Link from 'next/link'
import { deleteOneCustomer } from 'services/customers'
import { CustomerT } from 'types'

type Props = {
  customers: CustomerT[]
  setResponse: any
  setCustomers: any
}

export function ClientsList ({ customers, setCustomers, setResponse }: Props) {
  const deleteClient = async (customerId: string) => {
    try {
      const { message } = await deleteOneCustomer({
        customerId,
        customerType: 'client'
      })
      setResponse({ text: message, status: 'success' })
      setCustomers(
        customers.filter(
          (e: { customerId: string }) => e.customerId !== customerId
        )
      )
    } catch ({ message }) {
      setResponse({ text: message, status: 'failed' })
    }
  }

  return (
    <>
      <div className='mt-5 w-full'>
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
                        Nombre y Apellido
                      </th>

                      <th
                        scope='col'
                        className='py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                      >
                        C.I/RIF
                      </th>

                      <th
                        scope='col'
                        className='px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                      >
                        Dirección
                      </th>

                      <th
                        scope='col'
                        className='px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                      >
                        Contacto
                      </th>

                      <th
                        scope='col'
                        className='px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                      >
                        Razón Social
                      </th>

                      <th
                        scope='col'
                        className='px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                      ></th>
                    </tr>
                  </thead>

                  {customers.length > 0 && (
                    <tbody>
                      {customers.map((e: CustomerT, index: number) => (
                        <tr
                          key={index}
                          className='text-xs uppercase hover:bg-gray-300 hover:text-blue-500 hover:font-semibold hover:scale-110 cursor-pointer'
                        >
                          <td className='py-2 whitespace-nowrap text-center'>
                            {index + 1}
                          </td>

                          <td className='py-2 whitespace-nowrap'>
                            {!e.dniType
                              ? `U-${e.fullName}`
                              : e.dniType.includes('V-')
                              ? `${e.firstName} ${e.lastName}`
                              : `${e.firstName}`}
                          </td>

                          <td className='py-2 whitespace-nowrap'>
                            {!e.dniType ? e.dni : `${e.dniType}${e.dni}`}
                          </td>

                          <td className='py-2 whitespace-nowrap'>
                            {e.address}
                          </td>

                          <td className='py-2 whitespace-nowrap'>
                            {`+58 ${e.contact}`}
                          </td>

                          <td className='whitespace-nowrap'>
                            {!e.dniType
                              ? e.socialReason
                              : !e.dniType.includes('V-') && e.socialReason}
                          </td>

                          <td className='whitespace-nowrap flex'>
                            <Link
                              href={`/admin/clients/updateClient/${e.customerId}`}
                            >
                              <a
                                className='block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                                role='menuitem'
                              >
                                <FontAwesomeIcon
                                  icon={faPencilAlt}
                                  className='text-blue-500 text-lg cursor-pointer'
                                />
                              </a>
                            </Link>

                            <button
                              className='focus:outline-none block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900 font-semibold'
                              onClick={() => deleteClient(e.customerId)}
                            >
                              <FontAwesomeIcon
                                icon={faTrash}
                                className='text-red-500 text-lg cursor-pointer'
                              />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  )}

                  {customers.length <= 0 && (
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
