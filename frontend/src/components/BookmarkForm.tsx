import { useState, useEffect } from 'react';
import type { Bookmark, CreateBookmarkInput } from '../types';
import './BookmarkForm.css';

interface BookmarkFormProps {
  bookmark?: Bookmark | null;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateBookmarkInput) => void;
}

export function BookmarkForm({ bookmark, isOpen, onClose, onSubmit }: BookmarkFormProps) {
  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tagsInput, setTagsInput] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const isEditing = !!bookmark;

  useEffect(() => {
    if (bookmark) {
      setUrl(bookmark.url);
      setTitle(bookmark.title);
      setDescription(bookmark.description || '');
      setTagsInput(bookmark.tags.join(', '));
    } else {
      setUrl('');
      setTitle('');
      setDescription('');
      setTagsInput('');
    }
    setErrors({});
  }, [bookmark, isOpen]);

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!url.trim()) {
      newErrors.url = 'URL IS REQUIRED';
    } else {
      try {
        new URL(url);
      } catch {
        newErrors.url = 'INVALID URL FORMAT';
      }
    }
    
    if (!title.trim()) {
      newErrors.title = 'TITLE IS REQUIRED';
    } else if (title.length > 200) {
      newErrors.title = 'TITLE EXCEEDS 200 CHARACTERS';
    }
    
    if (description.length > 500) {
      newErrors.description = 'DESCRIPTION EXCEEDS 500 CHARACTERS';
    }
    
    const tags = tagsInput.split(',').map(t => t.trim()).filter(Boolean);
    if (tags.length > 5) {
      newErrors.tags = 'MAXIMUM 5 TAGS ALLOWED';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    const tags = tagsInput
      .split(',')
      .map(t => t.trim().toLowerCase())
      .filter(Boolean)
      .slice(0, 5);
    
    onSubmit({
      url: url.trim(),
      title: title.trim(),
      description: description.trim() || undefined,
      tags,
    });
    
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title">
            <span className="title-bracket">&lt;</span>
            <span className="title-text">
              {isEditing ? 'EDIT_BOOKMARK' : 'NEW_BOOKMARK'}
            </span>
            <span className="title-bracket">/&gt;</span>
          </div>
          <button className="modal-close" onClick={onClose}>
            <span>×</span>
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="bookmark-form">
          <div className="form-group">
            <label className="form-label">
              <span className="label-text">URL</span>
              <span className="label-required">*</span>
            </label>
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com"
              className={`form-input ${errors.url ? 'error' : ''}`}
            />
            {errors.url && (
              <span className="error-message">
                <span className="error-icon">⚠</span>
                {errors.url}
              </span>
            )}
          </div>

          <div className="form-group">
            <label className="form-label">
              <span className="label-text">TITLE</span>
              <span className="label-required">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter bookmark title"
              maxLength={200}
              className={`form-input ${errors.title ? 'error' : ''}`}
            />
            <span className="char-count">{title.length}/200</span>
            {errors.title && (
              <span className="error-message">
                <span className="error-icon">⚠</span>
                {errors.title}
              </span>
            )}
          </div>

          <div className="form-group">
            <label className="form-label">
              <span className="label-text">DESCRIPTION</span>
              <span className="label-optional">(OPT)</span>
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief description..."
              maxLength={500}
              rows={3}
              className={`form-textarea ${errors.description ? 'error' : ''}`}
            />
            <span className="char-count">{description.length}/500</span>
            {errors.description && (
              <span className="error-message">
                <span className="error-icon">⚠</span>
                {errors.description}
              </span>
            )}
          </div>

          <div className="form-group">
            <label className="form-label">
              <span className="label-text">TAGS</span>
              <span className="label-optional">(MAX 5)</span>
            </label>
            <input
              type="text"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              placeholder="tag1, tag2, tag3"
              className={`form-input ${errors.tags ? 'error' : ''}`}
            />
            {errors.tags && (
              <span className="error-message">
                <span className="error-icon">⚠</span>
                {errors.tags}
              </span>
            )}
          </div>

          <div className="form-actions">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              <span className="btn-bracket">[</span>
              <span className="btn-label">CANCEL</span>
              <span className="btn-bracket">]</span>
            </button>
            <button type="submit" className="btn btn-primary">
              <span className="btn-bracket">[</span>
              <span className="btn-label">{isEditing ? 'UPDATE' : 'CREATE'}</span>
              <span className="btn-bracket">]</span>
            </button>
          </div>
        </form>

        <div className="modal-decoration top" />
        <div className="modal-decoration bottom" />
      </div>
    </div>
  );
}
