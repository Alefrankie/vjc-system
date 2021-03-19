import { NoRegisteredItems } from 'components/Elements/NoRegisteredItems'
import Admin from 'layouts/Admin'
import { GetServerSideProps } from 'next'
import { fetchPreferences } from 'services/preferences'
import { PreferencesT, ProductT } from 'types'
import { useExchangeQuantity } from 'hooks'

type Props = {
  invoices: any[]
  preferences: PreferencesT
}

function PageComponent({ invoices, preferences }: Props) {
  if (invoices.length < 1) {
    return (
      <>
        <NoRegisteredItems message='No Existen Facturas Registradas' />
      </>
    )
  }

  return (
    <>
      <div
        className='container-section page report-inventory'
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          alignItems: 'center',
          justifyContent: 'flex-start',
          width: '100%',
          fontWeight: 'bold'
        }}
      >
        <div className='noPrint' style={{ height: '6.25rem' }}></div>
        <>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              width: '100%',
              fontWeight: 'bold',
              color: '#000000'
            }}
          >
            <table
              className='container text-center'
              id='my-table'
              style={{
                fontWeight: 'bold'
              }}
            >
              <thead>
                <tr style={{ lineHeight: '1.875rem', textAlign: 'center' }}>
                  <th>#</th>
                  <th>Código</th>
                  <th>Descripción</th>
                  <th>Cantidad</th>
                  <th>Precio Al Mayor</th>
                  <th>Precio Al Detal</th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((e: ProductT, index: number) => (
                  <tr
                    key={index}
                    style={{
                      lineHeight: '3.125rem',
                      textAlign: 'center'
                    }}
                  >
                    <td>{index + 1}</td>
                    <td>{e.productCode}</td>
                    <td
                      style={{ textAlign: 'left', paddingLeft: '1.5rem' }}
                    >{`${e.productName}`}</td>
                    <td style={{ textAlign: 'left' }}>
                      {e.quantity ? `${e.quantity} ${e.unit}` : 'Agotado'}
                    </td>

                    <td style={{ textAlign: 'right' }}>
                      {e.unitaryPrice === 0
                        ? 'No Disponible'
                        : `${useExchangeQuantity(
                          e.unitaryPrice,
                          preferences.exchangeRate
                        )} Bs.S / ${useExchangeQuantity(e.unitaryPrice)} $`}
                    </td>

                    <td style={{ textAlign: 'right' }}>
                      {e.retailPrice === 0
                        ? 'No Disponible'
                        : `${useExchangeQuantity(
                          e.retailPrice - e.retailPrice * preferences.ivaRate,
                          preferences.retailRate
                        )} Bs.S / ${useExchangeQuantity(e.retailPrice)} $`}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot
                className='container text-center table-foot'
                style={{
                  position: 'absolute',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-end',
                  bottom: '0',
                  marginLeft: '1em',
                  pageBreakBefore: 'always',
                  fontWeight: 'bold',
                  border: 'none'
                }}
              >
                {/* <tr>
                  <td
                    className='container text-center'
                    style={{ paddingBottom: '0.625rem' }}
                  >
                   
                  </td>
                </tr> */}
              </tfoot>
            </table>
          </div>
        </>
        <button
          className='focus:outline-none noPrint'
          onClick={() => window.print()}
          style={{
            position: 'fixed',
            top: '1rem',
            right: '1rem',
            fontSize: '2rem'
          }}
        >
          Imprimir
        </button>
      </div>
    </>
  )
}

PageComponent.layout = Admin

export const getServerSideProps: GetServerSideProps = async () => {
  const { preferences } = await fetchPreferences()
  return { props: { preferences } }
}

export default PageComponent
