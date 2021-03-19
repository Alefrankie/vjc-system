import { ModalAlert } from 'components/Elements/ModalAlert'
import { useResponse } from 'hooks/useResponse'
import { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import { registerCustomer } from 'services/customers'
import { CustomerT } from 'types'
import { v4 as uuidv4 } from 'uuid'

export function ProviderForm () {
  const { register, errors, handleSubmit, reset } = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    criteriaMode: 'all',
    shouldFocusError: true,
    shouldUnregister: true
  })
  const [customerId, setCustomerId] = useState('')
  const { response, setResponse } = useResponse()

  const onSend = useCallback(
    async (provider: CustomerT) => {
      provider.customerId = uuidv4()
      provider.customerType = 'provider'
      reset(provider)
      try {
        const { message } = await registerCustomer({
          currentCustomer: provider
        })
        setCustomerId(provider.customerId)
        setResponse({ text: message, status: 'success' })
      } catch (error) {
        setResponse({ text: error, status: 'failed' })
      }
    },
    [reset, setCustomerId, setResponse]
  )

  return (
    <div className='client-form'>
      {response && (
        <ModalAlert
          tittle='Proveedores'
          message={response.text}
          redirect={`/shopping/order/${customerId}`}
          status={response.status}
        />
      )}
      <form>
        <div
          className='body-product-form'
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
          onSubmit={handleSubmit(onSend)}
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
                  d='M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z'
                />
              </svg>
            </span>
            Registrar
          </button>
        </div>
      </form>
    </div>
  )
}
