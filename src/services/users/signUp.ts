import { API_URL } from '../../services/settings'
import { UserT } from '../../types'
import { v4 as uuidv4 } from 'uuid'
import fetch from 'node-fetch'

const ENDPOINT = `${API_URL}/users/singUp`

type Props = {
  user: UserT
}

export const signUp = async ({ user }: Props): Promise<any> => {
  user.userId = uuidv4()

  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  })

  if (!res.ok) throw new Error(await res.text())

  const { message } = await res.json()

  return { message }
}
