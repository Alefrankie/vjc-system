import { API_URL } from 'services/settings'
import { ProductT } from 'types'
import { getToken } from '../../hooks/useAuthHelper'
import fetch from 'node-fetch'

const ENDPOINT = `${API_URL}/inventory/updateProduct/?productId=`

type Props = {
  Product: ProductT
}

type Response = {
  message: string
}

export async function updateProductFromApi ({
  Product
}: Props): Promise<Response> {
  const res = await fetch(ENDPOINT, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: getToken()
    },
    body: JSON.stringify(Product)
  })

  if (!res.ok) throw new Error(await res.text())

  return { message: 'Producto Actualizado Correctamente' }
}
