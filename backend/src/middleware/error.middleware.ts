import type { Request, Response, NextFunction } from 'express'
import { z } from 'zod'
import { ApiError } from '../utils/errors.js'

export function errorHandler(
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  if (error instanceof ApiError) {
    res.status(error.statusCode).json({
      success: false,
      error: error.message
    })
    return
  }

  if (error instanceof z.ZodError) {
    res.status(400).json({
      success: false,
      error: 'Validation failed',
      details: error.errors.map(e => ({
        field: e.path.join('.'),
        message: e.message
      }))
    })
    return
  }

  console.error('Unexpected error:', error)

  res.status(500).json({
    success: false,
    error: 'Internal server error'
  })
}
