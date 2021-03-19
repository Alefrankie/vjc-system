import { React } from '@ungap/global-this'
import Link from 'next/link'

type Props = {
  children: React.ReactChildren
}

export function AuthLogin ({ children, ...props }: Props) {
  return (
    <>
      <Link href='/auth/login'>
        <a {...props}>{children}</a>
      </Link>
    </>
  )
}
