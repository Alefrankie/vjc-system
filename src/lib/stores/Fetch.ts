import { httpService } from '$lib/services/Http.service'
import { derived, writable } from 'svelte/store'

// const HOST = window.location.protocol + window.location.host
const timeout = 3000
// eslint-disable-next-line max-lines-per-function
const createStore = () => {
	const { subscribe, set } = writable(null as any)

	return {
		subscribe,
		get: async <T>(url: string) => {
			const promise = httpService.get(`${url}`)
			set(promise as T)
			const data = await promise
			if (data) {
				setTimeout(() => {
					set(null)
				}, timeout)
			}

			return (data as T) || {}
		},
		post: async (url: string, body?) => {
			const promise = httpService.post(`${url}`, body)
			set(promise)
			const data = await promise
			if (data) {
				setTimeout(() => {
					set(null)
				}, timeout)
			}

			return data || {}
		},
		patch: async (url: string, body?) => {
			const promise = httpService.patch(`${url}`, body)
			set(promise)

			const data = await promise
			if (data) {
				setTimeout(() => {
					set(null)
				}, timeout)
			}

			return data || {}
		},
		put: async (url: string, body?) => {
			const promise = httpService.put(`${url}`, body)
			set(promise)
			const data = await promise
			if (data) {
				setTimeout(() => {
					set(null)
				}, timeout)
			}

			return data || {}
		},
		delete: async (url: string, body?) => {
			const promise = httpService.remove(`${url}`, body)
			set(promise)
			const data = await promise
			if (data) {
				setTimeout(() => {
					set(null)
				}, timeout)
			}

			return data || {}
		}
	}
}

export const Fetch = createStore()

export const Promise = derived(Fetch, ($Fetch) => $Fetch)
