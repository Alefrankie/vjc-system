import fetch from 'node-fetch'
import { API_URL } from '../../services/settings'
import { getToken } from '../../hooks/useAuthHelper'

const ENDPOINT = `${API_URL}/users/deleteUser/?userId=`

type Props = {
  keyword: string
}

export async function deleteUser ({ keyword }: Props): Promise<any> {
  const res = await fetch(ENDPOINT + keyword, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: getToken()
    }
  })
  if (!res.ok) throw new Error(await res.text())
  return { message: 'Usuario Eliminado Satisfactoriamente' }
}
