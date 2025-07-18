require('dotenv').config({ path: '.env.local' })
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function debugDatabase() {
  try {
    console.log('=== 資料庫調試報告 ===\n')
    
    // 1. 檢查總項目數
    const totalItems = await prisma.item.count()
    console.log(`1. 總項目數: ${totalItems}`)
    
    // 2. 檢查最新的項目
    const latestItem = await prisma.item.findFirst({
      orderBy: { lastUpdated: 'desc' }
    })
    console.log(`2. 最新更新時間: ${latestItem?.lastUpdated}`)
    console.log(`   最新項目: ${latestItem?.name}`)
    
    // 3. 檢查飄雪結晶
    const snowflakeItems = await prisma.item.findMany({
      where: {
        name: {
          contains: '飄雪結晶'
        }
      },
      orderBy: { lastUpdated: 'desc' }
    })
    console.log(`3. 飄雪結晶項目數: ${snowflakeItems.length}`)
    if (snowflakeItems.length > 0) {
      console.log(`   最新飄雪結晶價格: ${snowflakeItems[0].mesosValue} 楓幣`)
      console.log(`   WC價格: ${snowflakeItems[0].wcPrice}`)
      console.log(`   效率: ${snowflakeItems[0].efficiency}`)
    }
    
    // 4. 檢查所有項目的價格範圍
    const priceStats = await prisma.item.aggregate({
      _min: { mesosValue: true },
      _max: { mesosValue: true },
      _avg: { mesosValue: true }
    })
    console.log(`4. 價格統計:`)
    console.log(`   最低價格: ${priceStats._min.mesosValue} 楓幣`)
    console.log(`   最高價格: ${priceStats._max.mesosValue} 楓幣`)
    console.log(`   平均價格: ${Math.round(priceStats._avg.mesosValue || 0)} 楓幣`)
    
    // 5. 檢查效率異常的項目
    const zeroEfficiencyItems = await prisma.item.findMany({
      where: {
        efficiency: 0
      }
    })
    console.log(`5. 效率為0的項目數: ${zeroEfficiencyItems.length}`)
    if (zeroEfficiencyItems.length > 0) {
      console.log('   效率為0的項目:')
      zeroEfficiencyItems.forEach(item => {
        console.log(`   - ${item.name}: 楓幣=${item.mesosValue}, WC=${item.wcPrice}, 效率=${item.efficiency}`)
      })
    }
    
    // 6. 檢查最近的幾個項目
    const recentItems = await prisma.item.findMany({
      orderBy: { lastUpdated: 'desc' },
      take: 5
    })
    console.log(`6. 最近的5個項目:`)
    recentItems.forEach(item => {
      const calculatedEfficiency = (item.mesosValue / 10000) / item.wcPrice
      console.log(`   - ${item.name}: ${item.mesosValue}楓幣, ${item.wcPrice}WC`)
      console.log(`     儲存的效率=${item.efficiency}, 計算的效率=${calculatedEfficiency.toFixed(4)}`)
    })
    
  } catch (error) {
    console.error('調試過程中發生錯誤:', error)
  } finally {
    await prisma.$disconnect()
  }
}

debugDatabase()
