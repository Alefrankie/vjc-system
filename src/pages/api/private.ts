import { NextApiRequest, NextApiResponse } from 'next'
import { API } from '../../lib/api'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const server = new API({ req, res, allow: 'GET' })

  if (server.error) return server.abort()

  return server.res({ status: 200, content: 'All right' })
}
