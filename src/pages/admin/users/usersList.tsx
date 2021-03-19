import { faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ModalAlert } from 'components/Elements/ModalAlert'
import { NoRegisteredItems } from 'components/Elements/NoRegisteredItems'
import { useUser } from 'context'
import { useResponse } from 'hooks/useResponse'
import Admin from 'layouts/Admin'
import { GetServerSideProps } from 'next'
import Link from 'next/link'
import { useState } from 'react'
import { deleteUser, fetchAllUsers } from 'services/users'
import { UserT } from '../../../types/index'

type Props = {
  users: UserT[]
}

function PageComponent ({ users }: Props) {
  const { user } = useUser()
  const { response, setResponse } = useResponse()
  const [currentUsers, setCurrentUsers] = useState(users)

  const deleteUserOfApi = async (userId: string) => {
    try {
      const { message } = await deleteUser({ keyword: userId })
      setResponse({ text: message, status: 'success' })
      setCurrentUsers(
        users.filter((e: { userId: string }) => e.userId !== userId)
      )
    } catch ({ message }) {
      setResponse({ text: message, status: 'failed' })
    }
  }

  if (user?.privileges === 'User') {
    return (
      <div>
        <ModalAlert
          message={'Usted no posee permiso para entrar a éste modulo'}
          redirect='/admin/dashboard'
          tittle={`Sr(a). ${user.username}`}
          status='success'
        />
      </div>
    )
  }

  return (
    <>
      {response && (
        <div>
          <ModalAlert
            tittle='Usuarios'
            message={response.text}
            status={response.status}
            setResponse={setResponse}
          />
        </div>
      )}
      <div className='flex flex-col border rounded mt-5 mx-5'>
        <div className='-my-2 overflow-hidden overflow-y-auto sm:-mx-6 lg:-mx-8'>
          <div className='py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8'>
            <div
              className='shadow overflow-y-auto border-b border-gray-200 sm:rounded-lg'
              style={{ maxHeight: '70vh' }}
            >
              <table className='min-w-full divide-y divide-gray-200'>
                <thead className='bg-gray-50'>
                  <tr className='bg-gray-100'>
                    <th
                      scope='col'
                      className='px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                    >
                      #
                    </th>
                    <th
                      scope='col'
                      className='py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                    >
                      Nombre y Apellido
                    </th>
                    <th
                      scope='col'
                      className='py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                    >
                      Cédula
                    </th>
                    <th
                      scope='col'
                      className='py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                    >
                      Usuario
                    </th>
                    <th
                      scope='col'
                      className='py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                    >
                      Privilegios
                    </th>
                    <th
                      scope='col'
                      className='py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                    ></th>
                  </tr>
                </thead>

                {currentUsers.length > 0 && (
                  <tbody>
                    {currentUsers.map((e: UserT, index: number) => (
                      <tr key={index} className='text-xs'>
                        <td className='py-2 whitespace-nowrap text-center'>
                          {index + 1}
                        </td>
                        <td className='py-2 whitespace-nowrap'>
                          {`${e.name} ${e.lastName}`}
                        </td>
                        <td className='py-2 whitespace-nowrap'>V-{e.dni}</td>
                        <td className='py-2 whitespace-nowrap'>{e.username}</td>
                        <td className='py-2 whitespace-nowrap'>
                          {e.privileges}
                        </td>

                        <td className='py-2 whitespace-nowrap text-center text-sm flex justify-evenly'>
                          <Link href={`/admin/users/update/${e.userId}`}>
                            <button className='focus:outline-none'>
                              <FontAwesomeIcon
                                icon={faPencilAlt}
                                className='text-blue-500 text-lg cursor-pointer'
                              />
                            </button>
                          </Link>

                          <button
                            onClick={() => deleteUserOfApi(e.userId)}
                            className='focus:outline-none'
                          >
                            <FontAwesomeIcon
                              icon={faTrash}
                              className='text-red-500 text-lg cursor-pointer '
                            />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                )}

                {currentUsers.length <= 0 && (
                  <tbody>
                    <tr>
                      <td colSpan={7}>
                        <NoRegisteredItems message='No se encontraron registros' />
                      </td>
                    </tr>
                  </tbody>
                )}
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (
  ctx
): Promise<any> => {
  console.log('\n\n\n\n', ctx.req.headers.cookie)
  let users
  try {
    const { users: currentUsers } = await fetchAllUsers()
    users = currentUsers
  } catch ({ message }) {
    users = []
  }

  return { props: { users } }
}

PageComponent.layout = Admin

export default PageComponent
