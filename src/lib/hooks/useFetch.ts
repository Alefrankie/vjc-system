const headers = {
	'Content-Type': 'application/json',
	Authorization: ''
}

// const HOST = 'http://192.168.138.210:3000'
// const HOST = 'http://localhost:3000'
// const HOST = window.location.protocol + window.location.host

export const Get = async (url: string, token?: string) => {
	headers.Authorization = `Bearer ${token}`
	const res = await fetch(url, {
		method: 'GET',
		headers
	})

	const data = await res.json()

	if (!res.ok) throw new Error(data.message)

	return data || {}
}

export const Post = async (url: string, body: any, token?: string) => {
	headers.Authorization = `Bearer ${token}`
	const res = await fetch(url, {
		method: 'POST',
		headers,
		body: JSON.stringify(body)
	})

	const data = await res.json()

	if (!res.ok) throw new Error(data.message)

	return data || {}
}

export const Put = async (url: string, body?: any, token?: string) => {
	headers.Authorization = `Bearer ${token}`
	const res = await fetch(url, {
		method: 'PUT',
		headers,
		body: JSON.stringify(body)
	})

	const data = await res.json()

	if (!res.ok) throw new Error(data.message)

	return data || {}
}
export const Patch = async (url: string, body?: any, token?: string) => {
	headers.Authorization = `Bearer ${token}`
	const res = await fetch(url, {
		method: 'PATCH',
		headers,
		body: JSON.stringify(body)
	})

	const data = await res.json()

	if (!res.ok) throw new Error(data.message)

	return data || {}
}

export const Delete = async (url: string, body?: any) => {
	const res = await fetch(url, {
		method: 'DELETE',
		headers,
		body: JSON.stringify(body)
	})

	const data = await res.json()

	if (!res.ok) throw new Error(data.message)

	return data || {}
}

export const http = { Get, Post, Put, Patch, Delete }
