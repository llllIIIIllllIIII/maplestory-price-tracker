# 腳本目錄

本目錄包含各種資料處理和測試腳本：

## 核心腳本
- `sync-sheets-data.js` - 主要的 Google Sheets 同步腳本

## 資料處理腳本 (data/)
- `add-artale-data.js` - 添加 Artale 伺服器資料
- `add-sample-data.js` - 添加測試資料

## 測試腳本 (tests/)
- `test-arbitrage-analysis.js` - 套利分析測試
- `test-external-sheets.js` - 外部 Google Sheets 測試
- `test-google-sheets.js` - Google Sheets API 測試
- `test-public-sheets.js` - 公開 Google Sheets 測試
- `test-real-sheets-api.js` - 真實 Google Sheets API 測試
- `test-unit-efficiency.js` - 單位效率測試

## 使用方式

### 同步資料
```bash
node scripts/sync-sheets-data.js
```

### 添加測試資料
```bash
node scripts/data/add-sample-data.js
```

### 執行測試
```bash
node scripts/tests/test-google-sheets.js
```
