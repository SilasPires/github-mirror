'use client'

import { useUserStore } from '@/store/userStore'

type Props = {
  onSubmit?: (username: string) => void
  variant?: 'default' | 'header'
}

export function UserSearch({ onSubmit, variant = 'default' }: Props) {
  const username = useUserStore((s) => s.username)
  const setUsername = useUserStore((s) => s.setUsername)
  const submitUsername = useUserStore((s) => s.submitUsername)

  const handleSubmit = () => {
    const trimmed = username.trim()
    if (!trimmed) return
    if (onSubmit) onSubmit(trimmed)
    else submitUsername(trimmed)
  }

  if (variant === 'header') {
    return (
      <div className="relative w-full">
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 fill-white/60"
        >
          <path d="M10 4a6 6 0 1 1 0 12A6 6 0 0 1 10 4Zm0 2a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm9.7 13.3-3.2-3.2a8 8 0 1 1 1.4-1.4l3.2 3.2a1 1 0 0 1-1.4 1.4Z" />
        </svg>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSubmit()
          }}
          placeholder="Search user"
          className="h-9 w-full rounded-full border border-white/15 bg-white/10 pl-9 pr-3 text-sm text-white outline-none placeholder:text-white/60 focus:border-white/25 focus:ring-2 focus:ring-white/10"
        />
      </div>
    )
  }

  return (
    <div className="flex w-full flex-col gap-2">
      <label className="text-sm font-medium text-zinc-800">
        GitHub username
      </label>
      <input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleSubmit()
          }
        }}
        placeholder="ex: octocat"
        className="h-11 w-full rounded-lg border border-zinc-300 bg-white px-3 text-zinc-900 outline-none focus:ring-2 focus:ring-zinc-200"
      />
      <p className="text-xs text-zinc-500">Aperte Enter para buscar</p>
    </div>
  )
}
