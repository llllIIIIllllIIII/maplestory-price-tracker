/**
 * 資料快取服務
 * 減少 Google Sheets API 調用次數，提升響應速度
 */

interface CacheData {
  data: any
  timestamp: number
  lastSync: string
}

class CacheService {
  private cache: Map<string, CacheData> = new Map()
  private readonly TTL = 5 * 60 * 1000 // 5分鐘 TTL
  
  /**
   * 設置快取
   */
  set(key: string, data: any, lastSync?: string): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      lastSync: lastSync || new Date().toISOString()
    })
  }
  
  /**
   * 獲取快取
   */
  get(key: string): any | null {
    const cached = this.cache.get(key)
    
    if (!cached) {
      return null
    }
    
    // 檢查是否過期
    if (Date.now() - cached.timestamp > this.TTL) {
      this.cache.delete(key)
      return null
    }
    
    return cached.data
  }
  
  /**
   * 清除特定快取
   */
  clear(key: string): void {
    this.cache.delete(key)
  }
  
  /**
   * 清除所有快取
   */
  clearAll(): void {
    this.cache.clear()
  }
  
  /**
   * 獲取快取狀態
   */
  getStats(): { size: number; keys: string[] } {
    return {
      size: this.cache.size,
      keys: Array.from(this.cache.keys())
    }
  }
  
  /**
   * 檢查資料是否為最新（基於最後同步時間）
   */
  isDataFresh(key: string, lastSyncTime: string): boolean {
    const cached = this.cache.get(key)
    if (!cached) return false
    
    return cached.lastSync >= lastSyncTime
  }
}

// 全域快取實例
export const cacheService = new CacheService()

// 快取鍵常數
export const CACHE_KEYS = {
  ITEMS: 'items',
  STATS: 'stats',
  ARBITRAGE: 'arbitrage',
  EFFICIENCY_CHART: 'efficiency_chart'
} as const
