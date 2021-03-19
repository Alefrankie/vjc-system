import { Response, Router } from 'express'
import User from '../../schemas/Users'
const router = Router()

router.get(
  '/',
  async (req: any, res: Response): Promise<Response> => {
    try {
      const user = await User.findOne({ userId: req.currentUser })

      if (!user) {
        return res.status(404).send('User not found!')
      }

      return res.json({ user })
    } catch (error) {
      console.error(error)
      return res.status(400).send('Error Who Am I: ' + error)
    }
  }
)

export default router
