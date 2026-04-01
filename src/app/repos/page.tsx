'use client'

import { useState, useEffect } from 'react'

interface Repository {
  id: number
  name: string
  full_name: string
  html_url: string
  description: string | null
  language: string | null
  updated_at: string
}

export default function Repos() {
  const [repos, setRepos] = useState<Repository[]>([])
  const [loading, setLoading] = useState(false)
  const [token, setToken] = useState('')
  const [enterpriseUrl, setEnterpriseUrl] = useState('https://api.github.com')

  const fetchRepos = async () => {
    if (!token) return

    setLoading(true)
    try {
      const response = await fetch(`/api/github/repos?token=${encodeURIComponent(token)}&enterpriseUrl=${encodeURIComponent(enterpriseUrl)}`)
      if (response.ok) {
        const data = await response.json()
        setRepos(data)
      } else {
        console.error('Failed to fetch repos')
      }
    } catch (error) {
      console.error('Error fetching repos:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="text-4xl font-bold mb-8">GitHub Enterprise Repositories</h1>

      <div className="w-full max-w-4xl mb-8">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-4">Configuration</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">GitHub Token</label>
              <input
                type="password"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="ghp_..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Enterprise URL</label>
              <input
                type="url"
                value={enterpriseUrl}
                onChange={(e) => setEnterpriseUrl(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="https://api.github.com"
              />
            </div>
          </div>
          <button
            onClick={fetchRepos}
            disabled={loading || !token}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {loading ? 'Loading...' : 'Fetch Repositories'}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {repos.map((repo) => (
            <div key={repo.id} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-2">
                <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                  {repo.name}
                </a>
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                {repo.description || 'No description'}
              </p>
              <div className="flex justify-between text-xs text-gray-500">
                <span>{repo.language || 'Unknown'}</span>
                <span>Updated {new Date(repo.updated_at).toLocaleDateString()}</span>
              </div>
            </div>
          ))}
        </div>

        {repos.length === 0 && !loading && (
          <div className="text-center text-gray-500 mt-8">
            No repositories loaded. Please configure your GitHub token and fetch repositories.
          </div>
        )}
      </div>
    </main>
  )
}