import { ProfileSidebar } from '@/components/ProfileSidebar'

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#f6f8fa] text-zinc-900">
      <header className="bg-[#24292f] text-white">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="text-base font-semibold">GitHub</div>
            <div className="text-sm opacity-70">/</div>
            <div className="text-sm opacity-90">Profile</div>
          </div>
          <div className="text-xs opacity-70">Magazord test</div>
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
