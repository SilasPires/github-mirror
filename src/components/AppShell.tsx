import { ProfileSidebar } from '@/components/ProfileSidebar'
import { UserSearch } from '@/components/UserSearch'

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#f6f8fa] text-zinc-900">
      <header className="bg-[#24292f] text-white">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <svg
              viewBox="0 0 16 16"
              aria-hidden="true"
              className="h-5 w-5 fill-white"
            >
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
            </svg>
            <div className="text-base font-semibold">GitHub</div>
            <div className="text-sm opacity-70">/</div>
            <div className="text-sm opacity-90">Profile</div>
          </div>
          <div className="w-full max-w-sm">
            <UserSearch variant="header" />
          </div>
        </div>
      </header>

      <div className="mx-auto flex w-full max-w-5xl flex-col gap-4 px-4 py-5 md:flex-row md:gap-8">
        <div className="md:hidden">
          <ProfileSidebar variant="mobile" />
        </div>
        <aside className="hidden w-72 shrink-0 md:block">
          <ProfileSidebar />
        </aside>

        <main className="w-full rounded-md border border-zinc-200 bg-white">
          <div className="p-4">{children}</div>
        </main>
      </div>
    </div>
  )
}
