'use client'

import { getRepo } from '@/lib/github/client'
import { githubKeys } from '@/lib/github/queryKeys'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'

type Props = {
  owner: string
  repo: string
}

export function RepoDetails({ owner, repo }: Props) {
  const query = useQuery({
    queryKey: githubKeys.repo(owner, repo),
    queryFn: () => getRepo(owner, repo),
    enabled: Boolean(owner) && Boolean(repo),
  })

  const data = query.data
  const errorMessage = query.error instanceof Error ? query.error.message : ''

  if (query.isLoading) {
    return (
      <div className="text-sm text-zinc-600 dark:text-zinc-300">
        Carregando detalhes...
      </div>
    )
  }

  if (query.isError) {
    return (
      <div className="flex flex-col gap-3">
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-800 dark:border-red-900/40 dark:bg-red-950/30 dark:text-red-200">
          <div className="font-medium">Erro ao carregar repositório</div>
          <div className="mt-1 wrap-break-word opacity-90">{errorMessage}</div>
        </div>
        <div>
          <Link
            href="/repos"
            className="text-sm font-medium text-zinc-700 hover:underline dark:text-zinc-200"
          >
            Voltar
          </Link>
        </div>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="text-sm text-zinc-600 dark:text-zinc-300">
        Nenhum dado.
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h2 className="truncate text-lg font-semibold">{data.full_name}</h2>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">
            {data.description ?? 'Sem descrição'}
          </p>
        </div>

        <a
          href={data.html_url}
          target="_blank"
          rel="noreferrer"
          className="shrink-0 rounded-lg border border-zinc-200 px-3 py-2 text-sm font-medium text-zinc-800 hover:bg-zinc-50 dark:border-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-900/30"
        >
          Ver no GitHub
        </a>
      </div>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        <div className="rounded-lg border border-zinc-200 p-3 dark:border-zinc-800">
          <div className="text-xs text-zinc-500 dark:text-zinc-400">Stars</div>
          <div className="mt-1 font-semibold">{data.stargazers_count}</div>
        </div>
        <div className="rounded-lg border border-zinc-200 p-3 dark:border-zinc-800">
          <div className="text-xs text-zinc-500 dark:text-zinc-400">Forks</div>
          <div className="mt-1 font-semibold">{data.forks_count}</div>
        </div>
        <div className="rounded-lg border border-zinc-200 p-3 dark:border-zinc-800">
          <div className="text-xs text-zinc-500 dark:text-zinc-400">
            Linguagem
          </div>
          <div className="mt-1 font-semibold">{data.language ?? '—'}</div>
        </div>
        <div className="rounded-lg border border-zinc-200 p-3 dark:border-zinc-800">
          <div className="text-xs text-zinc-500 dark:text-zinc-400">
            Atualizado
          </div>
          <div className="mt-1 font-semibold">
            {new Date(data.updated_at).toLocaleDateString('pt-BR')}
          </div>
        </div>
      </div>

      <div>
        <Link
          href="/repos"
          className="text-sm font-medium text-zinc-700 hover:underline dark:text-zinc-200"
        >
          ← Voltar para lista
        </Link>
      </div>
    </div>
  )
}
