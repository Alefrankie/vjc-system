import { API_URL } from 'services/settings'
import { getToken } from '../../hooks/useAuthHelper'
import fetch from 'node-fetch'

const ENDPOINT = `${API_URL}/inventory/deleteProductUseCase/?productId=`

type Props = {
  keyword: string
}

export async function deleteProductToApi ({ keyword }: Props): Promise<any> {
  const res = await fetch(ENDPOINT + keyword, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: getToken()
    }
  })

  if (!res.ok) throw new Error(await res.text())

  return { message: 'Producto Actualizado Correctamente' }
}
