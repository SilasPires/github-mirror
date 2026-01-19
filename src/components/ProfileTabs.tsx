'use client'

import { useCountsStore } from '@/store/countsStore'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const tabs = [
  { href: '/repos', label: 'Repositories', countKey: 'reposCount' as const },
  { href: '/starred', label: 'Starred', countKey: 'starredCount' as const },
]

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
