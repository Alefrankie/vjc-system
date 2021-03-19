import {
  faCircleNotch,
  faLock,
  faPaperPlane,
  faUser
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ErrorMessage } from '@hookform/error-message'
import { useUser } from 'context'
import Auth from 'layouts/Auth'
import Link from 'next/link'
import Router from 'next/router'
import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { signIn } from 'services/users'
import { UserT } from 'types'

function Login() {
  const { setState, user } = useUser()
  const [response, setResponse] = useState('')

  useEffect(() => {
    if (user) {
      Router.push('/admin/dashboard')
    }
  }, [user])

  const {
    register,
    errors,
    handleSubmit,
    formState,
    reset,
    clearErrors
  } = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    criteriaMode: 'all',
    shouldFocusError: true,
    shouldUnregister: true
  })
  const { isSubmitting } = formState

  const onSubmit = async (data: UserT) => {
    const { username, password } = data
    try {
      const { user } = await signIn({ username, password })
      setState({ user })
      reset({})
      setTimeout(() => {
        Router.push('/admin/dashboard')
      }, 100)
      setResponse('User logged successfully')
    } catch ({ message }) {
      setResponse(message)
      reset(data)
    } finally {
      clearErrors()
    }
  }

  return (
    <>
      <div className='container mx-auto mt-5 h-1/2 sm:w-3/4 md:w-1/2 lg:w-1/3 | border shadow-lg rounded'>
        <div className='rounded bg-white h-full mb-5'>
          <form className='text-center px-4' onSubmit={handleSubmit(onSubmit)}>
            <p className='text-gray-400 text-sm font-medium border-b pt-10 pb-2 w-48 mx-auto'>
              Sign in with credentials
            </p>
            <div className='flex flex-col mt-8 relative'>
              <FontAwesomeIcon
                icon={faUser}
                className='absolute top-5 left-4 text-gray-400'
              />
              <input
                type='text'
                className='border-2 rounded | focus:outline-none focus:ring focus:border-blue-100| my-2 px-10 py-2'
                name='username'
                placeholder='Username'
                autoComplete='off'
                ref={register({
                  required: {
                    value: true,
                    message: 'Campo Usuario Requerido'
                  },
                  minLength: { value: 5, message: 'Mínimo 5 caracteres' },
                  maxLength: {
                    value: 8,
                    message: 'Máximo 8 caracteres'
                  }
                })}
              />
              <ErrorMessage
                errors={errors}
                name='username'
                className='text-red-500'
                as='h6'
              />

              <FontAwesomeIcon
                icon={faLock}
                className='absolute top-24 left-4 text-gray-400'
              />
              <input
                type='password'
                name='password'
                className='border-2 rounded | focus:outline-none focus:ring focus:border-blue-100| mt-6 px-10 py-2'
                placeholder='Password'
                autoComplete='off'
                ref={register({
                  required: {
                    value: true,
                    message: 'Campo Contraseña Requerido'
                  },
                  minLength: { value: 5, message: 'Mínimo 5 caracteres' },
                  maxLength: {
                    value: 16,
                    message: 'Máximo 16 caracteres'
                  }
                })}
              />
              <ErrorMessage
                errors={errors}
                name='password'
                className='text-red-500'
                as='h6'
              />
            </div>

            <button className='focus:outline-none | bg-blue-500 hover:bg-green-300 | px-4 py-2.5 mt-5 mb-5 | font-bold text-white rounded | transition-all ease-in-out  duration-400'>
              Iniciar Sesión &nbsp;
              <FontAwesomeIcon icon={faPaperPlane} />
            </button>
            {isSubmitting ? (
              <p className='text-green-500'>
                <FontAwesomeIcon
                  icon={faCircleNotch}
                  className='animate-spin text-lg '
                />
              </p>
            ) : (
                <p className='text-red-500 font-bold'>{response}</p>
              )}
          </form>
        </div>
        <div className='flex justify-between pt-4'>
          <Link href='#'>
            <a className='text-gray-500 font-semibold hover:scale-2 -mt-5 text-sm'>
              ¿Olvidó su Contraseña?
            </a>
          </Link>
          <Link href='/auth/register'>
            <a className='text-gray-500 font-semibold hover:scale-2 -mt-5 text-sm '>
              Create new account
            </a>
          </Link>
        </div>
      </div>
    </>
  )
}

Login.layout = Auth

export default Login
