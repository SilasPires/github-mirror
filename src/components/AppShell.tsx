import { NavTabs } from '@/components/NavTabs'

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 dark:bg-black dark:text-zinc-50">
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-6 px-4 py-8">
        <header className="flex flex-col gap-3">
          <div className="flex items-baseline justify-between">
            <h1 className="text-xl font-semibold">GitHub Mirror</h1>
            <span className="text-xs text-zinc-500 dark:text-zinc-400">
              Magazord test
            </span>
          </div>
          <NavTabs />
        </header>

        <main className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
          {children}
        </main>
      </div>
    </div>
  )
}
