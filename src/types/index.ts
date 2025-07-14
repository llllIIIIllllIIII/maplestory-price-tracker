// 道具資料類型
export interface Item {
  id: number
  name: string
  wcPrice: number          // WC 價格
  mesosValue: number       // 楓幣價值
  efficiency: number       // 兌換效率
  category?: string | null // 道具類別
  description?: string | null // 道具描述
  lastUpdated: Date
  createdAt: Date
}

// 套利機會類型
export interface ArbitrageOpportunity {
  id: number
  item1Id: number
  item2Id: number
  profitRate: number       // 套利利潤率
  priceDiff: number        // WC 價格差異
  efficiencyDiff: number   // 效率差異
  createdAt: Date
  item1: Item
  item2: Item
}

// 同步日誌類型
export interface SyncLog {
  id: number
  status: 'SUCCESS' | 'ERROR'
  message?: string
  itemsCount?: number      // 同步的道具數量
  duration?: number        // 同步耗時（毫秒）
  createdAt: Date
}

// Google Sheets 原始資料類型
export interface GoogleSheetRow {
  itemName: string
  wcPrice: number
  mesosValue: number
  category?: string
  description?: string
  lastUpdated?: string
}

// API 回應類型
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

// 統計資料類型
export interface Stats {
  totalItems: number
  averageEfficiency: number
  bestEfficiency: number
  totalArbitrageOpportunities: number
  lastUpdateTime: Date
}

// 圖表資料類型
export interface ChartData {
  name: string
  efficiency: number
  wcPrice: number
  mesosValue: number
}

// 搜尋/篩選參數類型
export interface ItemFilters {
  search?: string
  category?: string
  minEfficiency?: number
  maxEfficiency?: number
  sortBy?: 'efficiency' | 'name' | 'wcPrice' | 'mesosValue'
  sortOrder?: 'asc' | 'desc'
  limit?: number
  offset?: number
}
