import fetch from 'node-fetch'
import { getToken } from '../../hooks/useAuthHelper'
import { API_URL } from '../../services/settings'

const ENDPOINT = `${API_URL}/users/update`

type Props = {
  username: string
  password: string
  privileges: string
  userId: string
}

export async function updateUser ({
  username,
  password,
  privileges,
  userId
}: Props): Promise<string> {
  const res = await fetch(ENDPOINT, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: getToken()
    },
    body: JSON.stringify({ username, password, privileges, userId })
  })
  if (!res.ok) throw new Error(await res.text())
  return await res.text()
}
