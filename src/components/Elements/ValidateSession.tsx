import Link from 'next/link'

export function ValidateSession () {
  return (
    <div className='container mx-auto pt-5'>
      <h1>Usted necesita iniciar sesión</h1>
      <Link href='/auth/login'>
        <a>Iniciar Sesión</a>
      </Link>
    </div>
  )
}
