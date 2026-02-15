import type { Request, Response, NextFunction } from 'express'
import { ApiError } from '../utils/errors.js'

interface RateLimitEntry {
  requests: number[]
}

class RateLimiter {
  private requests = new Map<string, RateLimitEntry>()
  private readonly maxRequests: number
  private readonly windowMs: number

  constructor(maxRequests = 100, windowMs = 60000) {
    this.maxRequests = maxRequests
    this.windowMs = windowMs
  }

  async checkLimit(identifier: string): Promise<boolean> {
    const now = Date.now()
    const entry = this.requests.get(identifier)

    if (!entry) {
      this.requests.set(identifier, { requests: [now] })
      return true
    }

    const recentRequests = entry.requests.filter(time => now - time < this.windowMs)

    if (recentRequests.length >= this.maxRequests) {
      return false
    }

    recentRequests.push(now)
    this.requests.set(identifier, { requests: recentRequests })

    return true
  }
}

const limiter = new RateLimiter(100, 60000)

export function rateLimit(req: Request, _res: Response, next: NextFunction): void {
  const identifier = req.ip || req.socket.remoteAddress || 'unknown'

  limiter.checkLimit(identifier).then(allowed => {
    if (!allowed) {
      next(new ApiError(429, 'Rate limit exceeded. Please try again later.'))
    } else {
      next()
    }
  }).catch(next)
}
