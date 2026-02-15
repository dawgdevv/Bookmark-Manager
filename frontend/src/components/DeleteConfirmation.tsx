import './DeleteConfirmation.css';

interface DeleteConfirmationProps {
  isOpen: boolean;
  bookmarkTitle: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export function DeleteConfirmation({ 
  isOpen, 
  bookmarkTitle, 
  onConfirm, 
  onCancel 
}: DeleteConfirmationProps) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay delete-modal" onClick={onCancel}>
      <div className="delete-container" onClick={e => e.stopPropagation()}>
        <div className="delete-header">
          <span className="delete-warning">⚠ WARNING</span>
        </div>
        
        <div className="delete-content">
          <p className="delete-message">
            CONFIRM DELETION OF:
          </p>
          <p className="delete-target">
            <span className="target-bracket">[</span>
            {bookmarkTitle}
            <span className="target-bracket">]</span>
          </p>
          <p className="delete-submessage">
            THIS ACTION CANNOT BE UNDONE.
          </p>
        </div>

        <div className="delete-actions">
          <button className="btn btn-secondary" onClick={onCancel}>
            <span className="btn-bracket">[</span>
            <span className="btn-label">CANCEL</span>
            <span className="btn-bracket">]</span>
          </button>
          <button className="btn btn-danger" onClick={onConfirm}>
            <span className="btn-bracket">[</span>
            <span className="btn-label">DELETE</span>
            <span className="btn-bracket">]</span>
          </button>
        </div>

        <div className="delete-scanline" />
      </div>
    </div>
  );
}
