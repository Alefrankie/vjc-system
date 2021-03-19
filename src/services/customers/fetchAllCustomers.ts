import { API_URL } from 'services/settings'
import fetch from 'node-fetch'

const ENDPOINT = `${API_URL}/invoice/customers/findAll`

type Props = {
  customerType: string
}

export async function fetchAllCustomers ({
  customerType
}: Props): Promise<any> {
  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      customerType
    })
  })

  if (!res.ok) throw new Error(await res.text())

  const { customers } = await res.json()

  return { customers }
}
