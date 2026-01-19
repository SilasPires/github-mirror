'use client'

import { UserSearch } from '@/components/UserSearch'

export default function ReposPage() {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h2 className="text-lg font-semibold">Repositories</h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Lista de repositórios do usuário (API entra no próximo passo)
        </p>
      </div>

      <UserSearch onSubmit={() => {}} />

      <div className="rounded-lg border border-dashed border-zinc-300 p-4 text-sm text-zinc-600 dark:border-zinc-800 dark:text-zinc-300">
        Placeholder de lista
      </div>
    </div>
  )
}
