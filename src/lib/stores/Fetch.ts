/* eslint-disable new-cap */
import { http } from '$lib/hooks/useFetch'
import { derived, writable } from 'svelte/store'

// const HOST = window.location.protocol + window.location.host
const HOST = 'http://102.168.0.103:5173'
const timeout = 3000
// eslint-disable-next-line max-lines-per-function
const createStore = () => {
	const { subscribe, set } = writable(null)

	return {
		subscribe,
		get: async (url: string) => {
			const promise = http.get(`${url}`)
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
			const promise = http.post(`${url}`, body)
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
			const promise = http.patch(`${url}`, body)
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
			const promise = http.put(`${url}`, body)
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
			const promise = http.remove(`${url}`, body)
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
