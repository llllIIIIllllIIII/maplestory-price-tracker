#!/bin/bash

# 互動式 Vercel 部署腳本

echo "🚀 MapleStory 價格追蹤器 - 互動式部署"
echo ""

# 檢查登入狀態
VERCEL_USER=$(vercel whoami 2>/dev/null)
if [ $? -ne 0 ]; then
    echo "❌ 未登入 Vercel，請先執行: vercel login"
    exit 1
fi

echo "👤 部署帳號: $VERCEL_USER"
echo ""

# 檢查是否已有專案配置
if [ -d ".vercel" ]; then
    echo "🔗 發現現有專案配置"
    if [ -f ".vercel/project.json" ]; then
        PROJECT_NAME=$(cat .vercel/project.json | grep '"name"' | cut -d'"' -f4)
        echo "📁 專案名稱: $PROJECT_NAME"
    fi
    echo ""
    echo "🔄 執行更新部署..."
    vercel --prod
else
    echo "🆕 首次部署設定"
    echo ""
    echo "📋 即將出現的問題和建議回答："
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo "❓ Set up and deploy? → 輸入: y"
    echo "❓ Which scope? → 選擇: Henry's projects (或您的個人帳號)" 
    echo "❓ Link to existing project? → 輸入: n (建立新專案)"
    echo "❓ Project name? → 建議: maplestory-price-tracker"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo ""
    read -p "按 Enter 繼續部署... " -r
    
    echo "🚀 開始部署..."
    vercel --prod
fi

echo ""
echo "✅ 部署完成！"
echo ""
echo "📊 後續步驟："
echo "1. 📱 設定環境變數 (在 Vercel 儀表板)："
echo "   • DATABASE_URL"
echo "   • GOOGLE_SERVICE_ACCOUNT_EMAIL" 
echo "   • GOOGLE_PRIVATE_KEY"
echo "   • GOOGLE_SHEET_ID"
echo "   • CRON_SECRET"
echo ""
echo "2. 🔗 管理專案:"
echo "   • 儀表板: https://vercel.com/dashboard"
echo "   • 專案設定: https://vercel.com/$VERCEL_USER/maplestory-price-tracker"
echo ""
echo "3. ✅ 測試部署:"
echo "   • 訪問您的應用"
echo "   • 測試 API: /api/sync"
