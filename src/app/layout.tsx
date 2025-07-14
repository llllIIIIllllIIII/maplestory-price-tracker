import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { QueryProvider } from '@/lib/query-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '🍁 楓之谷物價追蹤器',
  description: '實時追蹤楓之谷現金道具與楓幣的兌換效率，發現最佳套利機會',
  keywords: ['楓之谷', 'MapleStory', '物價', '楓幣', 'WC', '套利'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-TW">
      <body className={inter.className}>
        <QueryProvider>
          {children}
        </QueryProvider>
      </body>
    </html>
  )
}
