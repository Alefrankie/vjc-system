import { AppConfig } from '$lib/configuration/app.config'
import { error } from '@sveltejs/kit'
import { derived, writable } from 'svelte/store'
export class HttpService {
	private declare host: string

	private declare promise: Promise<Response>

	public constructor() {
		this.host = AppConfig.host
	}

	public async get<T>(url: string): Promise<T> {
		const res = await fetch(this.host + url)

		if (!res.ok) throw error(res.status, await res.text())

		const data = await res.json()

		return data as T
	}

	public async post<T>(url: string, body: any): Promise<T> {
		const res = await fetch(this.host + url, { method: 'POST', body: JSON.stringify(body) })

		if (!res.ok) throw error(res.status, await res.text())

		const data = await res.json()

		return data as T
	}

	public async put<T>(url: string, body: any): Promise<T> {
		const res = await fetch(this.host + url, { method: 'PUT', body: JSON.stringify(body) })

		if (!res.ok) throw error(res.status, await res.text())

		const data = await res.json()

		return data as T
	}

	public async patch<T>(url: string, body: any): Promise<T> {
		const res = await fetch(this.host + url, { method: 'PATCH', body: JSON.stringify(body) })

		if (!res.ok) throw error(res.status, await res.text())

		const data = await res.json()

		return data as T
	}

	public async delete<T>(url: string, body: any): Promise<T> {
		const res = await fetch(this.host + url, { method: 'DELETE', body: JSON.stringify(body) })

		if (!res.ok) throw error(res.status, await res.text())

		const data = await res.json()

		return data as T
	}
}

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

export const httpService = createStore()

export const Promise = derived(httpService, ($store) => $store)
