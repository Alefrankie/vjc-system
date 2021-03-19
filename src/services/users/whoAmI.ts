import fetch from 'node-fetch'
import { API_URL } from '../../services/settings'
import { getToken } from '../../hooks'

const ENDPOINT = `${API_URL}/users/whoAmI`

export async function whoAmI () {
  if (!getToken()) {
    throw new Error('Token Not Found!')
  }

  const res = await fetch(ENDPOINT, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: getToken()
    }
  })

  if (!res.ok) throw new Error(await res.text())

  const { user } = await res.json()

  return { user }
}
