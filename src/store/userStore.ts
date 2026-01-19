import { create } from 'zustand'

type UserState = {
  username: string
  activeUsername: string
  setUsername: (username: string) => void
  submitUsername: (username?: string) => void
}

export const useUserStore = create<UserState>((set, get) => ({
  username: 'octocat',
  activeUsername: 'octocat',
  setUsername: (username) => set({ username }),
  submitUsername: (username) => {
    const next = (username ?? get().username).trim()
    if (!next) return
    set({ activeUsername: next })
  },
}))
