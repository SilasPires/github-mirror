'use client'

import { UserSearch } from '@/components/UserSearch'
import { getUserRepos } from '@/lib/github/client'
import { githubKeys } from '@/lib/github/queryKeys'
import { useUserStore } from '@/store/userStore'
import { useQuery } from '@tanstack/react-query'

export default function ReposPage() {
  const activeUsername = useUserStore((s) => s.activeUsername)
  const submitUsername = useUserStore((s) => s.submitUsername)

  const query = useQuery({
    queryKey: githubKeys.repos(activeUsername),
    queryFn: () => getUserRepos(activeUsername),
    enabled: Boolean(activeUsername),
  })

  const repos = query.data ?? []
  const errorMessage = query.error instanceof Error ? query.error.message : ''
  const rateLimited = errorMessage.toLowerCase().includes('rate limit')

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h2 className="text-lg font-semibold">Repositories</h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Buscando repositórios de <span className="font-medium">{activeUsername}</span>
        </p>
      </div>

      <UserSearch onSubmit={(username) => submitUsername(username)} />

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
              Dica: você pode colocar um <span className="font-medium">GITHUB_TOKEN</span> no
              <span className="font-medium"> .env.local</span> pra aumentar o limite.
            </div>
          ) : null}
        </div>
      ) : repos.length === 0 ? (
        <div className="rounded-lg border border-zinc-200 p-4 text-sm text-zinc-600 dark:border-zinc-800 dark:text-zinc-300">
          Nenhum repositório encontrado.
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {repos.map((repo) => {
            return (
              <a
                key={repo.id}
                href={repo.html_url}
                target="_blank"
                rel="noreferrer"
                className="rounded-lg border border-zinc-200 p-4 transition-colors hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-900/30"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="truncate font-medium">{repo.full_name}</div>
                    {repo.description ? (
                      <div className="mt-1 line-clamp-2 text-sm text-zinc-600 dark:text-zinc-300">
                        {repo.description}
                      </div>
                    ) : (
                      <div className="mt-1 text-sm text-zinc-400">Sem descrição</div>
                    )}
                  </div>

                  <div className="shrink-0 text-right text-xs text-zinc-500 dark:text-zinc-400">
                    <div>★ {repo.stargazers_count}</div>
                    <div>⑂ {repo.forks_count}</div>
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
                  <span>{repo.language ?? '—'}</span>
                  <span>Atualizado: {new Date(repo.updated_at).toLocaleDateString('pt-BR')}</span>
                </div>
              </a>
            )
          })}
        </div>
      )}
    </div>
  )
}
