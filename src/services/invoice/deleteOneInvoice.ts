import { getToken } from 'hooks/useAuthHelper'
import fetch from 'node-fetch'
import { API_URL } from 'services/settings'

const ENDPOINT = `${API_URL}/invoice/delete?invoiceId=`

type Props = {
  invoiceId: string
}
export async function deleteOneInvoice ({ invoiceId }: Props) {
  const res = await fetch(ENDPOINT + invoiceId, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: getToken()
    }
  })

  if (!res.ok) throw new Error(await res.text())

  return await res.text()
}
