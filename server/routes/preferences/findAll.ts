import { Request, Response, Router } from 'express'
import fs from 'fs'
const router = Router()

router.get(
  '/',
  async (_req: Request, res: Response): Promise<Response> => {
    if (!fs.existsSync('./server/routes/preferences/preferences.json')) {
      return res.status(200).json({
        preferences: {
          ivaRate: 0,
          retailRate: 0,
          exchangeRate: 0
        }
      })
    }

    const preferences = await getPreferences()
    return res.status(200).json({ preferences })
  }
)

export async function getPreferences () {
  const preferences = await JSON.parse(
    fs.readFileSync('./server/routes/preferences/preferences.json').toString()
  )
  return preferences
}

export { router as findAll }
