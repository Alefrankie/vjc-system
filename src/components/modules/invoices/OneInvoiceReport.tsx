import { useUser } from 'context'
import { InvoiceT, PreferencesT, ProductT } from 'types'
import { useExchangeQuantity } from 'hooks'
import Image from 'next/image'
type Props = {
  invoice: InvoiceT
  lote: ProductT[]
  preferences: PreferencesT
}

export function OneInvoiceReport ({ invoice, lote }: Props) {
  const { invoiceType } = invoice
  const { user } = useUser()

  const formatterPercent = new Intl.NumberFormat('es-ES', { style: 'percent' })
  return (
    <div
      className={`flex flex-col relative | h-full p-5 | bg-white report-one-invoice | print:text-xs print:p-0 ${
        invoiceType.includes('Sales') ? 'print:h-96 print:mt-24' : 'print:h-96'
      }`}
    >
      <div
        className={`flex font-bold pb-1 ${
          invoiceType.includes('Sale') ? 'print:hidden' : ''
        }`}
      >
        <div className='flex w-3/4'>
          <div className='w-36 h-full mr-1 relative print:w-24 print:h-18 '>
            <Image
              src='/img/vjc-import-logo.png'
              alt={'vjc-import-VJCImportLogo.jpg'}
              layout='fill'
            />
          </div>

          <div>
            <p className='leading-4 print:leading-3'>RIF: J-40667650-0</p>
            <p className='leading-4 print:leading-3'>
              Dirección Fiscal: Vereda 2, Casa N° 12, Urb. Cruz Verde
            </p>
            <p className='leading-4 print:leading-3'>
              Santa Ana de Coro - Mcpio. Miranda - Edo. Falcón - Zona Postal
              4101
            </p>
            <p className='leading-4 print:leading-3'>
              Calle Zamora, Calle Sierralta y Av. Los Médanos - Edif. Maiolino -
              Coro - Falcón
            </p>
            <p className='leading-4 print:leading-3'>
              Telf.: 0424-640.17.98 / 0412-660.87.13
            </p>
            <p className='leading-4 print:leading-3'>
              Correo: inversionesvjcimport@gmail.com
            </p>
          </div>
        </div>

        <div className='w-1/4'>
          <p className='text-right italic print:leading-3'>
            ¡Somos Gente de Soluciones!
          </p>
          {!invoiceType.includes('Sale') && (
            <>
              <p
                className={`text-right print:leading-3 ${
                  invoiceType.includes('Sale') ? 'print:hidden' : ''
                }`}
              >
                {invoiceType.includes('DeliveryNote') && 'Nota De Entrega'}
                {invoiceType.includes('Budget') && 'Presupuesto'}
              </p>
              <p
                className={`text-right print:leading-3${
                  invoiceType.includes('Sale') ? 'print:hidden' : ''
                }`}
              >
                {invoice.controlNumber}
              </p>
            </>
          )}
        </div>
      </div>

      <div className='flex justify-between | relative | font-bold | h-24 | border-t border-b border-black | print:h-12 print:pb-2'>
        <div className='flex flex-col'>
          <p className='leading-4'>{`Cliente/Razón Social: ${
            invoice.dni.includes('V-') ? invoice.fullName : invoice.socialReason
          }`}</p>

          <p className='leading-4'>
            C.I / Rif: {invoice.dni}
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Teléfono: +58{' '}
            {invoice.contact}
          </p>

          <p className='leading-4'>Dirección: {invoice.address}</p>
        </div>

        <div className='flex flex-col'>
          <p className='leading-4'>Fecha: {`${invoice.invoiceDate}`}</p>
          <p className='leading-4'>Forma de Pago: {invoice.payCondition}</p>
          {!invoiceType.includes('Sales') && (
            <p className='leading-4'>Usuario: {user.username}</p>
          )}
        </div>

        <button
          className='print:hidden absolute top-12 right-0 mt-2 text-white border-2 border-white rounded-full bg-blue-500 px-3 py-1 hover:bg-yellow-500 transition ease-in-out duration-300 focus:outline-none'
          onClick={() => window.print()}
        >
          Imprimir
        </button>
      </div>

      <table>
        <thead>
          <tr>
            <th className='text-left leading-3'>Cantidad</th>
            <th className='text-center leading-3'>Descripción</th>
            <th className='text-rigth leading-3'>Precio Unitario</th>
            <th className='text-center leading-3'>Descuento</th>
            <th className='text-right leading-3'>Monto</th>
          </tr>
        </thead>
        <tbody>
          {lote.map((e: ProductT, index: number) => (
            <tr key={index}>
              <th className='text-left pl-4 print:leading-3'>
                {e.quantityRequested < 1 && e.unit === 'LTS.'
                  ? `${e.quantityRequested * 1000} ML.`
                  : e.quantityRequested < 1 && e.unit === 'KG.'
                  ? `${e.quantityRequested * 1000} GR.`
                  : `${e.quantityRequested} ${e.unit}`}
              </th>
              <th className='text-left uppercase print:leading-3'>
                {e.productName}
              </th>
              <th className='text-right print:leading-3'>
                {`${useExchangeQuantity(
                  e.productPrice * invoice.exchangeRate
                )}`}
              </th>
              <th className='text-center print:leading-3'>
                {formatterPercent.format(e.productDiscount)}
              </th>
              <th className='text-right print:leading-3'>
                {useExchangeQuantity(
                  (e.productPrice * e.quantityRequested -
                    e.productPrice * e.quantityRequested * e.productDiscount) *
                    invoice.exchangeRate
                )}
              </th>
            </tr>
          ))}
        </tbody>

        <tfoot className='flex font-bold | absolute right-0 w-full | print:bottom-0'>
          <tr className='w-full px-5 print:px-0'>
            <div
              className={`flex justify-between ${!invoice.invoiceType.includes(
                'Sales'
              ) && 'border-t border-black'}`}
            >
              <div>
                {!invoice.invoiceType.includes('Sales') && (
                  <p className='text-left'>
                    {invoiceType.includes('Retail') && 'Observación: Detal'}
                    {invoiceType.includes('Wholesale') && 'Observación: Mayor'}
                  </p>
                )}
              </div>
              <div>
                {invoice.invoiceType.includes('Sales') && (
                  <>
                    <p className='text-right'>
                      Sub-Total:{' '}
                      {useExchangeQuantity(
                        invoice.subTotal * invoice.exchangeRate
                      )}
                    </p>
                    <p className='text-right'>
                      Iva:{' '}
                      {useExchangeQuantity(
                        invoice.subTotal * invoice.exchangeRate * 0.16
                      )}
                    </p>
                    <p className='text-right'>
                      Total:{' '}
                      {useExchangeQuantity(
                        invoice.subTotal * invoice.exchangeRate +
                          invoice.subTotal * invoice.exchangeRate * 0.16
                      )}
                    </p>
                    <p className='text-right print:hidden'>
                      Total Dólares:{' '}
                      {useExchangeQuantity(
                        invoice.subTotal + invoice.subTotal * 0.16
                      )}
                    </p>
                  </>
                )}

                {!invoice.invoiceType.includes('Sales') && (
                  <>
                    <p className='text-right'>
                      Total:{' '}
                      {useExchangeQuantity(
                        invoice.subTotal * invoice.exchangeRate
                      )}
                    </p>
                    <p className='text-right print:hidden'>
                      Total Dólares: {useExchangeQuantity(invoice.subTotal)}
                    </p>
                  </>
                )}
              </div>
            </div>
          </tr>
        </tfoot>
      </table>

      {/* <div className='absolute w-full text-center font-bold bottom-0 print:hidden'>
        {`Total: ${exchangeQuantity(
          invoice.subTotal * invoice.exchangeRate
        )} Bs.S / ${exchangeQuantity(
          invoice.subTotal
        )} $, equivalentes a la tasa de cambio de 1$ por ${exchangeQuantity(
          invoice.exchangeRate
        )} Bs.S`}
      </div> */}
    </div>
  )
}
