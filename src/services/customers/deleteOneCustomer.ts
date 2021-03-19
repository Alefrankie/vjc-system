import { API_URL } from 'services/settings'
import fetch from 'node-fetch'
import { getToken } from 'hooks'

const ENDPOINT = `${API_URL}/invoice/customers/delete`

type Props = {
  customerId: string
  customerType: string
}

export async function deleteOneCustomer ({
  customerId,
  customerType
}: Props): Promise<any> {
  const res = await fetch(ENDPOINT, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: getToken()
    },
    body: JSON.stringify({ customerId, customerType })
  })

  if (!res.ok) throw new Error(await res.text())

  const { message } = await res.json()

  return { message }
}
