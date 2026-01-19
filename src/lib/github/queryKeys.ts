export const githubKeys = {
  all: ['github'] as const,
  user: (username: string) => [...githubKeys.all, 'user', username] as const,
  repos: (username: string) => [...githubKeys.all, 'repos', username] as const,
  starred: (username: string) =>
    [...githubKeys.all, 'starred', username] as const,
  repo: (owner: string, repo: string) =>
    [...githubKeys.all, 'repo', owner, repo] as const,
}
