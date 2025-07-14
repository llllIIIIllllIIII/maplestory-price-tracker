#!/bin/bash

# 部署後設定檢查清單

echo "✅ Vercel 部署完成echo "🗄️ 步驟 2: 設定資料庫"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "選擇以下其中一個資料庫服務："
echo ""
echo "🥇 選項 1: Neon (推薦 - 真正免費)"
echo "   1. 執行: ./scripts/setup-neon.sh"
echo "   2. 或手動：註冊 neon.tech"
echo "   3. 建立專案: maplestory-tracker"
echo "   4. 複製 PostgreSQL 連線字串到 Vercel"
echo "   5. 更新 Prisma: ./scripts/update-prisma-postgres.sh"
echo ""
echo "🥈 選項 2: PlanetScale (需要信用卡驗證)"
echo "   1. 執行: ./scripts/setup-planetscale.sh"
echo "   2. 故障排除: ./scripts/troubleshoot-planetscale.sh"
echo "   3. 建立資料庫: maplestory-tracker"
echo "   4. 複製連線字串到 Vercel"
echo "" "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# 檢查專案狀態
if [ -f ".vercel/project.json" ]; then
    PROJECT_NAME=$(cat .vercel/project.json | grep '"name"' | cut -d'"' -f4)
    PROJECT_ID=$(cat .vercel/project.json | grep '"projectId"' | cut -d'"' -f4)
    ORG_ID=$(cat .vercel/project.json | grep '"orgId"' | cut -d'"' -f4)
    
    echo "📊 部署資訊："
    echo "   🏷️  專案名稱: $PROJECT_NAME"
    echo "   🆔 專案 ID: $PROJECT_ID"
    echo "   🌐 預估 URL: https://$PROJECT_NAME.vercel.app"
    echo ""
else
    echo "⚠️ 未找到 .vercel/project.json，請確認部署是否成功"
    echo ""
fi

echo "📋 必要的後續步驟："
echo ""

echo "🔧 步驟 1: 設定環境變數"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "前往 Vercel 儀表板設定以下環境變數："
echo ""
echo "🗄️ 資料庫設定："
echo "   變數名: DATABASE_URL"
echo "   說明: 需要外部資料庫 (PlanetScale/Neon)"
echo "   範例: mysql://user:pass@host.planetscale.app/db"
echo ""
echo "🔑 Google Sheets 認證："
echo "   GOOGLE_SERVICE_ACCOUNT_EMAIL=service-account@maplestory-464806.iam.gserviceaccount.com"
echo "   GOOGLE_PRIVATE_KEY=-----BEGIN PRIVATE KEY-----\\n...\\n-----END PRIVATE KEY-----\\n"
echo "   GOOGLE_SHEET_ID=16em3bVfF98HEwrrAgDa9retcHvxWZ0xL9NtQMWXWMlI"
echo ""
echo "🔐 安全設定："
echo "   CRON_SECRET=maple-tracker-cron-secret-2025"
echo ""

echo "🗄️ 步驟 2: 設定資料庫"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "選擇以下其中一個資料庫服務："
echo ""
echo "🥇 選項 1: PlanetScale (推薦)"
echo "   1. 執行: ./scripts/setup-planetscale.sh"
echo "   2. 或手動：註冊 planetscale.com"
echo "   3. 建立資料庫: maplestory-tracker"
echo "   4. 複製連線字串到 Vercel"
echo ""
echo "🥈 選項 2: Neon (PostgreSQL)"
echo "   1. 註冊 neon.tech"
echo "   2. 建立新專案"
echo "   3. 複製連線字串到 Vercel"
echo ""

echo "🔗 步驟 3: 驗證部署"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "1. 訪問您的應用網址"
echo "2. 測試 API 端點:"
echo "   • GET /api/health (健康檢查)"
echo "   • POST /api/sync (手動同步)"
echo "3. 檢查 Vercel Functions 日誌"
echo ""

echo "⚡ 步驟 4: 測試自動同步"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Vercel Cron Jobs 已設定為每 6 小時同步一次"
echo "手動觸發測試："
echo "curl -H 'Authorization: Bearer maple-tracker-cron-secret-2025' \\"
echo "     https://your-app.vercel.app/api/cron/sync"
echo ""

echo "🚀 快速連結："
echo "━━━━━━━━━━━━━━━━━━━━━━━━━"
if [ ! -z "$PROJECT_NAME" ]; then
    echo "📱 您的應用: https://$PROJECT_NAME.vercel.app"
    echo "⚙️ 專案設定: https://vercel.com/dashboard"
    echo "📊 函數日誌: https://vercel.com/dashboard → Functions → View Logs"
else
    echo "📱 Vercel 儀表板: https://vercel.com/dashboard"
fi
echo "🗄️ PlanetScale: https://planetscale.com"
echo "🗄️ Neon: https://neon.tech"
echo ""

echo "✨ 完成後您將擁有："
echo "━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ 可公開訪問的楓之谷價格追蹤器"
echo "✅ 每 6 小時自動同步 Google Sheets 資料"
echo "✅ 免費的雲端託管 (Vercel + PlanetScale)"
echo "✅ 高效能的快取系統"
echo "✅ 響應式的現代化介面"
echo ""

read -p "按 Enter 開啟 Vercel 儀表板... " -r
if command -v open &> /dev/null; then
    open "https://vercel.com/dashboard"
elif command -v xdg-open &> /dev/null; then
    xdg-open "https://vercel.com/dashboard"
else
    echo "請手動開啟: https://vercel.com/dashboard"
fi
