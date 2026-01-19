import { create } from 'zustand'

type CountsState = {
  reposCount: number
  starredCount: number
  setReposCount: (count: number) => void
  setStarredCount: (count: number) => void
}

export const useCountsStore = create<CountsState>((set) => ({
  reposCount: 0,
  starredCount: 0,
  setReposCount: (count) => set({ reposCount: count }),
  setStarredCount: (count) => set({ starredCount: count }),
}))
