import fetch from 'node-fetch'
import { API_URL } from 'services/settings'
import { getToken } from '../../hooks/useAuthHelper'

const ENDPOINT = `${API_URL}/invoice/findAllToday`

type Props = {
  invoiceType: string
  searchTo: string
}

export async function fetchAllInvoicesToday ({
  invoiceType,
  searchTo
}: Props): Promise<any> {
  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: getToken()
    },
    body: JSON.stringify({ invoiceType, searchTo })
  })
  if (!res.ok) throw new Error(await res.text())

  const { invoices, lotes } = await res.json()

  return { invoices, lotes }
}
