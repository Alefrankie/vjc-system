const headers = {
	'Content-Type': 'application/json',
	Authorization: ''
}

// const HOST = 'http://192.168.138.210:3000'
// const HOST = 'http://localhost:3000'
// const HOST = window.location.protocol + window.location.host

export const get = async (url: string, token?: string) => {
	headers.Authorization = `Bearer ${token}`
	const res = await fetch(url, {
		method: 'GET',
		headers
	})

	const data = await res.json()

	if (!res.ok) throw new Error(data.message)

	return data || {}
}

export const post = async (url: string, body: any, token?: string) => {
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

export const put = async (url: string, body?: any, token?: string) => {
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
export const patch = async (url: string, body?: any, token?: string) => {
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

export const remove = async (url: string, body?: any) => {
	const res = await fetch(url, {
		method: 'DELETE',
		headers,
		body: JSON.stringify(body)
	})

	const data = await res.json()

	if (!res.ok) throw new Error(data.message)

	return data || {}
}

export const http = { get, post, put, patch, remove }
