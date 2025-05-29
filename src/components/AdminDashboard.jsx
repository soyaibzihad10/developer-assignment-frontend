import React from 'react';
import { Link } from 'react-router-dom';
import ModeratorDashboard from './ModeratorDashboard';

const AdminDashboard = () => {
  const adminActions = [
    {
      name: 'List All Users',
      path: '/users/list-all',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
        </svg>
      ),
      color: '#10B981'
    },
    {
      name: 'Update Users',
      path: '/users/update',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      ),
      color: '#3B82F6'
    },
    {
      name: 'Change User Role',
      path: '/users/change-role',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m-12 1h12m-4 4l4-4m-4 4l4 4" />
        </svg>
      ),
      color: '#F59E0B'
    },
    {
      name: 'Promote to Moderator',
      path: '/users/promote',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
        </svg>
      ),
      color: '#22D3EE'
    },
    {
      name: 'Demote Role',
      path: '/users/demote',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      ),
      color: '#EC4899'
    },
    {
      name: 'List All Roles',
      path: '/roles/list',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M3 14h18m-9-8v12" />
        </svg>
      ),
      color: '#6B7280'
    },
    {
      name: 'Get Role Details',
      path: '/roles/details',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      color: '#14B8A6'
    },
    {
      name: 'Create Role',
      path: '/roles/create',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
        </svg>
      ),
      color: '#8B5CF6'
    },
    {
      name: 'Update Role',
      path: '/roles/update',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-3-3v6m-7 5h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v11a2 2 0 002 2z" />
        </svg>
      ),
      color: '#F97316'
    },
    {
      name: 'Delete Role',
      path: '/roles/delete',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      ),
      color: '#EF4444'
    },
    {
      name: 'List All Permissions',
      path: '/permissions/list',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      ),
      color: '#4B5563'
    },
    {
      name: 'Get Permission Details',
      path: '/permissions/details',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 10h.01M15 10h.01M12 14h.01" />
        </svg>
      ),
      color: '#D97706'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Include Moderator Dashboard at the top */}
      <ModeratorDashboard />

      {/* Admin Actions Section */}
      <section className="p-8 max-w-6xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-3xl font-semibold text-gray-800 mb-8 flex items-center">
            <span className="w-2 h-8 bg-[#3B82F6] rounded-full mr-3"></span>
            Admin Actions
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {adminActions.map((action, index) => {
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
                <button
                  key={index}
                  onClick={() => console.log(`Clicked ${action.name}`)}
                >
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

export default AdminDashboard;