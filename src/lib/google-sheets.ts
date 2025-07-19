import { google } from 'googleapis'
import { GoogleSheetRow } from '@/types'
import fs from 'fs'

const sheets = google.sheets('v4')

export class GoogleSheetsService {
  private auth: any
  private sheetId: string
  private authType: 'api_key' | 'service_account' | 'none'

  constructor() {
    this.sheetId = process.env.GOOGLE_SHEET_ID || '16em3bVfF98HEwrrAgDa9retcHvxWZ0xL9NtQMWXWMlI'
    this.authType = 'none'
    
    // 初始化認證
    this.initializeAuth()
  }

  /**
   * 初始化認證方式
   * 優先順序: API 金鑰 > 環境變數服務帳戶 > 檔案路徑服務帳戶
   */
  private initializeAuth() {
    const apiKey = process.env.GOOGLE_SHEETS_API_KEY
    const serviceAccountPath = process.env.GOOGLE_SERVICE_ACCOUNT_PATH
    const serviceAccountEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL
    const privateKey = process.env.GOOGLE_PRIVATE_KEY
    
    // 在 Vercel 環境中優先使用 API 金鑰（避免 JWT 問題）
    if (apiKey) {
      this.auth = apiKey
      this.authType = 'api_key'
      console.log('✓ 使用 API 金鑰認證')
      return
    }
    
    // 優先使用環境變數方式的服務帳戶（適用於本地開發）
    if (serviceAccountEmail && privateKey) {
      try {
        this.auth = new google.auth.GoogleAuth({
          credentials: {
            type: 'service_account',
            client_email: serviceAccountEmail,
            private_key: privateKey.replace(/\\n/g, '\n'), // 處理換行符
            project_id: 'maplestory-464806'
          },
          scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly']
        })
        this.authType = 'service_account'
        console.log('✓ 使用環境變數服務帳戶認證')
        return
      } catch (error) {
        console.error('環境變數服務帳戶認證初始化失敗:', error)
      }
    }
    
    // 回退到檔案路徑方式的服務帳戶
    if (serviceAccountPath && fs.existsSync(serviceAccountPath)) {
      try {
        const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'))
        this.auth = new google.auth.GoogleAuth({
          credentials: serviceAccount,
          scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly']
        })
        this.authType = 'service_account'
        console.log('✓ 使用檔案路徑服務帳戶認證')
        return
      } catch (error) {
        console.error('檔案路徑服務帳戶認證初始化失敗:', error)
      }
    }
    
    if (this.authType === 'none') {
      console.warn('⚠️ 未設定 Google Sheets 認證，請設定 API 金鑰或服務帳戶')
    }
  }

  /**
   * 檢查是否有有效的認證
   */
  private hasValidAuth(): boolean {
    return this.authType !== 'none' && this.auth !== null
  }

  /**
   * 從 Google Sheets 獲取道具資料
   * @param range 資料範圍，例如 'Sheet1!A2:E'
   * @returns 道具資料陣列
   */
  async fetchItemData(range: string = 'Sheet1!A2:E'): Promise<GoogleSheetRow[]> {
    if (!this.hasValidAuth()) {
      throw new Error('Google Sheets 認證未設定')
    }

    try {
      const response = await sheets.spreadsheets.values.get({
        auth: this.auth,
        spreadsheetId: this.sheetId,
        range,
      })

      const rows = response.data.values
      if (!rows || rows.length === 0) {
        console.log('Google Sheets 中沒有找到資料')
        return []
      }

      // 將原始資料轉換為結構化格式
      const items = rows.map((row, index) => {
        try {
          return {
            itemName: this.cleanString(row[0]),
            wcPrice: this.parseNumber(row[1]),
            mesosValue: this.parseNumber(row[2]),
            category: this.cleanString(row[3]) || undefined,
            description: this.cleanString(row[4]) || undefined,
            lastUpdated: row[5] || new Date().toISOString(),
          } as GoogleSheetRow
        } catch (error) {
          console.warn(`處理第 ${index + 2} 行資料時發生錯誤:`, error)
          return null
        }
      }).filter((item): item is GoogleSheetRow => item !== null)

      console.log(`成功從 Google Sheets 獲取 ${items.length} 筆道具資料`)
      return items

    } catch (error) {
      console.error('從 Google Sheets 獲取資料失敗:', error)
      throw new Error(`Google Sheets API 呼叫失敗: ${error}`)
    }
  }

