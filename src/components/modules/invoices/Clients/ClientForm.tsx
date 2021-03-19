import { ErrorMessage } from '@hookform/error-message'
import { ModalAlert } from 'components/Elements/ModalAlert'
import { useResponse } from 'hooks/useResponse'
import { useCallback, useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { registerCustomer } from 'services/customers'
import { CustomerT } from 'types'
import { v4 as uuidv4 } from 'uuid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCubes } from '@fortawesome/free-solid-svg-icons'

export function ClientForm() {
  const [currentDNI, setCurrentDNI] = useState<string>()

  useEffect(() => {
    if (window) {
      const dni = window.localStorage.getItem('dni')
      setCurrentDNI(dni || '')
    }
  }, [currentDNI, setCurrentDNI])

  const { register, errors, handleSubmit, clearErrors, reset } = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues:
      {
        dni: currentDNI,
        name: '',
        lastName: '',
        address: '',
        contact: '',
        socialReason: '',
        dniType: ''
      } || {},
    criteriaMode: 'all',
    shouldFocusError: true,
    shouldUnregister: true
  })

  const [customerId, setCustomerId] = useState('')
  const { response, setResponse } = useResponse()
  const [customerType, setCustomerType] = useState('V-')
  const onSend = useCallback(
    async (client: CustomerT) => {
      client.customerId = uuidv4()
      client.customerType = 'client'
      reset(client)
      try {
        const { message } = await registerCustomer({ currentCustomer: client })
        // eslint-disable-next-line no-undef
        localStorage.removeItem('dni')
        setCustomerId(client.customerId)
        setResponse({ text: message, status: 'success' })
      } catch (error) {
        setResponse({ text: error, status: 'failed' })
      }
    },
    [reset, setResponse]
  )
  const chooseCustomerType = (e: { target: { value: string } }) => {
    setCustomerType(e.target.value)
  }
  return (
    <div className='container mx-auto mt-5 px-5'>
      <form onSubmit={handleSubmit(onSend)}>
        <div className='py-2'>
          <label htmlFor='firstName' className='flex flex-col font-semibold'>
            Nombre:
            <input
              type='text'
              id='firstName'
              name='firstName'
              placeholder='Nombre'
              className='border-2 rounded | focus:outline-none focus:ring focus:border-blue-100| mt-1 px-5 py-2'
              ref={register({
                required: { value: true, message: 'Campo Requerido' },
                maxLength: {
                  value: 255,
                  message: 'No puede exceder el límite de caracteres'
                }
              })}
            />
          </label>

          <ErrorMessage
            errors={errors}
            name='name'
            render={({ message }) => (
              <h6 className='text-red-500'>{message}</h6>
            )}
          />
        </div>
        {customerType.includes('V-') && (
          <div className='py-2'>
            <label htmlFor='lastName' className='flex flex-col font-semibold'>
              Apellido:
              <input
                type='text'
                id='lastName'
                name='lastName'
                maxLength={255}
                placeholder='Apellido'
                className='border-2 rounded | focus:outline-none focus:ring focus:border-blue-100| mt-1 px-5 py-2'
                ref={register({
                  required: { value: true, message: 'Campo Requerido' },
                  maxLength: {
                    value: 255,
                    message: 'No puede exceder el límite de caracteres'
                  }
                })}
              />
            </label>

            <ErrorMessage
              errors={errors}
              name='lastName'
              render={({ message }) => (
                <h6 className='text-red-500'>{message}</h6>
              )}
            />
          </div>
        )}

        <div className='flex flex-col py-2'>
          <label htmlFor='dniType' className='font-semibold'>
            Identificación:
          </label>
          <div className='flex'>
            <select
              id='dniType'
              name='dniType'
              defaultValue='V-'
              onChange={chooseCustomerType}
              className='border-2 rounded | focus:outline-none focus:ring focus:border-blue-100| mt-1 mr-2 px-5 py-2'
              ref={register({
                required: { value: true, message: 'Campo Requerido' }
              })}
            >
              <option value='V-'>V-</option>
              <option value='E-'>E-</option>
              <option value='J-'>J-</option>
              <option value='G-'>G-</option>
            </select>
            <input
              type='text'
              name='dni'
              placeholder='C.I / Rif'
              className='border-2 rounded | focus:outline-none focus:ring focus:border-blue-100| mt-1 px-5 py-2'
              ref={register({
                required: { value: true, message: 'Campo Requerido' },
                maxLength: {
                  value: 255,
                  message: 'No puede exceder el límite de caracteres'
                }
              })}
            />
          </div>
          <ErrorMessage
            errors={errors}
            name='dni'
            render={({ message }) => (
              <h6 className='text-red-500'>{message}</h6>
            )}
          />
          <ErrorMessage
            errors={errors}
            name='dniType'
            render={({ message }) => (
              <h6 className='text-red-500'>{message}</h6>
            )}
          />
        </div>

        <div className='py-2'>
          <label htmlFor='address' className='flex flex-col font-semibold'>
            Direccion:
            <input
              type='text'
              id='address'
              name='address'
              placeholder='Dirección'
              className='border-2 rounded | focus:outline-none focus:ring focus:border-blue-100| mt-1 px-5 py-2'
              ref={register({
                required: { value: true, message: 'Campo Requerido' },
                maxLength: {
                  value: 255,
                  message: 'No puede exceder el límite de caracteres'
                }
              })}
            />
          </label>
          <ErrorMessage
            errors={errors}
            name='address'
            render={({ message }) => (
              <h6 className='text-red-500'>{message}</h6>
            )}
          />
        </div>

        <div className='py-2'>
          <label htmlFor='contact' className='flex flex-col font-semibold'>
            Contacto:
            <input
              type='text'
              id='contact'
              name='contact'
              placeholder='Contacto'
              className='border-2 rounded | focus:outline-none focus:ring focus:border-blue-100| mt-1 px-5 py-2'
              ref={register({
                required: { value: true, message: 'Campo Requerido' },
                maxLength: {
                  value: 11,
                  message: 'No puede exceder el límite de caracteres'
                }
              })}
            />
          </label>
          <ErrorMessage
            errors={errors}
            name='contact'
            render={({ message }) => (
              <h6 className='text-red-500'>{message}</h6>
            )}
          />
        </div>

        {!customerType.includes('V-') && (
          <div className='py-2'>
            <label
              htmlFor='socialReason'
              className='flex flex-col font-semibold'
            >
              Razón Social:
              <input
                type='text'
                id='socialReason'
                name='socialReason'
                placeholder='Razón Social'
                className='border-2 rounded | focus:outline-none focus:ring focus:border-blue-100| mt-1 px-5 py-2'
                ref={register({
                  maxLength: {
                    value: 255,
                    message: 'No puede exceder el límite de caracteres'
                  }
                })}
              />
            </label>
            <ErrorMessage
              errors={errors}
              name='socialReason'
              render={({ message }) => (
                <h6 className='text-red-500'>{message}</h6>
              )}
            />
          </div>
        )}

        <div className='text-center'>
          <button
            type='submit'
            className='focus:outline-none | bg-blue-500 hover:bg-green-300 | px-4 py-2.5 mt-4 mb-5 | font-bold text-white rounded | transition-all ease-in-out  duration-400'
            onClick={() => clearErrors()}
          >
            Registrar &nbsp;
            <FontAwesomeIcon icon={faCubes} />
          </button>
        </div>
      </form>

      {response && (
        <ModalAlert
          tittle='Clientes'
          message={response.text}
          customerId={customerId}
          status={response.status}
        />
      )}
    </div>
  )
}
