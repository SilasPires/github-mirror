'use client'

import { UserSearch } from '@/components/UserSearch'
import { getUserStarred } from '@/lib/github/client'
import { githubKeys } from '@/lib/github/queryKeys'
import { useUserStore } from '@/store/userStore'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'

export default function StarredPage() {
  const activeUsername = useUserStore((s) => s.activeUsername)
  const submitUsername = useUserStore((s) => s.submitUsername)

  const query = useQuery({
    queryKey: githubKeys.starred(activeUsername),
    queryFn: () => getUserStarred(activeUsername),
    enabled: Boolean(activeUsername),
  })

  const repos = query.data ?? []
  const errorMessage = query.error instanceof Error ? query.error.message : ''

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h2 className="text-lg font-semibold">Starred</h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Favoritos de <span className="font-medium">{activeUsername}</span>
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
        </div>
      ) : repos.length === 0 ? (
        <div className="rounded-lg border border-zinc-200 p-4 text-sm text-zinc-600 dark:border-zinc-800 dark:text-zinc-300">
          Nenhum favorito encontrado.
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {repos.map((repo) => (
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
                <span>
                  Atualizado: {new Date(repo.updated_at).toLocaleDateString('pt-BR')}
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
