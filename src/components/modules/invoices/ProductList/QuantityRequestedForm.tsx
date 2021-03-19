import { faCartPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ModalAlert } from 'components/Elements/ModalAlert'
import { useInvoice } from 'context'
import { useResponse } from 'hooks/useResponse'
import { ProductT } from 'types'
import { useExchangeQuantity } from 'hooks'
type Props = {
  invoiceType: string
  handleSubmit: any
  preferences: any
  getValues: any
  register: any
  errors: any
  reset: any
}

export function QuantityRequestedForm({
  invoiceType,
  handleSubmit,
  register,
  errors,
  reset,
  preferences: { exchangeRate, retailRate }
}: Props) {
  const {
    setState,
    oneProduct,
    invoice,
    oneCustomer,
    cart,
    available,
    products
  } = useInvoice()
  const { response, setResponse } = useResponse()

  const handleInputChange = (
    // eslint-disable-next-line no-undef
    event: React.ChangeEvent<HTMLInputElement> | any
  ): void => {
    // eslint-disable-next-line no-undef
    const { name, value } = event.target as HTMLInputElement

    if (
      name === 'quantityRequested' &&
      Number(value) > Number(oneProduct.quantity)
    ) {
      return setResponse({
        text: 'Ingrese una cantidad válida',
        status: 'failed'
      })
    }

    if (name === 'productDiscount' && Number(value) > 100) {
      return setResponse({
        text: 'Ingrese un descuento válido',
        status: 'failed'
      })
    }

    if (name === 'productDiscount' && Number(value) < 0) {
      return setResponse({
        text: 'Ingrese un descuento válido',
        status: 'failed'
      })
    }
  }

  const addToCart = ({ quantityRequested, productDiscount }: ProductT) => {
    const productFound = products.find(
      (e: ProductT) =>
        e.productCode === oneProduct.productCode &&
        (e.quantity -= quantityRequested)
    )

    if (productFound) {
      productFound.quantityRequested = quantityRequested
      productFound.productDiscount = (1 * Number(productDiscount)) / 100
    }

    setState({
      invoice: {
        ...invoice,
        dni: oneCustomer.dniType
          ? `${oneCustomer.dniType}${oneCustomer.dni}`
          : oneCustomer.dni,
        fullName:
          oneCustomer.fullName ||
          `${oneCustomer.firstName} ${oneCustomer.lastName}`,
        address: oneCustomer.address,
        contact: oneCustomer.contact,
        socialReason: oneCustomer.socialReason,
        exchangeRate: invoiceType.includes('Retail') ? retailRate : exchangeRate
      },
      available: false,
      cart: [...cart, productFound]
    })
    console.log(cart)
    reset({})
  }

  return (
    <>
      {response && (
        <ModalAlert
          tittle='Preferencias'
          message={response.text}
          status={response.status}
        />
      )}

      <div className='ml-1 mt-5 w-1/3 '>
        <div className=''>
          <p className='border w-full rounded-t p-2 text-gray-800 font-bold uppercase'>
            Producto{available && `: ${oneProduct.productName}`}
          </p>

          <p className='px-2 text-gray-800 font-bold border uppercase'>
            {available &&
              `Precio: ${useExchangeQuantity(
                oneProduct.productPrice,
                Number(
                  `${
                  invoiceType.includes('Retail') ? retailRate : exchangeRate
                  }`
                )
              )} Bs.S`}
          </p>
        </div>

        <form
          onSubmit={handleSubmit(addToCart)}
          className='p-2 border rounded flex flex-col justify-evenly'
          style={{ minHeight: '300px' }}
        >
          <div className=''>
            <label
              htmlFor='quantityRequested'
              className='text-gray-400 font-semibold'
            >
              Cantidad:
            </label>
            <div className='border-2 rounded-full px-3 py-2 text-gray-500 '>
              <input
                className='w-full focus:outline-none font-bold'
                type='number'
                name='quantityRequested'
                id='quantityRequested'
                step='0.01'
                disabled={available ? false : true}
                min={0.01}
                max={oneProduct?.quantity || 0}
                onChange={handleInputChange}
                ref={(e: any) => {
                  register(e, {
                    required: {
                      value: true,
                      message: 'Campo Cantidad Requerido'
                    },
                    min: {
                      value: 0.01,
                      message:
                        'La cantidad solicitada no puede ser menor a 0.01'
                    },
                    max: {
                      value: available ? oneProduct.quantity : 0,
                      message: `No debe superar el límite de ${
                        available ? oneProduct.quantity : '... '
                        }`
                    }
                  })
                }}
                placeholder={`(No debe superar el límite de ${
                  available ? oneProduct.quantity : '...'
                  })`}
              />
            </div>
          </div>
          <div>
            <label
              htmlFor='productDiscount'
              className='px-2 text-gray-400 font-semibold'
            >
              Descuento:
            </label>

            <div className='border-2 rounded-full px-3 py-2 text-gray-500'>
              <input
                type='number'
                className='w-full focus:outline-none font-bold'
                name='productDiscount'
                id='productDiscount'
                disabled={available ? false : true}
                min={0}
                max={100}
                onChange={handleInputChange}
                ref={register({
                  min: {
                    value: 0,
                    message: 'El descuento no puede ser menor a 0'
                  },
                  max: {
                    value: 100,
                    message: 'No puede exceder el límite de 100%'
                  }
                })}
                placeholder={`¿Descuento para el "${
                  available ? oneProduct.productName : '...'
                  }"?`}
              />
            </div>

            {(errors?.productDiscount?.message ||
              errors?.quantityRequested?.message) && (
                <div className='bg-red-500'>
                  {errors?.productDiscount?.message ||
                    errors?.quantityRequested?.message}
                </div>
              )}
          </div>

          <button
            type='submit'
            className='focus:outline-none | mt-2 text-white border-2 border-white rounded-full bg-blue-500 px-2 py-2 hover:bg-yellow-500 transition ease-in-out duration-300'
          >
            Añadir al Carrito <FontAwesomeIcon icon={faCartPlus} />
          </button>
        </form>
      </div>
    </>
  )
}
