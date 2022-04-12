/* eslint-disable new-cap */
import { http } from '$lib/hooks/useFetch'
import { derived, writable } from 'svelte/store'

const timeout = 3000
// eslint-disable-next-line max-lines-per-function
const createStore = () => {
	const { subscribe, set } = writable(null)

	return {
		subscribe,
		Get: async (url: string) => {
			const promise = http.Get(url)
			set(promise)
			const data = await promise
			if (data) {
				setTimeout(() => {
					set(null)
				}, timeout)
			}

			return data || {}
		},
		Post: async (url: string, body?) => {
			const promise = http.Post(url, body)
			set(promise)
			const data = await promise
			if (data) {
				setTimeout(() => {
					set(null)
				}, timeout)
			}

			return data || {}
		},
		Patch: async (url: string, body?) => {
			const promise = http.Patch(url, body)
			set(promise)

			const data = await promise
			if (data) {
				setTimeout(() => {
					set(null)
				}, timeout)
			}

			return data || {}
		},
		Put: async (url: string, body?) => {
			const promise = http.Put(url, body)
			set(promise)
			const data = await promise
			if (data) {
				setTimeout(() => {
					set(null)
				}, timeout)
			}

			return data || {}
		},
		Delete: async (url: string, body?) => {
			const promise = http.Delete(url, body)
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
