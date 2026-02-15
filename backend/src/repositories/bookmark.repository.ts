import type { Bookmark, CreateBookmarkDto, UpdateBookmarkDto, BookmarkFilters } from '../types/index.js'

export interface BookmarkRepository {
  findAll(filters?: BookmarkFilters): Promise<Bookmark[]>
  findById(id: string): Promise<Bookmark | null>
  create(data: CreateBookmarkDto): Promise<Bookmark>
  update(id: string, data: UpdateBookmarkDto): Promise<Bookmark | null>
  delete(id: string): Promise<boolean>
  exists(id: string): Promise<boolean>
}

export class InMemoryBookmarkRepository implements BookmarkRepository {
  private bookmarks: Map<string, Bookmark> = new Map()

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
    return updated
  }

  async delete(id: string): Promise<boolean> {
    return this.bookmarks.delete(id)
  }

  async exists(id: string): Promise<boolean> {
    return this.bookmarks.has(id)
  }

  seed(bookmarks: Bookmark[]): void {
    bookmarks.forEach(b => this.bookmarks.set(b.id, b))
  }
}
