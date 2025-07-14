import { Item, ArbitrageOpportunity } from '@/types'
import { prisma } from '@/lib/database'

// 飄雪結晶基準價格配置（基於實際市場資料）
const SNOWFLAKE_CONFIG = {
  name: '飄雪結晶',
  marketPrice: 400000, // 市場拍賣價 40萬楓幣（單位：楓幣）- 會動態更新
  wcPrice: 27.273, // 27.273 WC（來自最新表格資料：300WC/11個=27.273）
  baseEfficiency: 400000 / 27.273 / 10000 // 約 1.467 萬楓幣/WC（正確計算：40萬楓幣÷27.273WC÷10000）
}

/**
 * 計算道具的兌換效率
 * @param mesosValue 楓幣價值（實際楓幣數，不是萬楓幣）
 * @param wcPrice WC 價格
 * @returns 兌換效率 (萬楓幣/WC)
 */
export function calculateEfficiency(mesosValue: number, wcPrice: number): number {
  if (wcPrice <= 0) return 0
  // 將楓幣轉換為萬楓幣再計算效率
  const mesosInWan = mesosValue / 10000
  return Math.round((mesosInWan / wcPrice) * 10000) / 10000 // 保留四位小數
}

/**
 * 計算相對於飄雪結晶的套利潛力
 * @param item 道具
 * @returns 套利潛力百分比（正數表示比飄雪結晶更有效率）
 */
export function calculateArbitragePotential(item: Item): number {
  const itemEfficiency = calculateEfficiency(item.mesosValue, item.wcPrice)
  const difference = itemEfficiency - SNOWFLAKE_CONFIG.baseEfficiency
  return Math.round((difference / SNOWFLAKE_CONFIG.baseEfficiency) * 10000) / 100 // 百分比，保留兩位小數
}

/**
 * 尋找相對於飄雪結晶的套利機會
 * @param items 道具列表
 * @param minArbitragePotential 最小套利潛力百分比（預設: 5%）
 * @returns 套利機會列表
 */
export function findSnowflakeArbitrageOpportunities(
  items: Item[],
  minArbitragePotential: number = 5
): Array<{
  item: Item
  arbitragePotential: number
  efficiencyVsSnowflake: number
  potentialProfit: number
  recommendation: string
}> {
  const opportunities: Array<{
    item: Item
    arbitragePotential: number
    efficiencyVsSnowflake: number
    potentialProfit: number
    recommendation: string
  }> = []

  items.forEach(item => {
    // 跳過飄雪結晶本身
    if (item.name.includes('飄雪') || item.name.includes('雪花') || item.name.includes('結晶')) {
      return
    }

    const itemEfficiency = calculateEfficiency(item.mesosValue, item.wcPrice)
    const arbitragePotential = calculateArbitragePotential(item)
    
    // 計算潛在利潤（以萬楓幣為單位）
    const potentialProfit = (itemEfficiency - SNOWFLAKE_CONFIG.baseEfficiency) * item.wcPrice

    if (Math.abs(arbitragePotential) >= minArbitragePotential) {
      let recommendation = ''
      
      if (arbitragePotential > 0) {
        recommendation = `建議購買：比飄雪結晶效率高 ${arbitragePotential.toFixed(2)}%`
      } else {
        recommendation = `避免購買：比飄雪結晶效率低 ${Math.abs(arbitragePotential).toFixed(2)}%`
      }

      opportunities.push({
        item,
        arbitragePotential,
        efficiencyVsSnowflake: itemEfficiency,
        potentialProfit,
        recommendation
      })
    }
  })

  // 按套利潛力排序（由高到低）
  return opportunities.sort((a, b) => b.arbitragePotential - a.arbitragePotential)
}

/**
 * 尋找套利機會
 * @param items 道具列表
 * @param priceTolerance WC 價格容忍度（預設: 10）
 * @param minEfficiencyDiff 最小效率差異（預設: 5000）
 * @returns 套利機會列表
 */
