export type GitHubUser = {
  login: string
  id: number
  avatar_url: string
  html_url: string
}

export type GitHubRepo = {
  id: number
  name: string
  full_name: string
  private: boolean
  html_url: string
  description: string | null
  stargazers_count: number
  forks_count: number
  language: string | null
  updated_at: string
  owner: GitHubUser
}

export type GitHubApiError = {
  message: string
  documentation_url?: string
}
