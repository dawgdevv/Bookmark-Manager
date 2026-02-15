import type { BookmarkRepository } from '../repositories/bookmark.repository.js'
import type { Bookmark, CreateBookmarkDto, UpdateBookmarkDto, BookmarkFilters } from '../types/index.js'
import { ApiError } from '../utils/errors.js'

export class BookmarkService {
  constructor(private bookmarkRepo: BookmarkRepository) {}

  async getAllBookmarks(filters?: BookmarkFilters): Promise<Bookmark[]> {
    return this.bookmarkRepo.findAll(filters)
  }

  async getBookmarkById(id: string): Promise<Bookmark> {
    const bookmark = await this.bookmarkRepo.findById(id)
    if (!bookmark) {
      throw new ApiError(404, 'Bookmark not found')
    }
    return bookmark
  }

  async createBookmark(data: CreateBookmarkDto): Promise<Bookmark> {
    this.validateCreateData(data)
    return this.bookmarkRepo.create(data)
  }

  async updateBookmark(id: string, data: UpdateBookmarkDto): Promise<Bookmark> {
    const exists = await this.bookmarkRepo.exists(id)
    if (!exists) {
      throw new ApiError(404, 'Bookmark not found')
    }

    this.validateUpdateData(data)
    const updated = await this.bookmarkRepo.update(id, data)
    if (!updated) {
      throw new ApiError(500, 'Failed to update bookmark')
    }
    return updated
  }

  async deleteBookmark(id: string): Promise<void> {
    const exists = await this.bookmarkRepo.exists(id)
    if (!exists) {
      throw new ApiError(404, 'Bookmark not found')
    }

    const deleted = await this.bookmarkRepo.delete(id)
    if (!deleted) {
      throw new ApiError(500, 'Failed to delete bookmark')
    }
  }

  private validateCreateData(data: CreateBookmarkDto): void {
    if (!data.url || !this.isValidUrl(data.url)) {
      throw new ApiError(400, 'Invalid or missing URL')
    }

    if (!data.title || data.title.trim().length === 0) {
      throw new ApiError(400, 'Title is required')
    }

    if (data.title.length > 200) {
      throw new ApiError(400, 'Title must be 200 characters or less')
    }

    if (data.description && data.description.length > 500) {
      throw new ApiError(400, 'Description must be 500 characters or less')
    }

    if (data.tags && data.tags.length > 5) {
      throw new ApiError(400, 'Maximum 5 tags allowed')
    }
  }

  private validateUpdateData(data: UpdateBookmarkDto): void {
    if (data.url !== undefined && !this.isValidUrl(data.url)) {
      throw new ApiError(400, 'Invalid URL')
    }

    if (data.title !== undefined) {
      if (data.title.trim().length === 0) {
        throw new ApiError(400, 'Title cannot be empty')
      }
      if (data.title.length > 200) {
        throw new ApiError(400, 'Title must be 200 characters or less')
      }
    }

    if (data.description !== undefined && data.description.length > 500) {
      throw new ApiError(400, 'Description must be 500 characters or less')
    }

    if (data.tags !== undefined && data.tags.length > 5) {
      throw new ApiError(400, 'Maximum 5 tags allowed')
    }
  }

  private isValidUrl(url: string): boolean {
    try {
      const parsed = new URL(url)
      return parsed.protocol === 'http:' || parsed.protocol === 'https:'
    } catch {
      return false
    }
  }
}