export function findArbitrageOpportunities(
  items: Item[],
  priceTolerance: number = 10,
  minEfficiencyDiff: number = 5000
): Array<{
  item1: Item
  item2: Item
  profitRate: number
  priceDiff: number
  efficiencyDiff: number
}> {
  const opportunities: Array<{
    item1: Item
    item2: Item
    profitRate: number
    priceDiff: number
    efficiencyDiff: number
  }> = []

  for (let i = 0; i < items.length; i++) {
    for (let j = i + 1; j < items.length; j++) {
      const item1 = items[i]
      const item2 = items[j]

      const priceDiff = Math.abs(item1.wcPrice - item2.wcPrice)
      const efficiencyDiff = Math.abs(item1.efficiency - item2.efficiency)

      // 檢查是否符合套利條件
      if (priceDiff <= priceTolerance && efficiencyDiff >= minEfficiencyDiff) {
        const lowerEfficiency = Math.min(item1.efficiency, item2.efficiency)
        const profitRate = lowerEfficiency > 0 ? 
          Math.round((efficiencyDiff / lowerEfficiency) * 10000) / 100 : 0

        opportunities.push({
          item1,
          item2,
          profitRate,
          priceDiff,
          efficiencyDiff: Math.round(efficiencyDiff * 100) / 100
        })
      }
    }
  }

  // 按獲利率排序（高到低）
  return opportunities.sort((a, b) => b.profitRate - a.profitRate)
}

/**
 * 獲取飄雪結晶的最新價格（用於其他模組）
 * 這是一個輔助函數，實際的資料庫查詢應該在調用方進行
 */
export async function getDefaultSnowflakePrice(): Promise<number> {
  try {
    // 先嘗試從資料庫中獲取最後一次的飄雪結晶價格
    const lastKnownSnowflake = await prisma.item.findFirst({
      where: {
        name: {
          contains: '飄雪結晶'
        }
      },
      orderBy: [
        { lastUpdated: 'desc' },
        { createdAt: 'desc' }
      ]
    })

    if (lastKnownSnowflake?.mesosValue) {
      return lastKnownSnowflake.mesosValue
    }
  } catch (error) {
    console.warn('無法從資料庫獲取飄雪結晶價格，使用配置預設值:', error)
  }

  // 如果資料庫中沒有資料或發生錯誤，使用配置中的預設值
  return SNOWFLAKE_CONFIG.marketPrice
}

/**
 * 獲取最佳效率道具
 * @param items 道具列表
 * @param count 返回數量（預設: 10）
 * @returns 最高效率的道具列表
 */
export function getTopEfficiencyItems(items: Item[], count: number = 10): Item[] {
  return items
    .filter(item => item.efficiency > 0)
    .sort((a, b) => b.efficiency - a.efficiency)
    .slice(0, count)
}

/**
 * 計算統計資訊
 * @param items 道具列表
 * @param arbitrageOpportunities 套利機會列表
 * @returns 統計資訊
 */
export function calculateStats(
  items: Item[],
  arbitrageOpportunities: ArbitrageOpportunity[]
) {
  const validItems = items.filter(item => item.efficiency > 0)
  
  const totalItems = validItems.length
  const averageEfficiency = totalItems > 0 ? 
    Math.round((validItems.reduce((sum, item) => sum + item.efficiency, 0) / totalItems) * 100) / 100 : 0
  const bestEfficiency = totalItems > 0 ? 
    Math.max(...validItems.map(item => item.efficiency)) : 0

  return {
    totalItems,
    averageEfficiency,
    bestEfficiency,
    lastUpdateTime: new Date()
  }
}

/**
 * 格式化楓幣數字（加上千分位逗號）
 * @param value 楓幣數值
 * @returns 格式化後的字串
 */
export function formatMesos(value: number): string {
  return new Intl.NumberFormat('zh-TW').format(value)
}

/**
 * 格式化效率數字
 * @param efficiency 效率值
 * @returns 格式化後的字串
 */
export function formatEfficiency(efficiency: number): string {
  return new Intl.NumberFormat('zh-TW', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  }).format(efficiency)
}

