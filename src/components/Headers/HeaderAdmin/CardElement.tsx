import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

type Props = {
  title: string
  footerTitle: string
  icon: IconProp
  stats: Number
}

export function CardElement ({
  title,
  footerTitle,
  stats,
  icon
}: Props): React.ReactElement {
  return (
    <>
      <div className='mx-2 cursor-pointer border rounded shadow-md w-full px-3 py-1 transform duration-300 hover:scale-110'>
        <p className='text-gray-400 font-semibold border-t shadow-inner'>
          {title}
        </p>

        <div className='flex justify-between'>
          <p className='text-gray-400 font-semibold'>{stats}</p>
          <FontAwesomeIcon icon={icon} className='text-green-500 text-3xl' />
        </div>
        <div>
          <p>
            <FontAwesomeIcon icon={faCheckCircle} className='text-yellow-500' />
            &nbsp;{footerTitle}
          </p>
        </div>
      </div>
    </>
  )
}
