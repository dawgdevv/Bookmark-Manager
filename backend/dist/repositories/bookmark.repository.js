export class InMemoryBookmarkRepository {
    bookmarks = new Map();
    async findAll(filters) {
        let results = Array.from(this.bookmarks.values());
        if (filters?.tag) {
            const normalizedTag = filters.tag.toLowerCase();
            results = results.filter(b => b.tags.some(tag => tag.toLowerCase() === normalizedTag));
        }
        if (filters?.search) {
            const searchLower = filters.search.toLowerCase();
            results = results.filter(b => b.title.toLowerCase().includes(searchLower) ||
                b.url.toLowerCase().includes(searchLower) ||
                (b.description?.toLowerCase().includes(searchLower) ?? false));
        }
        return results.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }
    async findById(id) {
        return this.bookmarks.get(id) || null;
    }
    async create(data) {
        const bookmark = {
            id: crypto.randomUUID(),
            url: data.url,
            title: data.title,
            description: data.description,
            tags: data.tags?.map(t => t.toLowerCase()) || [],
            createdAt: new Date().toISOString()
        };
        this.bookmarks.set(bookmark.id, bookmark);
        return bookmark;
    }
    async update(id, data) {
        const existing = this.bookmarks.get(id);
        if (!existing)
            return null;
        const updated = {
            ...existing,
            ...(data.url && { url: data.url }),
            ...(data.title && { title: data.title }),
            ...(data.description !== undefined && { description: data.description }),
            ...(data.tags && { tags: data.tags.map(t => t.toLowerCase()) })
        };
        this.bookmarks.set(id, updated);
        return updated;
    }
    async delete(id) {
        return this.bookmarks.delete(id);
    }
    async exists(id) {
        return this.bookmarks.has(id);
    }
    seed(bookmarks) {
        bookmarks.forEach(b => this.bookmarks.set(b.id, b));
    }
}
//# sourceMappingURL=bookmark.repository.js.map