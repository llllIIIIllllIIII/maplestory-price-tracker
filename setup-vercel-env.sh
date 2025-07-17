#!/bin/bash

# Vercel 環境變數設定腳本
# 使用此腳本自動設定 Vercel 環境變數

echo "🔧 設定 Vercel 環境變數..."
echo "=============================="

# 檢查是否安裝 Vercel CLI
if ! command -v vercel &> /dev/null; then
    echo "❌ 請先安裝 Vercel CLI："
    echo "npm install -g vercel"
    exit 1
fi

# 確認專案設定
echo "📋 請確認以下資訊："
echo "專案名稱: maplestory-price-tracker"
echo "GitHub 倉庫: https://github.com/llllIIIIllllIIII/maplestory-price-tracker"
echo ""

# 設定環境變數
echo "⚙️ 設定環境變數..."

# 如果用戶沒有提供值，使用預設值
GOOGLE_SHEET_ID=${GOOGLE_SHEET_ID:-"16em3bVfF98HEwrrAgDa9retcHvxWZ0xL9NtQMWXWMlI"}
CRON_SECRET=${CRON_SECRET:-"maple-tracker-cron-secret-2025"}

# 檢查是否有必要的環境變數
if [ -z "$GOOGLE_SHEETS_API_KEY" ]; then
    echo "❌ 請設定 GOOGLE_SHEETS_API_KEY 環境變數"
    echo "取得方式請參考 GOOGLE_SHEETS_SETUP.md"
    echo ""
    echo "設定方法："
    echo "export GOOGLE_SHEETS_API_KEY=your_api_key_here"
    echo "然後重新執行此腳本"
    exit 1
fi

if [ -z "$DATABASE_URL" ]; then
    echo "❌ 請設定 DATABASE_URL 環境變數"
    echo "這是你的 PostgreSQL 資料庫連接字串"
    echo ""
    echo "設定方法："
    echo "export DATABASE_URL=your_database_url_here"
    echo "然後重新執行此腳本"
    exit 1
fi

# 設定 Vercel 環境變數
echo "📤 上傳環境變數到 Vercel..."

vercel env add GOOGLE_SHEETS_API_KEY production <<< "$GOOGLE_SHEETS_API_KEY"
vercel env add GOOGLE_SHEET_ID production <<< "$GOOGLE_SHEET_ID"
vercel env add CRON_SECRET production <<< "$CRON_SECRET"
vercel env add DATABASE_URL production <<< "$DATABASE_URL"

echo ""
echo "✅ 環境變數設定完成！"
echo ""
echo "📋 已設定的環境變數："
echo "- GOOGLE_SHEETS_API_KEY: ****（已隱藏）"
echo "- GOOGLE_SHEET_ID: $GOOGLE_SHEET_ID"
echo "- CRON_SECRET: ****（已隱藏）"
echo "- DATABASE_URL: ****（已隱藏）"
echo ""
echo "🚀 下一步："
echo "1. 重新部署專案：vercel --prod"
echo "2. 等待部署完成後，執行修復腳本：./fix-vercel-sync.sh"
echo "3. 或者使用 Cron Job：./fix-vercel-cron.sh"
echo "4. 測試 API：curl https://your-app.vercel.app/api/items?limit=1"
echo ""
echo "💡 提示：如果效率值仍為 0，請手動觸發同步修復資料"
