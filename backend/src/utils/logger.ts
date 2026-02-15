import type { Request, Response, NextFunction } from 'express'

export interface LogContext {
  requestId?: string
  userId?: string
  method?: string
  path?: string
  statusCode?: number
  duration?: number
  [key: string]: unknown
}

class Logger {
  private formatEntry(level: string, message: string, context?: LogContext): string {
    const entry = {
      timestamp: new Date().toISOString(),
      level,
      message,
      ...context
    }
    return JSON.stringify(entry)
  }

  log(level: 'info' | 'warn' | 'error', message: string, context?: LogContext): void {
    console.log(this.formatEntry(level, message, context))
  }

  info(message: string, context?: LogContext): void {
    this.log('info', message, context)
  }

  warn(message: string, context?: LogContext): void {
    this.log('warn', message, context)
  }

  error(message: string, error: Error, context?: LogContext): void {
    this.log('error', message, {
      ...context,
      error: error.message,
      stack: error.stack
    })
  }
}

export const logger = new Logger()

export function requestLogger(req: Request, res: Response, next: NextFunction): void {
  const start = Date.now()
  const requestId = crypto.randomUUID()
  
  ;(req as unknown as Record<string, string>).requestId = requestId

  res.on('finish', () => {
    const duration = Date.now() - start
    logger.info('Request completed', {
      requestId,
      method: req.method,
      path: req.path,
      statusCode: res.statusCode,
      duration,
      ip: req.ip || req.socket.remoteAddress
    })
  })

  next()
}
