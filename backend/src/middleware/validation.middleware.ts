import type { Request, Response, NextFunction } from 'express'
import { z } from 'zod'
import { ApiError } from '../utils/errors.js'

export const createBookmarkSchema = z.object({
  url: z.string().min(1, 'URL is required').url('Invalid URL format'),
  title: z.string().min(1, 'Title is required').max(200, 'Title must be 200 characters or less'),
  description: z.string().max(500, 'Description must be 500 characters or less').optional(),
  tags: z.array(z.string().min(1).max(50)).max(5, 'Maximum 5 tags allowed').optional()
})

export const updateBookmarkSchema = createBookmarkSchema.partial()

export function validateCreateBookmark(req: Request, _res: Response, next: NextFunction): void {
  try {
    createBookmarkSchema.parse(req.body)
    next()
  } catch (error) {
    next(error)
  }
}

export function validateUpdateBookmark(req: Request, _res: Response, next: NextFunction): void {
  try {
    if (Object.keys(req.body).length === 0) {
      throw new ApiError(400, 'Request body cannot be empty')
    }
    updateBookmarkSchema.parse(req.body)
    next()
  } catch (error) {
    next(error)
  }
}
