import fetch from 'node-fetch'
import { API_URL } from 'services/settings'

const ENDPOINT = `${API_URL}/invoice/findOne`

type Props = {
  invoiceId: string
}
export async function fetchOneInvoice ({ invoiceId }: Props) {
  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      invoiceId
    })
  })

  if (!res.ok) throw new Error(await res.text())

  const { invoice, lote } = await res.json()

  return { invoice, lote }
}
