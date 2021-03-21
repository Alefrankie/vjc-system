import FetcherService from '../lib/fetchers'

export default function PageComponent () {
  const handler = async () => {
    const res = await FetcherService.Get('/api/private')

    const response = await res.json()
    console.log(response)
  }

  return (
    <div>
      <button onClick={handler}>Petición</button>
    </div>
  )
}
