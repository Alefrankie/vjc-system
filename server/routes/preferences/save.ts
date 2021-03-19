import { Request, Response, Router } from 'express'
import fs from 'fs'
const router = Router()

router.put(
  '/',
  async (req: Request, res: Response): Promise<Response> => {
    const { exchangeRate, retailRate } = req.body
    if (
      exchangeRate === '' ||
      retailRate === '' ||
      exchangeRate < 0 ||
      retailRate < 0
    ) {
      return res.status(200).json({ error: 'You must indicate valids data' })
    }

    await savePreferences(req.body)
    return res.status(201).json({ message: 'Preferences ajusted successfully' })
  }
)

export { router as save }

export type Preferences = {
  exchangeRate: Number
  retailRate: Number
  ivaRate: Number
  limitLts: Number
  limitUnits: Number
  limitKgs: Number
  limitGr: Number
}

export async function savePreferences ({
  exchangeRate,
  retailRate,
  ivaRate,
  limitLts,
  limitUnits,
  limitKgs,
  limitGr
}: Preferences) {
  let preferences_prev: Object = {}

  if (fs.existsSync('./server/routes/preferences/preferences.json')) {
    preferences_prev = await JSON.parse(
      fs.readFileSync('./server/routes/preferences/preferences.json').toString()
    )
    preferences_prev
  }

  preferences_prev = {
    ...preferences_prev,
    exchangeRate,
    retailRate,
    ivaRate,
    limitLts,
    limitUnits,
    limitKgs,
    limitGr
  }
  fs.writeFileSync(
    './server/routes/preferences/preferences.json',
    JSON.stringify(preferences_prev)
  )

  return 'Successfully'
}
