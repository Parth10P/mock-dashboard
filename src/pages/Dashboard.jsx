import { useState, useEffect } from 'react';
import { fetchDashboard, fetchStats, fetchCallHistory } from '../utils/api';
import StatCard from '../components/dashboard/StatCard';
import UsageWidget from '../components/dashboard/UsageWidget';
import RecentCallsTable from '../components/dashboard/RecentCallsTable';
import { PhoneCall, Clock, Bot, Calendar, CalendarX2 } from 'lucide-react';

const formatDuration = (totalSeconds) => {
  if (!totalSeconds || isNaN(totalSeconds)) return "0s";
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  if (hours > 0) return `${hours}h ${minutes}m`;
  if (minutes > 0) return `${minutes}m ${seconds}s`;
  return `${seconds}s`;
};

const Dashboard = ({ activeUser }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dashboardData, setDashboardData] = useState(null);
  const [statsData, setStatsData] = useState(null);
  const [sessionsData, setSessionsData] = useState(null);

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      setError(null);
      try {
        const [dashRes, statsRes, sessionsRes] = await Promise.all([
          fetchDashboard(activeUser),
          fetchStats(activeUser),
          fetchCallHistory(activeUser, 10),
        ]);
        setDashboardData(dashRes);
        setStatsData(statsRes);
        setSessionsData(sessionsRes);
      } catch (err) {
        console.error("Dashboard fetch error:", err);
        setError("Failed to load dashboard data.");
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, [activeUser]);

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center gap-4">
        <p className="text-red-500 font-medium">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-black"
        >
          Retry
        </button>
      </div>
    );
  }

  const user = dashboardData?.user;
  const isEmptyState = sessionsData?.callSessions?.length === 0;

  return (
    <div className="max-w-[1200px] mx-auto flex flex-col gap-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
            Hi, {user?.firstName} 👋 Welcome to Hintro
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Here's what's happening with your account today.
          </p>
        </div>
        <button className="bg-gray-900 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-black transition-colors self-start md:self-auto shrink-0">
          Start New Call
        </button>
      </div>

      {isEmptyState ? (
        <div className="flex flex-col items-center justify-center bg-white border border-gray-200 rounded-xl p-16 text-center mt-4">
          <div className="w-14 h-14 bg-gray-100 rounded-xl flex items-center justify-center mb-5">
            <CalendarX2 className="w-7 h-7 text-gray-400" />
          </div>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">No Recent Calls</h2>
          <p className="text-sm text-gray-500 max-w-sm mx-auto mb-6 leading-relaxed">
            You haven't recorded any call sessions yet. Start a new recording to see your transcripts and insights here.
          </p>
          <button className="bg-gray-900 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-black transition-colors">
            Start a Call
          </button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              title="Total Sessions"
              value={statsData?.totalSessions || 0}
              icon={<PhoneCall className="w-5 h-5 text-orange-600" />}
              iconBg="bg-orange-100"
            />
            <StatCard
              title="Avg. Duration"
              value={formatDuration(statsData?.averageDuration)}
              icon={<Clock className="w-5 h-5 text-blue-600" />}
              iconBg="bg-blue-100"
            />
            <StatCard
              title="AI Interactions"
              value={statsData?.totalAIInteractions || 0}
              icon={<Bot className="w-5 h-5 text-green-600" />}
              iconBg="bg-green-100"
            />
            <StatCard
              title="Last Session"
              value={
                statsData?.lastSession?.length
                  ? new Date(statsData.lastSession[0]).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })
                  : "-"
              }
              icon={<Calendar className="w-5 h-5 text-purple-600" />}
              iconBg="bg-purple-100"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <RecentCallsTable sessions={sessionsData?.callSessions || []} />
            </div>
            <div>
              <UsageWidget usage={dashboardData?.usage} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
