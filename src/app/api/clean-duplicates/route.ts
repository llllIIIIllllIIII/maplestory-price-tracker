import { NextResponse } from 'next/server'
import { prisma } from '@/lib/database'

export async function POST() {
  try {
    console.log('開始清理重複的雪花項目...')
    
    // 找到所有雪花相關項目
    const snowflakeItems = await prisma.item.findMany({
      where: {
        OR: [
          { name: { contains: '雪花' } },
          { name: { contains: '飄雪' } }
        ]
      },
      orderBy: { createdAt: 'asc' }
    })
    
    const results: {
      found: number
      items: Array<{id: number, name: string, wcPrice: number, mesosValue: number}>
      deleted: Array<{id: number, name: string, wcPrice: number}>
      kept: Array<{id: number, name: string, wcPrice: number}>
    } = {
      found: snowflakeItems.length,
      items: snowflakeItems.map(item => ({
        id: item.id,
        name: item.name,
        wcPrice: item.wcPrice,
        mesosValue: item.mesosValue
      })),
      deleted: [],
      kept: []
    }
    
    // 找到要刪除的重複項目（雪花，WC價格為27的那個）
    const duplicateItems = snowflakeItems.filter(item => 
      item.name === '雪花' && item.wcPrice === 27
    )
    
    // 刪除重複項目
    for (const item of duplicateItems) {
      await prisma.item.delete({
        where: { id: item.id }
      })
      
      results.deleted.push({
        id: item.id,
        name: item.name,
        wcPrice: item.wcPrice
      })
    }
    
    // 記錄保留的項目
    const keptItems = snowflakeItems.filter(item => 
      !(item.name === '雪花' && item.wcPrice === 27)
    )
    
    results.kept = keptItems.map(item => ({
      id: item.id,
      name: item.name,
      wcPrice: item.wcPrice
    }))
    
    // 獲取最終的項目數量
    const finalCount = await prisma.item.count()
    
    console.log(`清理完成，刪除了 ${results.deleted.length} 個重複項目`)
    
    return NextResponse.json({
      success: true,
      message: `成功清理重複的雪花項目`,
      results: {
        ...results,
        finalItemCount: finalCount
      }
    })
    
  } catch (error) {
    console.error('清理重複項目失敗:', error)
    return NextResponse.json(
      {
        success: false,
        error: '清理重複項目失敗',
        message: error instanceof Error ? error.message : '未知錯誤'
      },
      { status: 500 }
    )
  }
}
