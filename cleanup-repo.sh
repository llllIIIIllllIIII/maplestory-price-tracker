#!/bin/bash

echo "🧹 清理 GitHub Repository 中的開發檔案"
echo "========================================"
echo ""

echo "📋 將要從 GitHub 移除的檔案類型："
echo "- docs/ 資料夾中的所有文件"
echo "- scripts/ 資料夾中的所有腳本"
echo "- .env.example 檔案"
echo "- DEPLOYMENT_SUCCESS.md"
echo "- DEPLOY_TEST.md"
echo "- github-commands.sh"
echo ""

read -p "確定要執行清理嗎？(y/N): " confirm
if [[ $confirm != [yY] ]]; then
    echo "❌ 取消清理操作"
    exit 1
fi

echo "🔄 正在清理..."

# 從 Git 追蹤中移除檔案（但保留本地檔案）
echo "📂 移除 docs/ 資料夾..."
git rm -r --cached docs/ 2>/dev/null || echo "docs/ 已移除或不存在"

echo "📂 移除 scripts/ 資料夾..."
git rm -r --cached scripts/ 2>/dev/null || echo "scripts/ 已移除或不存在"

echo "📄 移除範例檔案..."
git rm --cached .env.example 2>/dev/null || echo ".env.example 已移除"
git rm --cached .env.production.example 2>/dev/null || echo ".env.production.example 已移除"
git rm --cached .env.vercel.example 2>/dev/null || echo ".env.vercel.example 已移除"

echo "📄 移除測試/部署檔案..."
git rm --cached DEPLOYMENT_SUCCESS.md 2>/dev/null || echo "DEPLOYMENT_SUCCESS.md 已移除"
git rm --cached DEPLOY_TEST.md 2>/dev/null || echo "DEPLOY_TEST.md 已移除"
git rm --cached github-commands.sh 2>/dev/null || echo "github-commands.sh 已移除"

echo "📄 移除其他文件檔案..."
git rm --cached config/README.md 2>/dev/null || echo "config/README.md 已移除"

echo ""
echo "✅ 清理完成！"
echo ""

echo "📋 下一步："
echo "1. 檢查變更：git status"
echo "2. 提交變更：git commit -m '🧹 清理開發檔案，僅保留生產必要檔案'"
echo "3. 推送到 GitHub：git push"
echo ""

echo "💡 注意："
echo "- 檔案在本地仍然存在，只是不會再推送到 GitHub"
echo "- .gitignore 和 .vercelignore 已更新"
echo "- 這些檔案也不會部署到 Vercel"
