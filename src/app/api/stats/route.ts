import { NextResponse } from 'next/server'
import { prisma } from '@/lib/database'
import { calculateStats } from '@/lib/calculator'

export async function GET() {
  try {
    // 並行查詢所有需要的資料
    const [items, latestSyncLog] = await Promise.all([
      prisma.item.findMany(),
      prisma.syncLog.findFirst({
        where: { status: 'SUCCESS' },
        orderBy: { createdAt: 'desc' }
      })
    ])

    // 計算統計資訊
    const stats = calculateStats(items, [])

    // 添加最後更新時間
    if (latestSyncLog) {
      stats.lastUpdateTime = latestSyncLog.createdAt
    }

    // 額外統計資訊
    const sortedItems = items
      .filter((item: any) => item.efficiency > 0)
      .sort((a: any, b: any) => b.efficiency - a.efficiency);
    
    const bestItem = sortedItems[0];
    const worstItem = sortedItems[sortedItems.length - 1];
    
    // 計算平均效率（每1WC兌換楓幣）
    const averageEfficiencyPerWC = items.length > 0 ? 
      items.reduce((sum: number, item: any) => sum + (item.mesosValue / item.wcPrice), 0) / items.length : 0;
    
    // 計算最大價差（最高效率 - 最低效率）
    const maxPriceDifference = bestItem && worstItem ? 
      (bestItem.mesosValue / bestItem.wcPrice) - (worstItem.mesosValue / worstItem.wcPrice) : 0;

    const additionalStats = {
      ...stats,
      categories: await getCategories(),
      topEfficiencyItems: sortedItems.slice(0, 5),
      averageEfficiencyPerWC: Math.round(averageEfficiencyPerWC),
      maxPriceDifference: Math.round(maxPriceDifference)
    }

    return NextResponse.json({
      success: true,
      data: additionalStats
    })

  } catch (error) {
    console.error('獲取統計資料失敗:', error)
    return NextResponse.json(
      {
        success: false,
        error: '獲取統計資料失敗',
        message: error instanceof Error ? error.message : '未知錯誤'
      },
      { status: 500 }
    )
  }
}

// 獲取所有道具類別
async function getCategories() {
  try {
    const categories = await prisma.item.findMany({
      select: {
        category: true
      },
      where: {
        category: {
          not: null
        }
      },
      distinct: ['category']
    })

    return categories
      .map((item: any) => item.category)
      .filter(Boolean)
      .sort()
  } catch (error) {
    console.error('獲取類別失敗:', error)
    return []
  }
}
