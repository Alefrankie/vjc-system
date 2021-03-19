import { Request, Response, Router } from 'express'
import User from '../../schemas/Users'
const router = Router()

router.put(
  '/',
  async (req: Request, res: Response): Promise<Response> => {
    const { userId } = <{ userId: string }>req.body

    if (userId.length < 1) {
      return res.status(400).send("You don't must let void fields")
    }

    const user = await User.findOne({
      userId
    })

    if (!user) {
      return res.status(404).send('User not found.')
    }

    await User.updateOne({ userId }, { status: false })

    return res.status(200).json({ message: 'User Logout Successfully.' })
  }
)
export { router as logout }
