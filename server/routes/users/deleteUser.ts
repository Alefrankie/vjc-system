import { Request, Response, Router } from 'express'
import User from '../../schemas/Users'
const router = Router()

router.delete(
  '/',
  async (req: Request, res: Response): Promise<Response> => {
    const { userId } = req.query

    if (!userId) {
      return res.status(400).send('You must indicate an UserId.')
    }

    const userFound = await User.findOne({ userId })
    if (!userFound) {
      return res.status(200).send('User not found!')
    }

    await User.deleteOne({ userId })

    return res.status(200).json({ message: `User deleted successfully` })
  }
)

export { router as deleteUser }
