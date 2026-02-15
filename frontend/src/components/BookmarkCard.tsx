import { useState } from 'react';
import type { Bookmark } from '../types';
import './BookmarkCard.css';

interface BookmarkCardProps {
  bookmark: Bookmark;
  onEdit: (bookmark: Bookmark) => void;
  onDelete: (id: string) => void;
  onTagClick: (tag: string) => void;
}

export function BookmarkCard({ bookmark, onEdit, onDelete, onTagClick }: BookmarkCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

  const getDomain = (url: string) => {
    try {
      return new URL(url).hostname.replace('www.', '');
    } catch {
      return url;
    }
  };

  return (
    <article 
      className={`bookmark-card ${isHovered ? 'hovered' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="bookmark-border-top" />
      <div className="bookmark-index">
        <span className="index-prefix">#</span>
        <span className="index-value">{bookmark.id.slice(-4).toUpperCase()}</span>
      </div>
      
      <div className="bookmark-content">
        <div className="bookmark-header">
          <h3 className="bookmark-title">
            <a 
              href={bookmark.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="bookmark-link"
            >
              <span className="link-bracket">[</span>
              <span className="link-text">{bookmark.title}</span>
              <span className="link-bracket">]</span>
              <span className="link-arrow">→</span>
            </a>
          </h3>
          <span className="bookmark-domain">{getDomain(bookmark.url)}</span>
        </div>

        {bookmark.description && (
          <p className="bookmark-description">
            <span className="desc-prefix">DESC:</span>
            <span className="desc-text">{bookmark.description}</span>
          </p>
        )}

        <div className="bookmark-footer">
          <div className="bookmark-tags">
            <span className="tags-label">TAGS:</span>
            <div className="tags-list">
              {bookmark.tags.length > 0 ? (
                bookmark.tags.map((tag, index) => (
                  <button
                    key={`${bookmark.id}-${tag}`}
                    className="tag"
                    onClick={() => onTagClick(tag)}
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <span className="tag-hash">#</span>
                    {tag}
                  </button>
                ))
              ) : (
                <span className="tag-empty">NONE</span>
              )}
            </div>
          </div>
          
          <div className="bookmark-meta">
            <span className="meta-date">
              <span className="date-label">ADDED:</span>
              <span className="date-value">{formatDate(bookmark.createdAt)}</span>
            </span>
          </div>
        </div>
      </div>

      <div className="bookmark-actions">
        <button 
          className="action-btn edit"
          onClick={() => onEdit(bookmark)}
          title="Edit bookmark"
        >
          <span className="btn-icon">✎</span>
          <span className="btn-text">EDIT</span>
        </button>
        <button 
          className="action-btn delete"
          onClick={() => onDelete(bookmark.id)}
          title="Delete bookmark"
        >
          <span className="btn-icon">✕</span>
          <span className="btn-text">DEL</span>
        </button>
      </div>

      <div className="bookmark-corner top-left" />
      <div className="bookmark-corner top-right" />
      <div className="bookmark-corner bottom-left" />
      <div className="bookmark-corner bottom-right" />
    </article>
  );
}
