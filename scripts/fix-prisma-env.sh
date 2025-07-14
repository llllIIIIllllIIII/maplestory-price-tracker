#!/bin/bash

echo "🔧 Prisma 環境變數修復工具"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# 檢查 .env.local 是否存在
if [ ! -f ".env.local" ]; then
    echo "❌ 找不到 .env.local 檔案"
    echo "請確保環境變數檔案存在"
    exit 1
fi

echo "📋 當前環境變數檔案："
echo "檔案: .env.local"
echo "大小: $(wc -c < .env.local) bytes"
echo ""

# 檢查 DATABASE_URL 是否存在
if grep -q "DATABASE_URL" .env.local; then
    echo "✅ 找到 DATABASE_URL"
    echo "值: $(grep DATABASE_URL .env.local | head -1 | sed 's/:[^@]*@/:***@/')"
else
    echo "❌ 未找到 DATABASE_URL"
    echo "請在 .env.local 中設定資料庫連線字串"
    exit 1
fi

echo ""
echo "🔧 執行 Prisma 命令 (載入環境變數)..."

# 方法 1: 使用 dotenv
if command -v dotenv &> /dev/null; then
    echo "使用 dotenv-cli..."
    dotenv -e .env.local -- npx prisma db push
elif [ -f "node_modules/.bin/dotenv" ]; then
    echo "使用本地 dotenv..."
    ./node_modules/.bin/dotenv -e .env.local -- npx prisma db push
else
    # 方法 2: 手動載入環境變數
    echo "手動載入環境變數..."
    
    # 讀取 .env.local 並匯出變數
    while IFS= read -r line; do
        # 跳過註解和空行
        if [[ $line =~ ^[[:space:]]*# ]] || [[ -z "$line" ]]; then
            continue
        fi
        
        # 匯出變數 (處理包含空格的路徑)
        if [[ $line == *"="* ]]; then
            key=${line%%=*}
            value=${line#*=}
            # 移除前後的引號
            value=$(echo "$value" | sed 's/^"//;s/"$//')
            export "$key=$value"
        fi
    done < .env.local
    
    echo "環境變數已載入，執行 Prisma 命令..."
    npx prisma db push
fi

echo ""
echo "✅ Prisma 命令執行完成！"
echo ""
echo "🎯 後續步驟："
echo "1. 測試連線: ./scripts/test-neon-connection.sh"
echo "2. 本地開發: npm run dev"
echo "3. 部署到 Vercel: ./scripts/deploy-vercel.sh"
