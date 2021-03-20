import {
  faAngleLeft,
  faAngleRight,
  faCircle,
  faEye,
  faTintSlash,
  faTrashAlt
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { NoRegisteredItems } from 'components/Elements/NoRegisteredItems'
import { useUser } from 'context'
import { useExchangeQuantity } from 'hooks'
import Router from 'next/router'
import { Fragment, useEffect, useState } from 'react'
import { annularInvoice, deleteOneInvoice } from 'services/invoice'
import { InvoiceT } from 'types'

type Props = {
  invoices: any[]
  setState: any
  currentPage: number
}

export function InvoicesListTable ({ invoices, setState, currentPage }: Props) {
  const { user } = useUser()
  const [Total, setTotal] = useState(0)

  const deleteInvoice = (invoiceId: string) => {
    const invoiceFound = invoices.find((e: any) => e.invoiceId === invoiceId)
    setTotal(prev => prev - invoiceFound.subTotal * invoiceFound.exchangeRate)
    deleteOneInvoice({ invoiceId })
    setState({
      invoices: invoices.filter(
        (e: { invoiceId: string }) => e.invoiceId !== invoiceId
      )
    })
  }

  const annular = (invoiceId: string) => {
    annularInvoice({ invoiceId })
    const invoiceFound = invoices.find((e: any) => e.invoiceId === invoiceId)
    setTotal(prev => prev - invoiceFound.subTotal * invoiceFound.exchangeRate)
    invoiceFound.status = false
  }

  useEffect(() => {
    invoices.map((e: any) => {
      if (e.status && e.payCondition === 'Contado') {
        setTotal(prev => prev + Number(e.subTotal * e.exchangeRate))
      }
    })
    return () => {
      setTotal(0)
      setState({
        invoices: []
      })
    }
  }, [])

  return (
    <>
      <div className='flex flex-col border print:border-0 mx-4'>
        <div className='-my-2 overflow-x-auto overflow-y-auto sm:-mx-6 lg:-mx-8'>
          <div className='py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8'>
            <div className='px-2 text-gray-400 font-semibold'>Facturas</div>
            <div
              className='shadow overflow-y-auto border-b border-gray-200 sm:rounded-lg print:border-0 print:shadow'
              style={{ maxHeight: '50vh' }}
            >
              <table className='min-w-full divide-y divide-gray-200 print:divide-none'>
                <thead className='bg-gray-50'>
                  <tr className='bg-gray-100'>
                    <th
                      scope='col'
                      className='px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                    >
                      #
                    </th>
                    <th
                      scope='col'
                      className='px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                    >
                      N° Control
                    </th>
                    <th
                      scope='col'
                      className='px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                    >
                      Cliente
                    </th>
                    <th
                      scope='col'
                      className='px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                    >
                      Total
                    </th>
                    <th
                      scope='col'
                      className='px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                    >
                      Status
                    </th>
                    <th
                      scope='col'
                      className='px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                    >
                      Tasa de Cambio
                    </th>
                    <th
                      scope='col'
                      className='px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                    >
                      Tipo
                    </th>
                    <th
                      scope='col'
                      className='px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                    >
                      Fecha
                    </th>
                    <th scope='col' className='relative px-4 py-3 text-center'>
                      <span className='sr-only'>Opciones</span>
                    </th>
                  </tr>
                </thead>

                {invoices.length > 0 && (
                  <tbody>
                    {invoices.map((e: InvoiceT, index: number) => (
                      <Fragment key={index}>
                        <tr>
                          <td className='px-2 py-4 whitespace-nowrap'>
                            {index + 1}
                          </td>
                          <td className='py-4 whitespace-nowrap'>
                            {e.controlNumber}
                          </td>
                          <td className='py-4 whitespace-nowrap'>{e.dni}</td>
                          <td className='py-4 whitespace-nowrap'>
                            {`${useExchangeQuantity(
                              e.subTotal * e.exchangeRate
                            )} Bs.S`}
                          </td>
                          <td className='py-4 whitespace-nowrap text-center'>
                            <FontAwesomeIcon
                              icon={faCircle}
                              className={`text-lg                                 ${
                                e.status ? 'text-green-500' : 'text-red-500'
                              }
                              `}
                              style={{ borderRadius: '100%' }}
                            />
                          </td>

                          <td className='py-4 whitespace-nowrap text-sm text-gray-500'>
                            {useExchangeQuantity(e.exchangeRate)} Bs.S
                          </td>

                          <td className='py-4 whitespace-nowrap text-sm text-gray-500'>
                            {e.invoiceType.includes('Retail') && 'Al Detal'}
                            {e.invoiceType.includes('Wholesale') && 'Al Mayor'}
                          </td>
                          <td className='py-4 whitespace-nowrap text-sm text-gray-500'>
                            {e.invoiceDate}
                          </td>

                          <td className='py-4 pr-5 whitespace-nowrap text-right text-sm font-medium'>
                            <button
                              type='submit'
                              className='text-red-500 text-lg mr-5 print:hidden focus:outline-none'
                              onClick={() => deleteInvoice(e.invoiceId)}
                              hidden={user?.privileges === 'User'}
                            >
                              <FontAwesomeIcon icon={faTrashAlt} />
                            </button>

                            <button
                              type='submit'
                              className={`${
                                e.status ? 'text-red-500' : 'text-gray-400'
                              } text-lg mr-5 print:hidden focus:outline-none`}
                              onClick={() => annular(e.invoiceId)}
                              hidden={user?.privileges === 'User'}
                              disabled={e.status ? true : false}
                            >
                              <FontAwesomeIcon icon={faTintSlash} />
                            </button>

                            <button
                              type='submit'
                              className='text-gray-500 text-lg print:hidden focus:outline-none'
                              onClick={() =>
                                Router.push(
                                  `/admin/reports/oneInvoice/${e.invoiceId}`
                                )
                              }
                            >
                              <FontAwesomeIcon icon={faEye} />
                            </button>
                          </td>
                        </tr>
                        <tr>
                          <th hidden={index + 1 < invoices.length} colSpan={9}>
                            {`${useExchangeQuantity(Total)} Bs.S`}
                          </th>
                        </tr>
                      </Fragment>
                    ))}
                  </tbody>
                )}
              </table>

              {invoices.length < 1 && (
                <NoRegisteredItems message='No Se Encontraron Facturas Registradas' />
              )}
            </div>
            {/* PAGINATION */}
            <div className='bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6'>
              <div className='flex-1 flex justify-between sm:hidden'>
                <a
                  href='#'
                  onClick={() =>
                    setState({
                      currentPage:
                        currentPage <= 1 ? 1 : Number(currentPage - 1)
                    })
                  }
                  className='relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:text-gray-500'
                >
                  Previous
                </a>
                <a
                  href='#'
                  onClick={() =>
                    setState({
                      currentPage:
                        currentPage == Math.ceil(invoices.length / currentPage)
                          ? Math.ceil(invoices.length / currentPage)
                          : Number(currentPage + 1)
                    })
                  }
                  className='ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:text-gray-500'
                >
                  Next
                </a>
              </div>
              <div className='hidden sm:flex-1 sm:flex sm:items-center sm:justify-between flex-row-reverse'>
                {/* <div>
                  <p className='text-sm text-gray-700'>
                    Showing
                    <span className='font-medium'>1</span>
                    to
                    <span className='font-medium'>50</span>
                    of
                    <span className='font-medium'>{invoices.length}</span>
                    results
                  </p>
                </div> */}
                <div>
                  <nav
                    className='relative z-0 inline-flex rounded-md shadow-sm -space-x-px'
                    aria-label='Pagination'
                  >
                    <button
                      onClick={() =>
                        setState({
                          currentPage:
                            currentPage <= 1 ? 1 : Number(currentPage - 1)
                        })
                      }
                      className='focus:outline-none relative inline-flex items-center px-4 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50'
                    >
                      <FontAwesomeIcon icon={faAngleLeft} />
                    </button>

                    <span className='relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700'>
                      ...
                    </span>

                    <button
                      onClick={() =>
                        setState({
                          currentPage:
                            currentPage ==
                            Math.ceil(invoices.length / currentPage)
                              ? Math.ceil(invoices.length / currentPage)
                              : Number(currentPage + 1)
                        })
                      }
                      className='focus:outline-none relative inline-flex items-center px-4 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50'
                    >
                      <FontAwesomeIcon icon={faAngleRight} />
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
