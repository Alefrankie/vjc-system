import fetch from 'node-fetch'
import { API_URL } from 'services/settings'
import { ProductT } from 'types'
import { v4 as uuidv4 } from 'uuid'
import { getToken } from '../../hooks/useAuthHelper'

const ENDPOINT = `${API_URL}/inventory/registerProductUseCase`

type Props = {
  Product: ProductT
}
export async function addProduct ({
  Product
}: Props): Promise<{ message: string }> {
  Product.productId = uuidv4()
  Product.unit = Product.unit.toUpperCase()
  Product.productName = Product.productName.toUpperCase()
  Product.productCode = Product.productCode.toUpperCase()

  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: getToken()
    },
    body: JSON.stringify(Product)
  })

  if (!res.ok) throw new Error(await res.text())

  return { message: 'Operación Exitosa' }
}
