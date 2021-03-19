import fetch from 'node-fetch'
import { API_URL } from 'services/settings'
import { getToken } from '../../hooks/useAuthHelper'

const ENDPOINT = `${API_URL}/inventory/findLikeProducts`

type Props = {
  keyword: string
}

export async function findLikeProdut ({ keyword }: Props): Promise<any> {
  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: getToken()
    },
    body: JSON.stringify({ value: keyword })
  })

  if (!res.ok) throw new Error(await res.text())

  const { products } = await res.json()

  return { products }
}
