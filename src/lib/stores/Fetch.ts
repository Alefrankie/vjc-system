/* eslint-disable new-cap */
import { http } from '$lib/hooks/useFetch'
import { derived, writable } from 'svelte/store'

const timeout = 3000
// eslint-disable-next-line max-lines-per-function
const createStore = () => {
	const { subscribe, set } = writable(null)

	return {
		subscribe,
		get: async (url: string) => {
			const promise = http.get(`http://127.0.0.1:5173${url}`)
			set(promise)
			const data = await promise
			if (data) {
				setTimeout(() => {
					set(null)
				}, timeout)
			}

			return data || {}
		},
		post: async (url: string, body?) => {
			const promise = http.post(`http://127.0.0.1:5173${url}`, body)
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
			const promise = http.patch(`http://127.0.0.1:5173${url}`, body)
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
			const promise = http.put(`http://127.0.0.1:5173${url}`, body)
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
			const promise = http.remove(`http://127.0.0.1:5173${url}`, body)
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

export const Promise: any = derived(Fetch, ($Fetch) => $Fetch)
