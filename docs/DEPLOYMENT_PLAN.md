# 楓之谷物價追蹤器 - 高流量部署改進方案

## 🎯 第一階段：立即可行的改進 (1-2 週)

### 1. 資料庫升級到 PostgreSQL

#### 步驟 1: 安裝依賴
```bash
npm install pg @types/pg
```

#### 步驟 2: 更新 Prisma Schema
```prisma
// prisma/schema.prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// 新增索引優化
model Item {
  // ...existing fields...
  
  @@index([efficiency])
  @@index([lastUpdated])
  @@index([category])
  @@index([name])
}
```

#### 步驟 3: 環境設定
```env
# .env.local
DATABASE_URL="postgresql://user:password@localhost:5432/maplestory_tracker"
```

### 2. 實施 Redis 快取

#### 安裝 Redis
```bash
npm install redis @types/redis
```

#### 快取中間件
```typescript
// src/lib/cache.ts
import { Redis } from 'redis'

const redis = new Redis({
  host: process.env.REDIS_HOST || 'localhost',
  port: parseInt(process.env.REDIS_PORT || '6379'),
})

export async function getCachedData<T>(key: string): Promise<T | null> {
  try {
    const data = await redis.get(key)
    return data ? JSON.parse(data) : null
  } catch (error) {
    console.error('Redis get error:', error)
    return null
  }
}

export async function setCachedData<T>(
  key: string, 
  data: T, 
  ttl: number = 300 // 5分鐘預設
): Promise<void> {
  try {
    await redis.setex(key, ttl, JSON.stringify(data))
  } catch (error) {
    console.error('Redis set error:', error)
  }
}
```

### 3. API 快取優化

#### 更新 API 路由
```typescript
// src/app/api/items/route.ts
import { getCachedData, setCachedData } from '@/lib/cache'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const cacheKey = `items:${searchParams.toString()}`
  
  // 嘗試從快取獲取
  const cachedData = await getCachedData(cacheKey)
  if (cachedData) {
    return NextResponse.json(cachedData, {
      headers: {
        'Cache-Control': 'public, max-age=60, stale-while-revalidate=300',
      },
    })
  }
  
  // 原有邏輯...
  const result = await fetchItemsFromDatabase()
  
  // 儲存到快取
  await setCachedData(cacheKey, result, 300) // 5分鐘快取
  
  return NextResponse.json(result, {
    headers: {
      'Cache-Control': 'public, max-age=60, stale-while-revalidate=300',
    },
  })
}
```

### 4. 連線池優化

#### Prisma 連線池設定
```typescript
// src/lib/database.ts
import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    datasources: {
      db: {
        url: process.env.DATABASE_URL,
      },
    },
    log: ['query', 'error', 'warn'],
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
```

### 5. 背景任務分離

#### 創建獨立的同步服務
```typescript
// src/app/api/sync/route.ts
import { NextResponse } from 'next/server'

export async function POST() {
  // 觸發背景任務，不等待完成
  triggerBackgroundSync()
  
  return NextResponse.json({ 
    success: true, 
    message: '同步任務已啟動' 
  })
}

async function triggerBackgroundSync() {
  // 使用 setTimeout 或訊息佇列
  setTimeout(async () => {
    try {
      await performDataSync()
    } catch (error) {
      console.error('背景同步失敗:', error)
    }
  }, 100)
}
```

## 🎯 第二階段：中期優化 (3-4 週)

### 1. 微服務分離

#### 目錄結構
```
/services
  /api-service          # API 服務
  /sync-service         # 資料同步服務
  /web-service          # 前端服務
/shared
  /types               # 共用類型
  /utils               # 共用工具
```

### 2. 容器化部署

#### Dockerfile
```dockerfile
# Dockerfile
FROM node:18-alpine

WORKDIR /app

# 複製依賴文件
COPY package*.json ./
RUN npm ci --only=production

# 複製源代碼
COPY . .

# 構建應用
RUN npm run build

# 暴露端口
EXPOSE 3000

# 啟動命令
CMD ["npm", "start"]
```

#### Docker Compose
```yaml
# docker-compose.yml
version: '3.8'
services:
  web:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgresql://user:password@db:5432/maplestory
      - REDIS_HOST=redis
    depends_on:
      - db
      - redis
  
  db:
    image: postgres:15
    environment:
      - POSTGRES_DB=maplestory
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=password
    volumes:
      - postgres_data:/var/lib/postgresql/data
  
  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"

volumes:
  postgres_data:
```

### 3. 監控系統

#### 效能監控
```typescript
// src/lib/monitoring.ts
export function trackAPIPerformance(endpoint: string, duration: number) {
  console.log(`API ${endpoint} took ${duration}ms`)
  // 發送到監控系統 (如 New Relic, DataDog)
}

export function trackError(error: Error, context: any) {
  console.error('Application error:', error, context)
  // 發送到錯誤追蹤系統 (如 Sentry)
}
```

## 🎯 第三階段：大規模部署 (1-2 個月)

### 1. Kubernetes 部署

#### 部署配置
```yaml
# k8s/deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: maplestory-tracker
spec:
  replicas: 3
  selector:
    matchLabels:
      app: maplestory-tracker
  template:
    metadata:
      labels:
        app: maplestory-tracker
    spec:
      containers:
      - name: web
        image: maplestory-tracker:latest
        ports:
        - containerPort: 3000
        env:
        - name: DATABASE_URL
          valueFrom:
            secretKeyRef:
              name: db-secret
              key: url
```

### 2. 自動擴展

#### HPA 配置
```yaml
# k8s/hpa.yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: maplestory-tracker-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: maplestory-tracker
  minReplicas: 2
  maxReplicas: 10
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 70
```

## 📊 效能基準測試

### 負載測試腳本
```javascript
// scripts/load-test.js
import http from 'k6/http';
import { check } from 'k6';

export const options = {
  stages: [
    { duration: '30s', target: 100 },
    { duration: '1m', target: 500 },
    { duration: '30s', target: 1000 },
    { duration: '2m', target: 1000 },
    { duration: '30s', target: 0 },
  ],
};

export default function() {
  const response = http.get('http://localhost:3000/api/items');
  check(response, {
    'status is 200': (r) => r.status === 200,
    'response time < 500ms': (r) => r.timings.duration < 500,
  });
}
```

## 💰 成本估算

### 小規模部署 (< 1000 用戶/日)
- **Vercel Pro**: $20/月
- **Supabase**: $25/月
- **總計**: ~$45/月

### 中等規模部署 (< 10000 用戶/日)
- **AWS ECS**: $50/月
- **AWS RDS**: $30/月
- **AWS ElastiCache**: $25/月
- **CloudFront**: $10/月
- **總計**: ~$115/月

### 大規模部署 (> 10000 用戶/日)
- **Kubernetes 託管**: $150/月
- **資料庫叢集**: $100/月
- **快取叢集**: $50/月
- **監控系統**: $50/月
- **總計**: ~$350/月

## 🔄 遷移計劃

### 階段 1 (第 1-2 週)
1. ✅ 資料庫遷移到 PostgreSQL
2. ✅ 實施基本快取
3. ✅ API 效能優化

### 階段 2 (第 3-4 週)
1. ✅ 容器化部署
2. ✅ 監控系統建置
3. ✅ 負載測試

### 階段 3 (第 5-8 週)
1. ✅ 微服務分離
2. ✅ 自動擴展
3. ✅ 全球部署

每個階段都包含回滾計劃和效能基準測試。
