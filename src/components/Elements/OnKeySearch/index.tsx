import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import fetch from 'node-fetch'
import { API_URL } from 'services/settings'
import { getToken } from 'hooks'

type Props = {
  setState: any
  where: string
  array?: any
}

export function OnKeySearch ({ setState, where }: Props): React.ReactElement {
  // eslint-disable-next-line no-undef
  let timeoutId: NodeJS.Timeout

  // eslint-disable-next-line no-undef
  const search = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // eslint-disable-next-line no-undef
    const { value } = e.target as HTMLInputElement
    if (timeoutId) {
      clearTimeout(timeoutId)
    }

    timeoutId = setTimeout(async () => {
      if (where === 'products') {
        const res = await fetch(`${API_URL}/inventory/findLikeProducts`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: getToken()
          },
          body: JSON.stringify({ value })
        })
        const { products, error } = await res.json()

        if (products) {
          return setState({ [where]: products })
        }
        if (error) {
          return alert(error)
        }
      }

      if (where === 'client') {
        const res = await fetch(
          `${API_URL}/invoice/customers/findLikeUseCase/`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: getToken()
            },
            body: JSON.stringify({ customerType: where, value: value })
          }
        )
        const { customers, error } = await res.json()

        if (customers) {
          return setState({ customers })
        }
        if (error) {
          return alert(error)
        }
      }

      if (where === 'provider') {
        const res = await fetch(
          `${API_URL}/invoice/customers/findLikeUseCase/`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: getToken()
            },
            body: JSON.stringify({ customerType: where, value: value })
          }
        )
        const { customers, error } = await res.json()
        if (customers) {
          return setState({ customers })
        }
        if (error) {
          return alert(error)
        }
      }
    }, 200)
  }
  return (
    <form className='mt-5'>
      <div>
        <div className='border-2 rounded-full w-64 px-4 py-2 text-white'>
          <FontAwesomeIcon icon={faSearch} className='mx-2 text-gray-500' />
          <input
            className='text-gray-500 focus:outline-none'
            type='text'
            onKeyUp={search}
            placeholder='Search...'
          />
        </div>
      </div>
    </form>
  )
}
