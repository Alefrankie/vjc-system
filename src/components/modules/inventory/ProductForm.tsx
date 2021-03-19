import { ErrorMessage } from '@hookform/error-message'
import { Loading } from 'components/Elements/Loading'
import { ModalAlert } from 'components/Elements/ModalAlert'
import { useResponse } from 'hooks/useResponse'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { PreferencesT, ProductT } from 'types'
import { useExchangeQuantity } from 'hooks'
import { v4 as uuidv4 } from 'uuid'

type Props = {
  currentProduct?: ProductT
  // onSendProduct: ({ Product: any }) => Promise<{ message: string }>
  onSendProduct: any
  preferences: PreferencesT
}

export function ProductForm ({
  currentProduct,
  onSendProduct,
  preferences: { exchangeRate, retailRate }
}: Props): React.ReactElement {
  const { response, setResponse } = useResponse()
  const [priceValues, setPriceValues] = useState({
    retailPrice: currentProduct ? currentProduct.retailPrice : 0,
    unitaryPrice: currentProduct ? currentProduct.unitaryPrice : 0
  })

  const {
    register,
    errors,
    handleSubmit,
    formState,
    clearErrors,
    reset
  } = useForm({
    mode: 'onSubmit',
    defaultValues: currentProduct || {},
    reValidateMode: 'onChange',
    criteriaMode: 'all',
    shouldFocusError: true,
    shouldUnregister: true
  })

  const { isSubmitting } = formState

  if (isSubmitting) {
    return <Loading />
  }

  // eslint-disable-next-line no-undef
  const HandlerOnChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    // eslint-disable-next-line no-undef
    const { value, name } = e.target as HTMLInputElement

    return setPriceValues({
      ...priceValues,
      [name]: value
    })
  }

  const onSubmit = async (Product: ProductT): Promise<void> => {
    Product = {
      ...Product,
      productId: currentProduct ? currentProduct?.productId : uuidv4()
    }
    console.log(Product)
    reset(Product)
    try {
      const { message } = await onSendProduct({ Product })
      setResponse({ text: message, status: 'success' })
    } catch ({ message }) {
      setResponse({ text: message, status: 'failed' })
    }
  }

  return (
    <>
      <div className='container mx-auto w-1/2 border shadow-md'>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='m-2 px-3 mt-4 | border rounded shadow'
        >
          <p className='text-lg text-center font-bold my-4'>
            {currentProduct ? 'Actualizar' : 'Añadir'} Producto
          </p>
          <label className='flex flex-col'>
            Código:
            <input
              type='text'
              name='productCode'
              className='border rounded | focus:outline-none focus:ring focus:border-blue-100| px-3 py-2 mt-2 | uppercase'
              placeholder='Código'
              maxLength={6}
              minLength={6}
              ref={register({
                required: { value: true, message: 'Campo Requerido' },
                maxLength: {
                  value: 6,
                  message: 'Máximo 6 Caracteres'
                },
                minLength: {
                  value: 6,
                  message: 'Mínimo 6 Caracteres'
                }
              })}
            />
            <ErrorMessage errors={errors} name='productCode' as='h6' />
          </label>

          <label className='flex flex-col'>
            Nombre del Producto:
            <input
              type='text'
              name='productName'
              className='border rounded | focus:outline-none focus:ring focus:border-blue-100| px-3 py-2 mt-2 | uppercase'
              placeholder='Nombre del Producto'
              ref={register({
                required: {
                  value: true,
                  message: 'Campo Nombre Requerido'
                }
              })}
            />
            <ErrorMessage errors={errors} name='productName' as='h6' />
          </label>

          <label htmlFor='retailPrice' className='flex mt-3'>
            Precio Al Mayor:
          </label>
          <div className='flex justify-between'>
            <input
              type='number'
              id='unitaryPrice'
              name='unitaryPrice'
              className='border rounded | focus:outline-none focus:ring focus:border-blue-100| px-3 py-2 '
              placeholder='Precio Al Mayor'
              step='0.000001'
              onChange={HandlerOnChange}
              ref={register({
                min: {
                  value: 0,
                  message: 'No puede colocar un valor negativo'
                }
              })}
            />
            <ErrorMessage errors={errors} name='unitaryPrice' as='h6' />

            {/* <label>{exchangeQuantity(exchangeRate)} Bs.S</label> */}
            <div>
              {`${useExchangeQuantity(
                priceValues.unitaryPrice
              )} $ / ${useExchangeQuantity(
                priceValues.unitaryPrice,
                exchangeRate
              )} Bs.S` || '0,00 $ / 0,00 Bs.S'}
            </div>
          </div>

          <label htmlFor='retailPrice' className='mt-3'>
            Precio Al Detal:
          </label>
          <div className='flex justify-between'>
            <input
              type='number'
              id='retailPrice'
              name='retailPrice'
              className='border rounded | focus:outline-none focus:ring focus:border-blue-100| px-3 py-2'
              placeholder='Precio Al Detal'
              step='0.000001'
              onChange={HandlerOnChange}
              ref={register()}
            />
            <ErrorMessage errors={errors} name='retailPrice' as='h6' />

            <div className=''>
              {`${useExchangeQuantity(
                priceValues.retailPrice
              )} $ / ${useExchangeQuantity(
                priceValues.retailPrice,
                retailRate
              )} Bs.S` || '0,00 $ / 0,00 Bs.S'}
            </div>
          </div>

          <label htmlFor='quantity' className='mt-3'>
            Cantidad:
          </label>
          <div className='flex justify-between'>
            <input
              type='number'
              id='quantity'
              name='quantity'
              step='0.001'
              className='border rounded | focus:outline-none focus:ring focus:border-blue-100| px-3 py-2 mt-2'
              placeholder='Cantidad'
              style={{ textAlign: 'center' }}
              ref={register({
                required: { value: true, message: 'Campo Requerido' }
              })}
            />
            <ErrorMessage errors={errors} name='quantity' as='h6' />

            <select
              name='unit'
              className='border rounded | focus:outline-none focus:ring focus:border-blue-100| px-3 py-2 mt-2'
              ref={register({
                required: { value: true, message: 'Campo Requerido' }
              })}
            >
              <option value='LTS.'>LTS.</option>
              <option value='KGS.'>KGS.</option>
              <option value='UNITS.'>UNITS.</option>
            </select>
          </div>

          <div className='text-center'>
            <button
              className='focus:outline-none bg-blue-500 hover:bg-green-300 | px-4 py-2.5 mt-4 mb-5 | font-bold text-white rounded | transition-all ease-in-out  duration-400'
              onClick={() => {
                clearErrors()
                setPriceValues({
                  ...priceValues,
                  retailPrice: 0,
                  unitaryPrice: 0
                })
              }}
            >
              {currentProduct ? 'Actualizar' : 'Agregar'}
            </button>
          </div>
        </form>
        {response && (
          <ModalAlert
            message={response.text}
            tittle='Productos'
            setResponse={setResponse}
            redirect={currentProduct ? '/admin/inventory/productList' : ''}
            status={response.status}
          />
        )}
      </div>
    </>
  )
}
