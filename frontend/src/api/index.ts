import type { Bookmark, CreateBookmarkInput, UpdateBookmarkInput } from '../types';

const API_BASE = '/api';

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Request failed' }));
    throw new Error(error.message || `Error: ${response.status}`);
  }
  
  // Handle 204 No Content
  if (response.status === 204) {
    return undefined as T;
  }
  
  const result: ApiResponse<T> = await response.json();
  return result.data;
}

export const api = {
  async getBookmarks(tag?: string): Promise<Bookmark[]> {
    const url = tag 
      ? `${API_BASE}/bookmarks?tag=${encodeURIComponent(tag)}` 
      : `${API_BASE}/bookmarks`;
    const response = await fetch(url);
    return handleResponse<Bookmark[]>(response);
  },

  async createBookmark(data: CreateBookmarkInput): Promise<Bookmark> {
    const response = await fetch(`${API_BASE}/bookmarks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return handleResponse<Bookmark>(response);
  },

  async updateBookmark(id: string, data: UpdateBookmarkInput): Promise<Bookmark> {
    const response = await fetch(`${API_BASE}/bookmarks/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return handleResponse<Bookmark>(response);
  },

  async deleteBookmark(id: string): Promise<void> {
    const response = await fetch(`${API_BASE}/bookmarks/${id}`, {
      method: 'DELETE',
    });
    return handleResponse<void>(response);
  },

  async healthCheck(): Promise<{ success: boolean; message: string }> {
    const response = await fetch(`${API_BASE}/health`);
    return response.json();
  },
};
