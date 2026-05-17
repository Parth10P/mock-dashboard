import { Play, ChevronDown, Menu } from 'lucide-react';
import { useState, useEffect } from 'react';
import { fetchProfile } from '../../utils/api';
import './Header.css';

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

  const initial = profile ? profile.firstName.charAt(0) : '';

  return (
    <header className="header-container">
      <div className="header-left">
        <button className="header-menu-btn">
          <Menu size={20} />
        </button>
        <h2 className="header-title">Dashboard</h2>
      </div>

      <div className="header-right">
        <div className="header-user-switcher">
          <button
            onClick={() => activeUser !== 'u1' && toggleUser()}
            className={`switcher-btn ${activeUser === 'u1' ? 'active' : ''}`}
          >
            U1
          </button>
          <button
            onClick={() => activeUser !== 'u2' && toggleUser()}
            className={`switcher-btn ${activeUser === 'u2' ? 'active' : ''}`}
          >
            U2
          </button>
        </div>

        <button className="header-tutorial-btn">
          <Play size={12} />
          Watch Tutorial
        </button>

        <button className="header-avatar-btn">
          <div className="header-avatar">
            {initial}
          </div>
          <ChevronDown size={14} className="avatar-chevron" />
        </button>
      </div>
    </header>
  );
};

export default Header;
