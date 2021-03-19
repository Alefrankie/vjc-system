import fetch from 'node-fetch'
import { API_URL } from 'services/settings'

const ENDPOINT = `${API_URL}/inventory/findAllProducts`

export async function getAllProductsFromApi (): Promise<any> {
  const res = await fetch(ENDPOINT)

  if (!res.ok) throw new Error(await res.text())

  const { products } = await res.json()

  return { products }
}
