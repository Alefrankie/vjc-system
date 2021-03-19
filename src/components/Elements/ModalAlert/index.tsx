import { faCheck, faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Router, { useRouter } from 'next/router'
import { useState } from 'react'

type Props = {
  message: string | undefined
  redirect?: string
  status?: string
  tittle?: string
  customerId?: string
  setResponse?: any
}
export function ModalAlert({
  message = 'Operación realizada correctamente',
  redirect,
  tittle,
  status,
  customerId,
  setResponse
}: Props): React.ReactElement {
  const router = useRouter()
  const [show, setShow] = useState(true)

  const handleOnClick = (url: string) => {
    router.push(url, url)
    setShow(false)
  }

  const handleClose = (): void => {
    if (redirect) {
      Router.push(redirect)
      return
    }
    if (setResponse) {
      setResponse(null)
    }
    setShow(false)
  }

  return (
    <div
      className={`flex justify-center top-0 bottom-0 left-0 right-0 w-screen h-screen bg-black bg-opacity-50 ${
        show ? 'fixed' : 'hidden'
        }`}
      onClick={handleClose}
      style={{ zIndex: 99999999999999 }}
    >
      <div className='flex justify-center items-center w-2/3 h-full px-2'>
        <div className='container mx-auto bg-white rounded shadow-lg px-3 py-4'>
          <header className='font-semibold pb-2 flex justify-between'>
            <p className='mt-1'>{tittle}</p>
            <button
              className='text-xl font-semibold | mr-2 px-1 w-8 h-8 | hover:bg-red-500 focus:outline-none'
              style={{ borderRadius: '100%' }}
              onClick={handleClose}
            >
              X
            </button>
          </header>
          <main className='text-center'>
            {status === 'success' && (
              <FontAwesomeIcon
                icon={faCheck}
                className='rounded-full bg-green-600 p-1 text-5xl text-white my-4'
              />
            )}

            {status === 'failed' && (
              <FontAwesomeIcon
                icon={faTimesCircle}
                className='bg-white text-5xl text-red-500'
                style={{ borderRadius: '100%' }}
              />
            )}

            <h1 className='text-center font-semibold py-4'>
              {message || null}
            </h1>
          </main>

          <footer className='flex flex-row-reverse'>
            {customerId && (
              <div>
                <button
                  className="focus:outline-none"
                  onClick={() =>
                    window.location.replace(
                      `/admin/invoices/createInvoice?customerId=${customerId}&invoiceType=DeliveryNote:Retail`
                    )
                  }
                >
                  Nota de Entrega Al Detal
                </button>
                <button
                  className="focus:outline-none"
                  onClick={() =>
                    window.location.replace(
                      `/admin/invoices/createInvoice?customerId=${customerId}&invoiceType=DeliveryNote:Wholesale`
                    )
                  }
                >
                  Nota De Entrega Al Mayor
                </button>
              </div>
            )}

            {message === 'Cliente No Encontrado' && (
              <button
                className='bg-blue-500 hover:bg-green-300 | px-4 py-2 w-64 | font-bold text-white text-md rounded | transition-all ease-in-out duration-400 |focus:outline-none'
                onClick={() => handleOnClick('/admin/clients/clientForm')}
              >
                Registrar Cliente
              </button>
            )}

            {message === 'Usted ha iniciado sesión correctamente' && (
              <button onClick={() => handleOnClick('/admin/dashboard')}>
                Home
              </button>
            )}
          </footer>
        </div>
      </div>
    </div>
  )
}

// const MemoizedModalAlert = memo(ModalAlert)
// export { MemoizedModalAlert as ModalAlert }
