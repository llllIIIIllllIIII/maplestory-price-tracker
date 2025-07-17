#!/bin/bash

# 使用 Vercel Cron Job 修復資料同步問題
echo "🕐 使用 Vercel Cron Job 修復資料同步問題"
echo "======================================="

# 檢查是否有必要的環境變數
if [ -z "$VERCEL_URL" ]; then
    echo "請提供你的 Vercel 應用程式 URL："
    read -p "輸入 URL (例如: https://your-app.vercel.app): " VERCEL_URL
fi

if [ -z "$CRON_SECRET" ]; then
    CRON_SECRET="maple-tracker-cron-secret-2025"
    echo "使用預設 CRON_SECRET: $CRON_SECRET"
fi

# 移除結尾的斜線
VERCEL_URL=$(echo $VERCEL_URL | sed 's/\/$//g')

echo "📋 目標網站: $VERCEL_URL"
echo "🔑 Cron Secret: $CRON_SECRET"
echo ""

# 1. 觸發 Cron Job
echo "🔄 1. 觸發 Cron Job 同步..."
CRON_RESULT=$(curl -s -H "Authorization: Bearer $CRON_SECRET" "$VERCEL_URL/api/cron/sync")

echo "Cron Job 回應:"
echo "$CRON_RESULT" | jq '.' || echo "$CRON_RESULT"

# 2. 檢查是否成功
if echo "$CRON_RESULT" | jq -e '.success' > /dev/null 2>&1; then
    echo "✅ Cron Job 執行成功"
    
    # 3. 驗證結果
    echo ""
    echo "🔍 2. 驗證同步結果..."
    sleep 3
    
    EFFICIENCY=$(curl -s "$VERCEL_URL/api/items?limit=1" | jq -r '.data.items[0].efficiency // 0')
    echo "同步後第一個道具的效率值: $EFFICIENCY"
    
    if [ "$EFFICIENCY" != "0" ]; then
        echo "🎉 修復成功！效率計算已正常"
    else
        echo "❌ 修復失敗，效率仍為 0"
    fi
else
    echo "❌ Cron Job 執行失敗"
    echo "可能的原因："
    echo "- CRON_SECRET 不正確"
    echo "- Google Sheets API 設定有問題"
    echo "- 網路連接問題"
fi

echo ""
echo "📊 顯示前 3 個道具的效率："
curl -s "$VERCEL_URL/api/items?limit=3" | jq -r '.data.items[] | "\(.name): \(.efficiency)"'

echo ""
echo "🏁 檢查完成！"
