import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const RoleDetails = () => {
    const navigate = useNavigate();
    const [roleId, setRoleId] = useState('');
    const [roleData, setRoleData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const fetchRoleDetails = async (e) => {
        e.preventDefault();
        if (!roleId.trim()) {
            setError('Please enter a role ID');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const token = localStorage.getItem('token');
            const user = JSON.parse(localStorage.getItem('user'));

            if (!token || !['admin', 'system_admin'].includes(user.user_type)) {
                navigate('/dashboard');
                return;
            }

            const response = await axios.get(`http://localhost:8080/api/v1/roles/${roleId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                withCredentials: true
            });

            if (response.data) {
                setRoleData(response.data);
            }
        } catch (err) {
            console.error('Error fetching role details:', err);
            setError(err.response?.data?.message || 'Role not found');
            setRoleData(null);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    <div className="px-8 py-6 border-b border-gray-200">
                        <h2 className="text-2xl font-semibold text-gray-800 flex items-center">
                            <span className="w-2 h-8 bg-[#14B8A6] rounded-full mr-3"></span>
                            Role Details
                        </h2>
                    </div>

                    <div className="px-8 py-6">
                        {/* Search Form */}
                        <form onSubmit={fetchRoleDetails} className="space-y-6 mb-8">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Role ID
                                </label>
                                <input
                                    type="text"
                                    value={roleId}
                                    onChange={(e) => setRoleId(e.target.value)}
                                    placeholder="Enter role ID"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md 
                                             focus:ring-[#14B8A6] focus:border-[#14B8A6]"
                                    required
                                />
                            </div>

                            <div className="flex space-x-4">
                                <button
                                    type="button"
                                    onClick={() => navigate('/dashboard')}
                                    className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-md 
                                             hover:bg-gray-200 transition-all"
                                >
                                    Back
                                </button>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className={`flex-1 px-6 py-3 bg-[#14B8A6] text-white rounded-md 
                                             hover:bg-teal-600 transition-all
                                             ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                >
                                    {loading ? 'Searching...' : 'Search Role'}
                                </button>
                            </div>
                        </form>

                        {/* Error Message */}
                        {error && (
                            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700">
                                {error}
                            </div>
                        )}

                        {/* Role Details */}
                        {roleData && (
                            <div className="bg-gray-50 rounded-lg p-6 space-y-6">
                                <div>
                                    <h3 className="text-lg font-medium text-gray-900 mb-4">Role Information</h3>
                                    <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                                        <div>
                                            <dt className="text-sm font-medium text-gray-500">Role Name</dt>
                                            <dd className="mt-1 text-sm text-gray-900">{roleData.name}</dd>
                                        </div>
                                        <div>
                                            <dt className="text-sm font-medium text-gray-500">Role ID</dt>
                                            <dd className="mt-1 text-sm text-gray-900">{roleData.id}</dd>
                                        </div>
                                        <div className="sm:col-span-2">
                                            <dt className="text-sm font-medium text-gray-500">Description</dt>
                                            <dd className="mt-1 text-sm text-gray-900">
                                                {roleData.description || 'No description available'}
                                            </dd>
                                        </div>
                                        <div className="sm:col-span-2">
                                            <dt className="text-sm font-medium text-gray-500">Permissions</dt>
                                            <dd className="mt-2">
                                                <div className="flex flex-wrap gap-2">
                                                    {roleData.permissions?.map((permission, index) => (
                                                        <span
                                                            key={index}
                                                            className="inline-flex items-center px-3 py-1 rounded-full 
                                                                     text-sm font-medium bg-teal-100 text-teal-800"
                                                        >
                                                            {permission}
                                                        </span>
                                                    )) || 'No permissions assigned'}
                                                </div>
                                            </dd>
                                        </div>
                                        <div>
                                            <dt className="text-sm font-medium text-gray-500">Created At</dt>
                                            <dd className="mt-1 text-sm text-gray-900">
                                                {new Date(roleData.created_at).toLocaleString()}
                                            </dd>
                                        </div>
                                        <div>
                                            <dt className="text-sm font-medium text-gray-500">Last Updated</dt>
                                            <dd className="mt-1 text-sm text-gray-900">
                                                {new Date(roleData.updated_at).toLocaleString()}
                                            </dd>
                                        </div>
                                    </dl>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RoleDetails; 