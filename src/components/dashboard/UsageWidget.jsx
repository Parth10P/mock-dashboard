import './UsageWidget.css';

const UsageWidget = ({ usage }) => {
  if (!usage) return null;

  const { kb_files, vocab_terms, notes } = usage;
  const percentage = kb_files?.percentage || 0;

  return (
    <div className="usage-widget">
      <h3 className="usage-title">Usage</h3>

      <div className="usage-content">
        <div>
          <div className="usage-row">
            <span className="usage-label">Knowledge Base Files</span>
            <span className="usage-value">
              {kb_files?.used} / {kb_files?.limit}
            </span>
          </div>
          <div className="usage-progress-bg">
            <div
              className="usage-progress-fill"
              style={{ width: `${Math.min(percentage, 100)}%` }}
            ></div>
          </div>
          <p className="usage-percentage">{percentage}% used</p>
        </div>

        <div className="usage-stats">
          <div className="usage-stat-row">
            <span className="usage-stat-label">Vocab Terms</span>
            <span className="usage-stat-value">{vocab_terms}</span>
          </div>
          <div className="usage-stat-row">
            <span className="usage-stat-label">Notes</span>
            <span className="usage-stat-value">{notes}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsageWidget;
