import { Request, Response, Router } from 'express'
import User, { IUser } from '../../schemas/Users'
const router = Router()
let error: string = ''

router.post(
  '/',
  async (req: Request, res: Response): Promise<Response> => {
    const { username, password } = <IUser>req.body

    if (validateFields(username, 5, 8) || validateFields(password, 5, 16)) {
      return res.status(400).send(error)
    }

    const userFound = await User.findOne({
      $or: [{ username }]
    })

    console.log(userFound)
    if (userFound) {
      return res.status(400).send('User already registered')
    }

    const newUser = new User(req.body)
    await newUser.save()

    return res.status(201).json({
      message: 'User registered successfully'
    })
  }
)

function validateFields (
  field: string,
  minLength: number,
  maxLength: number
): boolean {
  if (field.length < minLength) {
    error = "You don't must let void fields"
    return true
  }

  if (field.length > maxLength) {
    error = "You don't must break character limit"
    return true
  }
  return false
}

export { router as singUp }
