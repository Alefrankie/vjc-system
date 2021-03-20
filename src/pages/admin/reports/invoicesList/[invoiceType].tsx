import { faCalendarDay, faShoppingBag } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { DatePicker } from 'components/Elements/DatePicker'
import { Loading } from 'components/Elements/Loading'
import { ModalAlert } from 'components/Elements/ModalAlert'
import { InvoicesListTable } from 'components/modules/invoices/InvoicesListTable'
import { useResponse } from 'hooks/useResponse'
import Admin from 'layouts/Admin'
import { GetServerSideProps } from 'next'
import { useEffect, useReducer } from 'react'
import { fetchAllInvoices, fetchAllInvoicesRangeDate } from 'services/invoice'

type Props = {
  invoiceTypePage: string
}

function PageComponent ({ invoiceTypePage }: Props) {
  console.log(invoiceTypePage)
  const { response, setResponse } = useResponse()

  const [
    { isLoading, invoiceType, invoices, rangeDate, currentPage },
    setState
  ] = useReducer(Reducer, {
    isLoading: false,
    invoiceType: `${invoiceTypePage}:All`,
    invoices: [],
    rangeDate: { from: '', until: '', date: '' },
    currentPage: 1
  })

  function Reducer (prevState: any, state: any) {
    return { ...prevState, ...state }
  }

  useEffect(() => {
    if (invoiceType.includes(invoiceTypePage)) {
      setState({ isLoading: true })

      fetchAllInvoices({ invoiceType, searchTo: invoiceTypePage, currentPage })
        .then(({ invoices }) => {
          setState({ invoices, isLoading: false })
        })
        .catch(({ message }) => {
          setResponse({
            text: message,
            status: 'failed'
          })
        })
    }
    return () => {
      setState({
        invoices: [],
        invoiceType: `${invoiceTypePage}:All`,
        rangeDate: { from: '', until: '', date: '' }
      })
    }
  }, [invoiceType, currentPage])

  useEffect(() => {
    if (rangeDate.date === 'RangeDate') {
      setState({ isLoading: true })
      fetchAllInvoicesRangeDate({
        invoiceType,
        searchTo: invoiceTypePage,
        rangeDate
      })
        .then(({ invoices }) => {
          setState({ invoices, isLoading: false })
        })
        .catch(({ message }) => {
          setResponse({
            text: message,
            status: 'failed'
          })
        })
    }
    return () => {
      setState({
        rangeDate: {},
        invoices: []
      })
    }
  }, [rangeDate.date])

  if (isLoading) {
    return <Loading />
  }

  return (
    <>
      {response && (
        <ModalAlert
          message={response.text}
          tittle='Facturas'
          status={response.status}
          setResponse={setResponse}
        />
      )}
      <div className='container mx-auto mt-5 print:hidden'>
        <div className='flex justify-evenly'>
          <button
            type='submit'
            className='focus:outline-none | bg-green-500 text-white rounded w-32 py-2 font-semibold hover:bg-blue-500 transform duration-300'
            onClick={() => setState({ invoiceType: `${invoiceTypePage}:All` })}
          >
            Todo &nbsp;
            <FontAwesomeIcon icon={faShoppingBag} />
          </button>

          <button
            type='submit'
            className='focus:outline-none | bg-green-500 text-white rounded w-32 py-2 font-semibold hover:bg-blue-500 transform duration-300'
            onClick={() =>
              setState({ invoiceType: `${invoiceTypePage}:Retail` })
            }
          >
            Detal&nbsp;
            <FontAwesomeIcon icon={faShoppingBag} />
          </button>

          <button
            type='submit'
            className='focus:outline-none | bg-green-500 text-white rounded w-32 py-2 font-semibold hover:bg-blue-500  transform duration-300'
            onClick={() =>
              setState({ invoiceType: `${invoiceTypePage}:Wholesale` })
            }
          >
            Mayor&nbsp;
            <FontAwesomeIcon icon={faCalendarDay} />
          </button>

          <button
            type='submit'
            className='focus:outline-none | bg-green-500 text-white rounded w-32 py-2 font-semibold hover:bg-blue-500 transform duration-300'
            onClick={() =>
              setState({ invoiceType: `${invoiceTypePage}:Today` })
            }
          >
            Hoy&nbsp;
            <FontAwesomeIcon icon={faCalendarDay} />
          </button>

          {/* <button
            className='print:hidden bg-green-500 text-white rounded px-3 py-2 font-semibold hover:bg-yellow-500 transform duration-300'
            onClick={() => window.print()}
          >
            Imprimir&nbsp;
            <FontAwesomeIcon icon={faPrint} />
          </button> */}
        </div>
        <DatePicker setRangeDate={setState} rangeDate={rangeDate} />
      </div>

      <InvoicesListTable
        invoices={invoices}
        setState={setState}
        currentPage={currentPage}
      />
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({
  query: { invoiceType }
}) => {
  return {
    props: {
      invoiceTypePage: invoiceType
    }
  }
}

PageComponent.layout = Admin

export default PageComponent
