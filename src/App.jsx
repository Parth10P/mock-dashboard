import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import ComingSoon from './pages/ComingSoon';
import './App.css';

function App() {
  const [activeUser, setActiveUser] = useState(
    localStorage.getItem('hintro_user') || 'u2'
  );
  const [usage, setUsage] = useState(null);

  useEffect(() => {
    localStorage.setItem('hintro_user', activeUser);
  }, [activeUser]);

  const toggleUser = () => {
    setActiveUser(prev => prev === 'u1' ? 'u2' : 'u1');
  };

  return (
    <div className="app-container">
      <Routes>
        <Route path="/" element={<Layout activeUser={activeUser} toggleUser={toggleUser} usage={usage} />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard activeUser={activeUser} onUsageLoaded={setUsage} />} />
          <Route path="insights" element={<ComingSoon />} />
          <Route path="knowledge" element={<ComingSoon />} />
          <Route path="prompts" element={<ComingSoon />} />
          <Route path="boxy" element={<ComingSoon />} />
          <Route path="feedback-history" element={<ComingSoon />} />
          <Route path="feedback" element={<ComingSoon />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
