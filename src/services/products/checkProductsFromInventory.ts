import fetch from 'node-fetch'
import { API_URL } from 'services/settings'
import { getToken } from '../../hooks/useAuthHelper'

const ENDPOINT = `${API_URL}/inventory/checkInventoryQuantitiesUseCase`

export async function checkProductsFromInventory (): Promise<any> {
  const res = await fetch(ENDPOINT, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: getToken()
    }
  })

  if (!res.ok) throw new Error(await res.text())

  let { message } = await res.json()

  if (message === 'Please, check the preferences inventory') {
    message =
      'Por favor, VERIFIQUE las Cantidades Mínimas de Productos en Inventario'
  }

  if (message === 'Please, check the inventory quantities') {
    message = 'Por favor, VERIFIQUE las cantidades de los Productos'
  }

  return message || null
}
