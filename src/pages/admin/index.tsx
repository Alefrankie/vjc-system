import Router from 'next/router'
import { useEffect } from 'react'

function IndexPageAPP (): React.ReactElement {
  useEffect(() => {
    Router.push('/admin/dashboard')
  }, [])
  return <div />
}

export default IndexPageAPP
