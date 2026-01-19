'use client'

import { ProfileTabs } from '@/components/ProfileTabs'
import { RepoFilters } from '@/components/RepoFilters'
import { getUserRepos } from '@/lib/github/client'
import { githubKeys } from '@/lib/github/queryKeys'
import { useCountsStore } from '@/store/countsStore'
import { useRepoFiltersStore } from '@/store/repoFiltersStore'
import { useUserStore } from '@/store/userStore'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { useEffect, useMemo } from 'react'

export default function ReposPage() {
  const activeUsername = useUserStore((s) => s.activeUsername)
  const setReposCount = useCountsStore((s) => s.setReposCount)

  const query = useQuery({
    queryKey: githubKeys.repos(activeUsername),
    queryFn: () => getUserRepos(activeUsername),
    enabled: Boolean(activeUsername),
  })

  const repos = useMemo(() => query.data ?? [], [query.data])
  const errorMessage = query.error instanceof Error ? query.error.message : ''
  const rateLimited = errorMessage.toLowerCase().includes('rate limit')

  const filterLanguage = useRepoFiltersStore((s) => s.language)
  const type = useRepoFiltersStore((s) => s.type)
  const filterQuery = useRepoFiltersStore((s) => s.query)
  const sort = useRepoFiltersStore((s) => s.sort)

  useEffect(() => {
    setReposCount(repos.length)
  }, [repos.length, setReposCount])

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
      if (type === 'forks' && !r.fork) return false
      if (type === 'sources' && r.fork) return false
      if (type === 'archived' && !r.archived) return false
      if (type === 'mirrors' && !r.mirror_url) return false
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
  }, [repos, type, filterLanguage, filterQuery, sort])

  return (
    <div className="flex flex-col gap-4">
      <ProfileTabs />

      <RepoFilters languages={languages} />

      {query.isLoading ? (
        <div className="rounded-md border border-zinc-200 p-4 text-sm text-zinc-600">
          Carregando...
        </div>
      ) : query.isError ? (
        <div className="rounded-md border border-red-200 bg-red-50 p-4 text-sm text-red-800">
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
        <div className="rounded-md border border-zinc-200 p-4 text-sm text-zinc-600">
          Nenhum repositório encontrado com esses filtros.
        </div>
      ) : (
        <div className="flex flex-col">
          {filteredRepos.map((repo) => (
            <div key={repo.id} className="border-b border-zinc-200 py-4">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <Link
                    href={`/repos/${repo.owner.login}/${repo.name}`}
                    className="truncate text-base font-semibold text-[#0969da] hover:underline"
                  >
                    {repo.name}
                  </Link>
                  {repo.description ? (
                    <div className="mt-1 line-clamp-2 text-sm text-zinc-600">
                      {repo.description}
                    </div>
                  ) : null}
                </div>

                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noreferrer"
                  className="shrink-0 rounded-full border border-zinc-300 px-3 py-1 text-xs text-zinc-700"
                >
                  GitHub
                </a>
              </div>

              <div className="mt-3 flex items-center gap-5 text-xs text-zinc-500">
                <span>{repo.language ?? '—'}</span>
                <span>★ {repo.stargazers_count}</span>
                <span>⑂ {repo.forks_count}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="pt-2 text-xs text-zinc-500">
        Mostrando repositórios de{' '}
        <span className="font-medium">{activeUsername}</span>
      </div>
    </div>
  )
}
