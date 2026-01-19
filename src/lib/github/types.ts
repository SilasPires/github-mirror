export type GitHubUser = {
  login: string
  id: number
  avatar_url: string
  html_url: string
}

export type GitHubUserProfile = GitHubUser & {
  name: string | null
  bio: string | null
  followers: number
  following: number
  public_repos: number
}

export type GitHubRepo = {
  id: number
  name: string
  full_name: string
  private: boolean
  fork: boolean
  archived: boolean
  mirror_url: string | null
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
