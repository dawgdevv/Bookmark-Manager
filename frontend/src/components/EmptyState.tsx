import './EmptyState.css';

interface EmptyStateProps {
  isFiltered: boolean;
  onClearFilters: () => void;
  onAddClick: () => void;
}

export function EmptyState({ isFiltered, onClearFilters, onAddClick }: EmptyStateProps) {
  return (
    <div className="empty-state">
      <div className="empty-grid">
        <div className="grid-line horizontal" style={{ top: '20%' }} />
        <div className="grid-line horizontal" style={{ top: '50%' }} />
        <div className="grid-line horizontal" style={{ top: '80%' }} />
        <div className="grid-line vertical" style={{ left: '20%' }} />
        <div className="grid-line vertical" style={{ left: '50%' }} />
        <div className="grid-line vertical" style={{ left: '80%' }} />
      </div>
      
      <div className="empty-content">
        <div className="empty-icon">
          <span className="icon-bracket">&lt;</span>
          <span className="icon-slash">/</span>
          <span className="icon-bracket">&gt;</span>
        </div>
        
        <h2 className="empty-title">
          {isFiltered ? 'NO_RESULTS_FOUND' : 'NO_BOOKMARKS'}
        </h2>
        
        <p className="empty-message">
          {isFiltered 
            ? 'Try adjusting your search or filter criteria.'
            : 'Your bookmark database is currently empty.'
          }
        </p>
        
        <div className="empty-actions">
          {isFiltered ? (
            <button className="btn btn-primary" onClick={onClearFilters}>
              <span className="btn-bracket">[</span>
              <span className="btn-label">CLEAR_FILTERS</span>
              <span className="btn-bracket">]</span>
            </button>
          ) : (
            <button className="btn btn-primary" onClick={onAddClick}>
              <span className="btn-bracket">[</span>
              <span className="btn-label">ADD_FIRST_BOOKMARK</span>
              <span className="btn-bracket">]</span>
            </button>
          )}
        </div>
      </div>
      
      <div className="empty-decoration top-left" />
      <div className="empty-decoration top-right" />
      <div className="empty-decoration bottom-left" />
      <div className="empty-decoration bottom-right" />
    </div>
  );
}
