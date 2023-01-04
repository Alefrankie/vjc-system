/* eslint-disable no-undefined */
import { AppConfig } from '$lib/configuration/app.config'
import { error } from '@sveltejs/kit'
import { derived, writable, get } from 'svelte/store'

// eslint-disable-next-line max-lines-per-function
const createStore = () => {
	const { subscribe } = writable(undefined as unknown as Promise<Response>)

	return {
		subscribe,
		get: async <T>(url: string) => {
			const { host } = get(AppConfig)
			const res = await fetch(host + url)

			if (!res.ok) throw error(res.status, await res.text())

			const data = await res.json()

			return data as T
		},
		post: async <T>(url: string, body?: any) => {
			const { host } = get(AppConfig)

			console.log(get(AppConfig))
			const res = await fetch(host + url, { method: 'POST', body: JSON.stringify(body) })

			if (!res.ok) throw error(res.status, await res.text())

			const data = await res.json()

			return data as T
		},
		patch: async <T>(url: string, body?: any) => {
			const { host } = get(AppConfig)
			const res = await fetch(host + url, { method: 'PATCH', body: JSON.stringify(body) })

			if (!res.ok) throw error(res.status, await res.text())

			const data = await res.json()

			return data as T
		},
		put: async <T>(url: string, body?: any) => {
			const { host } = get(AppConfig)
			const res = await fetch(host + url, { method: 'PUT', body: JSON.stringify(body) })

			if (!res.ok) throw error(res.status, await res.text())

			const data = await res.json()

			return data as T
		},
		delete: async <T>(url: string, body?: any) => {
			const { host } = get(AppConfig)
			const res = await fetch(host + url, { method: 'DELETE', body: JSON.stringify(body) })

			if (!res.ok) throw error(res.status, await res.text())

			const data = await res.json()

			return data as T
		}
	}
}

export const httpService = createStore()

export const Promise = derived(httpService, ($store) => $store)
