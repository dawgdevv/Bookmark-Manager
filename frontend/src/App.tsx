import { useState, useEffect, useCallback, useMemo } from 'react';
import { Header } from './components/Header';
import { FilterBar } from './components/FilterBar';
import { BookmarkCard } from './components/BookmarkCard';
import { BookmarkForm } from './components/BookmarkForm';
import { DeleteConfirmation } from './components/DeleteConfirmation';
import { EmptyState } from './components/EmptyState';
import { api } from './api';
import type { Bookmark, CreateBookmarkInput } from './types';
import './styles/global.css';
import './App.css';

function App() {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingBookmark, setEditingBookmark] = useState<Bookmark | null>(null);
  const [deletingBookmark, setDeletingBookmark] = useState<Bookmark | null>(null);

  const fetchBookmarks = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await api.getBookmarks(activeTag || undefined);
      setBookmarks(data);
    } catch (err) {
      setError('CONNECTION_ERROR: Failed to load bookmarks');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [activeTag]);

  useEffect(() => {
    fetchBookmarks();
  }, [fetchBookmarks]);

  const filteredBookmarks = useMemo(() => {
    if (!searchQuery.trim()) return bookmarks;
    
    const query = searchQuery.toLowerCase();
    return bookmarks.filter(
      bookmark =>
        bookmark.title.toLowerCase().includes(query) ||
        bookmark.url.toLowerCase().includes(query) ||
        bookmark.tags.some(tag => tag.toLowerCase().includes(query))
    );
  }, [bookmarks, searchQuery]);

  const handleAddBookmark = async (data: CreateBookmarkInput) => {
    try {
      await api.createBookmark(data);
      fetchBookmarks();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create bookmark');
    }
  };

  const handleUpdateBookmark = async (data: CreateBookmarkInput) => {
    if (!editingBookmark) return;
    try {
      await api.updateBookmark(editingBookmark.id, data);
      fetchBookmarks();
      setEditingBookmark(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update bookmark');
    }
  };

  const handleDeleteBookmark = async () => {
    if (!deletingBookmark) return;
    try {
      await api.deleteBookmark(deletingBookmark.id);
      fetchBookmarks();
      setDeletingBookmark(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete bookmark');
    }
  };

  const handleEditClick = (bookmark: Bookmark) => {
    setEditingBookmark(bookmark);
    setIsFormOpen(true);
  };

  const handleDeleteClick = (id: string) => {
    const bookmark = bookmarks.find(b => b.id === id);
    if (bookmark) {
      setDeletingBookmark(bookmark);
    }
  };

  const handleTagClick = (tag: string) => {
    setActiveTag(tag);
  };

  const handleClearTag = () => {
    setActiveTag(null);
  };

  const handleOpenForm = () => {
    setEditingBookmark(null);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingBookmark(null);
  };

  const handleFormSubmit = (data: CreateBookmarkInput) => {
    if (editingBookmark) {
      handleUpdateBookmark(data);
    } else {
      handleAddBookmark(data);
    }
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setActiveTag(null);
  };

  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    bookmarks.forEach(bookmark => {
      bookmark.tags.forEach(tag => tagSet.add(tag));
    });
    return Array.from(tagSet).sort();
  }, [bookmarks]);

  return (
    <div className="app">
      <Header />
      
      <main className="main">
        <div className="container">
          <FilterBar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            activeTag={activeTag}
            onClearTag={handleClearTag}
            bookmarkCount={filteredBookmarks.length}
            onAddClick={handleOpenForm}
          />

          {error && (
            <div className="error-banner">
              <span className="error-icon">⚠</span>
              <span className="error-text">{error}</span>
              <button className="error-dismiss" onClick={() => setError(null)}>
                ×
              </button>
            </div>
          )}

          <div className="content-area">
            {loading ? (
              <div className="loading-state">
                <div className="loading-spinner" />
                <span className="loading-text">LOADING_DATA...</span>
              </div>
            ) : filteredBookmarks.length > 0 ? (
              <div className="bookmarks-grid">
                {filteredBookmarks.map((bookmark) => (
                  <BookmarkCard
                    key={bookmark.id}
                    bookmark={bookmark}
                    onEdit={handleEditClick}
                    onDelete={handleDeleteClick}
                    onTagClick={handleTagClick}
                  />
                ))}
              </div>
            ) : (
              <EmptyState
                isFiltered={!!searchQuery || !!activeTag}
                onClearFilters={handleClearFilters}
                onAddClick={handleOpenForm}
              />
            )}
          </div>

          {allTags.length > 0 && (
            <div className="tags-cloud">
              <span className="cloud-label">ALL_TAGS:</span>
              <div className="cloud-list">
                {allTags.map(tag => (
                  <button
                    key={tag}
                    className={`cloud-tag ${activeTag === tag ? 'active' : ''}`}
                    onClick={() => handleTagClick(tag)}
                  >
                    <span className="tag-hash">#</span>
                    {tag}
                    <span className="tag-count">
                      {bookmarks.filter(b => b.tags.includes(tag)).length}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <BookmarkForm
        bookmark={editingBookmark}
        isOpen={isFormOpen}
        onClose={handleCloseForm}
        onSubmit={handleFormSubmit}
      />

      <DeleteConfirmation
        isOpen={!!deletingBookmark}
        bookmarkTitle={deletingBookmark?.title || ''}
        onConfirm={handleDeleteBookmark}
        onCancel={() => setDeletingBookmark(null)}
      />

      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <span className="footer-text">
              BM-77 BOOKMARK_MANAGER v1.0.0
            </span>
            <span className="footer-separator">|</span>
            <span className="footer-status">
              STATUS: <span className="status-online">ONLINE</span>
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
