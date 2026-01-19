'use client'

import { UserSearch } from '@/components/UserSearch'
import { getUser } from '@/lib/github/client'
import { githubKeys } from '@/lib/github/queryKeys'
import { useUserStore } from '@/store/userStore'
import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'

type Props = {
  variant?: 'desktop' | 'mobile'
}

export function ProfileSidebar({ variant = 'desktop' }: Props) {
  const activeUsername = useUserStore((s) => s.activeUsername)
  const submitUsername = useUserStore((s) => s.submitUsername)

  const query = useQuery({
    queryKey: githubKeys.user(activeUsername),
    queryFn: () => getUser(activeUsername),
    enabled: Boolean(activeUsername),
  })

  const user = query.data

  return (
    <div
      className={
        variant === 'mobile'
          ? 'rounded-md border border-zinc-200 bg-white p-4'
          : ''
      }
    >
      <div className="flex items-center gap-3">
        <div className="h-16 w-16 overflow-hidden rounded-full bg-zinc-200">
          {user?.avatar_url ? (
            <Image
              src={user.avatar_url}
              alt="Avatar"
              width={64}
              height={64}
              className="h-full w-full object-cover"
            />
          ) : null}
        </div>

        <div className="min-w-0">
          <div className="truncate text-base font-semibold text-zinc-900">
            {user?.name ?? activeUsername}
          </div>
          <div className="truncate text-sm text-zinc-500">{user?.login}</div>
        </div>
      </div>

      <div className="mt-4">
        <UserSearch onSubmit={(u) => submitUsername(u)} />
      </div>

      <div className="mt-4 text-xs text-zinc-500">
        {user?.bio ? <p className="wrap-break-word">{user.bio}</p> : null}
      </div>

      <div className="mt-4 flex flex-col gap-2 text-sm">
        <a
          href={user?.html_url ?? `https://github.com/${activeUsername}`}
          target="_blank"
          rel="noreferrer"
          className="text-zinc-600 hover:text-zinc-900 hover:underline"
        >
          github.com/{activeUsername}
        </a>
      </div>
    </div>
  )
}
