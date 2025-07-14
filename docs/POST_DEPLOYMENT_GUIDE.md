# 🎉 部署完成！後續設定指南

恭喜您成功部署到 Vercel！現在需要完成一些設定讓應用正常運作。

## 📋 必要步驟檢查清單

### ✅ 步驟 1: 設定環境變數

前往 [Vercel 儀表板](https://vercel.com/dashboard) → 您的專案 → Settings → Environment Variables

#### 🗄️ 資料庫設定
```bash
變數名: DATABASE_URL
用途: 連接外部資料庫 (SQLite 不適用於 Vercel)
範例: mysql://user:pass@host.planetscale.app/database?sslaccept=strict
```

#### 🔑 Google Sheets 認證
```bash
GOOGLE_SERVICE_ACCOUNT_EMAIL
值: service-account@maplestory-464806.iam.gserviceaccount.com

GOOGLE_PRIVATE_KEY  
值: -----BEGIN PRIVATE KEY-----\nMIIEvgIBADA...(完整私鑰)...\n-----END PRIVATE KEY-----\n
⚠️ 注意: 保留所有 \n 字符，用雙引號包圍

GOOGLE_SHEET_ID
值: 16em3bVfF98HEwrrAgDa9retcHvxWZ0xL9NtQMWXWMlI
```

#### 🔐 安全設定
```bash
CRON_SECRET
值: maple-tracker-cron-secret-2025
用途: 保護自動同步端點
```

### ✅ 步驟 2: 設定資料庫

#### 🥇 選項 1: PlanetScale (推薦)

1. **註冊帳號**: 前往 [PlanetScale](https://planetscale.com)
2. **建立資料庫**:
   ```bash
   # 安裝 CLI
   brew install planetscale/tap/pscale
   
   # 登入
   pscale auth login
   
   # 建立資料庫
   pscale database create maplestory-tracker
   pscale branch create maplestory-tracker main
   
   # 取得連線字串
   pscale connect maplestory-tracker main --port 3309
   ```
3. **複製連線字串**: 將顯示的連線字串設定到 Vercel 的 `DATABASE_URL`

#### 🥈 選項 2: Neon (PostgreSQL)

1. 前往 [Neon](https://neon.tech)
2. 建立新專案
3. 複製 Connection String
4. 貼到 Vercel 的 `DATABASE_URL`

### ✅ 步驟 3: 驗證部署

#### 🌐 測試網站
```bash
# 您的應用 URL (依專案名稱而定)
https://maplestory-price-tracker.vercel.app
```

#### 🔧 測試 API 端點
```bash
# 健康檢查
curl https://your-app.vercel.app/api/health

# 手動同步 (設定完環境變數後)
curl -X POST https://your-app.vercel.app/api/sync

# Cron 同步 (需要密鑰)
curl -H "Authorization: Bearer maple-tracker-cron-secret-2025" \
     https://your-app.vercel.app/api/cron/sync
```

### ✅ 步驟 4: 監控和維護

#### 📊 監控工具
- **Vercel Analytics**: 流量和效能監控
- **Function Logs**: 在 Vercel 儀表板查看執行日誌
- **Error Tracking**: 監控錯誤和異常

#### ⚡ 自動同步
- **頻率**: 每 6 小時自動執行
- **端點**: `/api/cron/sync`
- **保護**: 需要 `CRON_SECRET` 認證

## 🚨 常見問題排除

### ❌ 資料庫連線失敗
```
檢查項目:
1. DATABASE_URL 格式是否正確
2. 資料庫服務是否正常運行
3. 連線字串的使用者權限
```

### ❌ Google Sheets 認證失敗
```
檢查項目:
1. GOOGLE_PRIVATE_KEY 是否包含完整的 BEGIN/END 標記
2. 換行符是否正確 (\n)
3. 服務帳戶是否有 Sheets 權限
```

### ❌ Vercel 函數超時
```
解決方案:
1. 檢查 vercel.json 中的 maxDuration 設定
2. 優化同步邏輯
3. 檢查 Google Sheets API 回應時間
```

## 🎯 最終結果

設定完成後，您將擁有：

✅ **公開可訪問的網站**: 楓之谷價格追蹤器  
✅ **自動資料同步**: 每 6 小時更新 Google Sheets 資料  
✅ **零成本營運**: Vercel + PlanetScale 免費方案  
✅ **高效能**: 內建快取和 CDN 加速  
✅ **現代化 UI**: 響應式設計，支援手機和電腦  

## 🔗 重要連結

- 🎛️ **Vercel 儀表板**: https://vercel.com/dashboard
- 🗄️ **PlanetScale**: https://planetscale.com
- 🗄️ **Neon**: https://neon.tech  
- 📖 **Google Sheets API**: https://developers.google.com/sheets/api

## 🛠️ 輔助腳本

```bash
# 檢查部署狀態
./scripts/check-vercel-status.sh

# 部署後設定指南
./scripts/post-deploy-setup.sh

# 快速狀態檢查
./scripts/quick-check.sh
```

---

🎉 **恭喜！您的楓之谷價格追蹤器已經成功部署並準備投入使用！**
