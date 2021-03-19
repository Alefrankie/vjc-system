import { faKey, faUserAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'

function AdminNavbar (): React.ReactElement {
  return (
    <>
      <nav className='bg-green-500 | text-right | pr-5 py-1 | border-b-2 | shadow-md | border border-green-400'>
        <Link href='/auth/register'>
          <a className='inline-block | text-white font-semibold | m-1 mr-2 | transform duration-200 hover:scale-110'>
            <FontAwesomeIcon icon={faUserAlt} />
            &nbsp; Register
          </a>
        </Link>
        <Link href='/auth/login'>
          <a className='inline-block | text-white font-semibold | m-1 mr-2 | transform duration-200 hover:scale-110'>
            <FontAwesomeIcon icon={faKey} />
            &nbsp; Login
          </a>
        </Link>
      </nav>
    </>
  )
}

export default AdminNavbar
