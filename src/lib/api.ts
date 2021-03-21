import { NextApiRequest, NextApiResponse } from 'next'
import { v4 as uuidv4 } from 'uuid'

interface Response {
  id: string
  status: number
  content: string | undefined
  data: any
  error: string | undefined
  created: number
}
interface Options {
  req: NextApiRequest
  res: NextApiResponse
  allow: 'POST' | 'GET' | 'PUT' | 'DELETE' | 'OPTIONS'
}

export class API {
  private nextReq: NextApiRequest
  private nextRes: NextApiResponse

  private errorBody: Response | undefined = undefined // ??

  private initialResponse: Response = {
    id: uuidv4(),
    status: 200,
    content: undefined,
    data: undefined,
    error: undefined,
    created: Date.now()
  }

  constructor (args: Options) {
    this.nextReq = args.req
    this.nextRes = args.res

    const isAllowed = args.allow === this.nextReq.method
    const isAuthenticated = process.env.SECRET === this.authToken

    if (!isAllowed) {
      this.errorBody = {
        ...this.initialResponse,
        status: 405,
        content: 'Not Allowed'
      }
    }

    if (!isAuthenticated) {
      this.errorBody = {
        ...this.initialResponse,
        status: 401,
        content: 'Unauthorized'
      }
    }
  }

  public get error () {
    return this.errorBody
  }

  private get authToken () {
    const token = this.nextReq.headers.authorization
    return token?.split(' ')[1]
  }

  private sendJSON (response: Response) {
    return this.nextRes.json(response)
  }

  public abort () {
    return this.sendJSON(this.errorBody as Response)
  }

  public res (options: Partial<Response>) {
    return this.sendJSON({
      ...this.initialResponse,
      ...options
    })
  }
}
