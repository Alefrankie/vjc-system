import fetch from 'node-fetch'
import { API_URL } from '../../services/settings'

const ENDPOINT = `${API_URL}/users/findAllUsers`

export async function fetchAllUsers () {
  const res = await fetch(ENDPOINT)

  if (!res.ok) throw new Error(await res.text())
  
  const {  users } = await res.json()


  return { users }
}
