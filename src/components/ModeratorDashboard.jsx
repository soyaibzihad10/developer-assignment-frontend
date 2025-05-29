import React from 'react';
import { Link } from 'react-router-dom';
import UserDashboard from './UserDashboard';

const ModeratorDashboard = () => {
  // Moderator-specific actions
  const moderatorActions = [
    {
      name: 'See user details',
      path: '/users/details',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v2h5v-2m-3.356-4.857a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      color: '#8B5CF6'
    },
    {
      name: 'Delete User',
      path: '/users/delete',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7a3 3 0 11-6 0 3 3 0 016 0zm6 12H5m14 0a2 2 0 01-2-2v-1m-4 3v-6m-4 6V7" />
        </svg>
      ),
      color: '#EF4444'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Include User Dashboard at the top */}
      <UserDashboard />

      {/* Moderator Actions Section */}
      <section className="p-8 max-w-6xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-3xl font-semibold text-gray-800 mb-8 flex items-center">
            <span className="w-2 h-8 bg-[#8B5CF6] rounded-full mr-3"></span>
            Moderator Actions
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {moderatorActions.map((action, index) => {
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
                <Link to={action.path} key={index}>
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
      </section>
    </div>
  );
};

export default ModeratorDashboard;