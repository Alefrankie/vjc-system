import { Loading } from 'components/Elements/Loading'
import { ModalAlert } from 'components/Elements/ModalAlert'
import { ValidateSession } from 'components/Elements/ValidateSession'
import { useUser } from 'context'
import { useResponse } from 'hooks/useResponse'
import { useForm } from 'react-hook-form'
import { updateCustomer } from 'services/customers'

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
  currentCustomer: any
}

export function ProviderModify ({ currentCustomer }: Props) {
  const { user, isLoading } = useUser()
  const { response, setResponse } = useResponse()
  const { register, errors, handleSubmit } = useForm({
    mode: 'onSubmit',
    defaultValues: currentCustomer || {},
    reValidateMode: 'onChange',
    criteriaMode: 'all',
    shouldFocusError: true,
    shouldUnregister: true
  })

  const updateProvider = async (customer: IFormInputs) => {
    customer.customerType = currentCustomer.customerType
    customer.customerId = currentCustomer.customerId
    try {
      const { message } = await updateCustomer({
        currentCustomer: customer
      })
      setResponse({ text: message, status: 'success' })
      return window.location.replace('/shopping/providers')
    } catch ({ message }) {
      setResponse({ text: message, status: 'failed' })
    }
  }

  if (!user) {
    return <ValidateSession />
  }

  if (isLoading) {
    return <Loading />
  }

  return (
    <div className='client-form'>
      {response && (
        <ModalAlert
          message={response.text}
          tittle='Clientes'
          status={response.status}
        />
      )}
      <div style={{ height: '10rem' }} />
      <form>
        <div
          className='body-product-form'
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
          onSubmit={handleSubmit(updateProvider)}
        >
          <div className='container-input'>
            <div className='input-div'>
              <input
                type='text'
                name='name'
                maxLength={255}
                placeholder='Nombre del Proveedor'
                style={{ width: '40rem' }}
                ref={register({
                  required: { value: true, message: 'Campo Requerido' }
                })}
              />
            </div>

            <div>{errors?.name?.message}</div>

            <div className='input-div' style={{ display: 'flex' }}>
              <select
                name='dniType'
                defaultValue='J-'
                className='form-control'
                style={{ width: '4rem', marginRight: '0.5rem', color: 'gray' }}
                ref={register({
                  required: { value: true, message: 'Campo Requerido' }
                })}
              >
                <option value='J-'>J-</option>
                <option value='G-'>G-</option>
              </select>

              <input
                type='text'
                name='dni'
                maxLength={255}
                placeholder='Ingrese el Rif de la empresa (Sin caracteres especiales)'
                ref={register({
                  required: { value: true, message: 'Campo Requerido' }
                })}
              />
            </div>
            <div>{errors?.dni?.message}</div>

            <div className='input-div'>
              <input
                type='text'
                name='address'
                maxLength={255}
                placeholder='Dirección'
                ref={register({
                  required: { value: true, message: 'Campo Requerido' }
                })}
              />
            </div>
            <div>{errors?.address?.message}</div>

            <div className='input-div'>
              <input
                type='text'
                name='contact'
                maxLength={11}
                placeholder='Contacto'
                ref={register({
                  required: { value: true, message: 'Campo Requerido' }
                })}
              />
            </div>
            <div>{errors?.contact?.message}</div>
          </div>
        </div>

        <div className='container-button text-center'>
          <button
            type='submit'
            className='btn-success'
            style={{ margin: '0 0.8rem' }}
          >
            <span style={{ marginRight: '0.5rem' }}>
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
                  d='M290.74 93.24l128.02 128.02-277.99 277.99-114.14 12.6C11.35 513.54-1.56 500.62.14 485.34l12.7-114.22 277.9-277.88zm207.2-19.06l-60.11-60.11c-18.75-18.75-49.16-18.75-67.91 0l-56.55 56.55 128.02 128.02 56.55-56.55c18.75-18.76 18.75-49.16 0-67.91z'
                />
              </svg>
            </span>
            Actualizar
          </button>
        </div>
      </form>
    </div>
  )
}
