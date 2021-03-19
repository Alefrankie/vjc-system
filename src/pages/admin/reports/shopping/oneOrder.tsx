import { Loading } from 'components/Elements/Loading'
import { ModalAlert } from 'components/Elements/ModalAlert'
import { ValidateSession } from 'components/Elements/ValidateSession'
import { useUser } from 'context'
import { GetServerSideProps } from 'next'
import { fetchOneShopping } from 'services/invoice/shopping'
import { InvoiceT, ProductT } from 'types'

type Props = {
  error: string
  invoice: InvoiceT
  lote: ProductT[]
}

function ReportOneOrderPage ({ error, invoice, lote }: Props) {
  const { user, isLoading } = useUser()

  if (!user) {
    return <ValidateSession />
  }

  if (isLoading) {
    return <Loading />
  }

  if (error) {
    return (
      <>
        <ModalAlert tittle='Compras' message={error} status='failed' />
      </>
    )
  }

  return (
    <div
      className='container-section page report-sale'
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100vh',
        justifyContent: 'flex-start',
        fontWeight: 'bold',
        color: '#000000',
        fontSize: '18px'
      }}
    >
      <>
        <div className='noPrint' style={{ height: '100px' }}></div>
        <div
          className='container-fluid page-header'
          style={{
            display: 'flex',
            justifyContent: 'center',
            width: '100%'
          }}
        >
          {/* DIV LEFT HEADER */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              width: '70%',
              height: '100%'
            }}
          >
            <p style={{ lineHeight: '10px' }}>
              {/* Razón Social / Nombre y Apellido: */}
              {`Cliente/Razón Social: ${invoice.fullName}`}
            </p>
            <p style={{ lineHeight: '10px' }}>
              C.I / Rif: {invoice.dni}
              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Teléfono: +58{' '}
              {invoice.contact}
            </p>
            <p style={{ lineHeight: '20px' }}>Dirección: {invoice.address}</p>
          </div>
          {/* DIV Right HEADER */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              width: '30%',
              height: '100%',
              position: 'relative',
              paddingLeft: '90px'
            }}
          >
            <p
              style={{
                lineHeight: '10px',
                position: 'absolute',
                textAlign: 'left'
              }}
            >
              Fecha: {`${invoice.invoiceDate}`}
            </p>
            {/* <p
              style={{
                lineHeight: '30px',
                position: 'absolute',
                textAlign: 'left',
                top: '20px'
              }}
            >
              Forma de Pago: {oneSale.payCondition}
            </p> */}
          </div>
        </div>
        <div
          style={{
            width: '100%',
            fontWeight: 'bold',
            color: '#000000'
          }}
          className='container-fluid container-table'
        >
          <table
            id='my-table'
            style={{
              width: '100%'
            }}
          >
            <thead>
              <tr>
                <th style={{ textAlign: 'center', width: '5rem' }}>Cantidad</th>
                <th style={{ textAlign: 'justify' }}>Descripcion</th>
              </tr>
            </thead>
            <tbody>
              {lote.map(
                (
                  e: {
                    quantityRequested: number
                    productName: string
                  },
                  index: number
                ) => (
                  <tr
                    key={index}
                    style={{ fontWeight: 'bold' }}
                    className='row-item'
                  >
                    <th style={{ textAlign: 'center', width: '5rem' }}>
                      {e.quantityRequested}
                    </th>
                    <th style={{ textAlign: 'justify', width: '5rem' }}>
                      {e.productName}
                    </th>
                  </tr>
                )
              )}
            </tbody>
            <tfoot
              className='container-fluid'
              style={{
                position: 'absolute',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-end',
                bottom: 0,
                right: 0,
                fontWeight: 'bold'
              }}
            >
              <tr>
                <td
                  className='container text-center'
                  style={{ paddingBottom: '10px' }}
                >
                  <button onClick={() => window.print()}>Imprimir</button>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async ({
  query: { controlNumber }
}) => {
  const { error, invoice, lote } = await fetchOneShopping({
    typeSearch: 'controlNumber',
    value: String(controlNumber)
  })
  if (error) {
    return {
      props: {
        error
      }
    }
  }
  return {
    props: {
      invoice,
      lote
    }
  }
}
export default ReportOneOrderPage
