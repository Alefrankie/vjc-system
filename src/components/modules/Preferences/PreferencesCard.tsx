import { faCircleNotch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ErrorMessage } from '@hookform/error-message'
import { Loading } from 'components/Elements/Loading'
import ExchangeRateIcon from 'public/img/exchange-rate-icon.png'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { updatePreferences } from 'services/preferences'
import { useExchangeQuantity } from 'hooks'

type Props = {
  title: string
  rate: number
  nameRate: string
  preferences: Object
  setPreferences: any
}

export function PreferencesCard ({
  title,
  rate,
  nameRate,
  preferences,
  setPreferences
}: Props): React.ReactElement {
  const [response, setResponse] = useState('')

  const { register, errors, handleSubmit, formState } = useForm({
    reValidateMode: 'onChange',
    criteriaMode: 'all',
    shouldFocusError: true,
    shouldUnregister: true
  })
  const { isSubmitting } = formState

  const handlerSubmit = async (data: any) => {
    data = {
      ...preferences,
      rate
    }

    try {
      const { message } = await updatePreferences(data)
      setResponse(message)
    } catch ({ message }) {
      setResponse(message)
    } finally {
      setTimeout(() => {
        setResponse('')
      }, 2000)
    }
  }

  // eslint-disable-next-line no-undef
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const {
      value,
      name
    }: { value: any; name: string } = e.target as HTMLInputElement

    console.log(preferences)
    if (name === nameRate) {
      return setPreferences({
        ...preferences,
        [nameRate]: nameRate === 'ivaRate' ? value / 100 : value
      })
    }
  }

  if (isSubmitting) {
    return <Loading />
  }

  const formatterPercent = new Intl.NumberFormat('es-ES', { style: 'percent' })
  return (
    <form
      className='mt-5 flex justify-evenly flex-nowrap w-full'
      onSubmit={handleSubmit(handlerSubmit)}
    >
      <div className='border rounded shadow-lg | mx-4 px-3 py-1 '>
        <div className='text-center'>
          <h1 className='text-gray-400 font-semibold'>{title}</h1>
        </div>
        <div className='flex flex-col items-center'>
          <img
            src={ExchangeRateIcon}
            className='w-1/4 h-1/4 bg-green-500 rounded-full'
            alt='exchange - dollar - icon'
            width='100%'
            height='100%'
          />
          <h1 className='font-semibold text-lg mt-2 text-gray-400'>
            {nameRate === 'ivaRate'
              ? `${formatterPercent.format(rate)}`
              : `${useExchangeQuantity(rate)} Bs.S`}
          </h1>
        </div>

        <div className='flex flex-col'>
          <input
            type='number'
            className='border-2 rounded | focus:outline-none focus:ring focus:border-blue-100| mt-2 px-1 py-2'
            name={nameRate}
            step='0.01'
            onChange={handleOnChange}
            placeholder=' Indique la tasa de Cambio'
            ref={register({
              min: {
                value: 1,
                message: 'Error, ingrese una cantidad válida.'
              }
            })}
          />
          <div className='text-center pt-3 transition duration-1000 ease-in-out'>
            {isSubmitting ? (
              <p className='text-green-500'>
                <FontAwesomeIcon
                  icon={faCircleNotch}
                  className='animate-spin text-lg '
                />
              </p>
            ) : (
              <p className='text-green-500 font-bold'>{response}</p>
            )}
          </div>
          <button
            type='submit'
            className='focus:outline-none | bg-green-500 hover:bg-yellow-300 | px-4 py-2.5 mt-4 mb-5 | font-bold text-white rounded | transition-all ease-in-out duration-400'
          >
            Actualizar
          </button>
        </div>

        <ErrorMessage errors={errors} name={nameRate} as='h6' />
      </div>
    </form>
  )
}