  /**
   * 驗證工作表是否可存取
   */
  async validateAccess(): Promise<boolean> {
    if (!this.hasValidAuth()) {
      console.error('Google Sheets 認證未設定')
      return false
    }

    try {
      const response = await sheets.spreadsheets.get({
        auth: this.auth,
        spreadsheetId: this.sheetId,
        fields: 'properties.title'
      })
      
      console.log(`成功連接到工作表: ${response.data.properties?.title}`)
      return true
    } catch (error) {
      console.error('工作表存取驗證失敗:', error)
      return false
    }
  }

  /**
   * 獲取工作表的所有工作表名稱
   */
  async getSheetNames(): Promise<string[]> {
    if (!this.hasValidAuth()) {
      console.error('Google Sheets 認證未設定')
      return []
    }

    try {
      const response = await sheets.spreadsheets.get({
        auth: this.auth,
        spreadsheetId: this.sheetId,
        fields: 'sheets.properties.title'
      })

      return response.data.sheets?.map(sheet => 
        sheet.properties?.title || ''
      ).filter(Boolean) || []
    } catch (error) {
      console.error('獲取工作表名稱失敗:', error)
      return []
    }
  }

  /**
   * 獲取雪花兌換楓幣的匯率（從 B5 欄位）
   * @returns 雪花匯率（萬楓幣）
   */
  async fetchSnowflakeRate(): Promise<number> {
    if (!this.hasValidAuth()) {
      console.warn('Google Sheets 認證未設定，使用預設雪花匯率')
      return 40 // 預設值：40萬楓幣
    }

    try {
      const response = await sheets.spreadsheets.values.get({
        auth: this.auth,
        spreadsheetId: this.sheetId,
        range: 'B5', // 雪花匯率位置
      })

      const value = response.data.values?.[0]?.[0]
      if (!value) {
        console.warn('未找到雪花匯率資料，使用預設值')
        return 40 // 預設值：40萬楓幣
      }

      const rate = this.parseNumber(value)
      console.log(`獲取到雪花匯率: ${rate} 萬楓幣`)
      return rate

    } catch (error) {
      console.error('獲取雪花匯率失敗:', error)
      return 40 // 預設值
    }
  }

  /**
   * 獲取 Artale 商城道具價格資料
   * 專門針對台服 Artale 商城道具 [WC:楓幣] 換算表格式
   */
  async fetchArtaleItemData(): Promise<GoogleSheetRow[]> {
    try {
      // 先獲取雪花匯率
      const snowflakeRate = await this.fetchSnowflakeRate()
      
      if (!this.hasValidAuth()) {
        console.warn('Google Sheets 認證未設定，使用基礎雪花資料')
        return this.createBaseItemsWithSnowflakeRate(snowflakeRate)
      }
      
      // 獲取道具資料（從正確的工作表和範圍，包含G欄物品數量）
      const response = await sheets.spreadsheets.values.get({
        auth: this.auth,
        spreadsheetId: this.sheetId,
        range: '商城道具[WC:楓幣]換算表!A2:H50', // 包含G欄物品數量
      })

      const rows = response.data.values
      if (!rows || rows.length === 0) {
        console.log('未找到道具資料，使用雪花匯率建立基礎資料')
        return this.createBaseItemsWithSnowflakeRate(snowflakeRate)
      }

      console.log(`從 Google Sheets 獲取到 ${rows.length} 行資料`)

      // 解析道具資料
      const items: GoogleSheetRow[] = []
      
      for (let index = 0; index < rows.length; index++) {
        const row = rows[index]
        try {
          if (!row[0] || row[0].trim() === '') continue // 跳過空行
          
          const itemName = this.cleanString(row[0])
          const marketPrice = this.parseNumber(row[1]) // B欄：目前拍賣最低價(單個商品-萬楓幣) 
          const taxedPrice = this.parseNumber(row[2])   // C欄：5%稅後實得(單個商品-萬楓幣)
          const unit = this.cleanString(row[3])         // D欄：單位
          const shopPrice = this.parseNumber(row[4])    // E欄：商城價(整組-WC)
          const itemCount = this.parseNumber(row[6])    // G欄：物品數量(個/組)
          
          // 跳過無效資料或標題行
          if (marketPrice <= 0 || unit !== '萬' || shopPrice <= 0 || itemCount <= 0) {
            continue
          }
          
          // 計算單個商品的 WC 價格（保留更高精度）
          const wcPrice = Math.round((shopPrice / itemCount) * 1000) / 1000 // 保留三位小數
          // 使用拍賣最低價作為楓幣價值，轉換為實際楓幣數（萬 -> 楓幣）
          const mesosValue = marketPrice * 10000

          if (wcPrice > 0 && mesosValue > 0) {
            items.push({
              itemName,
              wcPrice,
              mesosValue,
              category: '現金道具',
              description: `從 Artale 商城取得 (${itemCount}個一包，單價${wcPrice}WC/個)`,
              lastUpdated: new Date().toISOString()
            })
            
            console.log(`✅ 解析道具: ${itemName} - ${wcPrice} WC/個, ${marketPrice}萬楓幣/個 (${shopPrice}WC/${itemCount}個)`)
          }
        } catch (error) {
          console.warn(`處理第 ${index + 2} 行資料時發生錯誤:`, error)
        }
      }

      // 確保雪花資料存在 - 檢查是否已有飄雪結晶相關道具
      const existingSnowflake = items.find(item => 
        item.itemName.includes('雪花') || 
        item.itemName.includes('飄雪結晶') || 
        item.itemName.includes('Snowflakes')
      )
      
      if (!existingSnowflake) {
        // 只有在完全找不到雪花相關道具時才創建
        const snowflakeItem = this.createSnowflakeItem(snowflakeRate)
        items.unshift(snowflakeItem)
        console.log('創建基礎雪花道具資料')
      } else {
        console.log(`找到現有雪花道具: ${existingSnowflake.itemName}`)
      }

      console.log(`成功解析 ${items.length} 筆 Artale 道具資料`)
      return items

    } catch (error) {
      console.error('獲取 Artale 道具資料失敗:', error)
      // 回退到基礎雪花資料
      const snowflakeRate = await this.fetchSnowflakeRate()
      return this.createBaseItemsWithSnowflakeRate(snowflakeRate)
    }
  }

