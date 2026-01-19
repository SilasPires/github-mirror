'use client'

import { RepoFilters } from '@/components/RepoFilters'
import { UserSearch } from '@/components/UserSearch'
import { getUserRepos } from '@/lib/github/client'
import { githubKeys } from '@/lib/github/queryKeys'
import { useRepoFiltersStore } from '@/store/repoFiltersStore'
import { useUserStore } from '@/store/userStore'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { useMemo } from 'react'

export default function ReposPage() {
  const activeUsername = useUserStore((s) => s.activeUsername)
  const submitUsername = useUserStore((s) => s.submitUsername)

  const query = useQuery({
    queryKey: githubKeys.repos(activeUsername),
    queryFn: () => getUserRepos(activeUsername),
    enabled: Boolean(activeUsername),
  })

  const repos = useMemo(() => query.data ?? [], [query.data])
  const errorMessage = query.error instanceof Error ? query.error.message : ''
  const rateLimited = errorMessage.toLowerCase().includes('rate limit')

  const filterLanguage = useRepoFiltersStore((s) => s.language)
  const onlyForks = useRepoFiltersStore((s) => s.onlyForks)
  const filterQuery = useRepoFiltersStore((s) => s.query)
  const sort = useRepoFiltersStore((s) => s.sort)

  const languages = useMemo(() => {
    const set = new Set<string>()
    repos.forEach((r) => {
      if (r.language) set.add(r.language)
    })
    return Array.from(set).sort((a, b) => a.localeCompare(b))
  }, [repos])

  const filteredRepos = useMemo(() => {
    const q = filterQuery.trim().toLowerCase()

    const list = repos.filter((r) => {
      if (onlyForks && !r.fork) return false
      if (filterLanguage !== 'all' && r.language !== filterLanguage)
        return false
      if (q) {
        const hay = `${r.full_name} ${r.name}`.toLowerCase()
        if (!hay.includes(q)) return false
      }
      return true
    })

    list.sort((a, b) => {
      if (sort === 'stars') return b.stargazers_count - a.stargazers_count
      if (sort === 'forks') return b.forks_count - a.forks_count
      if (sort === 'name') return a.name.localeCompare(b.name)
      return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
    })

    return list
  }, [repos, onlyForks, filterLanguage, filterQuery, sort])

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h2 className="text-lg font-semibold">Repositories</h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Buscando repositórios de{' '}
          <span className="font-medium">{activeUsername}</span>
        </p>
      </div>

      <UserSearch onSubmit={(username) => submitUsername(username)} />

      <RepoFilters languages={languages} />

      {query.isLoading ? (
        <div className="rounded-lg border border-zinc-200 p-4 text-sm text-zinc-600 dark:border-zinc-800 dark:text-zinc-300">
          Carregando...
        </div>
      ) : query.isError ? (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-800 dark:border-red-900/40 dark:bg-red-950/30 dark:text-red-200">
          <div className="font-medium">Erro ao carregar</div>
          <div className="mt-1 wrap-break-word opacity-90">{errorMessage}</div>
          {rateLimited ? (
            <div className="mt-2 opacity-90">
              Dica: você pode colocar um{' '}
              <span className="font-medium">GITHUB_TOKEN</span> no
              <span className="font-medium"> .env.local</span> pra aumentar o
              limite.
            </div>
          ) : null}
        </div>
      ) : filteredRepos.length === 0 ? (
        <div className="rounded-lg border border-zinc-200 p-4 text-sm text-zinc-600 dark:border-zinc-800 dark:text-zinc-300">
          Nenhum repositório encontrado com esses filtros.
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {filteredRepos.map((repo) => (
            <div
              key={repo.id}
              className="rounded-lg border border-zinc-200 p-4 dark:border-zinc-800"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <Link
                    href={`/repos/${repo.owner.login}/${repo.name}`}
                    className="truncate font-medium hover:underline"
                  >
                    {repo.full_name}
                  </Link>

                  {repo.description ? (
                    <div className="mt-1 line-clamp-2 text-sm text-zinc-600 dark:text-zinc-300">
                      {repo.description}
                    </div>
                  ) : (
                    <div className="mt-1 text-sm text-zinc-400">
                      Sem descrição
                    </div>
                  )}
                </div>

                <div className="shrink-0 text-right text-xs text-zinc-500 dark:text-zinc-400">
                  <div>★ {repo.stargazers_count}</div>
                  <div>⑂ {repo.forks_count}</div>
                </div>
              </div>

              <div className="mt-3 flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
                <span>{repo.language ?? '—'}</span>
                <span>
                  Atualizado:{' '}
                  {new Date(repo.updated_at).toLocaleDateString('pt-BR')}
                </span>
              </div>

              <div className="mt-3 flex items-center gap-3">
                <Link
                  href={`/repos/${repo.owner.login}/${repo.name}`}
                  className="text-sm font-medium text-zinc-800 hover:underline dark:text-zinc-100"
                >
                  Ver detalhes
                </Link>
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-zinc-500 hover:underline dark:text-zinc-400"
                >
                  Abrir no GitHub
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
