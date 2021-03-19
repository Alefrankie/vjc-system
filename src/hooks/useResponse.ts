import { useState } from 'react'

type Response = {
  text: string
  status: string
}

export function useResponse () {
  const [response, setResponse] = useState<Response | null>(null)

  return { response, setResponse }
}
