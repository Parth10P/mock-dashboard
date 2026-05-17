import { LayoutDashboard, PhoneCall, BookOpen, MessageSquare, Grid2X2, Inbox, Gift, Info } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = ({ usage }) => {
  const mainItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: PhoneCall, label: 'Call Insights', path: '/insights' },
    { icon: BookOpen, label: 'Knowledge Base', path: '/knowledge', hasInfo: true },
    { icon: MessageSquare, label: 'Prompts', path: '/prompts', hasInfo: true },
    { icon: Grid2X2, label: 'Boxy Controls', path: '/boxy', hasInfo: true },
  ];

  const bottomItems = [
    { icon: Inbox, label: 'Feedback History', path: '/feedback-history' },
    { icon: Gift, label: 'Feedback', path: '/feedback' },
  ];

  const kbUsed = usage?.kb_files?.used || 0;
  const kbLimit = usage?.kb_files?.limit || 1000;

  return (
    <aside className="sidebar-container">
      <div className="sidebar-top">
        <div className="sidebar-logo">
          <span>Hintro</span>
        </div>

        <nav className="sidebar-nav">
          {mainItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.path}
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              <div className="nav-link-left">
                <item.icon size={16} />
                {item.label}
              </div>
              {item.hasInfo && (
                <Info size={14} className="nav-link-info" />
              )}
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="sidebar-bottom">
        <div className="sidebar-divider"></div>

        <div className="sidebar-nav-bottom">
          {bottomItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.path}
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              <item.icon size={16} />
              {item.label}
            </NavLink>
          ))}
        </div>

        <div className="sidebar-usage">
          <p className="usage-text">
            <span>{kbUsed}</span> of <span>{kbLimit}</span> hours used
          </p>
          <div className="usage-bar-bg">
            <div
              className="usage-bar-fill"
              style={{ width: `${Math.min((kbUsed / kbLimit) * 100, 100)}%` }}
            ></div>
          </div>
        </div>

        <button className="upgrade-btn">
          Upgrade
        </button>

        <p className="sidebar-footer">
          © 2025 Hintro. Made in India 🇮🇳
        </p>
      </div>
    </aside>
  );
};

export default Sidebar;
