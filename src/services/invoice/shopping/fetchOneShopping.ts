import { API_URL } from 'services/settings'

const ENDPOINT = `${API_URL}/invoice/shopping/findOne`

type Props = {
  typeSearch: string
  value: string
}
export async function fetchOneShopping ({ typeSearch, value }: Props) {
  const res = await fetch(ENDPOINT, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      typeSearch,
      value
    })
  })
  const { error, invoice, lote } = await res.json()
  return error ? { error } : { invoice, lote }
}
