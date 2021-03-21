const headers = { Authorization: `Bearer ${process.env.NEXT_PUBLIC_SECRET}` }

export const Get = (url: string) => {
  return fetch(url, {
    method: 'GET',
    headers
  })
}

export const Post = (url: string, body: any) => {
  return fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify(body)
  })
}

export const Put = (url: string, body: any) => {
  return fetch(url, {
    method: 'PUT',
    headers,
    body: JSON.stringify(body)
  })
}

export const Delete = (url: string, body: any) => {
  return fetch(url, {
    method: 'DELETE',
    headers,
    body: JSON.stringify(body)
  })
}

export default { Get, Post, Put, Delete }
