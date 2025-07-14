/**
 * 速率限制服務
 * 防止 API 濫用，保護伺服器資源
 */

interface RateLimit {
  count: number
  lastReset: number
}

class RateLimitService {
  private limits: Map<string, RateLimit> = new Map()
  private readonly maxRequests: number
  private readonly windowMs: number
  
  constructor(maxRequests = 100, windowMs = 60000) { // 預設每分鐘100次
    this.maxRequests = maxRequests
    this.windowMs = windowMs
  }
  
  /**
   * 檢查是否超過速率限制
   */
  isLimited(identifier: string): boolean {
    const now = Date.now()
    const limit = this.limits.get(identifier)
    
    if (!limit || now - limit.lastReset > this.windowMs) {
      // 重置或建立新的限制記錄
      this.limits.set(identifier, {
        count: 1,
        lastReset: now
      })
      return false
    }
    
    if (limit.count >= this.maxRequests) {
      return true
    }
    
    limit.count++
    return false
  }
  
  /**
   * 獲取剩餘請求次數
   */
  getRemainingRequests(identifier: string): number {
    const limit = this.limits.get(identifier)
    if (!limit) return this.maxRequests
    
    const now = Date.now()
    if (now - limit.lastReset > this.windowMs) {
      return this.maxRequests
    }
    
    return Math.max(0, this.maxRequests - limit.count)
  }
  
  /**
   * 獲取限制重置時間
   */
  getResetTime(identifier: string): number {
    const limit = this.limits.get(identifier)
    if (!limit) return Date.now() + this.windowMs
    
    return limit.lastReset + this.windowMs
  }
  
  /**
   * 清理過期的限制記錄
   */
  cleanup(): void {
    const now = Date.now()
    const keysToDelete: string[] = []
    
    this.limits.forEach((limit, key) => {
      if (now - limit.lastReset > this.windowMs) {
        keysToDelete.push(key)
      }
    })
    
    keysToDelete.forEach(key => {
      this.limits.delete(key)
    })
  }
}

// 全域實例
export const rateLimitService = new RateLimitService(
  parseInt(process.env.MAX_REQUEST_PER_MINUTE || '100'),
  60000 // 1分鐘
)

// 定期清理過期記錄
setInterval(() => {
  rateLimitService.cleanup()
}, 60000) // 每分鐘清理一次

/**
 * 中間件函數：檢查速率限制
 */
export function checkRateLimit(request: Request): Response | null {
  // 獲取客戶端 IP
  const forwarded = request.headers.get('x-forwarded-for')
  const ip = forwarded ? forwarded.split(',')[0] : 'unknown'
  
  if (rateLimitService.isLimited(ip)) {
    const resetTime = rateLimitService.getResetTime(ip)
    const retryAfter = Math.ceil((resetTime - Date.now()) / 1000)
    
    return new Response(
      JSON.stringify({
        error: 'Too Many Requests',
        message: '請求過於頻繁，請稍後再試',
        retryAfter: retryAfter
      }),
      {
        status: 429,
        headers: {
          'Content-Type': 'application/json',
          'Retry-After': retryAfter.toString(),
          'X-RateLimit-Limit': rateLimitService['maxRequests'].toString(),
          'X-RateLimit-Remaining': '0',
          'X-RateLimit-Reset': resetTime.toString()
        }
      }
    )
  }
  
  // 添加速率限制標頭
  const remaining = rateLimitService.getRemainingRequests(ip)
  const resetTime = rateLimitService.getResetTime(ip)
  
  return new Response(null, {
    headers: {
      'X-RateLimit-Limit': rateLimitService['maxRequests'].toString(),
      'X-RateLimit-Remaining': remaining.toString(),
      'X-RateLimit-Reset': resetTime.toString()
    }
  })
}
