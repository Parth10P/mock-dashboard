import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

const Layout = ({ activeUser, toggleUser }) => {
  return (
    <div className="flex h-screen overflow-hidden bg-[#F9FAFB]">
      <Sidebar />

      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <Header activeUser={activeUser} toggleUser={toggleUser} />

        <main className="flex-1 overflow-y-auto px-6 py-6 md:px-8 md:py-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
