import { faCircle, faKey } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'

function AdminNavbar(): React.ReactElement {
  return (
    <>
      <nav className='border-b-2 shadow-md bg-green-500 text-right pr-5 p-1'>
        <Link href='/auth/register'>
          <a className='p-2 mx-2 text-white h-full'>
            <FontAwesomeIcon icon={faCircle} />
            &nbsp; Register
          </a>
        </Link>
        <Link href='/auth/login'>
          <a className='p-2 mx-2 text-white h-full'>
            <FontAwesomeIcon icon={faKey} />
            &nbsp; Login
          </a>
        </Link>
      </nav>
    </>
  )
}

export default AdminNavbar
