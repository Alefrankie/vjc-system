import AdminFooter from 'components/Footers/AdminFooter'
import AdminNavbar from 'components/Navbars/AdminNavbar'
import SidebarTailwind from 'components/Sidebar/Sidebar'
import { useUser } from 'context/UserContext'
import Router from 'next/router'
import { ReactNode, useEffect, useRef, useState } from 'react'
import { getToken } from 'hooks/useAuthHelper'

type Props = {
  children: ReactNode
}

function Admin ({ children }: Props): React.ReactElement {
  const { user } = useUser()
  let mainContentRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (document.scrollingElement && mainContentRef.current) {
      document.documentElement.scrollTop = 0
      document.scrollingElement.scrollTop = 0
      mainContentRef.current.scrollTop = 0
    }

    if (!user && getToken()) {
      Router.push('/auth/login')
    }
  }, [])
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <>
      <div className='flex flex-col h-screen'>
        <AdminNavbar
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
        />
        <div className='flex h-full'>
          <SidebarTailwind isCollapsed={isCollapsed} />
          <main className='flex justify-between flex-col | w-full | overflow-y-auto | print:overflow-visible'>
            {children}
            <AdminFooter />
          </main>
        </div>
      </div>
    </>
  )
}

export default Admin
