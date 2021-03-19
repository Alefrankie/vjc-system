import fetch from 'node-fetch'
import { API_URL } from 'services/settings'

const ENDPOINT = `${API_URL}/inventory/findOneProduct/?productId=`

type Props = {
  keyword: string
}

export async function getOneProductFromApi ({ keyword }: Props): Promise<any> {
  const res = await fetch(ENDPOINT + keyword)
  const { product } = await res.json()

  if (!res.ok) throw new Error(await res.text())

  return { product }
}
