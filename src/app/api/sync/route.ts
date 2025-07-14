import { NextResponse } from 'next/server'
import { prisma } from '@/lib/database'
import { googleSheetsService } from '@/lib/google-sheets'
import { calculateEfficiency, findArbitrageOpportunities, validateItemData } from '@/lib/calculator'
import { cacheService } from '@/lib/cache'

export async function POST() {
  const startTime = Date.now()
  let syncLog: any = null

  try {
    // 建立同步日誌
    syncLog = await prisma.syncLog.create({
      data: {
        status: 'ERROR', // 預設為錯誤，成功後會更新
        message: '開始同步資料'
      }
    })

    console.log('開始從 Google Sheets 同步資料...')

    // 驗證 Google Sheets 存取權限
    const isAccessible = await googleSheetsService.validateAccess()
    if (!isAccessible) {
      throw new Error('無法存取 Google Sheets，請檢查 API 金鑰和工作表 ID')
    }

    // 從 Google Sheets 獲取資料
    const googleSheetData = await googleSheetsService.fetchArtaleItemData()
    
    if (googleSheetData.length === 0) {
      throw new Error('Google Sheets 中沒有找到有效資料')
    }

    console.log(`從 Google Sheets 獲取到 ${googleSheetData.length} 筆資料`)

    let successCount = 0
    let errorCount = 0

    // 處理每筆資料
    for (const row of googleSheetData) {
      try {
        // 驗證資料格式
        if (!validateItemData(row)) {
          console.warn(`跳過無效資料: ${JSON.stringify(row)}`)
          errorCount++
          continue
        }

        // 計算效率
        const efficiency = calculateEfficiency(row.mesosValue, row.wcPrice)

        // 更新或建立道具記錄
        await prisma.item.upsert({
          where: { name: row.itemName },
          update: {
            wcPrice: row.wcPrice,
            mesosValue: row.mesosValue,
            efficiency,
            category: row.category,
            description: row.description,
            lastUpdated: new Date()
          },
          create: {
            name: row.itemName,
            wcPrice: row.wcPrice,
            mesosValue: row.mesosValue,
            efficiency,
            category: row.category,
            description: row.description
          }
        })

        successCount++
      } catch (error) {
        console.error(`處理道具 ${row.itemName} 時發生錯誤:`, error)
        errorCount++
      }
    }

    console.log(`資料同步完成: 成功 ${successCount} 筆，錯誤 ${errorCount} 筆`)

    // 重新計算套利機會
    console.log('開始計算套利機會...')
    
    // 清除舊的套利機會
    await prisma.arbitrageOpportunity.deleteMany()

    // 獲取所有道具
    const allItems = await prisma.item.findMany()

    // 尋找套利機會
    const opportunities = findArbitrageOpportunities(allItems)
    
    // 儲存套利機會
    for (const opportunity of opportunities) {
      await prisma.arbitrageOpportunity.create({
        data: {
          item1Id: opportunity.item1.id,
          item2Id: opportunity.item2.id,
          profitRate: opportunity.profitRate,
          priceDiff: opportunity.priceDiff,
          efficiencyDiff: opportunity.efficiencyDiff
        }
      })
    }

    console.log(`發現 ${opportunities.length} 個套利機會`)

    const duration = Date.now() - startTime

    // 清除所有快取（因為資料已更新）
    cacheService.clearAll()
    console.log('已清除所有快取')

    // 更新同步日誌為成功
    await prisma.syncLog.update({
      where: { id: syncLog.id },
      data: {
        status: 'SUCCESS',
        message: `同步成功: ${successCount} 筆道具，${opportunities.length} 個套利機會`,
        itemsCount: successCount,
        duration
      }
    })

    return NextResponse.json({
      success: true,
      data: {
        itemsProcessed: successCount,
        arbitrageOpportunities: opportunities.length,
        duration,
        message: '資料同步完成'
      }
    })

  } catch (error) {
    const duration = Date.now() - startTime
    const errorMessage = error instanceof Error ? error.message : '未知錯誤'
    
    console.error('資料同步失敗:', error)

    // 更新同步日誌為錯誤
    if (syncLog) {
      await prisma.syncLog.update({
        where: { id: syncLog.id },
        data: {
          status: 'ERROR',
          message: `同步失敗: ${errorMessage}`,
          duration
        }
      })
    }

    return NextResponse.json(
      {
        success: false,
        error: '資料同步失敗',
        message: errorMessage
      },
      { status: 500 }
    )
  }
}

// GET 方法用於檢查同步狀態
export async function GET() {
  try {
    const latestLog = await prisma.syncLog.findFirst({
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json({
      success: true,
      data: latestLog
    })

  } catch (error) {
    console.error('獲取同步狀態失敗:', error)
    return NextResponse.json(
      {
        success: false,
        error: '獲取同步狀態失敗',
        message: error instanceof Error ? error.message : '未知錯誤'
      },
      { status: 500 }
    )
  }
}
