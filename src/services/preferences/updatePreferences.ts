import fetch from 'node-fetch'
import { API_URL } from 'services/settings'
import { getToken } from '../../hooks/useAuthHelper'

const ENDPOINT = `${API_URL}/preferences/save`

export async function updatePreferences (data: any): Promise<any> {
  const res = await fetch(ENDPOINT, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: getToken()
    },
    body: JSON.stringify(data)
  })

  if (!res.ok) throw new Error(await res.text())

  return { message: 'Preferencias Ajustadas Correctamente' }
}
