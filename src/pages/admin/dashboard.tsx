import { HeaderAdmin } from 'components/Headers/HeaderAdmin'
import Admin from 'layouts/Admin'
import Image from 'next/image'

const Dashboard = () => {
  return (
    <>
      <HeaderAdmin />
      <div className='w-full h-full relative'>
        <Image
          src='/img/logo.png'
          alt='logo vjc imports c.a'
          layout='fill'
          objectFit='contain'
          className='transform opacity-100 scale-90 w-0 duration-500 hover:scale-100'
        />
      </div>
    </>
  )
}

Dashboard.layout = Admin

export default Dashboard
