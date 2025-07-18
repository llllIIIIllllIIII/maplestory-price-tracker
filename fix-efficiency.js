require('dotenv').config({ path: '.env.local' })
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function fixEfficiencyValues() {
  try {
    console.log('=== 修復效率值 ===\n')
    
    // 獲取所有項目
    const items = await prisma.item.findMany()
    console.log(`找到 ${items.length} 個項目需要修復效率值`)
    
    let fixedCount = 0
    
    for (const item of items) {
      // 計算正確的效率
      const mesosInWan = item.mesosValue / 10000 // 轉換為萬楓幣
      const efficiency = mesosInWan / item.wcPrice
      const roundedEfficiency = Math.round(efficiency * 10000) / 10000 // 保留四位小數
      
      // 更新效率
      await prisma.item.update({
        where: { id: item.id },
        data: { efficiency: roundedEfficiency }
      })
      
      console.log(`✅ ${item.name}: ${item.efficiency} -> ${roundedEfficiency}`)
      fixedCount++
    }
    
    console.log(`\n🎉 成功修復 ${fixedCount} 個項目的效率值！`)
    
    // 驗證修復結果
    console.log('\n=== 修復後驗證 ===')
    const updatedItems = await prisma.item.findMany({
      orderBy: { efficiency: 'desc' },
      take: 5
    })
    
    console.log('效率最高的5個項目:')
    updatedItems.forEach(item => {
      console.log(`- ${item.name}: ${item.efficiency} 萬楓幣/WC`)
    })
    
  } catch (error) {
    console.error('修復過程中發生錯誤:', error)
  } finally {
    await prisma.$disconnect()
  }
}

fixEfficiencyValues()
