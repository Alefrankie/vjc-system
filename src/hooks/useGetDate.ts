const date = new Date()

const day = date.getDate()
const month = date.getMonth() + 1
const year = date.getFullYear()

export function useGetDate (): String {
  if (month < 10 && day < 10) {
    return `0${day}-0${month}-${year}`
  }

  if (month < 10) {
    return `${day}-0${month}-${year}`
  }

  if (day < 10) {
    return `0${day}-${month}-${year}`
  }

  return `${day}-${month}-${year}`
}
