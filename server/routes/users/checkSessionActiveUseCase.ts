import { Request, Response, Router } from 'express'
import User from '../../schemas/Users'
const router = Router()

router.post(
  '/',
  async (req: Request, res: Response): Promise<Response> => {
    const { username } = req.body

    if (!username) {
      return res
        .status(400)
        .send('Error, you must indicate a valid username.')
    }

    const userFound = await User.findOne({ username: username })

    if (!userFound) {
      return res.status(404).send('User not found')
    }
    return res.status(200).json({
      user: userFound
    })
  }
)

export { router as checkSessionActiveUseCase }
