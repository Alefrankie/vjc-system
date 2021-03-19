import {
  faCircleNotch,
  faLock,
  faPaperPlane,
  faUser
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ErrorMessage } from '@hookform/error-message'
import { ModalAlert } from 'components/Elements/ModalAlert'
import { GetServerSideProps } from 'next'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { fetchOneUser, updateUser } from 'services/users'
import { UserT } from 'types'

type Props = {
  currentUser: UserT
}

function PageComponent({ currentUser }: Props): React.ReactElement {
  const [response, setResponse] = useState('')

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
    defaultValues: {
      username: currentUser.username,
      password: '',
      privileges: currentUser.privileges
    },
    criteriaMode: 'all',
    shouldFocusError: true,
    shouldUnregister: true
  })
  const { isSubmitting } = formState

  const onSubmit = async (data: UserT) => {
    const { username, password, privileges } = data
    try {
      const message = await updateUser({
        username,
        password,
        privileges,
        userId: currentUser.userId
      })
      reset({})
      setResponse(message)
    } catch ({ message }) {
      setResponse(message)
      reset(data)
    } finally {
      clearErrors()
    }
  }

  if (!currentUser) {
    return (
      <div>
        <ModalAlert
          tittle='Usuarios'
          message='Usuario No Encontrado'
          status='failed'
          redirect='/admin/users/usersList/'
        />
      </div>
    )
  }

  return (
    <>
      <div className='container mx-auto mt-5 h-1/2 sm:w-3/4 md:w-1/2 lg:w-1/3 | border shadow-lg rounded'>
        <div className='rounded bg-white h-full mb-5'>
          <form className='text-center px-4' onSubmit={handleSubmit(onSubmit)}>
            <p className='text-gray-400 text-sm font-medium border-b pt-10 pb-2 w-48 mx-auto'>
              Update your credentials
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

              <div className='w-full relative'>
                <FontAwesomeIcon
                  icon={faLock}
                  className='absolute top-9 left-4 text-gray-400'
                />
                <select
                  id='privileges'
                  name='privileges'
                  defaultValue='User'
                  className='border-2 rounded | focus:outline-none focus:ring focus:border-blue-100| mt-6 px-9 w-full py-2 | text-gray-400'
                  ref={register({
                    required: { value: true, message: 'Campo Requerido' }
                  })}
                >
                  <option value='User'>User</option>
                  <option value='Admin'>Admin</option>
                </select>
                <ErrorMessage
                  errors={errors}
                  name='privileges'
                  className='text-red-500'
                  as='h6'
                />
              </div>
            </div>

            <button className='focus:outline-none | bg-blue-500 hover:bg-green-300 | px-4 py-2.5 mt-5 mb-5 | font-bold text-white rounded | transition-all ease-in-out  duration-400'>
              Actualizar &nbsp;
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
      </div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({
  query: { userId }
}) => {
  try {
    const { user } = await fetchOneUser({ keyword: String(userId) })
    return {
      props: {
        currentUser: user
      }
    }
  } catch ({ message }) {
    return {
      props: {
        currentUser: null
      }
    }
  }
}

export default PageComponent
