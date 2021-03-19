import { Request, Response, Router } from 'express'
import Product from '../../schemas/Product'
const router = Router()

router.get(
  '/',
  async (_req: Request, res: Response): Promise<Response> => {
    let c: string = ''

    const productFound = await Product.findOne()
      .sort({ productCode: -1 })
      .limit(1)

    if (!productFound.productCode) {
      c = 'N°0001'
      return res.status(200).json({ productCode: c })
    }
    c = productFound.productCode
    const r1 = c.charAt(2)
    const r2 = c.charAt(3)
    const r3 = c.charAt(4)
    const r4 = c.charAt(5)

    c = '' + Number(r1 + r2 + r3 + r4)
    const series = makeCode(Number(c))
    return res
      .status(200)
      .json({ productCode: 'N°' + series, product: productFound })
  }
)

export { router as codeProductGenerator }

function makeCode (Data: number) {
  const cont = 1
  let num = ''

  if (Data >= 1000 || Data < 10000) {
    const can = cont + Data
    num = '' + can
  }
  if (Data >= 100 || Data < 1000) {
    const can = cont + Data
    num = '0' + can
  }
  if (Data >= 9 || Data < 100) {
    const can = cont + Data
    num = '00' + can
  }
  if (Data < 9) {
    const can = cont + Data
    num = '000' + can
  }
  return num
}

// try (PreparedStatement preparedStatement = dataBaseRepositoryInterface.connect().prepareStatement(SQLExtractCodeOrder)) {
//     ResultSet rs = preparedStatement.executeQuery();
//     while (rs.next()) {
//         c = rs.getString(1);
//         System.out.println(c);
//     }
//     if (c == null) {
//         OrderCode.setText("N0001");
//         return;
//     }
//     char r1 = c.charAt(1);
//     char r2 = c.charAt(2);
//     char r3 = c.charAt(3);
//     char r4 = c.charAt(4);

//     String r = "" + r1 + r2 + r3 + r4;
//     int j = Integer.parseInt(r);
//     String series = makeCode(j);
//     OrderCode.setText("N" + series);
//     System.out.println(series);

// } catch (SQLException e) {
//     System.out.println("Error: " + e.getMessage());
// }
