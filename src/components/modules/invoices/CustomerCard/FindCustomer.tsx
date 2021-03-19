import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ErrorMessage } from '@hookform/error-message'
import { useInvoice } from 'context'
import { useResponse } from 'hooks/useResponse'
import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { fetchOneCustomerByDni } from 'services/customers'
import { CustomerT } from 'types'
import { ModalAlert } from '../../../Elements/ModalAlert'

type Props = {
  customerType?: string
}

export function FindCustomer ({
  customerType = 'client'
}: Props): React.ReactElement {
  const { response, setResponse } = useResponse()
  const { errors, register, handleSubmit } = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    criteriaMode: 'all',
    shouldFocusError: true,
    shouldUnregister: true
  })
  const { setState } = useInvoice()

  const findCustomer = useCallback(
    async ({ dni }: CustomerT) => {
      if (dni.length <= 7) {
        return setResponse({ text: 'Faltan Digitos', status: 'failed' })
      }
      try {
        const { customer } = await fetchOneCustomerByDni({
          customerType,
          dni
        })
        setState({ oneCustomer: customer })
      } catch ({ message }) {
        // eslint-disable-next-line no-undef
        localStorage.setItem('dni', dni)
        setResponse({ text: 'Cliente No Encontrado', status: 'failed' })
      }
    },
    [customerType, setResponse, setState]
  )

  return (
    <>
      {response && (
        <ModalAlert
          message={response.text}
          tittle='Facturas'
          status={response.status}
          setResponse={setResponse}
        />
      )}

      <form className='' onSubmit={handleSubmit(findCustomer)}>
        <div className=''>
          <div className='border-2 rounded-full w-64 px-4 py-2 text-white'>
            <FontAwesomeIcon icon={faSearch} className='mx-2' />
            <input
              type='text'
              name='dni'
              className='bg-transparent placeholder-white focus:outline-none'
              placeholder={`Por Favor, Ingrese un ID...`}
              ref={(e: any) => {
                register(e, {
                  required: {
                    value: true,
                    message: 'Campo Requerido'
                  },
                  minLength: {
                    value: 7,
                    message:
                      customerType === 'client'
                        ? 'Cédula o RIF Inválido'
                        : 'RIF Inválido '
                  },
                  maxLength: {
                    value: 20,
                    message: `Máximo 20 digitos`
                  }
                })
              }}
            />
          </div>
          <ErrorMessage errors={errors} name='password' as='h6' />
        </div>
      </form>
    </>
  )
}

// const MemoizedFindCustomer = memo(FindCustomer)
// export { MemoizedFindCustomer as FindCustomer }
