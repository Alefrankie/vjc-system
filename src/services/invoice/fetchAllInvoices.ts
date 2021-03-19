import fetch from 'node-fetch'
import { API_URL } from 'services/settings'
import { getToken } from '../../hooks'

const ENDPOINT = `${API_URL}/invoice/findAll`

type Props = {
  invoiceType: string
  searchTo: string
  currentPage: number
}

export async function fetchAllInvoices ({
  invoiceType,
  searchTo,
  currentPage
}: Props): Promise<any> {
  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: getToken()
    },
    body: JSON.stringify({ invoiceType, searchTo, currentPage })
  })

  if (!res.ok) throw new Error(await res.text())

  const { invoices, lotes } = await res.json()

  return { invoices, lotes }
}
