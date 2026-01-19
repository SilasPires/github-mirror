import { create } from 'zustand'

type SortOption = 'updated' | 'stars' | 'forks' | 'name'

type RepoFiltersState = {
  language: string
  onlyForks: boolean
  query: string
  sort: SortOption

  setLanguage: (language: string) => void
  toggleOnlyForks: () => void
  setQuery: (query: string) => void
  setSort: (sort: SortOption) => void
  reset: () => void
}

export const useRepoFiltersStore = create<RepoFiltersState>((set) => ({
  language: 'all',
  onlyForks: false,
  query: '',
  sort: 'updated',

  setLanguage: (language) => set({ language }),
  toggleOnlyForks: () => set((s) => ({ onlyForks: !s.onlyForks })),
  setQuery: (query) => set({ query }),
  setSort: (sort) => set({ sort }),
  reset: () =>
    set({ language: 'all', onlyForks: false, query: '', sort: 'updated' }),
}))
