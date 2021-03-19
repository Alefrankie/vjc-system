import { faCircleNotch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

type Props = {
  path: string
}

export default function PageChange ({ path }: Props): React.ReactElement {
  return (
    <div>
      <div className='page-transition-wrapper-div'>
        <div className='fixed top-0 bottom-0 left-0 right-0 w-screen h-screen bg-black bg-opacity-50 z-50'>
          <div className='flex flex-col justify-center items-center h-full'>
            <FontAwesomeIcon
              icon={faCircleNotch}
              className='animate-spin text-blue-500'
              style={{ fontSize: '10rem' }}
            />
            <h4 className='title text-white'>
              Loading page contents for: {path}
            </h4>
          </div>
        </div>
      </div>
    </div>
  )
}
