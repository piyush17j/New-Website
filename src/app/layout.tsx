import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'New Website - GitHub Enterprise Suite',
  description: 'A full-stack web application for GitHub Enterprise integration',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}