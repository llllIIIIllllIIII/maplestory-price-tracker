# 🍁 MapleStory 價格追蹤器

一個用於追蹤楓之谷道具價格的 Web 應用程式，整合 Google Sheets 資料同步功能。

## 📋 功能特色

- 🔍 即時道具價格搜尋
- 📊 效率分析和套利計算  
- 📈 價格趨勢視覺化
- ⚡ Google Sheets 資料同步
- 📱 響應式設計

## 🏗️ 技術架構

- **Frontend**: Next.js 14 + TypeScript + Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: Prisma ORM + PostgreSQL (Production) / SQLite (Development)
- **Data Source**: Google Sheets API
- **Deployment**: Vercel
- **Sync Strategy**: Vercel Cron Jobs + External Database

## 📁 專案結構

```
├── src/                    # 應用程式原始碼
│   ├── app/               # Next.js App Router
│   ├── components/        # React 元件
│   ├── lib/              # 工具函數和設定
│   └── types/            # TypeScript 型別定義
├── prisma/               # 資料庫 Schema 和遷移
├── config/              # 設定檔案
├── docs/                # 專案文件
├── scripts/             # 部署和同步腳本
└── vercel.json          # Vercel 部署設定
```

## 🚀 開發指南

### 本地開發
```bash
npm install
npm run dev
```

### 部署到 Vercel
```bash
chmod +x scripts/deploy-vercel.sh
./scripts/deploy-vercel.sh
```

## 📝 環境變數

參考 `.env.example` 設定以下環境變數：
- `DATABASE_URL`: 資料庫連線字串
- `GOOGLE_SERVICE_ACCOUNT_EMAIL`: Google Sheets API 服務帳號
- `GOOGLE_PRIVATE_KEY`: Google Sheets API 私鑰
- `GOOGLE_SHEETS_ID`: Google Sheets 文件 ID

## 📚 文件

詳細文件請參考 `docs/` 資料夾：
- 部署指南
- Google Sheets 設定
- 高流量優化
- 資料同步分析
