'use client'

import { useUserStore } from '@/store/userStore'

type Props = {
  onSubmit?: (username: string) => void
}

export function UserSearch({ onSubmit }: Props) {
  const username = useUserStore((s) => s.username)
  const setUsername = useUserStore((s) => s.setUsername)

  return (
    <div className="flex w-full flex-col gap-2">
      <label className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
        GitHub username
      </label>
      <input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            onSubmit?.(username.trim())
          }
        }}
        placeholder="ex: octocat"
        className="h-11 w-full rounded-lg border border-zinc-200 bg-white px-3 text-zinc-900 outline-none focus:ring-2 focus:ring-zinc-300 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50 dark:focus:ring-zinc-700"
      />
      <p className="text-xs text-zinc-500 dark:text-zinc-400">
        Aperte Enter para buscar
      </p>
    </div>
  )
}