/**
 * 計算投資回報率（ROI）
 * @param item1 道具1
 * @param item2 道具2
 * @returns ROI 百分比
 */
export function calculateROI(item1: Item, item2: Item): number {
  if (item1.efficiency <= 0 || item2.efficiency <= 0) return 0
  
  const lowerEfficiency = Math.min(item1.efficiency, item2.efficiency)
  const higherEfficiency = Math.max(item1.efficiency, item2.efficiency)
  
  return Math.round(((higherEfficiency - lowerEfficiency) / lowerEfficiency) * 10000) / 100
}

/**
 * 驗證道具資料
 * @param item 道具資料
 * @returns 是否有效
 */
export function validateItemData(item: any): boolean {
  // 支援兩種格式：item.name 和 item.itemName
  const itemName = item.name || item.itemName
  return !!(
    itemName &&
    typeof item.wcPrice === 'number' &&
    typeof item.mesosValue === 'number' &&
    item.wcPrice > 0 &&
    item.mesosValue > 0
  )
}

// WC 與台幣匯率常數
export const WC_TO_TWD_RATE = 0.15 // 1 WC ≈ 0.15 TWD (基於 400WC:60TWD 和 13200WC:1990TWD)

/**
 * 計算 WC 對應的台幣價值
 * @param wcAmount WC 數量
 * @returns 台幣價值
 */
export function calculateTWDValue(wcAmount: number): number {
  return Math.round(wcAmount * WC_TO_TWD_RATE * 100) / 100 // 保留兩位小數
}

/**
 * 格式化台幣金額
 * @param amount 台幣金額
 * @returns 格式化的台幣字串
 */
export function formatTWD(amount: number): string {
  return `NT$ ${new Intl.NumberFormat('zh-TW', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount)}`
}

/**
 * 計算道具的台幣效率 (楓幣/台幣)
 * @param mesosValue 楓幣價值
 * @param wcPrice WC 價格
 * @returns 台幣效率
 */
export function calculateTWDEfficiency(mesosValue: number, wcPrice: number): number {
  const twdValue = calculateTWDValue(wcPrice)
  if (twdValue <= 0) return 0
  return Math.round((mesosValue / twdValue) * 100) / 100
}

/**
 * 計算投資報酬率 (以台幣為基準)
 * @param item1 道具1
 * @param item2 道具2
 * @returns 台幣基準的 ROI 百分比
 */
export function calculateTWDROI(item1: Item, item2: Item): number {
  const twd1Efficiency = calculateTWDEfficiency(item1.mesosValue, item1.wcPrice)
  const twd2Efficiency = calculateTWDEfficiency(item2.mesosValue, item2.wcPrice)
  
  if (twd1Efficiency <= 0 || twd2Efficiency <= 0) return 0
  
  const lowerEfficiency = Math.min(twd1Efficiency, twd2Efficiency)
  const higherEfficiency = Math.max(twd1Efficiency, twd2Efficiency)
  
  return Math.round(((higherEfficiency - lowerEfficiency) / lowerEfficiency) * 10000) / 100
}

/**
 * 計算道具相當於多少飄雪結晶的價值
 * @param mesosValue 道具的楓幣價值（楓幣）
 * @param snowflakePrice 飄雪結晶的市場價格（楓幣），如果不提供則使用預設值
 * @returns 相當於多少飄雪結晶
 */
export function calculateSnowflakeValue(mesosValue: number, snowflakePrice?: number): number {
  // 使用動態的飄雪結晶價格，如果沒有提供則使用預設值
  const actualSnowflakePrice = snowflakePrice || SNOWFLAKE_CONFIG.marketPrice
  return Math.round((mesosValue / actualSnowflakePrice) * 100) / 100 // 保留兩位小數
}

/**
 * 格式化雪價值
 * @param snowflakeValue 雪價值
 * @returns 格式化後的字串
 */
export function formatSnowflakeValue(snowflakeValue: number): string {
  return new Intl.NumberFormat('zh-TW', {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1
  }).format(snowflakeValue)
}
