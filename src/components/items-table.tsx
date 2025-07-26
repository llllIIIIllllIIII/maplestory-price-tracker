'use client'

import { useEffect, useState } from 'react'
import { calculateTWDValue, formatTWD, calculateSnowflakeValue, formatSnowflakeValue } from '@/lib/calculator'
import type { Item as ItemType } from '@/types'

interface Item extends Omit<ItemType, 'lastUpdated' | 'createdAt'> {
  lastUpdated: string
  createdAt?: string
  snowflakeValue?: number // 新增雪價值欄位
}

export function ItemsTable() {
  const [items, setItems] = useState<Item[]>([])
  const [loading, setLoading] = useState(true)
  const [sortBy, setSortBy] = useState<'efficiency' | 'name' | 'wcPrice' | 'mesosValue'>('efficiency')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')

  useEffect(() => {
    fetchItems()
  }, [sortBy, sortOrder])

  const fetchItems = async () => {
    try {
      const params = new URLSearchParams({
        sortBy,
        sortOrder,
        limit: '20'
      })
      
      const response = await fetch(`/api/items?${params}`)
      const result = await response.json()
      if (result.success) {
        setItems(result.data.items)
      }
    } catch (error) {
      console.error('獲取道具列表失敗:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSort = (column: typeof sortBy) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortBy(column)
      setSortOrder('desc')
    }
  }

  const formatMesos = (value: number) => {
    // 將楓幣數值轉換為萬楓幣顯示
    const wanMesos = value / 10000
    return new Intl.NumberFormat('zh-TW', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 1
    }).format(wanMesos) + '萬'
  }

  const formatWC = (value: number) => {
    return new Intl.NumberFormat('zh-TW', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('zh-TW')
  }

  const getSortIcon = (column: typeof sortBy) => {
    if (sortBy !== column) return '↕️'
    return sortOrder === 'asc' ? '⬆️' : '⬇️'
  }

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="animate-pulse">
          <div className="h-12 bg-gray-200"></div>
          {[...Array(10)].map((_, i) => (
            <div key={i} className="h-16 bg-gray-100 border-t"></div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('name')}
              >
                道具名稱 {getSortIcon('name')}
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('wcPrice')}
              >
                單個WC價格 (台幣) {getSortIcon('wcPrice')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                台幣價值
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('mesosValue')}
              >
                拍賣價 (萬楓幣) {getSortIcon('mesosValue')}
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('efficiency')}
              >
                效率 (萬楓幣/WC) {getSortIcon('efficiency')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                雪價值
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                最後更新
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {items.map((item, index) => (
              <tr 
                key={item.id} 
                className={`hover:bg-gray-50 ${index < 3 ? 'bg-yellow-50' : ''}`}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    {index < 3 && <span className="mr-2">🏆</span>}
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {item.name}
                      </div>
                      {item.description && item.description.includes('個一包') && (
                        <div className="text-xs text-blue-600 mt-1">
                          📦 {item.description.match(/\(([^)]+)\)/)?.[1] || '打包商品'}
                        </div>
                      )}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <div>
                    <div className="font-medium">{formatWC(item.wcPrice)} WC</div>
                    <div className="text-xs text-gray-500">
                      {formatTWD(calculateTWDValue(item.wcPrice))}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-purple-600 font-medium">
                  {formatTWD(calculateTWDValue(item.wcPrice))}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {formatMesos(item.mesosValue)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <span className="text-lg font-bold text-green-600">
                      {item.efficiency.toFixed(3)}
                    </span>
                    <span className="text-xs text-gray-500 ml-1">萬楓幣/WC</span>
                  </div>
                  <div className="text-xs mt-1">
                    {(() => {
                      // 動態獲取飄雪結晶的效率作為基準
                      const snowflakeItem = items.find(item => item.name.includes('飄雪結晶'))
                      const snowflakeEfficiency = snowflakeItem?.efficiency || 2.2 // 預設值
                      const itemEfficiency = item.efficiency
                      const arbitragePotential = ((itemEfficiency - snowflakeEfficiency) / snowflakeEfficiency) * 100
                      
                      if (item.name.includes('飄雪結晶')) {
                        return <span className="text-blue-500">🧊 基準道具</span>
                      } else if (arbitragePotential > 0) {
                        return <span className="text-green-500">📈 比雪高 {arbitragePotential.toFixed(1)}%</span>
                      } else {
                        return <span className="text-red-500">📉 比雪低 {Math.abs(arbitragePotential).toFixed(1)}%</span>
                      }
                    })()}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <span className="text-sm font-semibold text-orange-600">
                      {formatSnowflakeValue(item.snowflakeValue ?? calculateSnowflakeValue(item.mesosValue))}
                    </span>
                    <span className="text-xs text-gray-500 ml-1">雪</span>
                  </div>
                  <div className="text-xs text-gray-400 mt-1">
                    建議交換價格
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatDate(item.lastUpdated)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {items.length === 0 && (
        <div className="text-center py-12">
          <div className="text-4xl mb-4">📦</div>
          <p className="text-gray-500">沒有找到道具資料</p>
          <p className="text-sm text-gray-400 mt-1">請先同步 Google Sheets 資料</p>
        </div>
      )}
    </div>
  )
}
