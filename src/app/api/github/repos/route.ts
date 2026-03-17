import { NextRequest, NextResponse } from 'next/server'
import { Octokit } from '@octokit/rest'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const token = searchParams.get('token')
  const enterpriseUrl = searchParams.get('enterpriseUrl') || 'https://api.github.com'

  if (!token) {
    return NextResponse.json({ error: 'GitHub token required' }, { status: 400 })
  }

  try {
    const octokit = new Octokit({
      auth: token,
      baseUrl: enterpriseUrl.startsWith('https://') ? enterpriseUrl : `https://${enterpriseUrl}/api/v3`,
    })

    const { data } = await octokit.repos.listForAuthenticatedUser({
      per_page: 100,
    })

    return NextResponse.json(data)
  } catch (error) {
    console.error('Error fetching repos:', error)
    return NextResponse.json({ error: 'Failed to fetch repositories' }, { status: 500 })
  }
}