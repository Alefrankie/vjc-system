import { Request, Response, Router } from 'express'
import Product from '../../schemas/Product'
import { getPreferences } from '../preferences/findAll'
const router = Router()

router.get(
  '/',
  async (_req: Request, res: Response): Promise<Response | any> => {
    const responsePromises = []
    const responsePromise = Product.find().sort({ productName: 1 })
    responsePromises.push(responsePromise)

    const response = await Promise.all(responsePromises)

    //Looking few quantities
    const preferences = await getPreferences()

    const { limitUnits, limitLts, limitKgs, limitGr } = preferences
    const myQuantitites = []
    let countQuantities = 0

    if (limitUnits !== null) {
      myQuantitites.push(limitUnits)
      countQuantities++
    }

    if (limitLts !== null) {
      myQuantitites.push(limitLts)
      countQuantities++
    }
    if (limitKgs !== null) {
      myQuantitites.push(limitKgs)
      countQuantities++
    }
    if (limitGr !== null) {
      myQuantitites.push(limitGr)
      countQuantities++
    }

    const minQuantitie = Math.min.apply(null, myQuantitites)
    const maxQuantitie = Math.max.apply(null, myQuantitites)

    const checkQuantity = response[0].filter(
      (e: { quantity: number }) =>
        e.quantity < maxQuantitie || e.quantity <= minQuantitie
    )

    if (countQuantities !== 4) {
      return res.status(200).json({
        message: 'Please, check the preferences inventory',
        products: checkQuantity
      })
    }

    if (checkQuantity.length >= 1) {
      return res.status(200).json({
        message: 'Please, check the inventory quantities',
        products: checkQuantity
      })
    }
  }
)

export default router
