import { faCircleNotch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export function Loading (): React.ReactElement {
  return (
    <div className='fixed top-0 bottom-0 left-0 right-0 w-screen h-screen bg-black bg-opacity-50'>
      <div className='flex justify-center items-center h-full'>
        <FontAwesomeIcon
          icon={faCircleNotch}
          className='animate-spin text-blue-500'
          style={{ fontSize: '10rem' }}
        />
      </div>
    </div>
  )
}
