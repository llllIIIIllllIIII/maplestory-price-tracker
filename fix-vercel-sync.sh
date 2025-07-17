#!/bin/bash

# 修復 Vercel 部署環境的同步問題
echo "🔧 修復 Vercel 部署環境的資料同步問題"
echo "================================="

# 檢查是否有 VERCEL_URL 環境變數
if [ -z "$VERCEL_URL" ]; then
    echo "請提供你的 Vercel 應用程式 URL："
    read -p "輸入 URL (例如: https://your-app.vercel.app): " VERCEL_URL
fi

# 移除結尾的斜線
VERCEL_URL=$(echo $VERCEL_URL | sed 's/\/$//g')

echo "📋 目標網站: $VERCEL_URL"
echo ""

# 1. 檢查網站狀態
echo "🔍 1. 檢查網站狀態..."
if curl -s -o /dev/null -w "%{http_code}" "$VERCEL_URL" | grep -q "200"; then
    echo "✅ 網站運作正常"
else
    echo "❌ 網站無法訪問，請檢查 URL"
    exit 1
fi

# 2. 檢查 API 狀態
echo ""
echo "🔍 2. 檢查 API 狀態..."
API_STATUS=$(curl -s "$VERCEL_URL/api/items?limit=1" | jq -r '.success // false')
if [ "$API_STATUS" = "true" ]; then
    echo "✅ API 運作正常"
else
    echo "❌ API 無法正常回應"
    exit 1
fi

# 3. 檢查當前效率計算
echo ""
echo "🔍 3. 檢查當前效率計算..."
EFFICIENCY=$(curl -s "$VERCEL_URL/api/items?limit=1" | jq -r '.data.items[0].efficiency // 0')
echo "當前第一個道具的效率值: $EFFICIENCY"

if [ "$EFFICIENCY" = "0" ]; then
    echo "⚠️ 效率計算異常，需要重新同步"
    
    # 4. 手動觸發同步
    echo ""
    echo "🔄 4. 手動觸發資料同步..."
    
    # 檢查是否有 GOOGLE_SHEETS_API_KEY
    if [ -z "$GOOGLE_SHEETS_API_KEY" ]; then
        echo "❌ 需要先設定 GOOGLE_SHEETS_API_KEY 環境變數"
        echo "請參考 GOOGLE_SHEETS_SETUP.md 文件"
        exit 1
    fi
    
    # 觸發同步
    SYNC_RESULT=$(curl -s -X POST "$VERCEL_URL/api/sync" | jq -r '.success // false')
    
    if [ "$SYNC_RESULT" = "true" ]; then
        echo "✅ 同步成功"
        
        # 5. 驗證修復結果
        echo ""
        echo "🔍 5. 驗證修復結果..."
        sleep 2
        
        NEW_EFFICIENCY=$(curl -s "$VERCEL_URL/api/items?limit=1" | jq -r '.data.items[0].efficiency // 0')
        echo "同步後第一個道具的效率值: $NEW_EFFICIENCY"
        
        if [ "$NEW_EFFICIENCY" != "0" ]; then
            echo "🎉 修復成功！效率計算已正常"
        else
            echo "❌ 修復失敗，效率仍為 0"
        fi
    else
        echo "❌ 同步失敗，請檢查 Google Sheets API 設定"
        exit 1
    fi
else
    echo "✅ 效率計算正常，無需修復"
fi

echo ""
echo "📊 顯示前 3 個道具的效率："
curl -s "$VERCEL_URL/api/items?limit=3" | jq -r '.data.items[] | "\(.name): \(.efficiency)"'

echo ""
echo "🏁 檢查完成！"
