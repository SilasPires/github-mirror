import { NextRequest } from 'next/server'

export const runtime = 'nodejs'

function buildTargetUrl(pathParts: string[], request: NextRequest) {
  const base = new URL('https://api.github.com/')
  const target = new URL(pathParts.join('/'), base)

  request.nextUrl.searchParams.forEach((value, key) => {
    target.searchParams.set(key, value)
  })

  return target
}

export async function GET(
  request: NextRequest,
  ctx: { params: Promise<{ path: string[] }> }
) {
  const { path } = await ctx.params

  if (!path?.length) {
    return Response.json({ message: 'Missing path' }, { status: 400 })
  }

  const targetUrl = buildTargetUrl(path, request)

  const headers: Record<string, string> = {
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
  }

  const token = process.env.GITHUB_TOKEN
  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  const githubResponse = await fetch(targetUrl, {
    headers,
    cache: 'no-store',
  })

  const contentType = githubResponse.headers.get('content-type')
  const body = await githubResponse.text()

  return new Response(body, {
    status: githubResponse.status,
    headers: {
      'content-type': contentType ?? 'application/json; charset=utf-8',
      'cache-control': 'no-store',
    },
  })
}
