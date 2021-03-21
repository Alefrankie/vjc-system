import { Request, Response, Router } from 'express'
import User from '../../schemas/Users'

const router = Router()

router.post(
  '/',
  async (req: Request, res: Response): Promise<Response> => {
    const { value } = req.body

    const responsePromises = []

    if (value === '') {
      const responsePromise = User.find()
      responsePromises.push(responsePromise)
      const [users] = await Promise.all(responsePromises)
      return res.status(200).json({ users })
    }

    const responsePromise = await User.find({
      $or: [
        {
          username: {
            $regex: '.*' + value.toUpperCase() + '.*'
          }
        },
        {
          name: {
            $regex: '.*' + value.toUpperCase() + '.*'
          }
        },
        {
          lastName: {
            $regex: '.*' + value.toUpperCase() + '.*'
          }
        },
        {
          dni: {
            $regex: '.*' + value.toUpperCase() + '.*'
          }
        }
      ]
    })

    responsePromises.push(responsePromise)
    const [users] = await Promise.all(responsePromises)
    return res.status(200).json({ users })
  }
)

export default router
