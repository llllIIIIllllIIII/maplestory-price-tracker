const { PrismaClient } = require('@prisma/client')
const { google } = require('googleapis')
const fs = require('fs')

// 載入環境變數
require('dotenv').config({ path: '.env.local' })

const prisma = new PrismaClient()

// 整包販售道具對照表 - 需要計算單位價格的道具
const BUNDLE_ITEMS = {
  '突襲額外獎勵票卷(Raid Extra Reward Ticket)': { 
    quantity: 7,  // 1200WC 可以買 7張
    unitName: '突襲額外獎勵票卷 (每張)',
    displayName: '突襲額外獎勵票卷',
    bundleInfo: '7張一包'
  },
  '飄雪結晶 (Snowflakes Box)': { 
    quantity: 11,  // 300WC 可以買 11個
    unitName: '飄雪結晶 (每個)',
    displayName: '飄雪結晶',
    bundleInfo: '11個一包'
  },
  '漫天花雨 (Sprinkled Flowers)': { 
    quantity: 11,  // 300WC 可以買 11個
    unitName: '漫天花雨 (每個)',
    displayName: '漫天花雨',
    bundleInfo: '11個一包'
  },
  '高級瞬移之石 (VIP Teleport Rock)': { 
    quantity: 11,  // 400WC 可以買 11個
    unitName: '高級瞬移之石 (每個)',
    displayName: '高級瞬移之石',
    bundleInfo: '11個一包'
  },
  'AP初始化卷軸 (AP Reset)': { 
    quantity: 2,  // 800WC 可以買 2張
    unitName: 'AP初始化卷軸 (每張)',
    displayName: 'AP初始化卷軸',
    bundleInfo: '2張一包'
  },
  'SP初始化卷軸 (SP Reset)': { 
    quantity: 2,  // 600WC 可以買 2張
    unitName: 'SP初始化卷軸 (每張)',
    displayName: 'SP初始化卷軸',
    bundleInfo: '2張一包'
  },
  '高效能喇叭 (Megaphone Box)': { 
    quantity: 11,  // 1200WC 可以買 11個
    unitName: '高效能喇叭 (每個)',
    displayName: '高效能喇叭',
    bundleInfo: '11個一包'
  },
  '高效能喇叭UP (Super Megaphone Box)': { 
    quantity: 11,  // 1400WC 可以買 11個
    unitName: '高效能喇叭UP (每個)',
    displayName: '高效能喇叭UP',
    bundleInfo: '11個一包'
  },
  '護身符 (Defense Charm)': { 
    quantity: 11,  // 450WC 可以買 11個
    unitName: '護身符 (每個)',
    displayName: '護身符',
    bundleInfo: '11個一包'
  }
}

