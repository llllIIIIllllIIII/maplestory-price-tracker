# 楓之谷物價追蹤器 - 資料庫遷移指南

## 🚀 步驟 1：PostgreSQL 遷移

### 1.1 安裝依賴
```bash
npm install pg @types/pg
npm install @vercel/postgres  # 如果使用 Vercel
```

### 1.2 更新 Prisma Schema
```prisma
// prisma/schema.prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Item {
  id          Int      @id @default(autoincrement())
  name        String   @unique
  wcPrice     Int
  mesosValue  Int
  efficiency  Float
  category    String?
  description String?
  lastUpdated DateTime @default(now()) @updatedAt
  createdAt   DateTime @default(now())

  // 新增索引以提升查詢效能
  @@index([efficiency])
  @@index([lastUpdated])
  @@index([category])
  @@index([name])
  @@map("items")
}
```

### 1.3 環境變數設定
```env
# .env.local
DATABASE_URL="postgresql://username:password@localhost:5432/maplestory_tracker"
```

### 1.4 資料遷移步驟
```bash
# 1. 備份現有 SQLite 資料
cp dev.db backup.db

# 2. 匯出資料為 SQL
sqlite3 dev.db .dump > backup.sql

# 3. 重新生成 Prisma 客戶端
npx prisma generate

# 4. 建立新的 PostgreSQL 資料庫
npx prisma db push

# 5. 重新同步資料
npm run sync
```

## 🚀 步驟 2：實施快取系統

### 2.1 Redis 快取實施
```bash
npm install redis @types/redis
```

### 2.2 快取服務
```typescript
// src/lib/cache.ts
import { Redis } from 'redis'

class CacheService {
  private client: Redis
  
  constructor() {
    this.client = new Redis({
      host: process.env.REDIS_HOST || 'localhost',
      port: parseInt(process.env.REDIS_PORT || '6379'),
      password: process.env.REDIS_PASSWORD,
    })
  }

  async get<T>(key: string): Promise<T | null> {
    try {
      const data = await this.client.get(key)
      return data ? JSON.parse(data) : null
    } catch (error) {
      console.error('快取讀取失敗:', error)
      return null
    }
  }

  async set<T>(key: string, value: T, ttl: number = 300): Promise<boolean> {
    try {
      await this.client.setex(key, ttl, JSON.stringify(value))
      return true
    } catch (error) {
      console.error('快取寫入失敗:', error)
      return false
    }
  }

  async del(key: string): Promise<boolean> {
    try {
      await this.client.del(key)
      return true
    } catch (error) {
      console.error('快取刪除失敗:', error)
      return false
    }
  }
}

export const cacheService = new CacheService()
```

### 2.3 API 快取中間件
```typescript
// src/lib/api-cache.ts
import { NextRequest, NextResponse } from 'next/server'
import { cacheService } from './cache'

export function withCache(handler: Function, ttl: number = 300) {
  return async (request: NextRequest) => {
    const cacheKey = `api:${request.url}`
    
    // 嘗試從快取獲取
    const cached = await cacheService.get(cacheKey)
    if (cached) {
      return NextResponse.json(cached, {
        headers: {
          'Cache-Control': `public, max-age=${ttl}, stale-while-revalidate=${ttl * 2}`,
          'X-Cache': 'HIT'
        }
      })
    }
    
    // 執行原始處理器
    const response = await handler(request)
    const data = await response.json()
    
    // 儲存到快取
    await cacheService.set(cacheKey, data, ttl)
    
    return NextResponse.json(data, {
      headers: {
        'Cache-Control': `public, max-age=${ttl}, stale-while-revalidate=${ttl * 2}`,
        'X-Cache': 'MISS'
      }
    })
  }
}
```

## 🚀 步驟 3：背景任務優化

### 3.1 非同步資料同步
```typescript
// src/lib/background-sync.ts
import { cacheService } from './cache'

export class BackgroundSyncService {
  private isRunning = false
  
  async triggerSync(): Promise<{ success: boolean; message: string }> {
    if (this.isRunning) {
      return { success: false, message: '同步正在進行中' }
    }
    
    // 不等待完成，立即返回
    this.performSync()
    
    return { success: true, message: '同步已啟動' }
  }
  
  private async performSync() {
    this.isRunning = true
    
    try {
      // 執行資料同步
      const result = await this.syncFromGoogleSheets()
      
      // 清除相關快取
      await this.clearRelatedCache()
      
      console.log('背景同步完成:', result)
    } catch (error) {
      console.error('背景同步失敗:', error)
    } finally {
      this.isRunning = false
    }
  }
  
  private async clearRelatedCache() {
    // 清除 API 快取
    await cacheService.del('api:/api/items')
    await cacheService.del('api:/api/stats')
  }
  
  private async syncFromGoogleSheets() {
    // 這裡放入您現有的同步邏輯
    const { syncSheetsData } = require('../../../scripts/sync-sheets-data')
    return await syncSheetsData()
  }
}

export const backgroundSyncService = new BackgroundSyncService()
```

## 🚀 步驟 4：API 優化

### 4.1 更新 API 路由
```typescript
// src/app/api/items/route.ts
import { withCache } from '@/lib/api-cache'
import { NextRequest, NextResponse } from 'next/server'

async function getItemsHandler(request: NextRequest) {
  // 原有的邏輯...
  const result = await fetchItemsFromDatabase()
  
  return NextResponse.json({
    success: true,
    data: result,
    timestamp: new Date().toISOString()
  })
}

// 使用快取包裝
export const GET = withCache(getItemsHandler, 300) // 5分鐘快取
```

### 4.2 更新同步 API
```typescript
// src/app/api/sync/route.ts
import { backgroundSyncService } from '@/lib/background-sync'

export async function POST() {
  const result = await backgroundSyncService.triggerSync()
  
  return NextResponse.json(result)
}
```

## 📊 效能測試

### 測試腳本
```javascript
// scripts/performance-test.js
const { performance } = require('perf_hooks')

async function testAPI() {
  const start = performance.now()
  
  const response = await fetch('http://localhost:3000/api/items')
  const data = await response.json()
  
  const end = performance.now()
  
  console.log(`API 響應時間: ${end - start}ms`)
  console.log(`資料筆數: ${data.data.items.length}`)
  console.log(`快取狀態: ${response.headers.get('X-Cache')}`)
}

// 連續測試
async function runTests() {
  console.log('開始效能測試...')
  
  for (let i = 0; i < 10; i++) {
    await testAPI()
    await new Promise(resolve => setTimeout(resolve, 1000))
  }
}

runTests()
```

## 🔧 部署建議

### 小規模部署 (推薦)
1. **前端**: Vercel
2. **資料庫**: Supabase PostgreSQL
3. **快取**: Upstash Redis
4. **監控**: Vercel Analytics

### 中規模部署
1. **應用**: AWS ECS 或 Google Cloud Run
2. **資料庫**: AWS RDS 或 Google Cloud SQL
3. **快取**: AWS ElastiCache 或 Google Memorystore
4. **CDN**: CloudFront 或 Cloudflare

### 成本估算
- **小規模**: $30-50/月
- **中規模**: $100-200/月
- **大規模**: $300-500/月

這些改進應該能讓您的網站處理 1000-5000 同時用戶的流量！
