import Image from 'next/image'
import NoItems from 'public/img/no-elements.svg'

type Props = {
  message?: string
  width?: string
  height?: string
}

export function NoRegisteredItems ({
  message = 'No Existen Elementos Registrados'
}: Props) {
  return (
    <>
      <div className='flex flex-col justify-center items-center'>
        <Image src={NoItems} alt='box' width='100%' height='100%' />
        <p className='text-center uppercase'>{message}</p>
      </div>
    </>
  )
}
