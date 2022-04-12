export const useDate = (date: string) => {
	// return .split('T').at[0]
	return date.toString().split('T').at(0)
}
