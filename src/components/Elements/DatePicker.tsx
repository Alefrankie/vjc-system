import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

type Props = {
  setRangeDate: any
  rangeDate: { from: string; until: string }
}

function SortDate (date: string): string {
  const day: string = date.slice(8)
  const month: string = date.slice(5, 7)
  const year: string = date.slice(0, 4)
  return `${day}-${month}-${year}`
}

export function DatePicker ({ setRangeDate, rangeDate }: Props) {
  const handleDateFrom = (e: { target: { value: string } }) => {
    const { value: date } = e.target
    setRangeDate({
      rangeDate: { ...rangeDate, from: SortDate(date) }
    })
  }

  const handleDateUntil = (e: { target: { value: string } }) => {
    const { value: date } = e.target
    setRangeDate({
      rangeDate: { ...rangeDate, until: SortDate(date) }
    })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const { from, until } = rangeDate
    if (from.length < 1 || until.length < 1) {
      return alert('Debe seleccionar el rango de Fechas.')
    }
    setRangeDate({
      rangeDate: { ...rangeDate, date: 'RangeDate' }
    })
  }

  return (
    <div className='flex justify-center my-3'>
      <form
        onSubmit={handleSubmit}
        className='border rounded shadow-md |flex justify-between | px-4 py-2 |'
      >
        <label className='mx-2 font-semibold text-gray-400'>
          Desde:
          <input type='date' name='fromDate' onChange={handleDateFrom} />
        </label>

        <label className='mx-2 font-semibold text-gray-400'>
          Hasta:
          <input type='date' name='untilDate' onChange={handleDateUntil} />
        </label>

        <button
          type='submit'
          className='bg-green-500 text-white rounded w-32 h-10 mt-2 mx-2 font-semibold hover:bg-blue-500 transform duration-300'
        >
          Buscar&nbsp;
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </form>
    </div>
  )
}
