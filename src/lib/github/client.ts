import type { GitHubApiError, GitHubRepo } from './types'

type QueryValue = string | number | boolean | null | undefined

function toQueryString(params?: Record<string, QueryValue>) {
  const searchParams = new URLSearchParams()

  if (!params) return ''

  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null) return
    searchParams.set(key, String(value))
  })

  const str = searchParams.toString()
  return str ? `?${str}` : ''
}

async function apiGet<T>(path: string, params?: Record<string, QueryValue>) {
  const url = `/api/github/${path}${toQueryString(params)}`
  const response = await fetch(url)

  if (response.ok) {
    return (await response.json()) as T
  }

  let message = `Request failed (${response.status})`

  try {
    const json = (await response.json()) as GitHubApiError
    if (json?.message) message = json.message
  } catch {
    // ignore
  }

  throw new Error(message)
}

export function getUserRepos(username: string, opts?: { page?: number; per_page?: number; sort?: string }) {
  return apiGet<GitHubRepo[]>(`users/${username}/repos`, {
    page: opts?.page ?? 1,
    per_page: opts?.per_page ?? 30,
    sort: opts?.sort ?? 'updated',
  })
}

export function getUserStarred(username: string, opts?: { page?: number; per_page?: number; sort?: string }) {
  return apiGet<GitHubRepo[]>(`users/${username}/starred`, {
    page: opts?.page ?? 1,
    per_page: opts?.per_page ?? 30,
    sort: opts?.sort ?? 'created',
  })
}

export function getRepo(owner: string, repo: string) {
  return apiGet<GitHubRepo>(`repos/${owner}/${repo}`)
}
