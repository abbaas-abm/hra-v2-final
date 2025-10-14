import { Link } from '@tanstack/react-router';
import  { useState } from 'react';
import { FaTruck, FaWallet, FaUserAlt, FaUserEdit } from 'react-icons/fa';
import { FaMoneyBill } from 'react-icons/fa6';

const AdminPanelNavigation = () => {
  const [activeTab, setActiveTab] = useState('Orders');

  const tabs = [
    { name: 'Orders', url: '/dashboard/admin/orders', icon: <FaUserAlt className="text-yellow-500" /> },
    { name: 'Drivers', url: '/dashboard/admin/drivers', icon: <FaTruck className="text-yellow-500" /> },
    { name: 'Pending Drivers' ,url: '/dashboard/admin/pending-drivers', icon: <FaUserEdit className="text-yellow-500" /> },
    { name: 'Payments' ,url: '/dashboard/admin/payments', icon: <FaWallet className="text-yellow-500" /> },
    { name: 'Revenue' ,url: '/dashboard/admin/revenue', icon: <FaMoneyBill className="text-yellow-500" /> },
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

export default AdminPanelNavigation;