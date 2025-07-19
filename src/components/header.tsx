'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export function Header() {
  const [lastUpdated, setLastUpdated] = useState<string>('載入中...')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const fetchLastUpdated = async () => {
      try {
        const response = await fetch('/api/items?limit=1')
        const result = await response.json()
        
        if (result.success && result.data.lastUpdated) {
          const updateTime = new Date(result.data.lastUpdated)
          setLastUpdated(formatTime(updateTime))
        }
      } catch (error) {
        console.error('獲取最後更新時間失敗:', error)
        setLastUpdated('載入失敗')
      }
    }

    fetchLastUpdated()
    // 每分鐘更新一次顯示的時間
    const interval = setInterval(fetchLastUpdated, 60000)
    return () => clearInterval(interval)
  }, [])

  const formatTime = (date: Date): string => {
    const now = new Date()
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / 60000)
    
    if (diffInMinutes < 1) {
      return '剛剛'
    } else if (diffInMinutes < 60) {
      return `${diffInMinutes} 分鐘前`
    } else if (diffInMinutes < 1440) {
      const hours = Math.floor(diffInMinutes / 60)
      return `${hours} 小時前`
    } else {
      return date.toLocaleDateString('zh-TW', {
        month: 'numeric',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    }
  }

  return (
    <header className="bg-white border-b-2 border-orange-200 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        {/* 主要標題區 */}
        <div className="flex items-center justify-between mb-4">
          <Link href="/" className="flex items-center space-x-4 hover:opacity-80 transition-opacity">
            <div className="text-3xl">🍁</div>
            <div>
              <h1 className="text-2xl font-bold maple-text">
                楓之谷物價追蹤器
              </h1>
              <p className="text-gray-600 text-sm">
                Artale 專用價格分析工具
              </p>
            </div>
          </Link>
          
          <div className="hidden md:block text-right text-sm text-gray-500">
            <p>資料每日更新</p>
            <p>上次更新：{lastUpdated}</p>
          </div>

          {/* 手機版菜單按鈕 */}
          <button
            className="md:hidden p-2 rounded-md hover:bg-gray-100"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* 導航菜單 */}
        <nav className={`${isMobileMenuOpen ? 'block' : 'hidden'} md:block`}>
          <div className="flex flex-col md:flex-row md:items-center md:space-x-8 space-y-2 md:space-y-0">
            <Link 
              href="/" 
              className="text-gray-700 hover:text-orange-600 font-medium transition-colors px-2 py-1 rounded"
            >
              📊 價格分析
            </Link>
            <Link 
              href="/guide" 
              className="text-gray-700 hover:text-orange-600 font-medium transition-colors px-2 py-1 rounded"
            >
              📖 使用指南
            </Link>
            <Link 
              href="/about" 
              className="text-gray-700 hover:text-orange-600 font-medium transition-colors px-2 py-1 rounded"
            >
              ℹ️ 關於我們
            </Link>
            <Link 
              href="/faq" 
              className="text-gray-700 hover:text-orange-600 font-medium transition-colors px-2 py-1 rounded"
            >
              ❓ 常見問題
            </Link>
            <Link 
              href="/terms" 
              className="text-gray-700 hover:text-orange-600 font-medium transition-colors px-2 py-1 rounded"
            >
              📋 使用條款
            </Link>
            <Link 
              href="/privacy" 
              className="text-gray-700 hover:text-orange-600 font-medium transition-colors px-2 py-1 rounded"
            >
              🔒 隱私政策
            </Link>
          </div>
          
          {/* 手機版更新時間 */}
          <div className="md:hidden mt-4 pt-4 border-t text-sm text-gray-500 text-center">
            <p>資料每日更新 | 上次更新：{lastUpdated}</p>
          </div>
        </nav>
      </div>
    </header>
  )
}

