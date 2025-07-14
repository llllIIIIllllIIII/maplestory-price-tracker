#!/bin/bash

# 快速檢查 Vercel 帳號

echo "👤 Vercel 帳號資訊："
echo ""

# 檢查登入狀態
VERCEL_USER=$(vercel whoami 2>/dev/null)
if [ $? -eq 0 ]; then
    echo "✅ 已登入: $VERCEL_USER"
    echo "📧 您的部署將會在此帳號下進行"
    echo ""
    echo "🚀 準備部署："
    echo "1. 執行: ./scripts/deploy-vercel.sh"
    echo "2. 部署後訪問: https://vercel.com/dashboard"
else
    echo "❌ 未登入 Vercel"
    echo ""
    echo "🔐 請先登入："
    echo "vercel login"
fi
