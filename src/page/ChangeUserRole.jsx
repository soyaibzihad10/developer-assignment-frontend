import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ChangeUserRole = () => {
    const navigate = useNavigate();
    const [userId, setUserId] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [currentRole, setCurrentRole] = useState('');
    const [selectedRole, setSelectedRole] = useState('');
    const [userData, setUserData] = useState(null);

    // Available roles (excluding admin, system_admin, and moderator as per backend validation)
    const availableRoles = ['user', 'premium_user', 'basic_user'];

    const fetchUserData = async (id) => {
        try {
            setLoading(true);
            setError('');

            const token = localStorage.getItem('token');
            const user = JSON.parse(localStorage.getItem('user'));

            if (!token || !['admin', 'system_admin'].includes(user.user_type)) {
                navigate('/dashboard');
                return;
            }

            const response = await axios.get(`http://localhost:8080/api/v1/users/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                withCredentials: true
            });

            if (response.data.status === 'success') {
                const fetchedUserData = response.data.user;
                setUserData(fetchedUserData);
                setCurrentRole(fetchedUserData.user_type);
                setSelectedRole(fetchedUserData.user_type);
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to fetch user data');
            setUserData(null);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!userId.trim()) {
            setError('Please enter a user ID');
            return;
        }
        await fetchUserData(userId.trim());
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('No authentication token found');
            }

            // Don't submit if role hasn't changed
            if (currentRole === selectedRole) {
                setError('Please select a different role');
                setLoading(false);
                return;
            }

            // Don't allow changing to admin, system_admin, or moderator
            if (['admin', 'system_admin', 'moderator'].includes(selectedRole)) {
                setError('Cannot change role to admin, system admin, or moderator');
                setLoading(false);
                return;
            }

            const response = await axios.post(
                `http://localhost:8080/api/v1/users/${userId}/role`,
                { role: selectedRole },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    withCredentials: true
                }
            );

            if (response.data.status === 'success') {
                setSuccess('Role updated successfully');
                // Reset form after successful update
                setTimeout(() => {
                    setUserData(null);
                    setUserId('');
                    setCurrentRole('');
                    setSelectedRole('');
                    setSuccess('');
                }, 2000);
            }
        } catch (err) {
            console.error('Change Role Error:', err);
            setError(err.response?.data?.message || 'Failed to change user role');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    <div className="px-8 py-6 border-b border-gray-200">
                        <h2 className="text-2xl font-semibold text-gray-800 flex items-center">
                            <span className="w-2 h-8 bg-[#F59E0B] rounded-full mr-3" />
                            Change User Role
                        </h2>
                    </div>

                    {!userData ? (
                        // Step 1: Search for user
                        <form onSubmit={handleSearch} className="px-8 py-6">
                            {error && (
                                <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700">
                                    {error}
                                </div>
                            )}

                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        User ID
                                    </label>
                                    <input
                                        type="text"
                                        value={userId}
                                        onChange={(e) => setUserId(e.target.value)}
                                        placeholder="Enter user ID to change role"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md 
                                                 focus:ring-[#F59E0B] focus:border-[#F59E0B]"
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
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className={`flex-1 px-6 py-3 bg-[#F59E0B] text-white rounded-md 
                                                 hover:bg-amber-600 transition-all
                                                 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    >
                                        {loading ? 'Searching...' : 'Search User'}
                                    </button>
                                </div>
                            </div>
                        </form>
                    ) : (
                        // Step 2: Change role form
                        <form onSubmit={handleSubmit} className="px-8 py-6">
                            {error && (
                                <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700">
                                    {error}
                                </div>
                            )}
                            {success && (
                                <div className="mb-6 p-4 bg-green-50 border-l-4 border-green-500 text-green-700">
                                    {success}
                                </div>
                            )}

                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Username
                                    </label>
                                    <input
                                        type="text"
                                        value={userData.username}
                                        className="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-md text-gray-500"
                                        disabled
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Current Role
                                    </label>
                                    <input
                                        type="text"
                                        value={currentRole}
                                        className="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-md text-gray-500"
                                        disabled
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        New Role
                                    </label>
                                    <select
                                        value={selectedRole}
                                        onChange={(e) => setSelectedRole(e.target.value)}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md 
                                                 focus:ring-[#F59E0B] focus:border-[#F59E0B]"
                                        required
                                    >
                                        <option value="">Select a role</option>
                                        {availableRoles.map(role => (
                                            <option key={role} value={role}>
                                                {role.replace('_', ' ').toUpperCase()}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="flex space-x-4">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setUserData(null);
                                            setUserId('');
                                            setError('');
                                        }}
                                        className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-md 
                                                 hover:bg-gray-200 transition-all"
                                    >
                                        Back
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className={`flex-1 px-6 py-3 bg-[#F59E0B] text-white rounded-md 
                                                 hover:bg-amber-600 transition-all
                                                 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    >
                                        {loading ? 'Updating...' : 'Change Role'}
                                    </button>
                                </div>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ChangeUserRole; 