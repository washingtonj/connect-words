import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react';
import { SettingsProvider } from '@/contexts'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Brennas Connect',
  description: 'Encontre palavras conexas em português'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <SettingsProvider>
        <body className={`${inter.className} bg-white text-zinc-950 dark:bg-zinc-900 dark:text-zinc-50`}>{children}</body>
      </SettingsProvider>
      <Analytics />
    </html>
  )
}
