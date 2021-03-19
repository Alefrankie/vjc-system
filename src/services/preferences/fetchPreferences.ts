import { API_URL } from 'services/settings'
import fetch from 'node-fetch'

const ENDPOINT = `${API_URL}/preferences/findAll`

export async function fetchPreferences (): Promise<any> {
  const res = await fetch(ENDPOINT)

  if (!res.ok) throw new Error(await res.text())

  const { preferences } = await res.json()

  return { preferences }
}
