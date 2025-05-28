import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const DeleteRole = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [roleId, setRoleId] = useState('');
    const [roleData, setRoleData] = useState(null);
    const [showConfirmation, setShowConfirmation] = useState(false);

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
                setShowConfirmation(true);
            }
        } catch (err) {
            console.error('Error fetching role details:', err);
            setError(err.response?.data?.message || 'Role not found');
            setRoleData(null);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        setLoading(true);
        setError('');
        setSuccess('');

        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('No authentication token found');
            }

            await axios.delete(`http://localhost:8080/api/v1/roles/${roleId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                withCredentials: true
            });

            setSuccess('Role deleted successfully');
            // Reset form after successful deletion
            setTimeout(() => {
                setRoleData(null);
                setRoleId('');
                setShowConfirmation(false);
                setSuccess('');
            }, 2000);
        } catch (err) {
            console.error('Error deleting role:', err);
            setError(err.response?.data?.message || 'Failed to delete role');
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
                            <span className="w-2 h-8 bg-[#EF4444] rounded-full mr-3"></span>
                            Delete Role
                        </h2>
                    </div>

                    <div className="px-8 py-6">
                        {!showConfirmation ? (
                            // Step 1: Search for role
                            <form onSubmit={fetchRoleDetails} className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Role ID
                                    </label>
                                    <input
                                        type="text"
                                        value={roleId}
                                        onChange={(e) => setRoleId(e.target.value)}
                                        placeholder="Enter role ID to delete"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md 
                                                 focus:ring-[#EF4444] focus:border-[#EF4444]"
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
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className={`flex-1 px-6 py-3 bg-[#EF4444] text-white rounded-md 
                                                 hover:bg-red-600 transition-all
                                                 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    >
                                        {loading ? 'Searching...' : 'Search Role'}
                                    </button>
                                </div>
                            </form>
                        ) : (
                            // Step 2: Confirmation
                            <div className="space-y-6">
                                {error && (
                                    <div className="p-4 bg-red-50 border-l-4 border-red-500 text-red-700">
                                        {error}
                                    </div>
                                )}

                                {success && (
                                    <div className="p-4 bg-green-50 border-l-4 border-green-500 text-green-700">
                                        {success}
                                    </div>
                                )}

                                <div className="bg-gray-50 rounded-lg p-6">
                                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                                        Role Information
                                    </h3>
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
                                    </dl>
                                </div>

                                <div className="bg-red-50 border-l-4 border-red-500 p-4">
                                    <div className="flex">
                                        <div className="flex-shrink-0">
                                            <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <div className="ml-3">
                                            <p className="text-sm text-red-700">
                                                Are you sure you want to delete this role? This action cannot be undone.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex space-x-4">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setRoleData(null);
                                            setRoleId('');
                                            setShowConfirmation(false);
                                            setError('');
                                        }}
                                        className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-md 
                                                 hover:bg-gray-200 transition-all"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleDelete}
                                        disabled={loading}
                                        className={`flex-1 px-6 py-3 bg-[#EF4444] text-white rounded-md 
                                                 hover:bg-red-600 transition-all
                                                 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    >
                                        {loading ? 'Deleting...' : 'Confirm Delete'}
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeleteRole; 