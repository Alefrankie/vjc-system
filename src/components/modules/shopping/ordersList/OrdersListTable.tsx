import { NoRegisteredItems } from 'components/Elements/NoRegisteredItems'
import { useInvoice } from 'context/InvoiceContext'
import addCart from 'public/img/addCart.png'
import { useState } from 'react'
import { useGetDate } from 'hooks'
import { annularInvoice } from 'services/invoice'

export function OrdersListTable (props: { invoiceType: string }) {
  const { sales } = useInvoice()
  const [hiddenColumType] = useState(false)
  const { invoiceType } = props

  if (sales.length < 1) {
    return <NoRegisteredItems message='No existen ´órdenes registradas' />
  }

  return (
    <div
      className='table-wrapper-scroll-y my-custom-scrollbar'
      style={{
        height: invoiceType === 'allOrders' ? '100vh' : '25rem',
        overflowY: invoiceType === 'allOrders' ? 'hidden' : 'auto',
        margin: '1.875rem 0',
        width: '100%'
      }}
    >
      <table className='table-striped' style={{ fontWeight: 'bold' }}>
        <thead className='thead-dark'>
          <tr style={{ lineHeight: '1.875rem', textAlign: 'center' }}>
            <th>#</th>
            <th style={{ width: '7.1875rem' }}>N° Control</th>
            <th style={{ width: '20rem' }}>Proveedor</th>
            <th style={{ width: '10rem' }}>Rif</th>
            <th>Status</th>
            <th>Opciones</th>
          </tr>
        </thead>
        <tbody>
          {sales.map(
            (
              e: {
                controlNumber: string
                fullName: string
                dni: string
                status: string
                invoiceId: string
              },
              index: number
            ) => (
              <tr
                key={index}
                style={{ lineHeight: '3.125rem', textAlign: 'center' }}
              >
                <td>{index + 1}</td>
                <td>{e.controlNumber}</td>
                <td>{e.fullName}</td>
                <td>{e.dni}</td>
                <td
                  style={{
                    fontSize: '32px',
                    color: e.status === 'Anulado' ? 'red' : 'green'
                  }}
                >
                  <span>
                    <i
                      style={{
                        border: '0.0625rem solid white',
                        borderRadius: '50%',
                        background: 'white'
                      }}
                      className={
                        e.status === 'Anulado'
                          ? 'fas fa-circle'
                          : 'fas fa-circle'
                      }
                    />
                  </span>
                </td>
                <td>
                  <button
                    type='submit'
                    className='btn btn-danger'
                    onClick={() => annularInvoice({ invoiceId: e.invoiceId })}
                    style={{ margin: '0 1.25rem' }}
                  >
                    <span>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 576 512'
                        style={{
                          width: '18px',
                          height: '18px',
                          display: 'block'
                        }}
                      >
                        <path
                          fill='white'
                          d='M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm121.6 313.1c4.7 4.7 4.7 12.3 0 17L338 377.6c-4.7 4.7-12.3 4.7-17 0L256 312l-65.1 65.6c-4.7 4.7-12.3 4.7-17 0L134.4 338c-4.7-4.7-4.7-12.3 0-17l65.6-65-65.6-65.1c-4.7-4.7-4.7-12.3 0-17l39.6-39.6c4.7-4.7 12.3-4.7 17 0l65 65.7 65.1-65.6c4.7-4.7 12.3-4.7 17 0l39.6 39.6c4.7 4.7 4.7 12.3 0 17L312 256l65.6 65.1z'
                        />
                      </svg>
                    </span>
                  </button>

                  <a
                    href={`/admin/reports/shopping/oneOrder/?controlNumber=${e.controlNumber}`}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <button
                      type='submit'
                      className='btn btn-primary'
                      style={{
                        margin: '0 1.25rem',
                        backgroundImage: `url(${addCart})`
                      }}
                    >
                      <span>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          viewBox='0 0 576 512'
                          style={{
                            width: '18px',
                            height: '18px',
                            display: 'block'
                          }}
                        >
                          <path
                            fill='white'
                            d='M572.52 241.4C518.29 135.59 410.93 64 288 64S57.68 135.64 3.48 241.41a32.35 32.35 0 0 0 0 29.19C57.71 376.41 165.07 448 288 448s230.32-71.64 284.52-177.41a32.35 32.35 0 0 0 0-29.19zM288 400a144 144 0 1 1 144-144 143.93 143.93 0 0 1-144 144zm0-240a95.31 95.31 0 0 0-25.31 3.79 47.85 47.85 0 0 1-66.9 66.9A95.78 95.78 0 1 0 288 160z'
                          />
                        </svg>
                      </span>
                    </button>
                  </a>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
      <a
        href={`/report/${
          invoiceType === 'retail' ? 'retail' : 'wholesale'
        }/${useGetDate()}`}
        target='_blank'
        rel='noopener noreferrer'
      >
        <button hidden={!hiddenColumType} style={{ width: '100%' }}>
          Ver Reporte del Día
        </button>
      </a>
    </div>
  )
}
