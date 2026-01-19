import { RepoDetails } from '@/components/RepoDetails'

type PageProps = {
  params: Promise<{ owner: string; repo: string }>
}

export default async function RepoPage({ params }: PageProps) {
  const { owner, repo } = await params

  return <RepoDetails owner={owner} repo={repo} />
}
