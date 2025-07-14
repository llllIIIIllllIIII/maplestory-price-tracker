# Git 自動部署設定指南

## 📋 設定步驟

### 1. 連接 GitHub（如果尚未連接）

如果你還沒有將專案推送到 GitHub：

```bash
# 初始化 Git（如果尚未初始化）
git init

# 添加所有檔案
git add .

# 第一次提交
git commit -m "Initial commit - MapleStory Price Tracker"

# 在 GitHub 上創建新的 repository
# 然後添加遠端源
git remote add origin https://github.com/你的用戶名/maplestory-price-tracker.git

# 推送到 GitHub
git push -u origin main
```

### 2. 在 Vercel 連接 GitHub Repository

1. 登入 [Vercel Dashboard](https://vercel.com/dashboard)
2. 找到你的專案 `maple-story-price-tracker`
3. 點擊 Settings → Git
4. 連接你的 GitHub repository

### 3. 自動部署設定完成！

設定完成後，每次你推送程式碼到 GitHub，Vercel 就會自動部署：

```bash
# 修改程式碼後
git add .
git commit -m "修改描述"
git push

# Vercel 會自動偵測並部署！
```

## 🔧 日常工作流程

### 快速部署命令
```bash
# 使用我們的部署腳本
./scripts/deploy.sh

# 或手動部署
vercel --prod
```

### Git + 自動部署工作流程
```bash
# 1. 修改程式碼
# 2. 測試本地運行
npm run dev

# 3. 提交變更
git add .
git commit -m "添加新功能: XX"
git push

# 4. Vercel 自動部署！
```

## ⚡ 不同部署方式比較

| 方式 | 優點 | 缺點 | 適用情況 |
|------|------|------|----------|
| Vercel CLI | 快速、直接 | 需要手動執行 | 小修改、測試 |
| Git 自動部署 | 自動化、有版本控制 | 需要設定 GitHub | 長期開發 |

## 🎯 建議工作流程

1. **開發階段**: 使用 `npm run dev` 本地測試
2. **小修改**: 使用 `./scripts/deploy.sh` 快速部署
3. **重要更新**: 使用 Git 推送觸發自動部署
4. **回滾**: 在 Vercel Dashboard 中選擇之前的部署版本

## 📝 注意事項

- 修改環境變數需要在 Vercel Dashboard 中更新
- 資料庫結構變更需要運行 `prisma db push`
- 大型變更建議先在本地充分測試
