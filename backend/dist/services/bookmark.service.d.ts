import type { BookmarkRepository } from '../repositories/bookmark.repository.js';
import type { Bookmark, CreateBookmarkDto, UpdateBookmarkDto, BookmarkFilters } from '../types/index.js';
export declare class BookmarkService {
    private bookmarkRepo;
    constructor(bookmarkRepo: BookmarkRepository);
    getAllBookmarks(filters?: BookmarkFilters): Promise<Bookmark[]>;
    getBookmarkById(id: string): Promise<Bookmark>;
    createBookmark(data: CreateBookmarkDto): Promise<Bookmark>;
    updateBookmark(id: string, data: UpdateBookmarkDto): Promise<Bookmark>;
    deleteBookmark(id: string): Promise<void>;
    private validateCreateData;
    private validateUpdateData;
    private isValidUrl;
}
//# sourceMappingURL=bookmark.service.d.ts.map