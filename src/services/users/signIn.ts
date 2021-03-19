import fetch from 'node-fetch'
import { API_URL } from '../../services/settings'
import { setToken } from '../../hooks'
// import Cookies from 'universal-cookie'

const ENDPOINT = `${API_URL}/users/signIn`

type Props = {
  username: string
  password: string
}

export async function signIn ({ username, password }: Props) {
  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, password, newStatus: true })
  })

  if (!res.ok) throw new Error(await res.text())

  const { token, user } = await res.json()

  setToken(token)

  return { user }
}
