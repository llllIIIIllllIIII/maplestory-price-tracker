# 🚀 Vercel 部署問答清單

## 📋 部署時的問題和建議回答

### 問題 1: `Set up and deploy "~/Desktop/MyProjects/MapleStoryPriceTracker"?`
```
建議回答: y (或 yes)
說明: 確認要設定和部署此專案
```

### 問題 2: `Which scope should contain your project?`
```
建議回答: Henry's projects
說明: 選擇您的個人帳號 (llllliiiiillllliiiii)
如果有多個選項，選擇個人帳號而非團隊帳號
```

### 問題 3: `Link to existing project?`
```
建議回答: n (或 no)
說明: 建立新專案，除非您已經有相關專案要連結
```

### 問題 4: `What's the name of your project?` (選擇建立新專案時)
```
建議回答: maplestory-price-tracker
說明: 
- 使用小寫字母和連字符
- 避免空格和特殊字符
- 專案名稱會影響最終的 URL
```

### 問題 5: `In which directory is your code located?`
```
建議回答: ./ (預設值，直接按 Enter)
說明: 程式碼就在當前目錄
```

## 🎯 完整流程示例

```bash
? Set up and deploy "~/Desktop/MyProjects/MapleStoryPriceTracker"? y
? Which scope should contain your project? Henry's projects
? Link to existing project? n
? What's the name of your project? maplestory-price-tracker
? In which directory is your code located? ./
```

## 📱 部署後設定

### 1. 環境變數設定 (在 Vercel 儀表板)
```
DATABASE_URL=mysql://...
GOOGLE_SERVICE_ACCOUNT_EMAIL=service-account@maplestory-464806.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY=-----BEGIN PRIVATE KEY-----\n...
GOOGLE_SHEET_ID=16em3bVfF98HEwrrAgDa9retcHvxWZ0xL9NtQMWXWMlI
CRON_SECRET=maple-tracker-cron-secret-2025
```

### 2. 預期結果
- **專案 URL**: `https://maplestory-price-tracker.vercel.app`
- **管理面板**: `https://vercel.com/dashboard`
- **專案設定**: `https://vercel.com/llllliiiiillllliiiii/maplestory-price-tracker`

## 🔧 使用腳本部署

### 互動式部署 (推薦)
```bash
./scripts/deploy-interactive.sh
```

### 一般部署
```bash
./scripts/deploy-vercel.sh
```

### 快速檢查狀態
```bash
./scripts/quick-check.sh
```
