import React from 'react';
import { Link } from 'react-router-dom';
import UserDashboard from './UserDashboard';
import AdminDashboard from './AdminDashboard';

const SystemAdminDashboard = () => {

  // System Admin-specific action
  const systemAdminActions = [
    {
      name: 'Promote to Admin',
      path: '/users/promote-admin',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      color: '#9333EA'
    }
  ];

  return (
    <section className="p-8 max-w-6xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <AdminDashboard />

        {/* Render system admin-specific actions */}
        <div className="mt-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">System Admin Actions</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {systemAdminActions.map((action, index) => {
              const card = (
                <div
                  className="p-6 bg-white rounded-xl shadow-sm transition-all duration-300 
                           hover:shadow-md group relative overflow-hidden"
                  style={{
                    backgroundColor: `${action.color}08`,
                    borderLeft: `4px solid ${action.color}`
                  }}
                >
                  <div className="flex items-start space-x-4">
                    <div
                      className="p-3 rounded-lg transition-colors duration-300"
                      style={{ backgroundColor: `${action.color}15` }}
                    >
                      <div style={{ color: action.color }}>
                        {action.icon}
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-lg font-medium text-gray-700 group-hover:text-black transition-colors duration-300">
                        {action.name}
                      </span>
                      <span className="text-sm text-gray-500 mt-1">
                        Click to manage
                      </span>
                    </div>
                  </div>
                </div>
              );

              return action.path ? (
                <Link key={index} to={action.path}>
                  {card}
                </Link>
              ) : (
                <button key={index} onClick={() => console.log(`Clicked ${action.name}`)}>
                  {card}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SystemAdminDashboard;