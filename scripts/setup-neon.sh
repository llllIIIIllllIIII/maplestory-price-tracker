#!/bin/bash

echo "🗄️ 設定 Neon PostgreSQL 資料庫 (推薦)"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "💡 為什麼選擇 Neon："
echo "✅ 真正免費 (無需信用卡)"
echo "✅ 設定簡單"
echo "✅ PostgreSQL 完全相容"
echo "✅ 0.5GB 免費儲存空間"
echo "✅ 自動休眠節省資源"
echo ""

echo "🚀 步驟 1: 建立 Neon 帳號"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "1. 前往 https://neon.tech"
echo "2. 點擊 'Sign up'"
echo "3. 使用 GitHub 或 Google 帳號註冊"
echo ""
read -p "已建立 Neon 帳號？按 Enter 繼續... " -r

echo ""
echo "🗄️ 步驟 2: 建立資料庫專案"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "1. 登入後點擊 'Create Project'"
echo "2. 專案名稱: maplestory-tracker"
echo "3. 資料庫名稱: maplestory-tracker (或保持預設)"
echo "4. 區域: 選擇離您最近的區域"
echo "5. PostgreSQL 版本: 保持預設"
echo "6. 點擊 'Create Project'"
echo ""
read -p "已建立專案？按 Enter 繼續... " -r

echo ""
echo "🔗 步驟 3: 取得連線字串"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "1. 專案建立後，會自動顯示連線資訊"
echo "2. 或者點擊 'Connection Details'"
echo "3. 選擇 'Prisma' 格式"
echo "4. 複製完整的 DATABASE_URL"
echo ""
echo "連線字串格式類似："
echo "postgresql://username:password@ep-xxx.us-east-1.aws.neon.tech/dbname?sslmode=require"
echo ""
read -p "已複製連線字串？按 Enter 繼續... " -r

echo ""
echo "📝 步驟 4: 更新 Prisma Schema"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "由於我們從 MySQL (PlanetScale) 改為 PostgreSQL (Neon)，需要更新 Prisma 設定"
echo ""
echo "正在更新 prisma/schema.prisma..."

# 更新 Prisma schema 以使用 PostgreSQL
if [ -f "prisma/schema.prisma" ]; then
    # 備份原始檔案
    cp prisma/schema.prisma prisma/schema.prisma.backup
    
    # 更新 provider 為 postgresql
    sed -i '' 's/provider = "mysql"/provider = "postgresql"/' prisma/schema.prisma
    
    echo "✅ Prisma schema 已更新為 PostgreSQL"
else
    echo "❌ 找不到 prisma/schema.prisma 檔案"
fi

echo ""
echo "🏠 步驟 5: 設定本地環境"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "將 Neon 連線字串加入 .env.local："
echo ""
echo "DATABASE_URL=\"postgresql://username:password@ep-xxx.us-east-1.aws.neon.tech/dbname?sslmode=require\""
echo ""
echo "請將上面的範例替換為您從 Neon 複製的實際連線字串"
echo ""
read -p "已更新 .env.local？按 Enter 繼續... " -r

echo ""
echo "🎯 步驟 6: 執行資料庫遷移"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "執行以下命令建立資料表："
echo ""
echo "npx prisma generate"
echo "npx prisma db push"
echo ""
read -p "按 Enter 執行遷移命令... " -r

# 執行 Prisma 命令
echo "正在執行 Prisma 遷移..."
npx prisma generate
npx prisma db push

echo ""
echo "🌐 步驟 7: 設定 Vercel 環境變數"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "1. 前往 Vercel 儀表板: https://vercel.com/dashboard"
echo "2. 選擇您的專案"
echo "3. 前往 Settings → Environment Variables"
echo "4. 新增 DATABASE_URL，值為您的 Neon 連線字串"
echo "5. 重新部署應用"
echo ""

echo "✅ Neon 資料庫設定完成！"
echo ""
echo "📊 Neon 優勢："
echo "• 免費 0.5GB 儲存空間"
echo "• 自動休眠省電"
echo "• 無需信用卡驗證"
echo "• PostgreSQL 完全相容"
echo "• 簡單的網頁管理介面"
echo ""

read -p "按 Enter 開啟 Neon 儀表板... " -r
if command -v open &> /dev/null; then
    open "https://neon.tech"
elif command -v xdg-open &> /dev/null; then
    xdg-open "https://neon.tech"
else
    echo "請手動開啟: https://neon.tech"
fi
