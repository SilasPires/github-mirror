'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const tabs = [
  { href: '/repos', label: 'Repositórios' },
  { href: '/starred', label: 'Favoritos' },
]

export function NavTabs() {
  const pathname = usePathname()

  return (
    <nav className="flex gap-2 rounded-lg bg-zinc-100 p-1 dark:bg-zinc-900">
      {tabs.map((tab) => {
        const active = pathname === tab.href

        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={
              'rounded-md px-3 py-2 text-sm font-medium transition-colors ' +
              (active
                ? 'bg-white text-zinc-900 shadow-sm dark:bg-zinc-800 dark:text-zinc-50'
                : 'text-zinc-600 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-50')
            }
          >
            {tab.label}
          </Link>
        )
      })}
    </nav>
  )
}
