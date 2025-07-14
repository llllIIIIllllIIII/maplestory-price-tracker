#!/bin/bash

# 楓之谷物價追蹤器 - Vercel 部署腳本

echo "🚀 開始部署到 Vercel..."

# 檢查 Vercel CLI
if ! command -v vercel &> /dev/null; then
    echo "📦 安裝 Vercel CLI..."
    npm install -g vercel
fi

# 檢查登入狀態並顯示帳號資訊
echo "🔐 檢查 Vercel 登入狀態..."
VERCEL_USER=$(vercel whoami 2>/dev/null)
if [ $? -eq 0 ]; then
    echo "✅ 已登入 Vercel 帳號: $VERCEL_USER"
else
    echo "❌ 未登入 Vercel，請先執行: vercel login"
    exit 1
fi

# 檢查環境變數檔案
echo "🔐 檢查環境變數..."
if [ ! -f ".env.local" ]; then
    echo "❌ 請先設定 .env.local 檔案"
    exit 1
fi

# 檢查資料庫連線
echo "🗄️ 檢查資料庫連線..."
if ! grep -q "DATABASE_URL" .env.local; then
    echo "⚠️ 警告：未設定 DATABASE_URL，請使用 PlanetScale 或 Neon"
    echo "執行: ./scripts/setup-planetscale.sh"
fi

# 建構專案
echo "🏗️ 建構專案..."
npm run build

# 部署到 Vercel
echo "🚀 部署到 Vercel..."
echo "📍 目標帳號: $VERCEL_USER"
echo "🏷️ 專案名稱: maplestory-price-tracker"
echo ""
echo "📋 部署設定指南："
echo "   ✅ Set up and deploy? → yes"
echo "   ✅ Which scope? → Henry's projects (您的個人帳號)"
echo "   ✅ Link to existing project? → no (建立新專案)"
echo ""
echo "開始部署..."

# 檢查是否已經有 .vercel 配置
if [ -d ".vercel" ]; then
    echo "🔗 發現現有專案配置，執行更新部署..."
    vercel --prod
else
    echo "🆕 首次部署，將建立新專案..."
    echo "📝 請按照上方指南回答問題"
    vercel --prod
fi

echo ""
echo "✅ 部署完成！"
echo ""
echo "📊 部署資訊："
echo "� Vercel 帳號: $VERCEL_USER"
echo "🌐 專案 URL: https://maplestory-price-tracker.vercel.app (或類似域名)"
echo "�📋 管理面板: https://vercel.com/dashboard"
echo ""
echo "📋 後續步驟："
echo "1. 在 Vercel 儀表板設定環境變數："
echo "   - DATABASE_URL (PlanetScale/Neon 連線字串)"
echo "   - GOOGLE_SERVICE_ACCOUNT_EMAIL (service-account@maplestory-464806.iam.gserviceaccount.com)"
echo "   - GOOGLE_PRIVATE_KEY (完整私鑰，保留 \\n)"
echo "   - GOOGLE_SHEET_ID (16em3bVfF98HEwrrAgDa9retcHvxWZ0xL9NtQMWXWMlI)"  
echo "   - CRON_SECRET (maple-tracker-cron-secret-2025)"
echo ""
echo "2. 資料同步設定："
echo "   - 自動同步：每6小時執行一次"
echo "   - 手動同步：POST /api/sync"
echo "   - Cron 同步：GET /api/cron/sync (需要 Authorization header)"
echo ""
echo "🔗 快速連結："
