#!/bin/bash

echo "🔄 更新 Prisma Schema 為 PostgreSQL"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# 檢查 Prisma schema 是否存在
if [ ! -f "prisma/schema.prisma" ]; then
    echo "❌ 找不到 prisma/schema.prisma 檔案"
    exit 1
fi

echo "📋 當前 Prisma 設定："
grep -E "provider|url" prisma/schema.prisma

echo ""
echo "📝 備份現有 schema..."
cp prisma/schema.prisma prisma/schema.prisma.backup
echo "✅ 備份已建立: prisma/schema.prisma.backup"

echo ""
echo "🔄 更新 provider 為 postgresql..."

# 使用 sed 更新 provider
if [[ "$OSTYPE" == "darwin"* ]]; then
    # macOS
    sed -i '' 's/provider = "sqlite"/provider = "postgresql"/' prisma/schema.prisma
    sed -i '' 's/provider = "mysql"/provider = "postgresql"/' prisma/schema.prisma
else
    # Linux
    sed -i 's/provider = "sqlite"/provider = "postgresql"/' prisma/schema.prisma
    sed -i 's/provider = "mysql"/provider = "postgresql"/' prisma/schema.prisma
fi

echo ""
echo "📋 更新後的設定："
grep -E "provider|url" prisma/schema.prisma

echo ""
echo "✅ Prisma schema 已更新為 PostgreSQL"
echo ""
echo "📝 後續步驟："
echo "1. 確保 .env.local 中的 DATABASE_URL 是 Neon 的連線字串"
echo "2. 執行: npx prisma generate"
echo "3. 執行: npx prisma db push"
echo ""

read -p "按 Enter 繼續執行 Prisma 命令... " -r

echo "🔧 執行 Prisma 命令..."
echo ""

echo "📦 生成 Prisma Client..."
npx prisma generate

echo ""
echo "📊 推送 schema 到資料庫..."
npx prisma db push

echo ""
echo "✅ Prisma 設定完成！"
echo ""
echo "🎯 測試資料庫連線："
echo "可以執行 npm run dev 然後訪問 /api/health 測試"
