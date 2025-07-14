'use client'

import { useEffect, useState } from 'react'

interface ChartData {
  name: string
  efficiency: number
  wcPrice: number
  mesosValue: number
  description?: string
}

export function EfficiencyChart() {
  const [data, setData] = useState<ChartData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchChartData()
  }, [])

  const fetchChartData = async () => {
    try {
      const response = await fetch('/api/items?limit=10&sortBy=efficiency&sortOrder=desc')
      const result = await response.json()
      if (result.success) {
        const chartData = result.data.items.map((item: any) => ({
          name: item.name, // 移除名稱截斷，顯示完整名稱
          efficiency: item.efficiency, // 使用資料庫中已經正確計算的效率值
          wcPrice: item.wcPrice,
          mesosValue: item.mesosValue,
          description: item.description
        }))
        setData(chartData)
      }
    } catch (error) {
      console.error('獲取圖表資料失敗:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatWC = (value: number) => {
    return new Intl.NumberFormat('zh-TW', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value)
  }

  const formatEfficiency = (value: number) => {
    return new Intl.NumberFormat('zh-TW', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 3
    }).format(value)
  }

  if (loading) {
    return (
      <div className="bg-white rounded-lg p-6 shadow-sm border">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded mb-4"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    )
  }

  if (data.length === 0) {
    return (
      <div className="bg-white rounded-lg p-6 shadow-sm border">
        <div className="text-center text-gray-500">
          <div className="text-4xl mb-2">📊</div>
          <p>暫無圖表資料</p>
        </div>
      </div>
    )
  }

  const maxEfficiency = Math.max(...data.map(item => item.efficiency))

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">
        前 10 名道具效率比較
      </h3>
      
      <div className="space-y-3">
        {data.map((item, index) => {
          const percentage = (item.efficiency / maxEfficiency) * 100
          const isTop3 = index < 3
          
          return (
            <div key={index} className="relative">
              <div className="flex justify-between items-start mb-1 gap-2">
                <div className="flex-1">
                  <span className={`text-sm font-medium break-words ${isTop3 ? 'text-orange-600' : 'text-gray-700'}`}>
                    {isTop3 && '🏆'} {item.name}
                  </span>
                  {item.description && item.description.includes('個一包') && (
                    <div className="text-xs text-blue-600 mt-1">
                      📦 {item.description.match(/\(([^)]+)\)/)?.[1] || '打包商品'}
                    </div>
                  )}
                </div>
                <span className="text-sm font-semibold text-gray-900 ml-2 flex-shrink-0">
                  1WC : {formatEfficiency(item.efficiency)} 萬楓幣
                </span>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className={`h-3 rounded-full transition-all duration-1000 ease-out ${
                    isTop3 
                      ? 'bg-gradient-to-r from-yellow-400 to-orange-500' 
                      : 'bg-gradient-to-r from-blue-400 to-blue-500'
                  }`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
              
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>WC: {formatWC(item.wcPrice)}</span>
                <span>楓幣: {item.mesosValue.toLocaleString()}</span>
              </div>
            </div>
          )
        })}
      </div>
      
      <div className="mt-6 p-4 bg-orange-50 rounded-lg">
        <h4 className="font-medium text-orange-800 mb-2">💡 效率說明</h4>
        <div className="text-sm text-orange-700 space-y-1">
          <p>效率 = 拍賣價(萬楓幣) ÷ 單個WC價格。數值顯示每 1 WC 能兌換多少萬楓幣。</p>
          <p className="text-xs">
            📦 標示打包資訊的道具表示此道具是整包販售，但此處顯示的是單個商品的價格與效率。
          </p>
        </div>
      </div>
    </div>
  )
}
