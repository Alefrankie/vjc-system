import { API_URL } from '../../services/settings'
import { deleteToken } from '../../hooks'
import fetch from 'node-fetch'

const ENDPOINT = `${API_URL}/users/logout`

type Props = {
  userId: string
}

const logoutUser = async ({ userId }: Props): Promise<any> => {
  const res = await fetch(ENDPOINT, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ userId })
  })
  if (!res.ok) throw new Error(await res.text())

  deleteToken()
  return { message: 'Sessión Finalizada' }
}

export { logoutUser }