async function syncDataFromSheets() {
  console.log('🔄 開始同步 Google Sheets 資料到資料庫...')
  
  try {
    const serviceAccountPath = process.env.GOOGLE_SERVICE_ACCOUNT_PATH
    const sheetId = process.env.GOOGLE_SHEET_ID
    
    if (!serviceAccountPath || !fs.existsSync(serviceAccountPath)) {
      throw new Error('服務帳戶檔案不存在')
    }
    
    const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'))
    const auth = new google.auth.GoogleAuth({
      credentials: serviceAccount,
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly']
    })
    
    const sheets = google.sheets('v4')
    
    // 1. 清除舊資料
    console.log('🗑️ 清除舊資料...')
    await prisma.item.deleteMany()
    
    // 2. 讀取 Google Sheets 資料（只讀取商城道具區域，避免讀到台幣價格區域）
    console.log('📊 讀取 Google Sheets 資料...')
    const response = await sheets.spreadsheets.values.get({
      auth: auth,
      spreadsheetId: sheetId,
      range: 'A2:E13', // 限制範圍，避免讀取到第14行後的台幣價格區域
    })
    
    const rows = response.data.values
    if (!rows || rows.length === 0) {
      throw new Error('沒有找到資料')
    }
    
    // 3. 解析並插入資料
    console.log('💾 插入資料到資料庫...')
    
    const itemsToInsert = []
    const seenNames = new Set() // 用來追蹤已見過的名稱
    
    for (const row of rows) {
      if (!row[0] || row[0].trim() === '' || row[0].includes('WC道具')) continue
      
      const itemName = row[0].trim()
      const marketPrice = parseFloat(row[1]) || 0  // B欄：目前拍賣最低價（楓幣）
      const mesosPrice = parseFloat(row[1]?.replace(/,/g, '')) || 0  // 使用B欄：目前拍賣最低價
      const wcPrice = parseFloat(row[4]) || 0  // E欄：商城價格（WC）
      
      if (wcPrice > 0 && mesosPrice > 0) {
        // 檢查是否為整包販售道具
        const bundleInfo = BUNDLE_ITEMS[itemName]
        
        if (bundleInfo) {
          // 整包販售道具：需要計算單位價格
          // Google Sheets 中 B欄是每個的市場價格，E欄是整包的WC價格
          const unitWcPrice = wcPrice / bundleInfo.quantity  // 計算每個的WC成本
          const unitMesosPrice = mesosPrice  // B欄已經是每個的市場價格
          const unitEfficiency = unitMesosPrice / unitWcPrice
          
          // 處理重複名稱
          let uniqueName = bundleInfo.unitName
          let counter = 1
          while (seenNames.has(uniqueName)) {
            uniqueName = `${bundleInfo.unitName} (${counter})`
            counter++
          }
          seenNames.add(uniqueName)
          
          itemsToInsert.push({
            name: uniqueName,
            wcPrice: Math.round(unitWcPrice * 100) / 100, // 保留兩位小數
            mesosValue: Math.round(unitMesosPrice * 10000), // 轉換為楓幣（原本是萬楓幣）
            efficiency: Math.round(unitEfficiency * 10000) / 10000,
            category: '現金道具',
            description: `從 Artale 商城取得 (${bundleInfo.displayName}，${bundleInfo.bundleInfo}，單位價格)`,
            lastUpdated: new Date()
          })
          
          console.log(`📦 整包道具 ${itemName}: ${wcPrice}WC/${bundleInfo.quantity}個 → 單價 ${Math.round(unitWcPrice * 100) / 100}WC/個`)
        } else {
          // 單個販售道具：維持原有邏輯
          // 處理重複名稱
          let uniqueName = itemName
          let counter = 1
          while (seenNames.has(uniqueName)) {
            uniqueName = `${itemName} (${counter})`
            counter++
          }
          seenNames.add(uniqueName)
          
          const efficiency = mesosPrice / wcPrice
          
          itemsToInsert.push({
            name: uniqueName,
            wcPrice: wcPrice,
            mesosValue: Math.round(mesosPrice * 10000), // 轉換為楓幣（原本是萬楓幣）
            efficiency: Math.round(efficiency * 10000) / 10000,
            category: '現金道具',
            description: '從 Artale 商城取得',
            lastUpdated: new Date()
          })
        }
      }
    }
    
    // 批量插入
    if (itemsToInsert.length > 0) {
      await prisma.item.createMany({
        data: itemsToInsert
      })
      
      console.log(`✅ 成功同步 ${itemsToInsert.length} 筆道具資料`)
      
      // 顯示同步的資料
      console.log('\\n📦 同步的道具資料:')
      itemsToInsert.forEach(item => {
        console.log(`  ${item.name}: ${item.wcPrice} WC → ${item.mesosValue/10000} 萬楓幣 (效率: ${item.efficiency})`)
      })
    }
    
  } catch (error) {
    console.error('❌ 同步失敗:', error.message)
  } finally {
    await prisma.$disconnect()
  }
}

syncDataFromSheets()
