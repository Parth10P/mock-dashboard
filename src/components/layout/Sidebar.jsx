import { LayoutDashboard, PhoneCall, BookOpen, MessageSquare, Grid2X2, Inbox, Gift } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  const mainItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: PhoneCall, label: 'Call Insights', path: '/insights' },
    { icon: BookOpen, label: 'Knowledge Base', path: '/knowledge', badge: true },
    { icon: MessageSquare, label: 'Prompts', path: '/prompts', badge: true },
    { icon: Grid2X2, label: 'Boxy Controls', path: '/boxy', badge: true },
  ];

  const bottomItems = [
    { icon: Inbox, label: 'Feedback History', path: '/feedback-history' },
    { icon: Gift, label: 'Feedback', path: '/feedback' },
  ];

  return (
    <aside className="hidden md:flex flex-col w-[250px] bg-white border-r border-gray-200 py-6 justify-between h-full shrink-0">
      <div>
        <div className="px-6 mb-6">
          <span className="text-xl font-bold text-gray-900 tracking-tight">Hintro</span>
        </div>

        <nav className="flex flex-col gap-1 px-3">
          {mainItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`
              }
            >
              <div className="flex items-center gap-3">
                <item.icon className="w-[18px] h-[18px]" />
                {item.label}
              </div>
              {item.badge && (
                <span className="w-5 h-5 rounded-full border border-gray-300 flex items-center justify-center text-[10px] text-gray-400 font-medium">
                  !
                </span>
              )}
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="px-3">
        <div className="h-px bg-gray-200 mx-2 mb-3"></div>

        <div className="flex flex-col gap-1 mb-4">
          {bottomItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`
              }
            >
              <item.icon className="w-[18px] h-[18px]" />
              {item.label}
            </NavLink>
          ))}
        </div>

        <button className="w-full bg-gray-800 text-white rounded-lg py-2.5 text-sm font-medium hover:bg-gray-900 transition-colors">
          Upgrade
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
