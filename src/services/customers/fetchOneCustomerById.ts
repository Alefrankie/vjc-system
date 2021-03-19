import fetch from 'node-fetch'
import { API_URL } from 'services/settings'

const ENDPOINT = `${API_URL}/invoice/customers/findOneById`

type Props = {
  customerId: string
  customerType: string
}

export async function fetchOneCustomerById ({
  customerId,
  customerType
}: Props): Promise<any> {
  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      customerId,
      customerType
    })
  })
  if (!res.ok) throw new Error(await res.text())
  const { customer } = await res.json()
  return { customer }
}
