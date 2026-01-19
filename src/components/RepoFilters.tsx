'use client'

import { useRepoFiltersStore } from '@/store/repoFiltersStore'

type Props = {
  languages: string[]
}

const sortOptions = ['updated', 'stars', 'forks', 'name'] as const
type SortOption = (typeof sortOptions)[number]

export function RepoFilters({ languages }: Props) {
  const language = useRepoFiltersStore((s) => s.language)
  const onlyForks = useRepoFiltersStore((s) => s.onlyForks)
  const query = useRepoFiltersStore((s) => s.query)
  const sort = useRepoFiltersStore((s) => s.sort)

  const setLanguage = useRepoFiltersStore((s) => s.setLanguage)
  const toggleOnlyForks = useRepoFiltersStore((s) => s.toggleOnlyForks)
  const setQuery = useRepoFiltersStore((s) => s.setQuery)
  const setSort = useRepoFiltersStore((s) => s.setSort)
  const reset = useRepoFiltersStore((s) => s.reset)

  return (
    <div className="flex flex-col gap-3 rounded-lg border border-zinc-200 p-3 dark:border-zinc-800">
      <div className="flex items-center justify-between">
        <div className="text-sm font-medium">Filtros</div>
        <button
          type="button"
          onClick={() => reset()}
          className="text-xs text-zinc-500 hover:underline dark:text-zinc-400"
        >
          limpar
        </button>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div className="flex flex-col gap-1">
          <label className="text-xs text-zinc-500 dark:text-zinc-400">
            Linguagem
          </label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="h-10 rounded-md border border-zinc-200 bg-white px-2 text-sm dark:border-zinc-800 dark:bg-zinc-950"
          >
            <option value="all">Todas</option>
            {languages.map((l) => (
              <option key={l} value={l}>
                {l}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs text-zinc-500 dark:text-zinc-400">
            Ordenar
          </label>
          <select
            value={sort}
            onChange={(e) => {
              const value = e.target.value
              if (sortOptions.includes(value as SortOption)) {
                setSort(value as SortOption)
              }
            }}
            className="h-10 rounded-md border border-zinc-200 bg-white px-2 text-sm dark:border-zinc-800 dark:bg-zinc-950"
          >
            <option value="updated">Atualizado</option>
            <option value="stars">Stars</option>
            <option value="forks">Forks</option>
            <option value="name">Nome</option>
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs text-zinc-500 dark:text-zinc-400">
            Buscar na lista
          </label>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="filtrar por nome"
            className="h-10 rounded-md border border-zinc-200 bg-white px-2 text-sm outline-none focus:ring-2 focus:ring-zinc-300 dark:border-zinc-800 dark:bg-zinc-950 dark:focus:ring-zinc-700"
          />
        </div>
      </div>

      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={onlyForks}
          onChange={() => toggleOnlyForks()}
          className="h-4 w-4"
        />
        <span className="text-zinc-700 dark:text-zinc-200">Somente forks</span>
      </label>
    </div>
  )
}
