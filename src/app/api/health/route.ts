import { NextResponse } from 'next/server'
import { prisma } from '@/lib/database'
import { cacheService } from '@/lib/cache'

export async function GET() {
  try {
    const startTime = Date.now()
    
    // 檢查資料庫連線
    const dbCheck = await prisma.item.count()
    const dbLatency = Date.now() - startTime
    
    // 檢查最後同步時間
    const lastSync = await prisma.syncLog.findFirst({
      where: { status: 'SUCCESS' },
      orderBy: { createdAt: 'desc' }
    })
    
    // 檢查快取狀態
    const cacheStats = cacheService.getStats()
    
    // 計算同步延遲
    const timeSinceLastSync = lastSync 
      ? Date.now() - new Date(lastSync.createdAt).getTime()
      : null
    
    const status = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      database: {
        connected: true,
        latency: `${dbLatency}ms`,
        itemCount: dbCheck
      },
      cache: {
        size: cacheStats.size,
        keys: cacheStats.keys
      },
      lastSync: {
        time: lastSync?.createdAt || null,
        status: lastSync?.status || 'UNKNOWN',
        timeSinceSync: timeSinceLastSync ? `${Math.floor(timeSinceLastSync / 1000)}s` : null,
        isStale: timeSinceLastSync ? timeSinceLastSync > 2 * 60 * 60 * 1000 : false // 2小時
      },
      performance: {
        uptime: process.uptime(),
        memoryUsage: process.memoryUsage(),
        nodeVersion: process.version
      }
    }
    
    return NextResponse.json(status)
    
  } catch (error) {
    return NextResponse.json(
      {
        status: 'unhealthy',
        timestamp: new Date().toISOString(),
        error: error instanceof Error ? error.message : '未知錯誤'
      },
      { status: 500 }
    )
  }
}
