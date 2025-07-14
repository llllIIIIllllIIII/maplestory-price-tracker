#!/bin/bash

# PlanetScale 故障排除腳本

echo "🔧 PlanetScale 故障排除工具"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

echo "❌ 常見錯誤：Cluster size is required"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "解決方案："
echo ""
echo "1️⃣ 使用新的命令格式 (推薦):"
echo "   pscale database create maplestory-tracker --cluster-size PS-10"
echo ""
echo "2️⃣ 如果方案 1 失敗，嘗試其他叢集大小:"
echo "   pscale database create maplestory-tracker --cluster-size PS-20"
echo ""
echo "3️⃣ 檢查可用的叢集大小:"
echo "   pscale database create --help"
echo ""
echo "4️⃣ 網頁介面建立 (最可靠):"
echo "   前往 https://app.planetscale.com"
echo "   點擊 'Create database'"
echo "   輸入名稱: maplestory-tracker"
echo "   選擇免費方案"
echo ""

echo "🔍 檢查當前狀態"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# 檢查登入狀態
echo "👤 檢查登入狀態..."
if pscale auth show 2>/dev/null; then
    echo "✅ 已登入 PlanetScale"
else
    echo "❌ 未登入，請執行: pscale auth login"
    echo ""
    read -p "按 Enter 執行登入... " -r
    pscale auth login
fi

echo ""

# 檢查現有資料庫
echo "📁 檢查現有資料庫..."
if pscale database list 2>/dev/null | grep -q "maplestory-tracker"; then
    echo "✅ 找到資料庫: maplestory-tracker"
    echo ""
    echo "🌿 分支列表:"
    pscale branch list maplestory-tracker 2>/dev/null
else
    echo "❌ 未找到資料庫 maplestory-tracker"
    echo ""
    echo "🆕 建議的建立命令:"
    echo "pscale database create maplestory-tracker --cluster-size PS-10"
fi

echo ""
echo "🔗 替代方案：Neon (PostgreSQL)"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "如果 PlanetScale 持續有問題，建議使用 Neon:"
echo ""
echo "1. 前往 https://neon.tech"
echo "2. 建立帳號"
echo "3. 建立新專案: maplestory-tracker"
echo "4. 複製 Connection String"
echo "5. 在 Vercel 設定 DATABASE_URL"
echo ""
echo "Neon 的優點:"
echo "✅ 設定更簡單"
echo "✅ 支援 PostgreSQL"
echo "✅ 有免費方案"
echo "✅ 無需複雜的 CLI 設定"

echo ""
echo "🛠️ 手動設定指南"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "如果自動化腳本失敗，請按照以下步驟手動設定:"
echo ""
echo "PlanetScale 網頁設定:"
echo "1. https://app.planetscale.com → Create database"
echo "2. 名稱: maplestory-tracker"
echo "3. 區域: 選擇最接近的"
echo "4. 方案: Hobby (免費)"
echo "5. Connect → 選擇 Prisma"
echo "6. 複製連線字串到 Vercel"
echo ""

read -p "按 Enter 開啟 PlanetScale 儀表板... " -r
if command -v open &> /dev/null; then
    open "https://app.planetscale.com"
elif command -v xdg-open &> /dev/null; then
    xdg-open "https://app.planetscale.com"
else
    echo "請手動開啟: https://app.planetscale.com"
fi
