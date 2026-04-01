'use client'

import { useState, useEffect } from 'react'

export default function Settings() {
  const [token, setToken] = useState('')
  const [enterpriseUrl, setEnterpriseUrl] = useState('https://api.github.com')
  const [saved, setSaved] = useState(false)

  const saveSettings = () => {
    // In a real app, you'd save to localStorage or a backend
    localStorage.setItem('github_token', token)
    localStorage.setItem('github_enterprise_url', enterpriseUrl)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const loadSettings = () => {
    // In a real app, you'd save to localStorage or a backend
    const savedToken = localStorage.getItem('github_token') || ''
    const savedUrl = localStorage.getItem('github_enterprise_url') || 'https://api.github.com'
    setToken(savedToken)
    setEnterpriseUrl(savedUrl)
  }

  // Load settings on component mount
  useEffect(() => {
    loadSettings()
  }, [])

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="text-4xl font-bold mb-8">GitHub Enterprise Settings</h1>

      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md max-w-2xl w-full">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">GitHub Personal Access Token</label>
            <input
              type="password"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="ghp_xxxxxxxxxxxxxxxxxxxx"
            />
            <p className="text-xs text-gray-500 mt-1">
              Create a token at <a href="https://github.com/settings/tokens" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">GitHub Settings</a> with repo permissions
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">GitHub Enterprise URL</label>
            <input
              type="url"
              value={enterpriseUrl}
              onChange={(e) => setEnterpriseUrl(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="https://api.github.com"
            />
            <p className="text-xs text-gray-500 mt-1">
              For GitHub.com use https://api.github.com. For Enterprise, use your instance URL.
            </p>
          </div>

          <div className="flex gap-4">
            <button
              onClick={saveSettings}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Save Settings
            </button>
            <button
              onClick={loadSettings}
              className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
            >
              Load Settings
            </button>
          </div>

          {saved && (
            <div className="text-green-600 text-sm">
              Settings saved successfully!
            </div>
          )}
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold mb-4">About</h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            This web suite provides a comprehensive interface for managing your GitHub Enterprise repositories,
            issues, and pull requests. Configure your settings above to get started.
          </p>
        </div>
      </div>
    </main>
  )
}