# 🔗 Google Sheets API 設定指南

本專案使用 Google Sheets API 來獲取楓之谷 Artale 商城道具的即時價格資料。

## 📋 前置作業

您需要一個包含以下格式的 Google Sheets：

### 表格格式
- **B5 欄位**: 雪花兌換楓幣匯率（單位：萬楓幣）
- **A6 起**: 道具資料列表
  - A 欄：道具名稱
  - B 欄：WC 價格
  - C 欄：楓幣價值（萬楓幣）
  - D 欄：道具類別

### 範例表格內容
```
     A          B        C        D
5              42       (雪花匯率：42萬楓幣)
6   雪花        27       42       消耗品
7   寵物        1600     664      寵物用品
8   背包擴充券  250      104      功能道具
```

## 🔑 API 金鑰設定

### 步驟 1: 建立 Google Cloud 專案

1. 前往 [Google Cloud Console](https://console.cloud.google.com/)
2. 建立新專案或選擇現有專案
3. 在導航選單中，選擇「API 和服務」→「資料庫」

### 步驟 2: 啟用 Google Sheets API

1. 搜尋「Google Sheets API」
2. 點擊「啟用」

### 步驟 3: 建立 API 金鑰

1. 前往「API 和服務」→「憑證」
2. 點擊「建立憑證」→「API 金鑰」
3. 複製產生的 API 金鑰

### 步驟 4: 限制 API 金鑰（推薦）

1. 點擊您建立的 API 金鑰
2. 在「應用程式限制」下選擇「HTTP 參照網址」
3. 添加您的網域（例如：`localhost:3000/*`、`yourdomain.com/*`）
4. 在「API 限制」下選擇「限制金鑰」
5. 選擇「Google Sheets API」
6. 儲存變更

## 📄 Google Sheets 設定

### 步驟 1: 取得工作表 ID

從您的 Google Sheets URL 中取得 ID：
```
https://docs.google.com/spreadsheets/d/[工作表ID]/edit#gid=0
```

例如：
```
https://docs.google.com/spreadsheets/d/16em3bVfF98HEwrrAgDa9retcHvxWZ0xL9NtQMWXWMlI/edit#gid=0
```
工作表 ID 就是：`16em3bVfF98HEwrrAgDa9retcHvxWZ0xL9NtQMWXWMlI`

### 步驟 2: 設定工作表權限

1. 開啟您的 Google Sheets
2. 點擊右上角「共用」按鈕
3. 在「一般存取權」中選擇「知道連結的使用者」
4. 權限設為「檢視者」
5. 點擊「完成」

## 🔧 環境變數設定

在 `.env.local` 檔案中設定：

```env
# Google Sheets API
GOOGLE_SHEETS_API_KEY="您的_API_金鑰"
GOOGLE_SHEET_ID="您的_工作表_ID"
```

## 🧪 測試 API 連接

執行測試腳本來驗證設定：

```bash
npm run test:sheets
```

或直接執行：

```bash
node scripts/test-google-sheets.js
```

## 📊 資料同步

### 手動同步
- 在網站中點擊「🔄 手動同步」按鈕
- 或呼叫 API：`POST /api/sync`

### 自動同步
系統會每小時自動從 Google Sheets 同步資料

## 🚨 常見問題

### API 金鑰無效
- 檢查 API 金鑰是否正確複製
- 確認已啟用 Google Sheets API
- 檢查 API 金鑰的存取限制設定

### 無法存取工作表
- 確認工作表已設為「知道連結的使用者」可檢視
- 檢查工作表 ID 是否正確
- 確認工作表不是私人或受限存取

### 資料格式錯誤
- 確認 B5 欄位包含雪花匯率數值
- 檢查道具資料從 A6 開始，格式正確
- 確認數值欄位使用數字而非文字

### API 配額限制
Google Sheets API 有使用限制：
- 每日 100 次請求（免費用戶）
- 每 100 秒 100 次請求

如需更多配額，請考慮升級到付費方案。

## 🔐 服務帳戶設定（推薦）

服務帳戶提供更安全且穩定的存取方式，特別適合私人表單或生產環境。

### 步驟 1: 建立服務帳戶

1. 前往 [Google Cloud Console](https://console.cloud.google.com/)
2. 建立新專案或選擇現有專案
3. 啟用 Google Sheets API（同上述 API 金鑰步驟）
4. 前往「IAM 與管理」→「服務帳戶」
5. 點擊「建立服務帳戶」
6. 輸入服務帳戶名稱（例如：maplestory-sheets）
7. 點擊「建立並繼續」
8. 角色可留空，點擊「繼續」
9. 點擊「完成」

### 步驟 2: 建立金鑰

1. 點擊剛建立的服務帳戶
2. 前往「金鑰」分頁
3. 點擊「新增金鑰」→「建立新的金鑰」
4. 選擇「JSON」格式
5. 下載 JSON 檔案並妥善保存

### 步驟 3: 設定環境變數

在 `.env.local` 檔案中添加：

```env
# 服務帳戶方式（推薦）
GOOGLE_SERVICE_ACCOUNT_PATH="/path/to/your/service-account.json"
GOOGLE_SHEET_ID="您的_工作表_ID"

# 或使用 API 金鑰方式
GOOGLE_SHEETS_API_KEY="您的_API_金鑰"
GOOGLE_SHEET_ID="您的_工作表_ID"
```

### 步驟 4: 表單權限設定

**方式 A: 私人表單（使用服務帳戶）**
1. 開啟您的 Google Sheets
2. 點擊右上角「共用」按鈕
3. 在「新增使用者和群組」中輸入服務帳戶的 email
   - Email 格式：`service-account@project-id.iam.gserviceaccount.com`
   - 可在下載的 JSON 檔案中的 `client_email` 欄位找到
4. 權限設為「檢視者」
5. 點擊「傳送」

**方式 B: 公開表單（發佈到網路）**
1. 前往「檔案」→「共用」→「發佈到網路」
2. 在「連結」分頁下，確認選擇「整份文件」
3. 點擊「發佈」
4. 同時在「共用」設定中選擇「知道連結的使用者」可檢視

---

**💡 提示**: 為了安全起見，請勿將 API 金鑰提交到版本控制系統中。使用 `.env.local` 檔案並確保它在 `.gitignore` 中。
