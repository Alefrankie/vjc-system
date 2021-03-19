import { Request, Response, Router } from 'express'
import User from '../../schemas/Users'
import bcrypt from 'bcryptjs'
const router = Router()

router.put(
  '/',
  async (req: Request, res: Response): Promise<Response> => {
    const { username, password, privileges, userId } = req.body
    if (!userId) {
      return res.status(400).json('You must indicate a User Id!')
    }
    console.log(req.body)

    if (password === '') {
      await User.updateOne(
        {
          userId
        },
        {
          username,
          password,
          privileges
        }
      )
      return res.status(200).send(`User updated successfully`)
    }
    const hash = bcrypt.hashSync(password, 10)
    req.body.password = hash

    await User.updateOne(
      { userId },
      { username, password: req.body.password, privileges }
    )

    return res.status(200).send(`User updated successfully`)
  }
)
export default router
