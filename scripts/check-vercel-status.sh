#!/bin/bash

# Vercel 狀態檢查腳本

echo "🔍 檢查 Vercel 帳號和專案狀態..."
echo ""

# 檢查登入狀態
echo "👤 當前登入帳號："
VERCEL_USER=$(vercel whoami 2>/dev/null)
if [ $? -eq 0 ]; then
    echo "✅ $VERCEL_USER"
else
    echo "❌ 未登入 Vercel"
    echo "請執行: vercel login"
    exit 1
fi

echo ""

# 檢查專案列表
echo "📁 您的 Vercel 專案："
echo "正在獲取專案列表..."

# 使用 timeout 避免卡住，只等待 10 秒
if timeout 10s vercel list 2>/dev/null | head -5; then
    echo "✅ 專案列表獲取成功"
else
    echo "⚠️ 專案列表獲取超時或失敗，跳過此步驟"
    echo "您可以直接訪問 https://vercel.com/dashboard 查看專案"
fi

echo ""

# 檢查當前目錄是否已經連結到 Vercel 專案
if [ -f ".vercel/project.json" ]; then
    echo "🔗 當前專案已連結到 Vercel："
    cat .vercel/project.json | grep -E '"projectId"|"orgId"' | sed 's/,$//'
else
    echo "⚠️ 當前專案尚未連結到 Vercel"
    echo "部署時會自動建立新專案"
fi

echo ""

# 顯示部署指令建議
echo "🚀 部署建議："
echo "1. 首次部署: ./scripts/deploy-vercel.sh"
echo "2. 更新部署: vercel --prod"
echo "3. 開發預覽: vercel"
echo ""
echo "🔗 管理面板: https://vercel.com/dashboard"