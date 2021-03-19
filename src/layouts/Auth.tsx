import AuthFooter from 'components/Footers/AuthFooter'
import AuthNavbar from 'components/Navbars/AuthNavbar'
import { ReactNode, useEffect } from 'react'

type Props = {
  children?: ReactNode
}

function Auth ({ children }: Props): React.ReactElement {
  useEffect(() => {
    document.body.classList.add('bg-default')
    // Specify how to clean up after this effect:
    return function cleanup () {
      document.body.classList.remove('bg-default')
    }
  }, [])

  return (
    <>
      <div className='flex flex-col | h-screen'>
        <AuthNavbar />
        <div className='flex | h-full'>
          <main className='flex flex-col justify-between | w-full'>
            {children}
            <AuthFooter />
          </main>
        </div>
      </div>
    </>
  )
}

export default Auth
