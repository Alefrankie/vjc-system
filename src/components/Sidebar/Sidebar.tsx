import Image from 'next/image'
import Router from 'next/router'
import { NavigationBar } from './NavigationBar'

type Props = {
  isCollapsed: boolean
}

function Sidebar ({ isCollapsed }: Props): React.ReactElement {
  return (
    <aside
      className={`print:hidden bg-green-500 ${
        isCollapsed
          ? 'transform opacity-0 -translate-x-64 w-0 duration-500'
          : 'transform opacity-100 translate-x-0 w-64 duration-500'
      } print:hidden`}
    >
      <div className='relative w-full h-1/4'>
        <Image
          src='/img/logo.png'
          alt='logo.png'
          layout='fill'
          objectFit='contain'
          className='cursor-pointer'
          onClick={() => Router.push('/admin/dashboard')}
        />
      </div>
      <NavigationBar />
    </aside>
  )
}

// Sidebar.defaultProps = {
//   routes: [{}]
// }

export default Sidebar
