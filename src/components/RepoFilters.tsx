'use client'

import { useRepoFiltersStore } from '@/store/repoFiltersStore'
import { useMemo, useState } from 'react'

type Props = {
  languages: string[]
}

type Drawer = 'type' | 'language' | null

const typeOptions = [
  { value: 'all', label: 'Todos' },
  { value: 'sources', label: 'Somente sources' },
  { value: 'forks', label: 'Forks' },
  { value: 'archived', label: 'Arquivados' },
  { value: 'mirrors', label: 'Espelhos' },
] as const

export function RepoFilters({ languages }: Props) {
  const language = useRepoFiltersStore((s) => s.language)
  const type = useRepoFiltersStore((s) => s.type)
  const query = useRepoFiltersStore((s) => s.query)

  const setLanguage = useRepoFiltersStore((s) => s.setLanguage)
  const setType = useRepoFiltersStore((s) => s.setType)
  const setQuery = useRepoFiltersStore((s) => s.setQuery)

  const [drawer, setDrawer] = useState<Drawer>(null)

  const languageOptions = useMemo(() => {
    return ['all', ...languages]
  }, [languages])

  const typeLabel = typeOptions.find((t) => t.value === type)?.label ?? 'Todos'
  const languageLabel = language === 'all' ? 'Todas' : language

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-md">
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 fill-zinc-400"
          >
            <path d="M10 4a6 6 0 1 1 0 12A6 6 0 0 1 10 4Zm0 2a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm9.7 13.3-3.2-3.2a8 8 0 1 1 1.4-1.4l3.2 3.2a1 1 0 0 1-1.4 1.4Z" />
          </svg>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Filtrar repositórios..."
            className="h-11 w-full rounded-full border border-zinc-200 bg-white pl-11 pr-4 text-sm outline-none focus:ring-2 focus:ring-zinc-200"
          />
        </div>

        <div className="flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={() => setDrawer('type')}
            className="inline-flex items-center gap-2 rounded-full bg-linear-to-r from-[#1e88e5] to-[#1565c0] px-4 py-2 text-sm font-medium text-white shadow-sm"
          >
            <span>Tipo</span>
            <span className="opacity-90">{typeLabel}</span>
            <svg
              viewBox="0 0 20 20"
              aria-hidden="true"
              className="h-4 w-4 fill-white/90"
            >
              <path d="M5.3 7.3a1 1 0 0 1 1.4 0L10 10.6l3.3-3.3a1 1 0 1 1 1.4 1.4l-4 4a1 1 0 0 1-1.4 0l-4-4a1 1 0 0 1 0-1.4Z" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => setDrawer('language')}
            className="inline-flex items-center gap-2 rounded-full bg-linear-to-r from-[#1e88e5] to-[#1565c0] px-4 py-2 text-sm font-medium text-white shadow-sm"
          >
            <span>Linguagem</span>
            <span className="opacity-90">{languageLabel}</span>
            <svg
              viewBox="0 0 20 20"
              aria-hidden="true"
              className="h-4 w-4 fill-white/90"
            >
              <path d="M5.3 7.3a1 1 0 0 1 1.4 0L10 10.6l3.3-3.3a1 1 0 1 1 1.4 1.4l-4 4a1 1 0 0 1-1.4 0l-4-4a1 1 0 0 1 0-1.4Z" />
            </svg>
          </button>
        </div>
      </div>

      {drawer ? (
        <div className="fixed inset-0 z-50 bg-black/30">
          <div className="absolute inset-x-0 bottom-0 rounded-t-2xl bg-white p-6">
            <div className="flex items-start justify-between">
              <div className="text-2xl font-semibold">
                {drawer === 'language' ? 'Linguagem' : 'Tipo'}
              </div>
              <button
                type="button"
                onClick={() => setDrawer(null)}
                className="text-2xl leading-none text-red-500"
                aria-label="Close"
              >
                ×
              </button>
            </div>

            <div className="mt-6 flex flex-col gap-4">
              {drawer === 'type'
                ? typeOptions.map((opt) => (
                    <label
                      key={opt.value}
                      className="flex items-center gap-3 text-base"
                    >
                      <input
                        type="checkbox"
                        checked={type === opt.value}
                        onChange={() => setType(opt.value)}
                        className="h-4 w-4"
                      />
                      <span>{opt.label}</span>
                    </label>
                  ))
                : languageOptions.map((opt) => (
                    <label
                      key={opt}
                      className="flex items-center gap-3 text-base"
                    >
                      <input
                        type="checkbox"
                        checked={language === opt}
                        onChange={() => setLanguage(opt)}
                        className="h-4 w-4"
                      />
                      <span>{opt === 'all' ? 'Todas' : opt}</span>
                    </label>
                  ))}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}
