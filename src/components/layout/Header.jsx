import { Menu, ChevronDown } from 'lucide-react';
import { useState, useEffect } from 'react';
import { fetchProfile } from '../../utils/api';

const Header = ({ activeUser, toggleUser }) => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const getProfile = async () => {
      try {
        const data = await fetchProfile(activeUser);
        setProfile(data);
      } catch (error) {
        console.error('Failed to fetch profile', error);
      }
    };
    getProfile();
  }, [activeUser]);

  const initials = profile
    ? `${profile.firstName.charAt(0)}${profile.lastName.charAt(0)}`
    : '';

  return (
    <header className="h-16 bg-white border-b border-gray-200 px-4 md:px-6 flex items-center justify-between shrink-0">
      <div className="flex items-center gap-3">
        <button className="md:hidden p-1.5 text-gray-500 hover:bg-gray-100 rounded-lg">
          <Menu className="w-5 h-5" />
        </button>
        <h2 className="text-lg font-semibold text-gray-900">Dashboard</h2>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden sm:flex items-center gap-1 bg-gray-100 p-1 rounded-lg">
          <button
            onClick={() => activeUser !== 'u1' && toggleUser()}
            className={`px-2.5 py-1 text-[11px] font-semibold rounded-md transition-colors ${
              activeUser === 'u1'
                ? 'bg-white shadow-sm text-gray-800'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            U1
          </button>
          <button
            onClick={() => activeUser !== 'u2' && toggleUser()}
            className={`px-2.5 py-1 text-[11px] font-semibold rounded-md transition-colors ${
              activeUser === 'u2'
                ? 'bg-white shadow-sm text-gray-800'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            U2
          </button>
        </div>

        <button className="hidden md:flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
          Watch Tutorial
        </button>

        <button className="flex items-center gap-2 p-1 rounded-lg hover:bg-gray-50 transition-colors">
          <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-bold">
            {initials}
          </div>
          <ChevronDown className="w-4 h-4 text-gray-500 hidden md:block" />
        </button>
      </div>
    </header>
  );
};

export default Header;
