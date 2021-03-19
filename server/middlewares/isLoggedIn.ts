import { Request, Response, NextFunction } from 'express'
import { decode } from 'jwt-simple'
import moment from 'moment'

async function isLoggedIn (
  req: Request | any,
  res: Response,
  next: NextFunction
): Promise<any> {
  const { authorization } = req.headers
  if (!authorization) {
    return res.status(403).json('You need include token into headers')
  }
  const tokenReceived = authorization.slice(7)
  let payload = { currentUser: '', expiredAt: 0 }

  try {
    payload = decode(tokenReceived, process.env.JWT_SECRET || 'someSecretToken')
  } catch (error) {
    return res.status(400).send('Incorrect Token')
  }

  if (payload.expiredAt < moment().unix()) {
    return res.status(401).json('Expired Token')
  }

  req.currentUser = payload.currentUser
  next()
}
export { isLoggedIn }
