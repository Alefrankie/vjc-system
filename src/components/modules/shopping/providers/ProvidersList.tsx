import { deleteOneCustomer } from 'services/customers'
import { CustomerT } from 'types'
import { OnKeySearchLocal } from '../../../Elements/OnKeySearchLocal/index'

type Props = {
  customers: CustomerT[]
  setResponse: any
  setCustomers: any
}

export function ProvidersList ({
  customers,
  setCustomers,
  setResponse
}: Props) {
  const deleteProvider = async (customerId: string) => {
    try {
      const { message } = await deleteOneCustomer({
        customerId,
        customerType: 'provider'
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
      <div style={{ width: '100%', padding: '0 19rem' }}>
        <OnKeySearchLocal
          setState={setCustomers}
          array={customers}
          where='customers'
        />
      </div>
      <table className='table-striped'>
        <thead className='thead-dark'>
          <tr style={{ lineHeight: '2rem', textAlign: 'center' }}>
            <th style={{ width: '5rem' }}>#</th>
            <th style={{ width: '10rem' }}>Proveedor</th>
            <th style={{ width: '10rem' }}>RIF</th>
            <th style={{ width: '25rem' }}>Dirección</th>
            <th style={{ width: '15rem' }}>Contacto</th>
            <th style={{ width: '20rem' }}>Opciones</th>
          </tr>
        </thead>

        {customers.length >= 1 && (
          <tbody>
            {customers.map(
              (
                e: {
                  fullName: string
                  dni: string
                  address: string
                  contact: string
                  customerId: string
                },
                index: number
              ) => (
                <tr
                  key={index}
                  style={{ lineHeight: '2rem', textAlign: 'center' }}
                >
                  <td style={{ border: 'none' }}>{index + 1}</td>
                  <td style={{ border: 'none' }}>{e.fullName}</td>
                  <td style={{ border: 'none' }}>{e.dni}</td>
                  <td style={{ border: 'none' }}>{e.address}</td>
                  <td style={{ border: 'none' }}>+58 {e.contact}</td>
                  <td
                    style={{
                      display: 'flex',
                      width: '20rem',
                      flexWrap: 'wrap',
                      justifyContent: 'space-evenly',
                      borderTop: 'none'
                    }}
                  >
                    <a href={`/shopping/order/?customerId=${e.customerId}`}>
                      <button
                        style={{
                          fontWeight: 'bold',
                          width: '5rem',
                          height: '2.45rem'
                        }}
                      >
                        <span>
                          <i></i>Pedido
                        </span>
                      </button>
                    </a>
                    <a
                      href={`/shopping/providers/updateProvider/?customerId=${e.customerId}`}
                    >
                      <button style={{ width: '2.5rem', height: '2.5rem' }}>
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
                              d='M402.6 83.2l90.2 90.2c3.8 3.8 3.8 10 0 13.8L274.4 405.6l-92.8 10.3c-12.4 1.4-22.9-9.1-21.5-21.5l10.3-92.8L388.8 83.2c3.8-3.8 10-3.8 13.8 0zm162-22.9l-48.8-48.8c-15.2-15.2-39.9-15.2-55.2 0l-35.4 35.4c-3.8 3.8-3.8 10 0 13.8l90.2 90.2c3.8 3.8 10 3.8 13.8 0l35.4-35.4c15.2-15.3 15.2-40 0-55.2zM384 346.2V448H64V128h229.8c3.2 0 6.2-1.3 8.5-3.5l40-40c7.6-7.6 2.2-20.5-8.5-20.5H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V306.2c0-10.7-12.9-16-20.5-8.5l-40 40c-2.2 2.3-3.5 5.3-3.5 8.5z'
                            />
                          </svg>
                        </span>
                      </button>
                    </a>
                    <button
                      onClick={() => deleteProvider(e.customerId)}
                      style={{ width: '2.5rem', height: '2.5rem' }}
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
                            d='M432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16zM53.2 467a48 48 0 0 0 47.9 45h245.8a48 48 0 0 0 47.9-45L416 128H32z'
                          />
                        </svg>
                      </span>
                    </button>
                  </td>
                </tr>
              )
            )}
          </tbody>
        )}

        {customers.length <= 0 && (
          <tbody>
            <tr
              style={{
                lineHeight: '3.125rem',
                textAlign: 'center'
              }}
            >
              <td colSpan={6}>
                <h1>NO SE ENCONTRARON PROVEEDORES </h1>
              </td>
            </tr>
          </tbody>
        )}
      </table>
    </>
  )
}
