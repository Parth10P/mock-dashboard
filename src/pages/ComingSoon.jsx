import { Construction } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import './ComingSoon.css';

const ComingSoon = () => {
  const location = useLocation();
  const pageName = location.pathname.replace('/', '').replace(/-/g, ' ');

  return (
    <div className="coming-soon-container">
      <div className="coming-soon-icon-wrap">
        <Construction size={28} className="coming-soon-icon" />
      </div>
      <h2 className="coming-soon-title">{pageName}</h2>
      <p className="coming-soon-text">
        This page is coming soon. Stay tuned!
      </p>
    </div>
  );
};

export default ComingSoon;
