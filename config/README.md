# 配置目錄

本目錄包含專案的配置檔案：

## Google API 配置
- `MapleStory Service Account.json` - Google Sheets API 服務帳戶金鑰

## 安全說明
- 配置檔案包含敏感資訊，請確保：
  - 不要提交到版本控制系統
  - 設定適當的檔案權限
  - 定期更新金鑰

## 環境變數
主要配置仍在根目錄的 `.env.local` 檔案中：
- `GOOGLE_SHEETS_API_KEY`
- `GOOGLE_SHEET_ID`
- `UPDATE_INTERVAL`
- 等等...
