import { MoreVertical } from 'lucide-react';

const formatDate = (isoString) => {
  if (!isoString) return "-";
  const date = new Date(isoString);
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
};

const formatTime = (isoString) => {
  if (!isoString) return "";
  const date = new Date(isoString);
  return date.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
};

const formatDuration = (totalSeconds) => {
  if (!totalSeconds || isNaN(totalSeconds)) return "-";
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  if (hours > 0) return `${hours}h ${minutes}m`;
  return `${minutes}m`;
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

const getAvatarColor = (name) => {
  const colors = [
    'bg-blue-500', 'bg-purple-500', 'bg-pink-500',
    'bg-green-500', 'bg-orange-500', 'bg-red-400',
  ];
  let hash = 0;
  for (let i = 0; i < (name || '').length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
};

const RecentCallsTable = ({ sessions }) => {
  const grouped = groupByDate(sessions);

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden h-full flex flex-col">
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200">
        <h3 className="text-sm font-semibold text-gray-900">Recent Calls</h3>
        <button className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors">
          View All →
        </button>
      </div>

      <div className="flex-1 overflow-y-auto divide-y divide-gray-100">
        {Object.keys(grouped).length === 0 && (
          <div className="py-12 text-center text-gray-400 text-sm">
            No recent calls found.
          </div>
        )}

        {Object.entries(grouped).map(([dateLabel, items]) => (
          <div key={dateLabel}>
            <div className="px-5 py-2 bg-gray-50 text-xs font-medium text-gray-500">
              {dateLabel}
            </div>

            {items.map((session) => (
              <div
                key={session._id}
                className="flex items-center justify-between px-5 py-3 hover:bg-gray-50 transition-colors group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center text-xs font-bold shrink-0">
                    {session.client ? session.client.charAt(0).toUpperCase() : '?'}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {session.client || 'Unknown'}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {session.description || 'No description'}
                    </p>
                  </div>
                </div>

                <div className="hidden md:flex items-center -space-x-2 mx-4">
                  {(session.participants || []).slice(0, 3).map((p, i) => (
                    <div
                      key={i}
                      className={`w-7 h-7 rounded-full ${getAvatarColor(p.name)} text-white text-[10px] font-bold flex items-center justify-center border-2 border-white`}
                      title={p.name}
                    >
                      {p.name?.charAt(0).toUpperCase()}
                    </div>
                  ))}
                  {(session.participants || []).length > 3 && (
                    <div className="w-7 h-7 rounded-full bg-gray-200 text-gray-600 text-[10px] font-bold flex items-center justify-center border-2 border-white">
                      +{session.participants.length - 3}
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-4 shrink-0">
                  <span className="text-xs text-gray-500 hidden lg:inline">
                    {formatTime(session.started_at)}
                  </span>
                  <span className="text-xs text-gray-400 font-medium">
                    {formatDuration(session.total_duration_seconds)}
                  </span>
                  <button className="p-1 text-gray-400 hover:text-gray-600 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentCallsTable;
