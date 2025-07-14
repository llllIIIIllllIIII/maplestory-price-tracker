# 🚀 Vercel 部署指南

## 📋 準備工作

您已經有了完整的 Google Service Account 認證，這是最佳的選擇！

### 現有配置 ✅
- **Google Service Account**: `service-account@maplestory-464806.iam.gserviceaccount.com`
- **Google Sheets ID**: `16em3bVfF98HEwrrAgDa9retcHvxWZ0xL9NtQMWXWMlI`
- **認證方式**: 環境變數 + 檔案路徑雙重支援

## 🗄️ 資料庫設定

### 選項 1: PlanetScale (推薦)
```bash
# 安裝 CLI
brew install planetscale/tap/pscale

# 登入並建立資料庫
pscale auth login
pscale database create maplestory-tracker
pscale branch create maplestory-tracker main

# 取得連線字串
pscale connect maplestory-tracker main --port 3309
```

### 選項 2: Neon (PostgreSQL)
1. 註冊 [Neon](https://neon.tech)
2. 建立新專案
3. 複製連線字串

## 🚀 部署步驟

### 1. 設定資料庫
```bash
./scripts/setup-planetscale.sh
```

### 2. 部署到 Vercel
```bash
./scripts/deploy-vercel.sh
```

### 3. 在 Vercel 儀表板設定環境變數

| 變數名稱 | 值 | 說明 |
|---------|-----|-----|
| `DATABASE_URL` | `mysql://...` | PlanetScale 連線字串 |
| `GOOGLE_SERVICE_ACCOUNT_EMAIL` | `service-account@maplestory-464806.iam.gserviceaccount.com` | 服務帳戶 Email |
| `GOOGLE_PRIVATE_KEY` | `-----BEGIN PRIVATE KEY-----\n...` | 完整私鑰（保留 \\n） |
| `GOOGLE_SHEET_ID` | `16em3bVfF98HEwrrAgDa9retcHvxWZ0xL9NtQMWXWMlI` | Google Sheets ID |
| `CRON_SECRET` | `maple-tracker-cron-secret-2025` | Cron 保護密鑰 |

## ⚙️ 同步服務

### 自動同步 (Vercel Cron)
- **頻率**: 每 6 小時 (`0 */6 * * *`)
- **端點**: `/api/cron/sync`
- **保護**: `Authorization: Bearer CRON_SECRET`

### 手動同步
```bash
# 一般同步
curl -X POST https://your-app.vercel.app/api/sync

# Cron 同步 (需要密鑰)
curl -H "Authorization: Bearer your-cron-secret" \
     https://your-app.vercel.app/api/cron/sync
```

## 🔍 驗證部署

1. **檢查應用**: `https://your-app.vercel.app`
2. **測試同步**: `https://your-app.vercel.app/api/sync`
3. **查看健康狀態**: `https://your-app.vercel.app/api/health`

## 💰 成本預估

- **Vercel**: 免費方案 (100GB 頻寬/月)
- **PlanetScale**: 免費方案 (5GB 儲存)
- **Google Sheets API**: 免費 (每日 100 次請求)
- **總成本**: **$0/月** 🎉

## 🛠️ 故障排除

### 認證問題
- 確認 `GOOGLE_PRIVATE_KEY` 包含完整的 BEGIN/END 標記
- 檢查換行符：在 Vercel 中應該是 `\\n`，不是實際換行

### 資料庫連線問題  
- PlanetScale: 確認分支已啟動
- Neon: 檢查連線字串格式

### Cron 同步問題
- 確認 `CRON_SECRET` 設定正確
- 檢查 Vercel Functions 日誌

## 📊 監控建議

1. **Vercel Analytics**: 追蹤使用量
2. **Function Logs**: 監控同步狀態
3. **Database Metrics**: 觀察資料庫效能
