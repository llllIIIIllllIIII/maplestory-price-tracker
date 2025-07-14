# 測試他人 Google Sheets 表單指南

本指南說明如何測試和存取他人分享的 Google Sheets 表單，包含各種認證方式和常見問題的解決方案。

## 🎯 快速開始

### 1. 測試腳本

我們提供了三個測試腳本來幫助你檢查 Google Sheets 的存取權限：

```bash
# 測試他人的 Google Sheets（推薦）
node scripts/test-external-sheets.js YOUR_SHEET_ID

# 測試公開 CSV 導出
node scripts/test-public-sheets.js

# 測試 API 認證
node scripts/test-real-sheets-api.js
```

### 2. 從 URL 取得 Sheet ID

Google Sheets URL 格式：
```
https://docs.google.com/spreadsheets/d/SHEET_ID/edit#gid=0
```

例如：`1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms` 就是 Sheet ID。

## 🔐 認證方式

### 方式 1：公開表單（無需認證）

如果表單設為「任何人都可以檢視」：

```bash
# 設定表單 ID
export GOOGLE_SHEET_ID="your_sheet_id"

# 測試公開存取
node scripts/test-public-sheets.js
```

### 方式 2：API 金鑰認證

適用於公開表單或有 API 金鑰存取權限的表單：

```bash
# 設定 API 金鑰
export GOOGLE_SHEETS_API_KEY="your_api_key"
export GOOGLE_SHEET_ID="your_sheet_id"

# 測試 API 金鑰存取
node scripts/test-real-sheets-api.js
```

### 方式 3：服務帳戶認證

適用於私人表單，需要將服務帳戶加入共用名單：

```bash
# 設定服務帳戶路徑
export GOOGLE_SERVICE_ACCOUNT_PATH="/path/to/service-account.json"
export GOOGLE_SHEET_ID="your_sheet_id"

# 測試服務帳戶存取
node scripts/test-real-sheets-api.js
```

## 🧪 綜合測試腳本

使用我們的綜合測試腳本，一次測試所有可能的存取方式：

```bash
# 方式 1：使用環境變數
export GOOGLE_SHEET_ID="your_sheet_id"
node scripts/test-external-sheets.js

# 方式 2：直接提供 Sheet ID
node scripts/test-external-sheets.js your_sheet_id
```

這個腳本會依序嘗試：
1. 🌐 公開 CSV 導出
2. 🔑 API 金鑰認證（如果有設定）
3. 🔐 服務帳戶認證（如果有設定）

## ⚠️ 常見問題與解決方案

### 問題 1：403 Forbidden

**原因：**
- 表單不是公開的
- API 金鑰無效或權限不足
- 服務帳戶未加入表單共用名單

**解決方案：**
1. **檢查表單權限**：確認表單設為「任何人都可以檢視」
2. **檢查 API 金鑰**：確認已啟用 Google Sheets API
3. **添加服務帳戶**：將服務帳戶 email 加入表單共用名單

### 問題 2：404 Not Found

**原因：**
- Sheet ID 錯誤
- 表單已被刪除
- URL 格式不正確

**解決方案：**
1. 重新檢查 Sheet ID
2. 確認表單仍然存在
3. 嘗試在瀏覽器中開啟表單 URL

### 問題 3：認證相關錯誤

**原因：**
- 認證資訊設定錯誤
- API 金鑰或服務帳戶過期

**解決方案：**
1. 重新檢查環境變數設定
2. 確認 API 金鑰有效
3. 檢查服務帳戶 JSON 檔案格式

## 📋 表單設定檢查清單

### 對於表單擁有者：

**公開表單設定：**
- [ ] 點選「共用」按鈕
- [ ] 設定為「任何人都可以檢視」
- [ ] 確認連結存取權限

**私人表單設定：**
- [ ] 取得服務帳戶 email（從 JSON 檔案中的 `client_email`）
- [ ] 將服務帳戶 email 加入共用名單
- [ ] 設定權限為「檢視者」

### 對於使用者：

**基本檢查：**
- [ ] 確認 Sheet ID 正確
- [ ] 測試能否在瀏覽器中開啟表單
- [ ] 檢查網路連接

**認證檢查：**
- [ ] API 金鑰已設定且有效
- [ ] 服務帳戶 JSON 檔案路徑正確
- [ ] 環境變數已正確設定

## 🔧 疑難排解命令

```bash
# 檢查環境變數
echo "API Key: $GOOGLE_SHEETS_API_KEY"
echo "Service Account: $GOOGLE_SERVICE_ACCOUNT_PATH"
echo "Sheet ID: $GOOGLE_SHEET_ID"

# 檢查服務帳戶檔案
if [ -f "$GOOGLE_SERVICE_ACCOUNT_PATH" ]; then
    echo "✓ 服務帳戶檔案存在"
    node -e "const data = require('$GOOGLE_SERVICE_ACCOUNT_PATH'); console.log('Email:', data.client_email)"
else
    echo "❌ 服務帳戶檔案不存在"
fi

# 測試網路連接
curl -I "https://docs.google.com/spreadsheets/d/$GOOGLE_SHEET_ID/export?format=csv"
```

## 💡 最佳實務

1. **優先順序**：建議按 公開存取 → API 金鑰 → 服務帳戶 的順序嘗試
2. **錯誤處理**：仔細閱讀錯誤訊息，通常會提供具體的解決建議
3. **權限管理**：只要求最小必要權限（檢視者）
4. **定期檢查**：API 金鑰和服務帳戶需要定期檢查有效性

## 📞 獲得協助

如果遇到問題：

1. 運行綜合測試腳本：`node scripts/test-external-sheets.js your_sheet_id`
2. 檢查腳本輸出的詳細錯誤訊息和建議
3. 參考 `GOOGLE_SHEETS_SETUP.md` 的詳細設定說明
4. 確認表單權限設定正確

---

## 🎬 範例：完整測試流程

```bash
# 1. 設定測試環境
export GOOGLE_SHEET_ID="1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms"
export GOOGLE_SHEETS_API_KEY="your_api_key_here"

# 2. 運行綜合測試
node scripts/test-external-sheets.js

# 3. 如果失敗，檢查個別方式
node scripts/test-public-sheets.js          # 測試公開存取
node scripts/test-real-sheets-api.js        # 測試 API 認證

# 4. 檢查測試結果並根據提示調整設定
```

這樣就能全面測試並診斷 Google Sheets 的存取問題了！