  /**
   * 使用雪花匯率建立基礎道具資料
   */
  private createBaseItemsWithSnowflakeRate(snowflakeRate: number): GoogleSheetRow[] {
    const snowflakeWCPrice = Math.round(300 / 11) // 11雪花=300WC，所以1雪花約27WC
    
    return [
      this.createSnowflakeItem(snowflakeRate),
      {
        itemName: '寵物',
        wcPrice: 1600,
        mesosValue: snowflakeRate * 10000 * (1600 / snowflakeWCPrice), // 基於雪花匯率估算
        category: '寵物用品',
        description: '遊戲寵物',
        lastUpdated: new Date().toISOString()
      },
      {
        itemName: '背包擴充券',
        wcPrice: 250,
        mesosValue: snowflakeRate * 10000 * (250 / snowflakeWCPrice),
        category: '功能道具',
        description: '擴充背包空間',
        lastUpdated: new Date().toISOString()
      },
      {
        itemName: '瞬移之石',
        wcPrice: Math.round(400 / 11), // 11個=400WC
        mesosValue: snowflakeRate * 10000 * (36 / snowflakeWCPrice),
        category: '消耗品',
        description: '瞬間移動道具',
        lastUpdated: new Date().toISOString()
      },
      {
        itemName: '護身符',
        wcPrice: Math.round(450 / 11), // 11個=450WC
        mesosValue: snowflakeRate * 10000 * (41 / snowflakeWCPrice),
        category: '消耗品',
        description: '保護道具',
        lastUpdated: new Date().toISOString()
      }
    ]
  }

  /**
   * 建立雪花道具資料
   */
  private createSnowflakeItem(snowflakeRate: number): GoogleSheetRow {
    return {
      itemName: '雪花',
      wcPrice: Math.round(300 / 11), // 11雪花=300WC
      mesosValue: snowflakeRate * 10000, // 轉換萬楓幣為楓幣
      category: '消耗品',
      description: '主要交易貨幣，流動性最佳',
      lastUpdated: new Date().toISOString()
    }
  }

  /**
   * 清理字串資料
   */
  private cleanString(value: any): string {
    if (typeof value !== 'string') return String(value || '')
    return value.trim()
  }

  /**
   * 解析數字
   */
  private parseNumber(value: any): number {
    if (typeof value === 'number') return value
    
    const cleaned = String(value || '0')
      .replace(/[^\d.-]/g, '') // 移除非數字字符（保留小數點和負號）
    
    const parsed = parseFloat(cleaned)
    return isNaN(parsed) ? 0 : parsed
  }
}

// 建立單例實例
export const googleSheetsService = new GoogleSheetsService()
