export async function findCode(Invoice, invoiceType) {
	let c = ''

	const codeFound = await findingCode({
		Invoice,
		invoiceType
	})

	if (!codeFound || codeFound === null) {
		c = '0001'
		return c
	}

	c = codeFound.slice(2)

	const series = makeCode(Number(c))

	const code = '' + series
	return code
}

const findingCode = async ({
	Invoice,
	invoiceType
}: {
	Invoice: any
	invoiceType: string
}): Promise<any> => {
	const orderFound = await Invoice.findOne({
		invoiceType
	})
		.sort({ code: -1 })
		.limit(1)

	if (!orderFound) {
		return '0000'
	}

	return orderFound.code
}

function makeCode(Serie: number): string {
	const cont = 1
	let code = ''

	if (Serie < 9) {
		const can = cont + Serie
		code = '000' + can
		// 0009
		return code
		// return 0001 or 0009
	}

	if (Serie >= 9 && Serie < 99) {
		const can = cont + Serie
		code = '00' + can
		// from 0010 to 0099
		return code
		// return 0010 or 0099
	}

	if (Serie >= 99 && Serie < 999) {
		const can = cont + Serie
		code = '0' + can
		// 0100 && 0999
		return code
		// return 0100 or 0999
	}

	return String(Number(cont + Serie))
}
