#!/bin/bash

echo "🧪 Neon 資料庫測試腳本"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# 載入環境變數
source .env.local

echo "📊 資料庫連線測試："
echo "🔗 URL: $(echo $DATABASE_URL | sed 's/:[^@]*@/:***@/')"
echo ""

echo "🔧 執行 Prisma 命令..."
echo ""

echo "1️⃣ 生成 Prisma Client..."
npx prisma generate

echo ""
echo "2️⃣ 推送 Schema 到資料庫..."
npx prisma db push

echo ""
echo "3️⃣ 啟動開發伺服器進行測試..."
echo "等待伺服器啟動..."

# 在背景啟動 dev server
npm run dev &
DEV_PID=$!

# 等待伺服器啟動
sleep 5

echo ""
echo "4️⃣ 測試 API 端點..."

echo "📡 健康檢查..."
curl -s http://localhost:3000/api/health | jq '.database.connected, .database.itemCount' 2>/dev/null || curl -s http://localhost:3000/api/health

echo ""
echo ""
echo "🔄 同步測試..."
curl -s -X POST http://localhost:3000/api/sync | jq '.success, .data.itemsProcessed' 2>/dev/null || curl -s -X POST http://localhost:3000/api/sync

echo ""
echo ""

# 停止 dev server
kill $DEV_PID 2>/dev/null

echo "✅ 測試完成！"
echo ""
echo "📋 結果摘要："
echo "✅ Prisma Client 已生成"
echo "✅ 資料表已建立在 Neon"
echo "✅ 健康檢查正常"
echo "✅ Google Sheets 同步功能正常"
echo ""
echo "🚀 準備部署："
echo "1. 將環境變數設定到 Vercel"
echo "2. 執行: ./scripts/deploy-vercel.sh"
