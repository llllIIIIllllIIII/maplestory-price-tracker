#!/bin/bash

echo "🚀 開始設定 PlanetScale 資料庫..."

# 安裝 PlanetScale CLI (如果尚未安裝)
if ! command -v pscale &> /dev/null; then
    echo "📦 安裝 PlanetScale CLI..."
    if command -v brew &> /dev/null; then
        brew install planetscale/tap/pscale
    else
        echo "請手動安裝 PlanetScale CLI: https://github.com/planetscale/cli"
        exit 1
    fi
fi

echo ""
echo "🔐 步驟 1: 登入 PlanetScale"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "請執行以下命令登入："
echo "pscale auth login"
echo ""
read -p "已登入 PlanetScale？按 Enter 繼續... " -r

echo ""
echo "🗄️ 步驟 2: 建立資料庫"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🆕 使用新的命令格式 (指定叢集大小)："
echo ""
echo "選擇以下其中一種方式："
echo ""
echo "方式 1: 使用免費方案 (推薦)"
echo "pscale database create maplestory-tracker --cluster-size PS-10"
echo ""
echo "方式 2: 如果方式 1 失敗，嘗試不指定叢集大小"
echo "pscale database create maplestory-tracker"
echo ""
echo "方式 3: 通過網頁介面建立"
echo "前往 https://app.planetscale.com 手動建立資料庫"
echo ""

read -p "請執行上述命令之一，完成後按 Enter... " -r

echo ""
echo "🌿 步驟 3: 建立主分支"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "pscale branch create maplestory-tracker main"
echo ""
read -p "已建立分支？按 Enter 繼續... " -r

echo ""
echo "🔗 步驟 4: 取得連線字串"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "執行以下命令取得本地連線："
echo "pscale connect maplestory-tracker main --port 3309"
echo ""
echo "⚠️ 注意：保持這個命令運行，在新的終端視窗繼續操作"
echo ""

echo "📝 步驟 5: 設定本地環境"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "在 .env.local 中設定："
echo 'DATABASE_URL="mysql://root@127.0.0.1:3309/maplestory-tracker"'
echo ""

echo "🎯 步驟 6: 執行資料庫遷移"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "npx prisma db push"
echo "npx prisma generate"
echo ""

echo "🌐 步驟 7: 取得生產環境連線字串"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "1. 前往 https://app.planetscale.com"
echo "2. 選擇您的資料庫 'maplestory-tracker'"
echo "3. 前往 Connect"
echo "4. 選擇 'Prisma' 格式"
echo "5. 複製連線字串到 Vercel 的 DATABASE_URL 環境變數"
echo ""

echo "✅ 設定完成後，您的應用就可以在 Vercel 上正常運作了！"
