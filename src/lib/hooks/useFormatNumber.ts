export const useFormatNumber = (quantity: number, typeExchange?: number): string => {
	const formatter = new Intl.NumberFormat('es-ES', {
		maximumFractionDigits: 2,
		minimumFractionDigits: 2
	})

	if (typeExchange) {
		return formatter.format(quantity * typeExchange)
	}
	return formatter.format(quantity)
}
