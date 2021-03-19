import { useResponse } from 'hooks/useResponse'
import { useForm } from 'react-hook-form'
import { updateCustomer } from 'services/customers'
import { ModalAlert } from '../../../Elements/ModalAlert/index'
import { faCubes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ErrorMessage } from '@hookform/error-message'
import { useState } from 'react'

interface IFormInputs {
  customerId: string
  customerType: string
  name: string
  lastName: string
  dniType: string
  dni: string
  address: string
  contact: string
  socialReason: string
}

type Props = {
  currentCustomer: IFormInputs
}

export function ClientModify({ currentCustomer }: Props) {
  const { register, errors, handleSubmit, clearErrors } = useForm({
    mode: 'onSubmit',
    defaultValues: currentCustomer || {},
    reValidateMode: 'onChange',
    criteriaMode: 'all',
    shouldFocusError: true,
    shouldUnregister: true
  })
  const { response, setResponse } = useResponse()
  const [customerType, setCustomerType] = useState('V-')

  const updateClient = async (customer: IFormInputs) => {
    customer.customerType = currentCustomer.customerType
    customer.customerId = currentCustomer.customerId
    try {
      const message = await updateCustomer({
        currentCustomer: customer
      })
      setResponse({ text: message, status: 'success' })
    } catch ({ message }) {
      setResponse({ text: message, status: 'failed' })
    }
  }

  const chooseCustomerType = (e: { target: { value: string } }) => {
    setCustomerType(e.target.value)
  }
  return (
    <div className='flex justify-center mt-5'>
      <div className='container w-1/2 px-5'>
        <form onSubmit={handleSubmit(updateClient)}>
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
              Actualizar &nbsp;
              <FontAwesomeIcon icon={faCubes} />
            </button>
          </div>
        </form>

        {response && (
          <ModalAlert
            tittle='Clientes'
            message={response.text}
            status={response.status}
            redirect='/admin/clients/clientList'
          />
        )}
      </div>
    </div>
  )
}
