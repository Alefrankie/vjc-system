import { API_URL } from 'services/settings'
import fetch from 'node-fetch'
import { getToken } from 'hooks'

const ENDPOINT = `${API_URL}/invoice/changeStatus`

type Props = {
  invoiceId: string
}
export async function annularInvoice ({ invoiceId }: Props) {
  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: getToken()
    },
    body: JSON.stringify({
      invoiceId,
      newStatus: false
    })
  })
  if (!res.ok) throw new Error(await res.text())

  const { invoice, lote } = await res.json()

  return { invoice, lote }
}
