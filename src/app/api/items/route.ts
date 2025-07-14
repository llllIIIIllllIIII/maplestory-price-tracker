import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/database'
import { ItemFilters } from '@/types'
import { calculateSnowflakeValue } from '@/lib/calculator'
import { cacheService, CACHE_KEYS } from '@/lib/cache'

/**
 * 獲取飄雪結晶的最新價格
 * 優先級：1. 最新的飄雪結晶價格 -> 2. 資料庫中最後一次的飄雪結晶價格 -> 3. 預設值
 */
async function getSnowflakePrice(): Promise<number> {
  // 嘗試從快取獲取
  const cached = cacheService.get('snowflake_price')
  if (cached) {
    return cached
  }

  // 先嘗試獲取當前的飄雪結晶價格（按最後更新時間排序）
  const currentSnowflake = await prisma.item.findFirst({
    where: {
      name: {
        contains: '飄雪結晶'
      }
    },
    orderBy: {
      lastUpdated: 'desc'
    }
  })

  let price = 380000 // 預設值

  if (currentSnowflake?.mesosValue) {
    price = currentSnowflake.mesosValue
  } else {
    // 如果找不到當前的，則查找歷史記錄中最後一次的飄雪結晶價格
    const lastKnownSnowflake = await prisma.item.findFirst({
      where: {
        name: {
          contains: '飄雪結晶'
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    if (lastKnownSnowflake?.mesosValue) {
      price = lastKnownSnowflake.mesosValue
    }
  }

  // 快取結果
  cacheService.set('snowflake_price', price)
  return price
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    
    // 生成快取鍵（基於查詢參數）
    const cacheKey = `${CACHE_KEYS.ITEMS}_${Array.from(searchParams.entries()).sort().toString()}`
    
    // 檢查快取
    const cachedResult = cacheService.get(cacheKey)
    if (cachedResult) {
      return NextResponse.json({
        success: true,
        data: cachedResult,
        cached: true,
        cacheTime: new Date().toISOString()
      })
    }
    
    // 解析查詢參數
    const filters: ItemFilters = {
      search: searchParams.get('search') || undefined,
      category: searchParams.get('category') || undefined,
      minEfficiency: searchParams.get('minEfficiency') ? 
        Number(searchParams.get('minEfficiency')) : undefined,
      maxEfficiency: searchParams.get('maxEfficiency') ? 
        Number(searchParams.get('maxEfficiency')) : undefined,
      sortBy: (searchParams.get('sortBy') as ItemFilters['sortBy']) || 'efficiency',
      sortOrder: (searchParams.get('sortOrder') as ItemFilters['sortOrder']) || 'desc',
      limit: searchParams.get('limit') ? Number(searchParams.get('limit')) : 50,
      offset: searchParams.get('offset') ? Number(searchParams.get('offset')) : 0,
    }

    // 建立查詢條件
    const where: any = {}
    
    if (filters.search) {
      where.name = {
        contains: filters.search
      }
    }
    
    if (filters.category) {
      where.category = filters.category
    }
    
    if (filters.minEfficiency !== undefined || filters.maxEfficiency !== undefined) {
      where.efficiency = {}
      if (filters.minEfficiency !== undefined) {
        where.efficiency.gte = filters.minEfficiency
      }
      if (filters.maxEfficiency !== undefined) {
        where.efficiency.lte = filters.maxEfficiency
      }
    }

    // 建立排序條件
    const orderBy: any = {}
    if (filters.sortBy) {
      orderBy[filters.sortBy] = filters.sortOrder || 'desc'
    }

    // 查詢資料
    const [items, totalCount] = await Promise.all([
      prisma.item.findMany({
        where,
        orderBy,
        skip: filters.offset,
        take: filters.limit,
      }),
      prisma.item.count({ where })
    ])

    // 獲取飄雪結晶的最新價格（動態預設值）
    const snowflakePrice = await getSnowflakePrice()

    // 為每個道具加上雪價值計算
    const itemsWithSnowflakeValue = items.map((item: any) => ({
      ...item,
      snowflakeValue: calculateSnowflakeValue(item.mesosValue, snowflakePrice)
    }))

    const result = {
      items: itemsWithSnowflakeValue,
      pagination: {
        total: totalCount,
        limit: filters.limit,
        offset: filters.offset,
        hasMore: (filters.offset || 0) + (filters.limit || 0) < totalCount
      }
    }

    // 快取結果（只快取前50筆的基本查詢）
    if (!filters.search && !filters.category && (filters.limit || 50) <= 50) {
      cacheService.set(cacheKey, result)
    }

    return NextResponse.json({
      success: true,
      data: result
    })

  } catch (error) {
    console.error('獲取道具列表失敗:', error)
    return NextResponse.json(
      {
        success: false,
        error: '獲取道具列表失敗',
        message: error instanceof Error ? error.message : '未知錯誤'
      },
      { status: 500 }
    )
  }
}
