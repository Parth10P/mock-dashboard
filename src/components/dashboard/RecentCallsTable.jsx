import { MoreVertical, Users } from 'lucide-react';
import './RecentCallsTable.css';

const formatDate = (isoString) => {
  if (!isoString) return "-";
  const date = new Date(isoString);
  const now = new Date();
  const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";

  return date.toLocaleDateString("en-US", { month: "long", day: "numeric" });
};

const formatTime = (isoString) => {
  if (!isoString) return "";
  const date = new Date(isoString);
  return date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
};

const groupByDate = (sessions) => {
  const groups = {};
  sessions.forEach((session) => {
    const dateKey = formatDate(session.started_at);
    if (!groups[dateKey]) groups[dateKey] = [];
    groups[dateKey].push(session);
  });
  return groups;
};

const getInitialClass = (letter) => {
  const colorMap = {
    S: 'green',
    E: 'purple',
    I: 'indigo',
    T: 'pink',
    Q: 'indigo-light',
    D: 'orange',
    O: 'emerald',
  };
  return colorMap[letter] || 'blue';
};

const RecentCallsTable = ({ sessions }) => {
  const grouped = groupByDate(sessions);

  return (
    <div className="recent-calls-container">
      <h3 className="recent-calls-title">Recent calls</h3>

      {Object.keys(grouped).length === 0 && (
        <div className="recent-calls-empty">
          No recent calls found.
        </div>
      )}

      {Object.entries(grouped).map(([dateLabel, items]) => (
        <div key={dateLabel} className="recent-calls-group">
          <p className="recent-calls-date">{dateLabel}</p>

          {items.map((session) => {
            const initial = session.client?.charAt(0)?.toUpperCase() || '?';
            return (
              <div key={session._id} className="call-row">
                <div className="call-info">
                  <div className={`call-avatar ${getInitialClass(initial)}`}>
                    {initial}
                  </div>
                  <div className="call-details">
                    <p className="call-name">
                      {session.description || session.client || 'Unknown'}
                    </p>
                    <div className="call-participants">
                      <Users size={12} />
                    </div>
                  </div>
                </div>

                <div className="call-actions">
                  <span className="call-time">
                    {formatTime(session.started_at)}
                  </span>
                  <button className="call-menu-btn">
                    <MoreVertical size={16} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default RecentCallsTable;
