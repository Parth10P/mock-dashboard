import { useState, useEffect } from 'react';
import { fetchDashboard, fetchStats, fetchCallHistory } from '../utils/api';
import StatCard from '../components/dashboard/StatCard';
import RecentCallsTable from '../components/dashboard/RecentCallsTable';
import { PhoneCall, Clock, Sparkles, Calendar, CalendarX2 } from 'lucide-react';
import './Dashboard.css';

const formatDuration = (totalSeconds) => {
  if (!totalSeconds || isNaN(totalSeconds)) return "0s";
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}m ${seconds}sec`;
};

const formatRelativeDate = (isoString) => {
  if (!isoString) return "-";
  const now = new Date();
  const date = new Date(isoString);
  const diffMs = now - date;
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  return `${diffDays} days ago`;
};

const Dashboard = ({ activeUser, onUsageLoaded }) => {
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

        if (onUsageLoaded) onUsageLoaded(dashRes?.usage);
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
      <div className="dashboard-loading">
        <div className="spinner"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-error">
        <p className="error-text">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="btn-primary"
        >
          Retry
        </button>
      </div>
    );
  }

  const user = dashboardData?.user;
  const isEmptyState = sessionsData?.callSessions?.length === 0;

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div className="welcome-section">
          <h1 className="welcome-title">
            Hi, {user?.firstName} 👋 Welcome to Hintro
          </h1>
          <p className="welcome-subtitle">
            Ready to make your next call smarter?
          </p>
        </div>
        <button className="btn-primary start-call-btn">
          Start New Call
        </button>
      </div>

      {isEmptyState ? (
        <div className="empty-state">
          <div className="empty-icon-container">
            <CalendarX2 size={28} className="empty-icon" />
          </div>
          <h2 className="empty-title">No Recent Calls</h2>
          <p className="empty-desc">
            You haven't recorded any call sessions yet. Start a new recording to see your transcripts and insights here.
          </p>
          <button className="btn-primary">
            Start a Call
          </button>
        </div>
      ) : (
        <>
          <div className="stat-cards-grid">
            <StatCard
              title="Total Sessions"
              value={statsData?.totalSessions || 0}
              icon={<PhoneCall size={16} />}
              iconClass="red"
            />
            <StatCard
              title="Average Duration"
              value={formatDuration(statsData?.averageDuration)}
              icon={<Clock size={16} />}
              iconClass="green"
            />
            <StatCard
              title="AI Used"
              value={`${statsData?.totalAIInteractions || 0} times`}
              icon={<Sparkles size={16} />}
              iconClass="emerald"
            />
            <StatCard
              title="Last Session"
              value={
                statsData?.lastSession?.length
                  ? formatRelativeDate(statsData.lastSession[0])
                  : "-"
              }
              icon={<Calendar size={16} />}
              iconClass="indigo"
            />
          </div>

          <RecentCallsTable sessions={sessionsData?.callSessions || []} />
        </>
      )}
    </div>
  );
};

export default Dashboard;
