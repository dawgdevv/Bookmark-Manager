import { Router } from 'express'
import type { Request, Response, NextFunction } from 'express'
import { BookmarkService } from '../services/bookmark.service.js'
import { validateCreateBookmark, validateUpdateBookmark } from '../middleware/validation.middleware.js'
import { ApiError } from '../utils/errors.js'
import type { BookmarkFilters } from '../types/index.js'

export function createBookmarkRouter(bookmarkService: BookmarkService): Router {
  const router = Router()

  router.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const filters: BookmarkFilters = {}
      
      if (req.query.tag && typeof req.query.tag === 'string') {
        filters.tag = req.query.tag
      }
      
      if (req.query.search && typeof req.query.search === 'string') {
        filters.search = req.query.search
      }

      const bookmarks = await bookmarkService.getAllBookmarks(filters)
      res.json({ success: true, data: bookmarks })
    } catch (error) {
      next(error)
    }
  })

  router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id as string
      const bookmark = await bookmarkService.getBookmarkById(id)
      res.json({ success: true, data: bookmark })
    } catch (error) {
      next(error)
    }
  })

  router.post('/', validateCreateBookmark, async (req: Request, res: Response, next: NextFunction) => {
    try {
      const bookmark = await bookmarkService.createBookmark(req.body)
      res.status(201).json({ success: true, data: bookmark })
    } catch (error) {
      next(error)
    }
  })

  router.put('/:id', validateUpdateBookmark, async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id as string
      const bookmark = await bookmarkService.updateBookmark(id, req.body)
      res.json({ success: true, data: bookmark })
    } catch (error) {
      next(error)
    }
  })

  router.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id as string
      await bookmarkService.deleteBookmark(id)
      res.status(204).send()
    } catch (error) {
      next(error)
    }
  })

  return router
}
