import {
  faBars,
  faCogs,
  faToggleOff,
  faToggleOn,
  faUser,
  faUserCog
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ModalAlert } from 'components/Elements/ModalAlert'
import { useUser } from 'context'
import { deleteToken } from 'hooks'
import { useResponse } from 'hooks/useResponse'
import Link from 'next/link'
import { useState } from 'react'
import { logoutUser } from 'services/users'

type Props = {
  isCollapsed: boolean
  setIsCollapsed: any
}

function AdminNavbar ({
  isCollapsed,
  setIsCollapsed
}: Props): React.ReactElement {
  const { user, setState } = useUser()
  const [isOn, setIsOn] = useState(false)
  const { response, setResponse } = useResponse()

  const logout = async () => {
    try {
      const { message } = await logoutUser({ userId: user?.userId })
      deleteToken()
      setState({ user: null })
      setResponse({ text: message, status: 'success' })
    } catch ({ message }) {
      setResponse({ text: message, status: 'failed' })
    }
  }

  const expandMenu = () => {
    setIsOn(!isOn)
  }

  const sidebarCollapse = () => {
    setIsCollapsed(!isCollapsed)
  }

  return (
    <>
      <nav className='flex justify-between p-1 px-4 bg-green-500 noPrint'>
        <div className='text-center'>
          <button
            type='button'
            className='p-2 focus:outline-none'
            onClick={sidebarCollapse}
          >
            <FontAwesomeIcon
              className='text-white text-xl'
              icon={isCollapsed ? faToggleOff : faToggleOn}
            />
          </button>
        </div>

        <div className='relative inline-block text-left'>
          <button
            className='text-white text-lg p-2 focus:outline-none'
            onClick={expandMenu}
          >
            <FontAwesomeIcon icon={faBars} />
          </button>

          <div
            className={`origin-top-right right-0 absolute mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10 ${
              isOn
                ? 'transform opacity-100 scale-100'
                : 'transform opacity-0 scale-0'
            }`}
          >
            <div
              className='py-1'
              role='menu'
              aria-orientation='vertical'
              aria-labelledby='options-menu'
            >
              <Link href='/admin/profile'>
                <a
                  className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                  role='menuitem'
                >
                  <FontAwesomeIcon
                    icon={faUser}
                    className='text-green-500 text-lg cursor-pointer'
                  />
                  &nbsp; Mi Perfil
                </a>
              </Link>
              <Link href='/admin/profile'>
                <a
                  className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                  role='menuitem'
                >
                  <FontAwesomeIcon
                    icon={faCogs}
                    className='text-green-500 text-lg cursor-pointer'
                  />
                  &nbsp; Configuraciones
                </a>
              </Link>
              <button
                className='px-4 text-left w-full py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none'
                role='menuitem'
                onClick={logout}
              >
                <FontAwesomeIcon
                  icon={faUserCog}
                  className='text-green-500 text-lg cursor-pointer'
                />
                &nbsp; Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      </nav>

      {response && (
        <ModalAlert
          message={response.text}
          redirect='/auth/login'
          tittle={`Gracias por visitarnos Sr.(a)`}
          status={response.status}
        />
      )}
    </>
  )
}

export default AdminNavbar
