'use client'

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

  const query = useQuery({
    queryKey: githubKeys.user(activeUsername),
    queryFn: () => getUser(activeUsername),
    enabled: Boolean(activeUsername),
  })

  const user = query.data

  const blue = '#0587FF'

  const followersText =
    typeof user?.followers === 'number' && typeof user?.following === 'number'
      ? `${user.followers} seguidores · ${user.following} seguindo`
      : ''

  const companyText = user?.company?.trim() || ''
  const locationText = user?.location?.trim() || ''

  return (
    <div
      className={
        variant === 'mobile'
          ? 'rounded-md border border-zinc-200 bg-white p-4'
          : ''
      }
    >
      <div className="flex flex-col">
        <div className="h-40 w-40 overflow-hidden rounded-full bg-zinc-200">
          {user?.avatar_url ? (
            <Image
              src={user.avatar_url}
              alt="Avatar do usuário"
              width={160}
              height={160}
              className="h-full w-full object-cover"
            />
          ) : null}
        </div>

        <div className="mt-4">
          <div className="text-xl font-semibold text-zinc-900">
            {user?.name ?? activeUsername}
          </div>
          {user?.bio ? (
            <div className="mt-2 text-sm text-zinc-600">
              <p className="wrap-break-word">{user.bio}</p>
            </div>
          ) : null}
        </div>

        <div className="mt-4 flex flex-col gap-2 text-sm">
          {followersText ? (
            <div className="wrap-break-word" style={{ color: blue }}>
              {followersText}
            </div>
          ) : null}

          {companyText ? (
            <div className="wrap-break-word" style={{ color: blue }}>
              {companyText}
            </div>
          ) : null}

          {locationText ? (
            <div className="wrap-break-word" style={{ color: blue }}>
              {locationText}
            </div>
          ) : null}

          <a
            href={user?.html_url ?? `https://github.com/${activeUsername}`}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 hover:underline"
            style={{ color: blue }}
          >
            <svg
              viewBox="0 0 16 16"
              className="h-4 w-4 fill-zinc-500"
              aria-hidden="true"
            >
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
            </svg>
            <span>github.com/{activeUsername}</span>
          </a>
        </div>
      </div>
    </div>
  )
}
