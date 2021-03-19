import fetch from 'node-fetch'
import { API_URL } from 'services/settings'

const ENDPOINT = `${API_URL}/invoice/customers/findOneByDni`

type Props = {
  customerType: string
  dni: string
}

export async function fetchOneCustomerByDni ({ customerType, dni }: Props) {
  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ customerType, keyword: dni })
  })
  if (!res.ok) throw new Error(await res.text())
  const { customer } = await res.json()
  return { customer }
}
