import { useState } from 'react';
import './FilterBar.css';

interface FilterBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  activeTag: string | null;
  onClearTag: () => void;
  bookmarkCount: number;
  onAddClick: () => void;
}

export function FilterBar({ 
  searchQuery, 
  onSearchChange, 
  activeTag, 
  onClearTag,
  bookmarkCount,
  onAddClick 
}: FilterBarProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="filter-bar">
      <div className="filter-left">
        <div className={`search-container ${isFocused ? 'focused' : ''}`}>
          <span className="search-icon">⌕</span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="SEARCH_BOOKMARKS..."
            className="search-input"
          />
          {searchQuery && (
            <button 
              className="search-clear"
              onClick={() => onSearchChange('')}
            >
              ×
            </button>
          )}
        </div>

        {activeTag && (
          <div className="active-filter">
            <span className="filter-label">FILTER:</span>
            <span className="filter-tag">
              <span className="tag-hash">#</span>
              {activeTag}
            </span>
            <button className="filter-clear" onClick={onClearTag}>
              <span>×</span>
            </button>
          </div>
        )}
      </div>

      <div className="filter-right">
        <div className="count-display">
          <span className="count-label">TOTAL:</span>
          <span className="count-value">{bookmarkCount.toString().padStart(3, '0')}</span>
        </div>
        <button className="add-btn" onClick={onAddClick}>
          <span className="add-icon">+</span>
          <span className="add-text">NEW</span>
        </button>
      </div>
    </div>
  );
}
