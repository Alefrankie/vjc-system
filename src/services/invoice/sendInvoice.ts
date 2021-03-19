import fetch from 'node-fetch'
import { API_URL } from 'services/settings'
import { getToken } from '../../hooks/useAuthHelper'

const ENDPOINT = `${API_URL}/invoice/saveInvoice`

type Props = {
  invoice: any
  cart: any
}
export async function sendInvoice ({ cart, invoice }: Props): Promise<any> {
  cart.forEach((e: any) => {
    e.invoiceType = invoice.invoiceType
    if (e.quantityRequested > e.quantity) {
      return alert(
        `La cantidad requerida de ${e.productName} es mayor a la existente`
      )
    }
  })

  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: getToken()
    },
    body: JSON.stringify({
      invoice: invoice,
      cart: cart
    })
  })

  if (!res.ok) throw new Error(await res.text())

  return {
    redirectFromApi: `/admin/reports/oneInvoice/${invoice.invoiceId}`
  }
}
