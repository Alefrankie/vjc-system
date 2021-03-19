import React, { useEffect } from 'react'
import Router from 'next/router'

export default function _error (): React.ReactElement {
  useEffect(() => {
    Router.push('/admin/dashboard')
  }, [])

  return <div />
}
