import { NextResponse } from 'next/server'
import { prisma } from '@/lib/database'

export async function POST() {
  try {
    console.log('🔄 開始修復重複的雪花/飄雪結晶資料...')

    // 1. 檢查是否存在這兩個道具
    const snowflakeItem = await prisma.item.findFirst({
      where: { name: '雪花' }
    })

    const snowflakeBoxItem = await prisma.item.findFirst({
      where: { name: '飄雪結晶 (Snowflakes Box)' }
    })

    if (!snowflakeItem && !snowflakeBoxItem) {
      return NextResponse.json({
        success: false,
        message: '找不到需要修復的道具'
      })
    }

    let updatedCount = 0
    let deletedCount = 0

    // 2. 如果兩個道具都存在，合併資訊
    if (snowflakeItem && snowflakeBoxItem) {
      console.log('發現重複道具，開始合併...')
      
      // 合併描述資訊
      const mergedDescription = `從 Artale 商城取得 (11個一包，單價27.273WC/個) | 🧊 基準道具 - 主要交易貨幣，流動性最佳`
      
      // 更新飄雪結晶的資訊
      await prisma.item.update({
        where: { id: snowflakeBoxItem.id },
        data: {
          description: mergedDescription,
          lastUpdated: new Date()
        }
      })
      updatedCount++

      // 刪除重複的雪花道具
      await prisma.item.delete({
        where: { id: snowflakeItem.id }
      })
      deletedCount++

      console.log('✅ 合併完成')
    }
    // 3. 如果只有雪花道具，重新命名並更新描述
    else if (snowflakeItem && !snowflakeBoxItem) {
      console.log('只找到雪花道具，重新命名為飄雪結晶...')
      
      await prisma.item.update({
        where: { id: snowflakeItem.id },
        data: {
          name: '飄雪結晶 (Snowflakes Box)',
          wcPrice: 27.273,
          description: `從 Artale 商城取得 (11個一包，單價27.273WC/個) | 🧊 基準道具 - 主要交易貨幣，流動性最佳`,
          lastUpdated: new Date()
        }
      })
      updatedCount++
    }
    // 4. 如果只有飄雪結晶道具，更新描述
    else if (!snowflakeItem && snowflakeBoxItem) {
      console.log('只找到飄雪結晶道具，更新描述...')
      
      await prisma.item.update({
        where: { id: snowflakeBoxItem.id },
        data: {
          description: `從 Artale 商城取得 (11個一包，單價27.273WC/個) | 🧊 基準道具 - 主要交易貨幣，流動性最佳`,
          lastUpdated: new Date()
        }
      })
      updatedCount++
    }

    // 5. 獲取修復後的結果
    const finalItem = await prisma.item.findFirst({
      where: { 
        name: '飄雪結晶 (Snowflakes Box)'
      }
    })

    return NextResponse.json({
      success: true,
      message: '雪花/飄雪結晶重複資料修復完成',
      data: {
        updatedCount,
        deletedCount,
        finalItem: finalItem ? {
          name: finalItem.name,
          wcPrice: finalItem.wcPrice,
          mesosValue: finalItem.mesosValue,
          efficiency: finalItem.efficiency,
          description: finalItem.description
        } : null
      }
    })

  } catch (error) {
    console.error('修復雪花/飄雪結晶資料失敗:', error)
    return NextResponse.json(
      {
        success: false,
        error: '修復失敗',
        message: error instanceof Error ? error.message : '未知錯誤'
      },
      { status: 500 }
    )
  }
}
