import Invoice from '../../schemas/Invoice'

type Props = {
  invoiceType: string
}
export async function findControlNumber ({ invoiceType }: Props) {
  let c: string = ''

  const controlNumberFetched = await findingControlNumber({
    invoiceType
  })

  console.log('dato', controlNumberFetched)
  if (!controlNumberFetched || controlNumberFetched === null) {
    c = 'N°0001'
    return c
  }

  c = controlNumberFetched.slice(2)

  const series = makeCode(Number(c))

  const controlNumber = 'N°' + series
  return controlNumber
}

const findingControlNumber = async ({
  invoiceType
}: {
  invoiceType: string
}): Promise<any> => {
  const incoiceFound = await Invoice.findOne({
    invoiceType
  })
    .sort({ controlNumber: -1 })
    .limit(1)

  console.log(incoiceFound)
  if (!incoiceFound) {
    return 'N°0000'
  }

  return incoiceFound.controlNumber
}

function makeCode (Serie: number): string {
  const cont: number = 1
  let controlNumber: string = ''

  if (Serie < 9) {
    const can = cont + Serie
    controlNumber = '000' + can
    // 0009
    return controlNumber
    // return 0001 or 0009
  }

  if (Serie >= 9 && Serie < 99) {
    const can = cont + Serie
    controlNumber = '00' + can
    // from 0010 to 0099
    return controlNumber
    // return 0010 or 0099
  }

  if (Serie >= 99 && Serie < 999) {
    const can = cont + Serie
    controlNumber = '0' + can
    // 0100 && 0999
    return controlNumber
    // return 0100 or 0999
  }

  return String(Number(cont + Serie))
}
