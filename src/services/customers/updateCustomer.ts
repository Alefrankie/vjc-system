import { API_URL } from 'services/settings'
import fetch from 'node-fetch'
import { getToken } from 'hooks'

const ENDPOINT = `${API_URL}/invoice/customers/update`

type Props = {
  currentCustomer: any
}

export async function updateCustomer ({
  currentCustomer
}: Props): Promise<any> {
  const res = await fetch(ENDPOINT, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: getToken()
    },
    body: JSON.stringify({ currentCustomer })
  })
  if (!res.ok) throw new Error(await res.text())

  const message = await res.text()
  return message
}
