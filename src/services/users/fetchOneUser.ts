import { API_URL } from '../../services/settings'
import fetch from 'node-fetch'

const ENDPOINT = `${API_URL}/users/findOneUserUseCase/?userId=`

type Props = {
  keyword: string
}

export async function fetchOneUser ({ keyword }: Props): Promise<any> {
  const res = await fetch(ENDPOINT + keyword)

  if (!res.ok) throw new Error(await res.text())
  const { user } = await res.json()
  
  return { user }
}
