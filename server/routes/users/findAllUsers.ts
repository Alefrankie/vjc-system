import { Request, Response, Router } from 'express'
import User from '../../schemas/Users'

const router = Router()

router.get(
  '/',
  async (_req: Request, res: Response): Promise<Response> => {
    const responsePromises = []
    const responsePromise = User.find()
    responsePromises.push(responsePromise)

    const [users] = await Promise.all(responsePromises)
    if (users.length < 1) {
      return res.status(404).send('Users found!')
    }

    return res.status(200).json({ users })
  }
)
export default router
