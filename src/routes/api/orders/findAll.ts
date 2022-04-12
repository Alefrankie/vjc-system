import { dbConnect } from '$lib/database/mongo'
import { Order } from '$lib/database/schemas/Order'
import { Rate } from '$lib/database/schemas/Rate'
import type { RequestHandler } from '@sveltejs/kit'

export const post: RequestHandler = async ({ request }) => {
	await dbConnect()

	const { invoiceType, searchTo, currentPage } = await request.json()
	// InvoiceType: Sale:Retail
	// InvoiceType: Sale:Wholesale
	// InvoiceType: Sale:All
	// InvoiceType: Sale:Today

	const { invoicesFound, itemsFound } = await findingSales(
		Order,
		Rate,
		invoiceType,
		searchTo,
		currentPage
	)

	return {
		body: { data: { invoices: invoicesFound, lotes: itemsFound } }
	}
}

const findingSales = async (
	Invoice: any,
	Lote: any,
	invoiceType: string,
	searchTo: string,
	currentPage = 1
): Promise<any> => {
	const perPage = 50
	// InvoiceType: Sale:Retail
	// InvoiceType: Sale:Wholesale
	// InvoiceType: Sale:All

	const responsePromisesSales: any[] = []
	let responsePromise: any

	if (invoiceType.includes('Today')) {
		responsePromise = Invoice.find({
			invoiceType: {
				$regex: '.*' + searchTo + '.*'
			}
		})
			.skip(perPage * currentPage - perPage)
			.limit(perPage)
			.sort({ controlNumber: -1 })
	}

	if (invoiceType.includes('All')) {
		responsePromise = Invoice.find({
			invoiceType: {
				$regex: '.*' + searchTo + '.*'
			}
		})
			.skip(perPage * currentPage - perPage)
			.limit(perPage)
			.sort({ controlNumber: -1 })
	}

	if (invoiceType.includes('Retail') || invoiceType.includes('Wholesale')) {
		responsePromise = Invoice.find({
			invoiceType
		})
			.skip(perPage * currentPage - perPage)
			.limit(perPage)
			.sort({ controlNumber: -1 })
	}

	responsePromisesSales.push(responsePromise)
	const [invoicesFound] = await Promise.all(responsePromisesSales)
	const { itemsFound } = await findingItemsAtLotes(Lote, invoicesFound)

	return { invoicesFound, itemsFound }
}
