# 楓之谷物價追蹤器 - Google Sheets 同步使用指南

## 📊 **當前同步機制總結**

### 🔍 **分析結果**
目前系統提供 **多種同步方式**，包含手動和自動選項：

## 🎯 **三種同步方式**

### 1. **網頁手動同步** 👆
- **觸發方式**: 點擊網站右上角 "🔄 手動同步" 按鈕
- **適用場景**: 需要立即更新資料時
- **優點**: 即時反應，用戶可控
- **缺點**: 需要手動操作

### 2. **命令列手動同步** 💻
```bash
# 立即執行一次同步
npm run sync:manual
```
- **適用場景**: 伺服器管理、測試、部署後初始化
- **優點**: 適合自動化腳本和運維

### 3. **自動定期同步** ⏰
```bash
# 啟動自動同步服務 (背景運行)
npm run sync:auto
```
- **適用場景**: 生產環境、無人值守運行
- **優點**: 確保資料時效性，無需手動干預
- **預設間隔**: 每小時同步一次

## 🔧 **使用方式詳解**

### 開發環境使用
```bash
# 1. 啟動開發伺服器
npm run dev

# 2. 在另一個終端機啟動自動同步服務
npm run sync:auto
```

### 生產環境部署
```bash
# 1. 構建應用
npm run build

# 2. 啟動生產伺服器
npm start

# 3. 啟動自動同步服務 (背景執行)
nohup npm run sync:auto > sync.log 2>&1 &
```

### Docker 部署 (推薦)
```yaml
# docker-compose.yml
services:
  web:
    # Web 服務配置
    
  sync:
    build: .
    command: npm run sync:auto
    environment:
      - DATABASE_URL=${DATABASE_URL}
      - GOOGLE_SHEETS_API_KEY=${GOOGLE_SHEETS_API_KEY}
    depends_on:
      - web
```

## 📈 **監控與管理**

### 檢查同步狀態
```bash
# 查看同步服務狀態
npm run sync:status

# 輸出範例：
# {
#   "isRunning": false,
#   "lastSyncTime": 1625097600000,
#   "syncInterval": 3600000,
#   "latestLog": {
#     "status": "SUCCESS",
#     "message": "自動同步成功",
#     "itemsCount": 11,
#     "duration": 2510
#   }
# }
```

### 查看同步歷史
```bash
# 使用 Prisma Studio 查看詳細日誌
npm run db:studio
# 然後查看 SyncLog 表
```

## ⚙️ **配置選項**

### 環境變數設定
```env
# .env.local
UPDATE_INTERVAL=3600000    # 同步間隔 (毫秒) - 預設 1 小時
SYNC_API_URL=http://localhost:3001/api/sync  # 同步 API 端點
```

### 自訂同步間隔
```bash
# 每 30 分鐘同步一次
UPDATE_INTERVAL=1800000 npm run sync:auto

# 每 10 分鐘同步一次 (開發環境)
UPDATE_INTERVAL=600000 npm run sync:auto
```

## 🚨 **錯誤處理**

### 自動重試機制
- **重試次數**: 3 次
- **重試延遲**: 5 秒
- **錯誤日誌**: 自動記錄到資料庫

### 常見問題排解

#### 1. Google Sheets API 錯誤
```
❌ 同步失敗: 無法存取 Google Sheets
```
**解決方案**: 檢查 API 金鑰和服務帳戶權限

#### 2. 資料庫連線錯誤
```
❌ 同步失敗: connect ECONNREFUSED
```
**解決方案**: 確認資料庫服務正在運行

#### 3. 網路連線問題
```
❌ 同步失敗: fetch failed
```
**解決方案**: 檢查網路連線和防火牆設定

## 📊 **性能監控**

### 同步效能指標
- **響應時間**: 通常 1-3 秒
- **資料量**: 每次處理 10-20 筆道具
- **API 配額**: 每次同步消耗 1-2 次 Google Sheets API 呼叫

### 高流量優化建議
1. **增加同步間隔** (降低 API 呼叫頻率)
2. **使用快取** (減少資料庫查詢)
3. **分離同步服務** (避免影響 Web 服務)

## 🎯 **最佳實踐**

### 開發環境
- 使用手動同步進行測試
- 設定較短的同步間隔 (10-30 分鐘)

### 測試環境
- 啟用自動同步
- 監控錯誤日誌

### 生產環境
- 必須啟用自動同步
- 設定監控和告警
- 定期檢查同步狀態

## 🔮 **未來改進方向**

1. **Webhook 整合**: Google Sheets 變更時主動推送
2. **增量同步**: 只同步變更的資料
3. **多資料來源**: 支援更多遊戲資料來源
4. **即時通知**: 同步失敗時發送告警

---

現在您的楓之谷物價追蹤器擁有完整的資料同步機制！🎉
