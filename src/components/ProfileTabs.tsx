'use client'

import { useCountsStore } from '@/store/countsStore'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const tabs = [
  { href: '/repos', label: 'Repositórios', countKey: 'reposCount' as const },
  { href: '/starred', label: 'Favoritos', countKey: 'starredCount' as const },
]

function RepoIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      aria-hidden="true"
      className="h-4 w-4 fill-current"
    >
      <path d="M2 2.5A2.5 2.5 0 0 1 4.5 0h7A2.5 2.5 0 0 1 14 2.5v11A2.5 2.5 0 0 1 11.5 16h-7A2.5 2.5 0 0 1 2 13.5v-11ZM4.5 1.5c-.55 0-1 .45-1 1v11c0 .55.45 1 1 1h7c.55 0 1-.45 1-1v-11c0-.55-.45-1-1-1h-7Z" />
      <path d="M5 4h6v1.5H5V4Zm0 3h6v1.5H5V7Zm0 3h4v1.5H5V10Z" />
    </svg>
  )
}

function StarIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      aria-hidden="true"
      className="h-4 w-4 fill-current"
    >
      <path d="M8 0.75 10.06 5.1l4.69.41-3.56 3.08 1.07 4.6L8 10.66 3.74 13.2l1.07-4.6L1.25 5.5l4.69-.41L8 0.75Z" />
    </svg>
  )
}

export function ProfileTabs() {
  const pathname = usePathname()
  const reposCount = useCountsStore((s) => s.reposCount)
  const starredCount = useCountsStore((s) => s.starredCount)

  const counts = { reposCount, starredCount }

  return (
    <div className="border-b border-zinc-200">
      <div className="flex gap-6">
        {tabs.map((tab) => {
          const active = pathname === tab.href
          const count = counts[tab.countKey]

          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={
                'relative -mb-px flex items-center gap-2 px-1 py-3 text-sm ' +
                (active
                  ? 'font-medium text-zinc-900'
                  : 'text-zinc-600 hover:text-zinc-900')
              }
            >
              {tab.href === '/repos' ? <RepoIcon /> : <StarIcon />}
              <span>{tab.label}</span>
              <span className="rounded-full bg-zinc-200 px-2 py-0.5 text-xs text-zinc-700">
                {count}
              </span>

              <span
                className={
                  'absolute bottom-0 left-0 right-0 h-0.5 ' +
                  (active ? 'bg-red-500' : 'bg-transparent')
                }
              />
            </Link>
          )
        })}
      </div>
    </div>
  )
}
