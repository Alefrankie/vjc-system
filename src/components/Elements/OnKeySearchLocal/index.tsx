import { useState } from 'react'

type Props = {
  setState: any
  where: string
  array: any[]
}

export function OnKeySearchLocal ({
  setState,
  where,
  array: currentArray
}: Props): React.ReactElement {
  const [arrayWhitoutFilter] = useState(currentArray)

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
      const arrayFiltered = arrayWhitoutFilter.filter(
        (e: any) =>
          (where === 'customers' &&
            e.dni.toLowerCase().match(`.*${value.toLowerCase()}.*`)) ||
          (where === 'products' &&
            (e.productName.toLowerCase().match(`.*${value.toLowerCase()}.*`) ||
              e.productCode.toLowerCase().match(`.*${value.toLowerCase()}.*`)))
      )

      if (arrayFiltered.length < 1 && value.length > 0) {
        return setState(arrayFiltered)
      }

      if (arrayFiltered.length < 1 && value.length < 1) {
        return setState(arrayWhitoutFilter)
      }

      if (arrayFiltered.length > 0) {
        return setState(arrayFiltered)
      }
    }, 200)
  }
  return (
    <input
      className='border rounded | focus:outline-none focus:ring focus:border-blue-100| mt-4 | px-3 py-2'
      type='text'
      onKeyUp={search}
      placeholder={
        where === 'customers' ? 'Introduzca una Cédula' : 'Search...'
      }
    />
  )
}
