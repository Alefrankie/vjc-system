import { ReactNode, useState } from 'react'
import ReactDOM from 'react-dom'

type Props = {
  children: ReactNode
}
function Modal ({ children }: Props): React.ReactElement {
  const [show, setShow] = useState(true)

  const onClose = () => {
    return setShow(false)
  }

  return (
    <>
      {show && (
        <div className='modal-own' onClick={onClose}>
          <div className='modal-content' onClick={onClose}>
            ´{children}
          </div>
        </div>
      )}
    </>
  )
}

function ModalPortal ({ children }: Props) {
  return ReactDOM.createPortal(
    <Modal>{children}</Modal>,
    document.getElementById('_next') as HTMLElement
  )
}

export { ModalPortal as Modal }
