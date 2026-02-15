export interface Bookmark {
  id: string;
  url: string;
  title: string;
  description?: string;
  tags: string[];
  createdAt: string;
}

export interface CreateBookmarkInput {
  url: string;
  title: string;
  description?: string;
  tags: string[];
}

export interface UpdateBookmarkInput extends CreateBookmarkInput {}

export interface ApiError {
  message: string;
  errors?: string[];
}
