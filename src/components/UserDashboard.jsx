import React from 'react';
import { Link } from 'react-router-dom';

const UserDashboard = () => {

  const actions = [
    {
      name: 'View Profile',
      path: '/profile',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      ),
      color: '#34A853'
    },
    {
      name: 'Update Profile',
      path: '/profile/update',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
      color: '#4285F4'
    },
    {
      name: 'Password Reset Request',
      path: '/password-reset-request',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
        </svg>
      ),
      color: '#FBBC05'
    },
    {
      name: 'Delete Request',
      path: '/request-deletion',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      ),
      color: '#EA4335'
    },
    {
      name: 'My Permissions',
      path: '/my-permissions',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      color: '#0EA5E9'
    }
  ];

  return (
    <section className="p-8 max-w-6xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-3xl font-semibold text-gray-800 mb-8 flex items-center">
          <span className="w-2 h-8 bg-[#4285F4] rounded-full mr-3"></span>
          User Dashboard
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {actions.map((action, index) => {
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

            // If action has a path, use Link
            return action.path ? (
              <Link to={action.path} key={index}>
                {card}
              </Link>
            ) : (
              <button key={index} onClick={(() => console.log(`Clicked ${action.name}`))}>
                {card}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default UserDashboard;
