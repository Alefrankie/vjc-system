import { Request, Response, Router } from 'express'
import User from '../../schemas/Users'
const router = Router()

router.get(
  '/',
  async (req: Request, res: Response): Promise<Response> => {
    const { userId } = <{ userId: string }>req.query
    if (!userId) {
      return res.status(400).send('You must indicate an UserId.')
    }

    const user = await User.findOne({ userId })
    if (!user) {
      return res.status(404).send('User not found.')
    }

    return res.status(200).json({ user })
  }
)

export { router as findOneUserUseCase }
