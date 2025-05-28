import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const PermissionDetails = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [permissionId, setPermissionId] = useState('');
    const [permission, setPermission] = useState(null);

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!permissionId.trim()) {
            setError('Please enter a permission ID');
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

            const response = await axios.get(`http://localhost:8080/api/v1/permissions/${permissionId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });

            if (response.data && response.data.status === 'success') {
                setPermission(response.data.permission);
                console.log(response.data);
            }
        } catch (err) {
            console.error('Error fetching permission details:', err);
            setError(err.response?.data?.message || 'Permission not found');
            setPermission(null);
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
                            <span className="w-2 h-8 bg-[#D97706] rounded-full mr-3"></span>
                            Permission Details
                        </h2>
                    </div>

                    <div className="px-8 py-6">
                        <form onSubmit={handleSearch} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Permission ID
                                </label>
                                <input
                                    type="text"
                                    value={permissionId}
                                    onChange={(e) => setPermissionId(e.target.value)}
                                    placeholder="Enter permission ID"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md 
                                             focus:ring-[#D97706] focus:border-[#D97706]"
                                    required
                                />
                            </div>

                            {error && (
                                <div className="p-4 bg-red-50 border-l-4 border-red-500 text-red-700">
                                    {error}
                                </div>
                            )}

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
                                    className={`flex-1 px-6 py-3 bg-[#D97706] text-white rounded-md 
                                             hover:bg-amber-600 transition-all
                                             ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                >
                                    {loading ? 'Searching...' : 'Search'}
                                </button>
                            </div>
                        </form>

                        {permission && (
                            <div className="mt-8">
                                <div className="bg-gray-50 rounded-lg p-6">
                                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                                        Permission Information
                                    </h3>
                                    <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                                        <div>
                                            <dt className="text-sm font-medium text-gray-500">Name</dt>
                                            <dd className="mt-1 text-sm text-gray-900">{permission.name}</dd>
                                        </div>
                                        <div>
                                            <dt className="text-sm font-medium text-gray-500">ID</dt>
                                            <dd className="mt-1 text-sm text-gray-900">{permission.id}</dd>
                                        </div>
                                        <div>
                                            <dt className="text-sm font-medium text-gray-500">Resource</dt>
                                            <dd className="mt-1 text-sm text-gray-900">{permission.resource}</dd>
                                        </div>
                                        <div>
                                            <dt className="text-sm font-medium text-gray-500">Action</dt>
                                            <dd className="mt-1 text-sm text-gray-900">{permission.action}</dd>
                                        </div>
                                        <div className="sm:col-span-2">
                                            <dt className="text-sm font-medium text-gray-500">Description</dt>
                                            <dd className="mt-1 text-sm text-gray-900">
                                                {permission.description || 'No description available'}
                                            </dd>
                                        </div>
                                        <div>
                                            <dt className="text-sm font-medium text-gray-500">Created At</dt>
                                            <dd className="mt-1 text-sm text-gray-900">
                                                {new Date(permission.created_at).toLocaleString()}
                                            </dd>
                                        </div>
                                        <div>
                                            <dt className="text-sm font-medium text-gray-500">Updated At</dt>
                                            <dd className="mt-1 text-sm text-gray-900">
                                                {new Date(permission.updated_at).toLocaleString()}
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

export default PermissionDetails; 