'use client'

import { useEffect, useState } from 'react'

interface Stats {
  totalItems: number
  averageEfficiency: number
  bestEfficiency: number
  lastUpdateTime: string
  averageEfficiencyPerWC?: number
  maxPriceDifference?: number
  topEfficiencyItems?: Array<{
    wcPrice: number
    mesosValue: number
    efficiency: number
  }>
}

export function StatsCards() {
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/stats')
      const result = await response.json()
      if (result.success) {
        setStats(result.data)
      }
    } catch (error) {
      console.error('獲取統計資料失敗:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-white rounded-lg p-6 shadow-sm border animate-pulse">
            <div className="h-4 bg-gray-200 rounded mb-2"></div>
            <div className="h-8 bg-gray-200 rounded"></div>
          </div>
        ))}
      </div>
    )
  }

  if (!stats) {
    return <div className="text-center text-gray-500 mb-8">無法載入統計資料</div>
  }

  // 計算最優台幣：楓幣匯率
  const calculateBestTWDToMesosRate = () => {
    if (!stats.topEfficiencyItems || stats.topEfficiencyItems.length === 0) {
      return 0
    }
    
    // 找到最高效率的道具
    const bestItem = stats.topEfficiencyItems[0]
    const mesosPerWC = bestItem.mesosValue / bestItem.wcPrice
    
    // 假設 1 WC = 0.15 TWD
    const twdPerWC = 0.15
    const mesosPerTWD = mesosPerWC / twdPerWC
    
    return Math.round(mesosPerTWD)
  }

  const cards = [
    {
      title: '最優匯率',
      value: calculateBestTWDToMesosRate(),
      prefix: '1 TWD : ',
      suffix: ' 楓幣',
      icon: '💱',
      color: 'text-green-600'
    },
    {
      title: '平均效率',
      value: stats.averageEfficiencyPerWC || 0,
      prefix: '1 WC : ',
      suffix: ' 楓幣',
      icon: '📊',
      color: 'text-blue-600'
    },
    {
      title: '最大價差',
      value: stats.maxPriceDifference || 0,
      prefix: '+',
      suffix: ' 楓幣/WC',
      icon: '📈',
      color: 'text-orange-600'
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {cards.map((card, index) => (
        <div key={index} className="bg-white rounded-lg p-6 shadow-sm border hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">
                {card.title}
              </p>
              <p className={`text-2xl font-bold ${card.color}`}>
                {card.prefix && <span className="text-lg">{card.prefix}</span>}
                {card.value.toLocaleString()}
                {card.suffix && <span className="text-lg">{card.suffix}</span>}
              </p>
            </div>
            <div className="text-3xl">{card.icon}</div>
          </div>
        </div>
      ))}
    </div>
  )
}
