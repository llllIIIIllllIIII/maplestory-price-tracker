'use client'

import { useState, useEffect } from 'react'

export function Header() {
  const [lastUpdated, setLastUpdated] = useState<string>('載入中...')

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
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="text-3xl">🍁</div>
            <div>
              <h1 className="text-2xl font-bold maple-text">
                楓之谷物價追蹤器
              </h1>
              <p className="text-gray-600 text-sm">
                實時追蹤現金道具與楓幣兌換效率
              </p>
            </div>
          </div>
          
          <div className="text-right text-sm text-gray-500">
            <p>資料自動更新</p>
            <p>上次更新：{lastUpdated}</p>
          </div>
        </div>
      </div>
    </header>
  )
}

