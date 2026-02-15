import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs'
import { join, dirname } from 'path'
import type { Bookmark, CreateBookmarkDto, UpdateBookmarkDto, BookmarkFilters } from '../types/index.js'
import { BookmarkRepository } from './bookmark.repository.js'

export class FileBookmarkRepository implements BookmarkRepository {
  private filePath: string
  private bookmarks: Map<string, Bookmark>

  constructor(dataDir: string = './data') {
    this.filePath = join(dataDir, 'bookmarks.json')
    this.bookmarks = new Map()
    this.load()
  }

  private load(): void {
    try {
      if (existsSync(this.filePath)) {
        const data = readFileSync(this.filePath, 'utf-8')
        const bookmarks: Bookmark[] = JSON.parse(data)
        bookmarks.forEach(b => this.bookmarks.set(b.id, b))
      }
    } catch (error) {
      console.error('Error loading bookmarks:', error)
    }
  }

  private save(): void {
    try {
      const dir = dirname(this.filePath)
      if (!existsSync(dir)) {
        mkdirSync(dir, { recursive: true })
      }
      const bookmarks = Array.from(this.bookmarks.values())
      writeFileSync(this.filePath, JSON.stringify(bookmarks, null, 2))
    } catch (error) {
      console.error('Error saving bookmarks:', error)
    }
  }

  async findAll(filters?: BookmarkFilters): Promise<Bookmark[]> {
    let results = Array.from(this.bookmarks.values())

    if (filters?.tag) {
      const normalizedTag = filters.tag.toLowerCase()
      results = results.filter(b => 
        b.tags.some(tag => tag.toLowerCase() === normalizedTag)
      )
    }

    if (filters?.search) {
      const searchLower = filters.search.toLowerCase()
      results = results.filter(b => 
        b.title.toLowerCase().includes(searchLower) ||
        b.url.toLowerCase().includes(searchLower) ||
        (b.description?.toLowerCase().includes(searchLower) ?? false)
      )
    }

    return results.sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
  }

  async findById(id: string): Promise<Bookmark | null> {
    return this.bookmarks.get(id) || null
  }

  async create(data: CreateBookmarkDto): Promise<Bookmark> {
    const bookmark: Bookmark = {
      id: crypto.randomUUID(),
      url: data.url,
      title: data.title,
      description: data.description,
      tags: data.tags?.map(t => t.toLowerCase()) || [],
      createdAt: new Date().toISOString()
    }
    this.bookmarks.set(bookmark.id, bookmark)
    this.save()
    return bookmark
  }

  async update(id: string, data: UpdateBookmarkDto): Promise<Bookmark | null> {
    const existing = this.bookmarks.get(id)
    if (!existing) return null

    const updated: Bookmark = {
      ...existing,
      ...(data.url && { url: data.url }),
      ...(data.title && { title: data.title }),
      ...(data.description !== undefined && { description: data.description }),
      ...(data.tags && { tags: data.tags.map(t => t.toLowerCase()) })
    }

    this.bookmarks.set(id, updated)
    this.save()
    return updated
  }

  async delete(id: string): Promise<boolean> {
    const deleted = this.bookmarks.delete(id)
    if (deleted) this.save()
    return deleted
  }

  async exists(id: string): Promise<boolean> {
    return this.bookmarks.has(id)
  }

  seed(bookmarks: Bookmark[]): void {
    // Only seed if empty
    if (this.bookmarks.size === 0) {
      bookmarks.forEach(b => this.bookmarks.set(b.id, b))
      this.save()
    }
  }
}
