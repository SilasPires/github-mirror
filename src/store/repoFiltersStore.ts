import { create } from 'zustand'

type SortOption = 'updated' | 'stars' | 'forks' | 'name'
type TypeFilter = 'all' | 'sources' | 'forks' | 'archived' | 'mirrors'

type RepoFiltersState = {
  language: string
  type: TypeFilter
  query: string
  sort: SortOption

  setLanguage: (language: string) => void
  setType: (type: TypeFilter) => void
  setQuery: (query: string) => void
  setSort: (sort: SortOption) => void
  reset: () => void
}

export const useRepoFiltersStore = create<RepoFiltersState>((set) => ({
  language: 'all',
  type: 'all',
  query: '',
  sort: 'updated',

  setLanguage: (language) => set({ language }),
  setType: (type) => set({ type }),
  setQuery: (query) => set({ query }),
  setSort: (sort) => set({ sort }),
  reset: () =>
    set({ language: 'all', type: 'all', query: '', sort: 'updated' }),
}))
