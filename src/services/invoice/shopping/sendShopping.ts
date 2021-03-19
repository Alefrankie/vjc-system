import fetch from 'node-fetch'
import { API_URL } from 'services/settings'
import { useGetDate } from 'hooks'
import { v4 as uuidv4 } from 'uuid'
import { getToken } from '../../../hooks/useAuthHelper'

const ENDPOINT = `${API_URL}/invoice/shopping/saveShopping`

type Props = {
  invoice: any
  cart: any
}

export async function sendShopping ({ cart, invoice }: Props): Promise<any> {
  invoice.invoiceId = uuidv4()
  invoice.invoiceDate = useGetDate()

  cart.forEach((item: any) => {
    item.loteId = uuidv4()
    item.invoiceId = invoice.invoiceId
    item.invoiceType = invoice.invoiceType
  })

  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: getToken()
    },
    body: JSON.stringify({
      invoice: invoice,
      cart: cart
    })
  })
  const { error } = await res.json()

  return error ? { error } : { message: 'Operación Realizada Correctamente' }
}
