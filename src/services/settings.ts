import { hostname } from 'os'

const PORT = 3000

export const API_URL = `http://${hostname()}:${PORT}/apiCustom`
