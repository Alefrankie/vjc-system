import { writable } from 'svelte/store'

// export const AppConfig = {
// 	host: ''
// }

const createStore = () => {
	const { subscribe, update } = writable({
		host: 'http://localhost:5173'
	})

	return {
		subscribe,
		setHost: (host: string) => {
			update((prev) => ({ ...prev, host }))
		}
	}
}

export const AppConfig = createStore()
