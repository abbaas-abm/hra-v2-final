import { Link } from '@tanstack/react-router';
import  { useState } from 'react';
import { FaTruck, FaBell, FaList, FaWallet, FaUserAlt } from 'react-icons/fa';

const DriverDashboardSidebar = () => {
  const [activeTab, setActiveTab] = useState('Profile');

  const tabs = [
    { name: 'Profile', url: '/dashboard/driver/', icon: <FaUserAlt className="text-yellow-500" /> },
    { name: 'Active Deliveries', url: '/dashboard/driver/active-deliveries', icon: <FaTruck className="text-yellow-500" /> },
    { name: 'New Deliveries' ,url: '/dashboard/driver/new-deliveries', icon: <FaBell className="text-yellow-500" /> },
    { name: 'My Deliveries' ,url: '/dashboard/driver/my-deliveries', icon: <FaList className="text-yellow-500" /> },
    { name: 'Balance' ,url: '/dashboard/driver/balance', icon: <FaWallet className="text-yellow-500" /> },
  ];

  return (
    <aside className="bg-white fixed left-0 top-0 bottom-0 h-screen w-16 md:w-64 flex flex-col shadow-lg transition-all duration-300 overflow-hidden">
      <div className="flex items-center justify-center md:justify-start p-4 border-b border-gray-200">
        <h1 className="text-xl font-bold text-yellow-600 hidden md:block">Dashboard</h1>
      </div>
      <nav className="flex-1">
        <ul className="space-y-2 p-2">
          {tabs.map((tab) => (
            <li key={tab.name} onClick={() => setActiveTab(tab.name)}>
              <Link to={tab.url}>
                <button
                className={`w-full flex items-center p-3 rounded-lg transition-colors cursor-pointer ${
                  activeTab === tab.name
                    ? 'bg-yellow-100 text-yellow-700'
                    : 'text-gray-700 hover:bg-yellow-50'
                }`}
              >
                <span className="text-2xl">{tab.icon}</span>
                <span className="ml-3 hidden md:block">{tab.name}</span>
              </button>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default DriverDashboardSidebar;