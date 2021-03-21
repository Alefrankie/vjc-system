import { Request, Response, Router } from 'express'
import Product from '../../schemas/Product'
const router = Router()

router.post(
  '/',
  async (req: Request, res: Response): Promise<Response> => {
    const { quantity, productCode, productName } = req.body

    req.body.productName.trim()
    if (productCode.length > 6 || productName.length > 50) {
      return res.status(400).send("You can't break the limit")
    }

    if (
      quantity.length <= 0
      // || unitaryPrice.length <= 0
    ) {
      return res
        .status(400)
        .send(
          'Usted debe indicar un número mayor a 0 para la Cantidad, el Precio Unitario y el Precio al Detal.'
        )
    }

    const productFound = await Product.findOne({
      productCode
    })

    if (productFound) {
      return res.status(400).send("Product's code already exists.")
    }

    await Product.create(req.body)
    return res.status(201).json({
      success: `El Producto "${productName}" ha sido registrado`
    })
  }
)

export default router
