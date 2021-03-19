import { faPiggyBank } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useInvoice } from 'context'
import { useResponse } from 'hooks/useResponse'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { sendInvoice } from 'services/invoice'
import { ProductT } from 'types'
import { useGetDate } from 'hooks'
import { useExchangeQuantity } from 'hooks'
import { v4 as uuidv4 } from 'uuid'
import { ModalAlert } from 'components/Elements/ModalAlert'
type Props = {
  invoiceType: string
  preferences: any
}

export function ConfirmationPane({
  preferences: { ivaRate },
  invoiceType
}: Props): React.ReactElement {
  const {
    cart,
    invoice,
    invoice: { exchangeRate },
    setState
  } = useInvoice()

  const { response, setResponse } = useResponse()
  const [redirect, setRedirect] = useState('')
  const { register, handleSubmit } = useForm()

  useEffect(() => {
    const InvoiceInit = () => {
      setState({
        invoice: {
          controlNumber: '',
          invoiceId: uuidv4(),
          invoiceDate: useGetDate()
        }
      })
    }
    InvoiceInit()
  }, [invoiceType, setState])

  // console.log(invoice)

  let subTotalSale: number = 0
  let ivaSale: number = 0
  let totalSale: number = 0
  const acumulater = () => {
    cart.map(
      (e: ProductT) =>
        (subTotalSale +=
          e.productPrice * e.quantityRequested -
          e.productPrice * e.quantityRequested * e.productDiscount)
    )
    ivaSale += subTotalSale * ivaRate
    totalSale = subTotalSale
  }
  acumulater()

  const OnSubmit = async (data: any) => {
    if (cart.length <= 0) {
      setResponse({
        text: 'No puede completar una factura sin añadir productos al carrito',
        status: 'failed'
      })
      return
    }
    // SENDING INVOICE
    invoice.invoiceType = invoiceType
    invoice.payCondition = data.payCondition

    const res = await sendInvoice({
      cart,
      invoice
    })

    const { error, redirectFromApi } = res
    if (error) {
      setResponse({ text: error, status: 'failed' })
      return
    }
    setRedirect(redirectFromApi)

    setState({
      cart: [],
      sales: [],
      oneCustomer: null,
      oneProduct: null
    })
  }

  return (
    <>
      <div className='flex justify-center items-center | border shadow-md rounded | mt-3 p-2'>
        <div className='w-64 p-2 mb-2'>

          {/* FACTURA FISCAL */}
          {invoiceType.includes('Sales') && (
            <>
              <p className='text-white font-bold | mt-2 rounded-full bg-yellow-500 px-3 py-2'>
                {`Sub-Total: ${useExchangeQuantity(
                  subTotalSale,
                  exchangeRate
                )} Bs.S`}
              </p>

              <p className='text-white font-bold | mt-2 rounded-full bg-red-500 px-3 py-2'>{`IVA: ${useExchangeQuantity(
                ivaSale,
                exchangeRate
              )} Bs.S`}</p>

              <p className='text-white font-bold | mt-2 rounded-full bg-green-500 px-3 py-2'>
                {`Total: ${useExchangeQuantity(
                  subTotalSale + ivaSale,
                  exchangeRate
                )} Bs.S`}
              </p>

              <p className='text-white font-bold | mt-2 rounded-full bg-green-500 px-3 py-2'>
                {`Total Dólares: ${useExchangeQuantity(subTotalSale + ivaSale)} $`}{' '}
              </p>
            </>
          )}

          {/* NOTA DE ENTREGA */}
          {!invoiceType.includes('Sales') && (
            <>
              <p className='text-white font-bold | mt-2 rounded-full bg-green-500 px-3 py-2'>
                {`Total: ${useExchangeQuantity(
                  totalSale,
                  exchangeRate
                )} Bs.S`}
              </p>
              <p className='text-white font-bold | mt-2 rounded-full bg-green-500 px-3 py-2'>
                {`Total Dólares: ${useExchangeQuantity(totalSale)} $`}{' '}
              </p>
            </>
          )}
        </div>

        <form onSubmit={handleSubmit(OnSubmit)} className=''>
          <div className='bg-blue-500 rounded-full w-64 px-4 py-2  text-center'>
            <select
              className='text-white font-bold focus:outline-none | bg-transparent | cursor-pointer '
              name='payCondition'
              defaultValue='Contado'
              ref={register()}
            >
              <option
                value='Contado'
                className='text-green-500 font-bold focus:outline-none cursor:pointer'
              >
                Contado
              </option>
              <option
                value='Crédito'
                className='text-green-500 font-bold focus:outline-none cursor:pointer'
              >
                Crédito
              </option>
            </select>
          </div>
          <button
            type='submit'
            className='focus:outline-none w-64 mt-2 text-white font-bold rounded-full bg-green-500 px-2 py-2 hover:bg-yellow-500 transition ease-in-out duration-300'
          >
            Facturar <FontAwesomeIcon icon={faPiggyBank} />
          </button>
        </form>
      </div>

      {response && (
        <ModalAlert tittle='Facturas' message={response.text} status='failed' />
      )}
      {redirect && (
        <ModalAlert
          tittle='Facturas'
          message='Factura Realizada con Éxito'
          status='success'
          redirect={redirect}
        />
      )}
    </>
  )
}
