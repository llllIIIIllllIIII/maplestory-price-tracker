import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { QueryProvider } from '@/lib/query-provider'
import Script from 'next/script'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '🍁 楓之谷物價追蹤器 - Artale 伺服器專用價格分析工具',
  description: '專為楓之谷 Artale 伺服器設計的物價追蹤系統。實時監控現金道具與楓幣兌換效率，提供詳細的市場分析和套利機會計算。每日自動更新拍賣場數據，幫助玩家做出最佳交易決策。',
  keywords: ['楓之谷', 'MapleStory', 'Artale', '物價', '楓幣', 'WC', '套利', '拍賣場', '價格追蹤', '市場分析', '現金道具'],
  authors: [{ name: '楓之谷物價追蹤器團隊' }],
  creator: '楓之谷物價追蹤器',
  publisher: '楓之谷物價追蹤器',
  openGraph: {
    title: '🍁 楓之谷物價追蹤器 - Artale 專用',
    description: '實時追蹤楓之谷現金道具價格，發現最佳套利機會',
    type: 'website',
    locale: 'zh_TW',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-TW">
      <head>
        {/* Google AdSense */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7994991319464017"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body className={inter.className}>
        <QueryProvider>
          {children}
        </QueryProvider>
      </body>
    </html>
  )
}
