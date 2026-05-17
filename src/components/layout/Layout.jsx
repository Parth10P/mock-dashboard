import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import './Layout.css';

const Layout = ({ activeUser, toggleUser, usage }) => {
  return (
    <div className="layout-container">
      <Sidebar usage={usage} />

      <div className="layout-content">
        <Header activeUser={activeUser} toggleUser={toggleUser} />

        <main className="layout-main">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
