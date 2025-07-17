#!/bin/bash

# 修復重複的雪花/飄雪結晶資料
echo "🔧 修復重複的雪花/飄雪結晶資料"
echo "=============================="

# 檢查是否有 VERCEL_URL 環境變數
if [ -z "$VERCEL_URL" ]; then
    echo "請提供你的 Vercel 應用程式 URL："
    read -p "輸入 URL (例如: https://your-app.vercel.app): " VERCEL_URL
fi

# 移除結尾的斜線
VERCEL_URL=$(echo $VERCEL_URL | sed 's/\/$//g')

echo "📋 目標網站: $VERCEL_URL"
echo ""

# 1. 檢查目前的雪花相關資料
echo "🔍 1. 檢查目前的雪花相關資料..."
echo "雪花相關道具："
curl -s "$VERCEL_URL/api/items?limit=15" | jq -r '.data.items[] | select(.name | contains("雪花") or contains("飄雪")) | "\(.name): \(.wcPrice)WC, \(.mesosValue)楓幣, 效率=\(.efficiency)"'

echo ""
echo "問題確認：雪花和飄雪結晶是同一個道具，但出現了兩次"
echo ""

# 2. 創建修復 SQL 腳本
echo "🔄 2. 創建資料庫修復腳本..."

cat > fix_snowflake_data.sql << 'EOF'
-- 修復重複的雪花/飄雪結晶資料

-- 1. 更新飄雪結晶的描述，合併雪花的資訊
UPDATE items 
SET description = '從 Artale 商城取得 (11個一包，單價27.273WC/個) | 🧊 基準道具 - 主要交易貨幣，流動性最佳'
WHERE name = '飄雪結晶 (Snowflakes Box)';

-- 2. 刪除重複的雪花資料
DELETE FROM items WHERE name = '雪花';

-- 3. 清理相關的套利機會資料（如果有的話）
DELETE FROM arbitrage_opportunities 
WHERE item1_id IN (SELECT id FROM items WHERE name = '雪花') 
   OR item2_id IN (SELECT id FROM items WHERE name = '雪花');

-- 4. 確認修復結果
SELECT name, wc_price, mesos_value, efficiency, description 
FROM items 
WHERE name LIKE '%雪%' OR name LIKE '%飄雪%';
EOF

echo "✅ 修復腳本已創建：fix_snowflake_data.sql"
echo ""

# 3. 提供修復方案
echo "🛠️ 3. 修復方案選擇："
echo ""
echo "方案 A: 直接透過 API 修復（推薦）"
echo "方案 B: 手動執行 SQL 腳本"
echo "方案 C: 重新同步資料"
echo ""

read -p "選擇修復方案 (A/B/C): " choice

case $choice in
    A|a)
        echo "🔄 執行 API 修復..."
        RESULT=$(curl -s -X POST "$VERCEL_URL/api/fix-snowflake" | jq '.')
        echo "修復結果："
        echo "$RESULT" | jq '.'
        
        if echo "$RESULT" | jq -e '.success' > /dev/null 2>&1; then
            echo "✅ API 修復成功"
        else
            echo "❌ API 修復失敗"
        fi
        ;;
    B|b)
        echo "📋 手動執行 SQL 腳本："
        echo "1. 連接到你的資料庫"
        echo "2. 執行 fix_snowflake_data.sql 腳本"
        echo "3. 檢查修復結果"
        ;;
    C|c)
        echo "🔄 重新同步資料（會覆蓋所有資料）..."
        if [ -n "$VERCEL_URL" ]; then
            curl -X POST "$VERCEL_URL/api/sync"
            echo "✅ 同步完成，請檢查結果"
        else
            echo "❌ 需要提供 VERCEL_URL"
        fi
        ;;
    *)
        echo "❌ 無效選擇"
        exit 1
        ;;
esac

echo ""
echo "🔍 4. 驗證修復結果..."
sleep 2

echo "修復後的雪花相關道具："
curl -s "$VERCEL_URL/api/items?limit=15" | jq -r '.data.items[] | select(.name | contains("雪花") or contains("飄雪")) | "\(.name): \(.wcPrice)WC, \(.mesosValue)楓幣, 效率=\(.efficiency)"'

echo ""
echo "🏁 修復完成！"
