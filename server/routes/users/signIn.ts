import bcrypt from 'bcryptjs'
import { Request, Response, Router } from 'express'
import jwt from 'jwt-simple'
import User from '../../schemas/Users'

const router = Router()

type Body = {
  username: string
  password: string
  newStatus: boolean
}

router.post(
  '/',
  async (req: Request, res: Response): Promise<Response> => {
    try {
      const { username, password: passwordReceived, newStatus } = <Body>req.body

      if (username.length < 1 || passwordReceived.length < 1) {
        return res.status(403).send("You don't must let void fields")
      }

      if (username.length > 8 || passwordReceived.length > 16) {
        return res.status(403).send('No debe exceder el límite de caracteres')
      }

      const user = await User.findOne({ username })
      console.log(user)
      if (!user) {
        return res.status(404).send('User Not Found!')
      }
      const { userId, password } = user

      // if (user.status) {
      //   return res.status(200).json({ error: 'User Already Online!' })
      // }

      if (!bcrypt.compareSync(passwordReceived, password)) {
        return res.status(403).send('Incorrect Password!')
      }

      await User.updateOne({ username }, { status: newStatus })

      return res.status(200).json({ token: createToken(userId), user })
    } catch ({ message }) {
      return res.status(403).send('Error Signin: ' + message)
    }
  }
)

const createToken = (userId: string) => {
  const payLoad = {
    currentUser: userId
  }

  return jwt.encode(payLoad, process.env.JWT_SECRET || 'someSecretToken')
}
export { router as signIn }
