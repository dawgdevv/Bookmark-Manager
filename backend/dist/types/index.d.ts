export interface Bookmark {
    id: string;
    url: string;
    title: string;
    description?: string;
    tags: string[];
    createdAt: string;
}
export interface CreateBookmarkDto {
    url: string;
    title: string;
    description?: string;
    tags?: string[];
}
export interface UpdateBookmarkDto {
    url?: string;
    title?: string;
    description?: string;
    tags?: string[];
}
export interface BookmarkFilters {
    tag?: string;
    search?: string;
}
export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: string;
    details?: unknown;
}
//# sourceMappingURL=index.d.ts.map