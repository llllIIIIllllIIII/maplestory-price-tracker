import { NextResponse } from 'next/server'
import { prisma } from '@/lib/database'
import { calculateEfficiency } from '@/lib/calculator'

export async function POST() {
  try {
    console.log('開始修復效率值...')
    
    // 獲取所有項目
    const items = await prisma.item.findMany()
    
    let fixedCount = 0
    const results = []
    
    for (const item of items) {
      // 計算正確的效率
      const efficiency = calculateEfficiency(item.mesosValue, item.wcPrice)
      
      // 更新效率
      await prisma.item.update({
        where: { id: item.id },
        data: { efficiency }
      })
      
      results.push({
        name: item.name,
        oldEfficiency: item.efficiency,
        newEfficiency: efficiency
      })
      
      fixedCount++
    }
    
    console.log(`成功修復 ${fixedCount} 個項目的效率值`)
    
    return NextResponse.json({
      success: true,
      message: `成功修復 ${fixedCount} 個項目的效率值`,
      results
    })
    
  } catch (error) {
    console.error('修復效率值失敗:', error)
    return NextResponse.json(
      {
        success: false,
        error: '修復效率值失敗',
        message: error instanceof Error ? error.message : '未知錯誤'
      },
      { status: 500 }
    )
  }
}
