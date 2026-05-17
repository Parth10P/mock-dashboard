import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';

function App() {
  const [activeUser, setActiveUser] = useState(
    localStorage.getItem('hintro_user') || 'u2'
  );

  useEffect(() => {
    localStorage.setItem('hintro_user', activeUser);
  }, [activeUser]);

  const toggleUser = () => {
    setActiveUser(prev => prev === 'u1' ? 'u2' : 'u1');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Routes>
        <Route path="/" element={<Layout activeUser={activeUser} toggleUser={toggleUser} />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard activeUser={activeUser} />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
