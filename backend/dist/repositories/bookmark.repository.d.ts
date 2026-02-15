import type { Bookmark, CreateBookmarkDto, UpdateBookmarkDto, BookmarkFilters } from '../types/index.js';
export interface BookmarkRepository {
    findAll(filters?: BookmarkFilters): Promise<Bookmark[]>;
    findById(id: string): Promise<Bookmark | null>;
    create(data: CreateBookmarkDto): Promise<Bookmark>;
    update(id: string, data: UpdateBookmarkDto): Promise<Bookmark | null>;
    delete(id: string): Promise<boolean>;
    exists(id: string): Promise<boolean>;
}
export declare class InMemoryBookmarkRepository implements BookmarkRepository {
    private bookmarks;
    findAll(filters?: BookmarkFilters): Promise<Bookmark[]>;
    findById(id: string): Promise<Bookmark | null>;
    create(data: CreateBookmarkDto): Promise<Bookmark>;
    update(id: string, data: UpdateBookmarkDto): Promise<Bookmark | null>;
    delete(id: string): Promise<boolean>;
    exists(id: string): Promise<boolean>;
    seed(bookmarks: Bookmark[]): void;
}
//# sourceMappingURL=bookmark.repository.d.ts.map