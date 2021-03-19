import { Loading } from 'components/Elements/Loading'
import { ModalAlert } from 'components/Elements/ModalAlert'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { updatePreferences } from 'services/preferences'
import { PreferencesT } from 'types'
import { useResponse } from 'hooks/useResponse'

type Props = {
  typeUnit: string
  preferences: any
}

export function LimitCardQuantities ({
  typeUnit,
  preferences
}: Props): React.ReactElement {
  const [currentPreferences, setCurrentPreferences] = useState(preferences)
  const { response, setResponse } = useResponse()
  const { register, errors, handleSubmit, formState, clearErrors } = useForm<
    PreferencesT
  >({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    resolver: undefined,
    context: undefined,
    criteriaMode: 'firstError',
    shouldFocusError: true,
    shouldUnregister: true
  })
  const { isSubmitting } = formState

  const handlerSubmit = async (dataInputs: PreferencesT) => {
    try {
      const { message } = await updatePreferences({ data: dataInputs })
      setResponse({ text: message, status: 'success' })
    } catch (error) {
      setResponse({ text: error, status: 'failed' })
    }
  }

  // eslint-disable-next-line no-undef
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const {
      value,
      name
    }: // eslint-disable-next-line no-undef
    { value: any; name: any } = e.target as HTMLInputElement
    return setCurrentPreferences({
      ...preferences,
      [name]: value
    })
  }

  if (isSubmitting) {
    return <Loading />
  }

  return (
    <form
      className='container'
      onSubmit={handleSubmit(handlerSubmit)}
      style={{ width: '100%', marginBottom: '3rem' }}
    >
      {response && (
        <ModalAlert
          tittle='Preferencias'
          message={response.text}
          status={response.status}
        />
      )}
      <div>
        <div>
          {typeUnit === 'limitLts' && (
            <h3 style={{ textAlign: 'center' }}>Lts.</h3>
          )}
          {typeUnit === 'limitUnits' && (
            <h3 style={{ textAlign: 'center' }}>Units.</h3>
          )}
          {typeUnit === 'limitKgs' && (
            <h3 style={{ textAlign: 'center' }}>Kg.s.</h3>
          )}
          {typeUnit === 'limitGr' && (
            <h3 style={{ textAlign: 'center' }}>Grs.</h3>
          )}
        </div>
        <div
          className='card-header'
          style={{ display: 'flex', justifyContent: 'center' }}
        >
          {typeUnit === 'limitLts' && (
            <h1>{currentPreferences.limitLts || 0}</h1>
          )}
          {typeUnit === 'limitUnits' && (
            <h1>{currentPreferences.limitUnits || 0}</h1>
          )}
          {typeUnit === 'limitKgs' && (
            <h1>{currentPreferences.limitKgs || 0}</h1>
          )}
          {typeUnit === 'limitGr' && <h1>{currentPreferences.limitGr || 0}</h1>}
        </div>
        <div className='card-body'>
          <div
            className='container-exchange-rate'
            style={{ marginTop: '0.625rem' }}
          >
            <div className='container-exchange-rate-input'>
              <input
                type='number'
                name={typeUnit}
                step='0.01'
                onChange={handleOnChange}
                placeholder='Indique la cantidad mínima antes de recibir una Alerta'
                ref={register({
                  min: {
                    value: 1,
                    message: 'Error, ingrese un porcentaje válido.'
                  },
                  max: {
                    value: 100,
                    message: 'Error, ingrese un porcentaje válido.'
                  }
                })}
              />
            </div>
          </div>
        </div>
        <button type='submit' onClick={() => clearErrors()}>
          Actualizar
        </button>

        {errors?.typeUnit?.message && (
          <ModalAlert
            tittle='Preferencias'
            message={errors?.typeUnit?.message}
            status='failed'
          />
        )}
        {response && (
          <ModalAlert
            tittle='Preferencias'
            message={response.text}
            status={response.status}
          />
        )}
      </div>
    </form>
  )
}
