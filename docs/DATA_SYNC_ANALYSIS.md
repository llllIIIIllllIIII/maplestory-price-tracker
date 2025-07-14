# 楓之谷物價追蹤器 - Google Sheets 資料抓取機制分析

## 📊 **當前資料抓取機制**

### 🔍 **分析結果**：
目前系統採用 **純手動觸發** 的資料抓取方式

### 📋 **詳細機制說明**：

#### 1. **手動同步按鈕**
- 位置：網站右上角 "🔄 手動同步" 按鈕
- 觸發方式：用戶手動點擊
- API 端點：`POST /api/sync`
- 功能：立即從 Google Sheets 抓取資料並更新資料庫

#### 2. **Google Sheets API 呼叫流程**
```
用戶點擊按鈕 → 呼叫 /api/sync → 連接 Google Sheets → 抓取資料 → 更新資料庫 → 返回結果
```

#### 3. **沒有自動排程**
- ❌ 沒有定期自動抓取
- ❌ 沒有 cron job 排程
- ❌ 沒有背景定時任務
- ❌ 不會在用戶訪問時自動更新

### 🚨 **潛在問題**：

1. **資料時效性**
   - 資料只有在手動同步時才會更新
   - 如果忘記同步，資料可能會過時

2. **用戶體驗**
   - 需要用戶主動觸發更新
   - 首次訪問的用戶可能看到舊資料

3. **Google Sheets API 限制**
   - 每次同步都會消耗 API 配額
   - 頻繁手動同步可能觸發速率限制

## 🔧 **改進建議**

### 方案 1：定期自動同步（推薦）
```javascript
// 新增定期同步功能
const cron = require('node-cron')

// 每小時同步一次 (配合 UPDATE_INTERVAL 環境變數)
cron.schedule('0 * * * *', async () => {
  console.log('開始定期同步資料...')
  await syncFromGoogleSheets()
})
```

### 方案 2：智能同步
```javascript
// 結合手動和自動同步
const lastSyncTime = await getLastSyncTime()
const shouldSync = (Date.now() - lastSyncTime) > UPDATE_INTERVAL

if (shouldSync) {
  await syncFromGoogleSheets()
}
```

### 方案 3：背景任務隊列
```javascript
// 使用 Redis 或其他隊列系統
const Queue = require('bull')
const syncQueue = new Queue('sync data')

syncQueue.process(async (job) => {
  await syncFromGoogleSheets()
})

// 定期加入任務到隊列
syncQueue.add('sync', {}, { repeat: { cron: '0 * * * *' } })
```

## 🎯 **建議實施方案**

### 立即改進（簡單）
```javascript
// 在 src/app/layout.tsx 或獨立的 background service 中
// 添加簡單的定期同步
useEffect(() => {
  const interval = setInterval(async () => {
    await fetch('/api/sync', { method: 'POST' })
  }, parseInt(process.env.UPDATE_INTERVAL || '3600000')) // 1小時
  
  return () => clearInterval(interval)
}, [])
```

### 進階改進（高流量）
1. **分離背景服務**
   - 獨立的同步服務
   - 不影響主要 Web 服務

2. **錯誤處理與重試**
   - 同步失敗時自動重試
   - 錯誤通知機制

3. **監控與日誌**
   - 同步狀態監控
   - 資料更新時間追蹤

## 📈 **對高流量的影響**

### 當前機制的限制
- **API 浪費**：每次手動同步都消耗配額
- **資料不一致**：用戶可能看到不同時間的資料
- **服務器負載**：頻繁的手動同步可能造成負載

### 改進後的優勢
- **定期更新**：確保資料時效性
- **節省 API 配額**：控制同步頻率
- **提升用戶體驗**：始終看到最新資料
- **減少服務器負載**：可預測的更新時間

## 🔥 **立即可行的解決方案**

1. **保留手動同步按鈕**（緊急更新用）
2. **新增定期自動同步**（每小時一次）
3. **顯示上次更新時間**（用戶透明度）
4. **同步狀態指示器**（讓用戶知道何時在同步）

這樣既保持了靈活性，又確保了資料的時效性！
