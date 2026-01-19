'use client'

import { useRepoFiltersStore } from '@/store/repoFiltersStore'
import { useMemo, useState } from 'react'

type Props = {
  languages: string[]
}

type Drawer = 'type' | 'language' | null

const typeOptions = [
  { value: 'all', label: 'All' },
  { value: 'sources', label: 'Sources' },
  { value: 'forks', label: 'Forks' },
  { value: 'archived', label: 'Archived' },
  { value: 'mirrors', label: 'Mirrors' },
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

  const typeLabel = typeOptions.find((t) => t.value === type)?.label ?? 'All'
  const languageLabel = language === 'all' ? 'All' : language

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setDrawer('type')}
            className="rounded-full border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-700"
          >
            Type: {typeLabel}
          </button>
          <button
            type="button"
            onClick={() => setDrawer('language')}
            className="rounded-full border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-700"
          >
            Language: {languageLabel}
          </button>
        </div>

        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search Here"
          className="h-10 w-full rounded-full border border-zinc-300 bg-white px-4 text-sm outline-none focus:ring-2 focus:ring-zinc-200 sm:max-w-xs"
        />
      </div>

      {drawer ? (
        <div className="fixed inset-0 z-50 bg-black/30">
          <div className="absolute inset-x-0 bottom-0 rounded-t-2xl bg-white p-6">
            <div className="flex items-start justify-between">
              <div className="text-2xl font-semibold">
                {drawer === 'language' ? 'Language' : 'Type'}
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
                      <span>{opt === 'all' ? 'All' : opt}</span>
                    </label>
                  ))}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}
