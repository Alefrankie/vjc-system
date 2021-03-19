import { useInvoice } from 'context/InvoiceContext'
import { useRef } from 'react'
import { v4 as uuidv4 } from 'uuid'

export function Cart () {
  const { cart, setState, oneProduct, invoice, oneCustomer } = useInvoice()
  const refQuantity = useRef<HTMLInputElement>(document.createElement('input'))
  const refDescription = useRef<HTMLInputElement>(
    document.createElement('input')
  )

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { name, value } = e.target as HTMLInputElement
    if (
      (name === 'quantityRequested' && Number(value) < 0) ||
      (name === 'quantityRequested' && isNaN(Number(value)))
    ) {
      value = ''
      return alert('Error, debe introducir una cantidad válida')
    }

    setState({
      oneProduct: {
        ...oneProduct,
        productCode: uuidv4(),
        [name]: name === 'quantityRequested' ? value : value
      }
    })
  }

  const addToCart = () => {
    if (JSON.stringify(oneCustomer) === '{}') {
      return alert('Error, debe ingresar un proveedor.')
    }

    if (refQuantity.current.value === '') {
      return alert('Error, debe introducir una cantidad válida.')
    }

    if (refDescription.current.value === '') {
      return alert('Error, debe introducir una descripcion válida.')
    }

    const { dni, fullName, address, contact } = oneCustomer

    setState({
      invoice: {
        ...invoice,
        dni,
        fullName,
        address,
        contact
      },
      ...invoice
    })

    setState({ cart: [...cart, oneProduct] })
    refQuantity.current.value = ''
    refDescription.current.value = ''
  }

  const deleteProductFromCart = (codeFromCart: any) => {
    setState({
      cart: cart.filter(
        (e: { productCode: any }) => e.productCode !== codeFromCart
      )
    })
  }

  return (
    <div style={{ width: '100%' }}>
      <div className='text-center' style={{ margin: '2rem 0', width: '100%' }}>
        <h3
          style={{
            width: '100%',
            textAlign: 'center',
            textTransform: 'uppercase'
          }}
        >
          Producto: {oneProduct.productName}
        </h3>
        <br />
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <label
            htmlFor='quantityRequested'
            style={{
              fontSize: '1.5625rem',
              marginRight: '0.625rem',
              fontWeight: 'bold',
              lineHeight: '1.25rem'
            }}
          >
            Cantidad:
          </label>
          <input
            type='number'
            name='quantityRequested'
            id='quantityRequested'
            step='0.01'
            ref={refQuantity}
            onChange={handleInputChange}
            placeholder='Ingrese la cantidad'
            style={{
              textTransform: 'uppercase',
              width: '25rem',
              marginRight: '1.25rem'
            }}
          />

          <label
            htmlFor='productName'
            style={{
              fontSize: '1.5625rem',
              marginRight: '0.625rem',
              fontWeight: 'bold',
              lineHeight: '1.25rem'
            }}
          >
            Descripción:
          </label>
          <input
            type='text'
            name='productName'
            id='productName'
            onChange={handleInputChange}
            ref={refDescription}
            placeholder='Descripción del producto'
            style={{ textTransform: 'uppercase', width: '25rem' }}
          />
        </div>
        <button
          onClick={addToCart}
          style={{ height: '3rem', margin: '1rem 0' }}
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
                d='M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z'
              />
            </svg>
          </span>
          &nbsp; Añadir a la Lista
        </button>
      </div>
      {cart.length > 0 ? (
        <div
          className='table-wrapper-scroll-y my-custom-scrollbar'
          style={{ height: '18.75rem', overflowY: 'auto' }}
        >
          <table>
            <thead className='thead-dark'>
              <tr style={{ lineHeight: '1.875rem', textAlign: 'center' }}>
                <th style={{ width: '1rem', textAlign: 'center' }}>#</th>
                <th style={{ width: '20rem', textAlign: 'center' }}>
                  Cantidad
                </th>
                <th style={{ textAlign: 'center' }}>Descripción</th>
                <th style={{ width: '20rem', textAlign: 'center' }}>
                  Opciones
                </th>
              </tr>
            </thead>
            <tbody>
              {cart.map(
                (
                  e: {
                    quantityRequested: number
                    productName: string
                    productCode: any
                  },
                  index: number
                ) => (
                  <tr
                    key={index}
                    style={{ lineHeight: '3.125rem', textAlign: 'center' }}
                  >
                    <td>{index + 1}</td>
                    <td>{e.quantityRequested}</td>
                    <td>{e.productName.toUpperCase()}</td>
                    <td>
                      <button
                        className='btn-danger'
                        onClick={() => deleteProductFromCart(e.productCode)}
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
                              d='M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z'
                            />
                          </svg>
                        </span>
                      </button>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      ) : (
        <table className='table-striped'>
          <thead className='thead-dark'>
            <tr style={{ lineHeight: '1.875rem', textAlign: 'center' }}>
              <th style={{ width: '1rem', textAlign: 'center' }}>#</th>
              <th style={{ width: '20rem', textAlign: 'center' }}>Cantidad</th>
              <th style={{ textAlign: 'center' }}>Descripción</th>
              <th style={{ width: '20rem', textAlign: 'center' }}>Opciones</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ lineHeight: '3.125rem', textAlign: 'center' }}>
              <td colSpan={8}>
                <h1>Carrito Vacío</h1>{' '}
              </td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  )
}
