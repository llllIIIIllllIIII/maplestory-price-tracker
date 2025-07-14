# 🍁 楓之谷 Artale 物價追蹤器

一個專為《楓之谷 Artale》設計的現金道具與楓幣兌換效率追蹤 Web 應用程式。

## ✨ 功能### 4. 設定 Google Sheets API

⚠️ **重要**: 請參考 [GOOGLE_SHEETS_SETUP.md](./GOOGLE_SHEETS_SETUP.md) 進行詳細設定。

簡要步驟：
1. 前往 [Google Cloud Console](https://console.cloud.google.com/)
2. 建立新專案並啟用 Google Sheets API
3. 建立 API 金鑰
4. 設定您的 Google Sheets 為公開檢視
5. 將 API 金鑰和表格 ID 填入 `.env.local`

**預設表格**: 系統已設定連接到提供的 Artale 商城道具換算表
- 表格 ID: `16em3bVfF98HEwrrAgDa9retcHvxWZ0xL9NtQMWXWMlI`
- B5 欄位: 雪花匯率（萬楓幣）

### 🧪 測試他人的 Google Sheets

如果要連接他人分享的表單，請參考 [TESTING_EXTERNAL_SHEETS.md](./TESTING_EXTERNAL_SHEETS.md)。

快速測試指令：
```bash
# 測試任何 Google Sheets 表單
node scripts/test-external-sheets.js YOUR_SHEET_ID

# 測試公開表單的 CSV 導出
node scripts/test-public-sheets.js

# 測試 API 認證
node scripts/test-real-sheets-api.js
```

**即時物價追蹤**: 從 Google Sheets 同步 Artale 商城道具價格
- 🍁 **雪花匯率監控**: 即時追蹤雪花兌換楓幣匯率（B5 欄位）
- 💰 **台幣換算**: 顯示 WC 對應的台幣價值（1 WC ≈ NT$ 0.15）
- 🔍 **效率分析**: 分析不同道具的換匯效率
- 🚨 **套利偵測**: 自動發現套利機會
- 📈 **視覺化圖表**: 直觀的數據呈現
- ⏰ **自動更新**: 每小時從 Google Sheets 同步資料

## 🎮 Artale 專屬功能

### WC 與台幣匯率
- 400 WC : 60 TWD
- 13200 WC : 1990 TWD
- **平均匯率: 1 WC ≈ NT$ 0.15**

### 現金道具價格 (基於您提供的資料)
- **雪花**: 11個 = 300 WC (約 27 WC/個)
- **寵物**: 1隻 = 1600 WC
- **背包擴充券**: 1個 = 250 WC
- **瞬移之石**: 11個 = 400 WC (約 36 WC/個)
- **護身符**: 11個 = 450 WC (約 41 WC/個)

### 雪花作為交易貨幣
雪花在遊戲中具有最佳流動性，常用作另一項交易貨幣。系統會特別監控雪花匯率作為價格基準。

## 🛠️ 技術棧

- **前端**: Next.js 14, React, TypeScript, Tailwind CSS
- **後端**: Next.js API Routes, Prisma ORM
- **資料庫**: SQLite (開發) / PostgreSQL (生產)
- **資料來源**: Google Sheets API
- **部署**: Vercel (推薦)

## 🚀 快速開始

### 前置要求

- Node.js 18+ 
- npm 或 yarn

### 1. 克隆專案

\`\`\`bash
cd /Users/henrychang/Desktop/MyProjects/MapleStoryPriceTracker
\`\`\`

### 2. 安裝依賴

\`\`\`bash
npm install
\`\`\`

### 3. 設定環境變數

複製 \`.env.example\` 並重命名為 \`.env.local\`：

\`\`\`bash
cp .env.example .env.local
\`\`\`

編輯 \`.env.local\`：

\`\`\`env
DATABASE_URL="file:./dev.db"
GOOGLE_SHEETS_API_KEY="your_actual_api_key"
GOOGLE_SHEET_ID="your_actual_sheet_id"
\`\`\`

### 4. 設定 Google Sheets API

1. 前往 [Google Cloud Console](https://console.cloud.google.com/)
2. 建立新專案或選擇現有專案
3. 啟用 Google Sheets API
4. 建立 API 金鑰
5. 將 API 金鑰和 Google Sheet ID 填入 \`.env.local\`

### 5. 初始化資料庫

\`\`\`bash
npx prisma generate
npx prisma db push
\`\`\`

### 6. 設定 Artale 測試資料

```bash
npm run setup:artale
```

### 7. 測試 Google Sheets 連接

```bash
npm run test:sheets
```

### 8. 啟動開發伺服器

\`\`\`bash
npm run dev
\`\`\`

開啟瀏覽器並訪問 [http://localhost:3000](http://localhost:3000)

## 📋 Artale Google Sheets 格式

您的 Google Sheets 應包含以下格式：

| 欄位 | 說明 | 範例 |
|------|------|------|
| B5 | 雪花匯率（萬楓幣） | 42 |
| A6起 | 道具名稱 | 雪花 |
| B6起 | WC 價格 | 27 |
| C6起 | 楓幣價值（萬楓幣） | 42 |
| D6起 | 道具類別 | 消耗品 |

**範例表格內容:**
```
     A          B        C        D
5              42       (雪花匯率)
6   雪花        27       42       消耗品
7   寵物        1600     664      寵物用品
8   背包擴充券  250      104      功能道具
```

## 🔄 資料同步

### 手動同步

訪問 \`/api/sync\` 或在應用中點擊同步按鈕

### 自動同步

專案包含自動同步機制，每小時從 Google Sheets 更新資料

## 📊 API 端點

- \`GET /api/items\` - 獲取道具列表
- \`GET /api/arbitrage\` - 獲取套利機會
- \`GET /api/stats\` - 獲取統計資料
- \`POST /api/sync\` - 手動同步資料
- \`GET /api/sync\` - 檢查同步狀態

## 🎨 自定義

### 調整套利參數

在 \`src/lib/calculator.ts\` 中修改：

\`\`\`typescript
// 價格容忍度和最小效率差異
findArbitrageOpportunities(items, 10, 5000)
\`\`\`

### 修改更新頻率

在 \`.env.local\` 中調整：

\`\`\`env
UPDATE_INTERVAL=1800000  # 30分鐘
\`\`\`

## 🚀 部署

### Vercel 部署

1. 將程式碼推送到 GitHub
2. 在 Vercel 中連接 GitHub 倉庫
3. 設定環境變數
4. 部署

### 其他平台

專案支援任何支持 Next.js 的平台部署

## 🤝 貢獻

歡迎提交 Issue 和 Pull Request！

## 📄 授權

MIT License

## 🙏 致謝

感謝楓之谷社群提供的價格資料

---

**⚠️ 免責聲明**: 本工具僅供參考，實際交易價格可能有所差異。投資有風險，請謹慎決策。
