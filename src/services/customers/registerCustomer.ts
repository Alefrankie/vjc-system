import { API_URL } from 'services/settings'
import fetch from 'node-fetch'
import { getToken } from 'hooks'
import { CustomerT } from '../../types/index'

const ENDPOINT = `${API_URL}/invoice/customers/save`

type Props = {
  currentCustomer: CustomerT
}

export async function registerCustomer ({ currentCustomer }: Props) {
  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: getToken()
    },
    body: JSON.stringify(currentCustomer)
  })

  if (!res.ok) throw new Error(await res.text())

  const { message } = await res.json()

  return { message }
}
