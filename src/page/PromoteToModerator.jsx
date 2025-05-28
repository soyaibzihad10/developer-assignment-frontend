import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const PromoteToModerator = () => {
    const navigate = useNavigate();
    const [userId, setUserId] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [userData, setUserData] = useState(null);

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

                // Check if user is already a moderator or higher
                if (['moderator', 'admin', 'system_admin'].includes(fetchedUserData.user_type)) {
                    setError('User already has moderator or higher privileges');
                    setUserData(null);
                    return;
                }

                setUserData(fetchedUserData);
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

    const handlePromote = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('No authentication token found');
            }

            const response = await axios.post(
                `http://localhost:8080/api/v1/users/${userId}/promote/moderator`,
                {},
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    withCredentials: true
                }
            );

            if (response.data.status === 'success') {
                setSuccess('User promoted to moderator successfully');
                // Reset form after successful promotion
                setTimeout(() => {
                    setUserData(null);
                    setUserId('');
                    setSuccess('');
                }, 2000);
            }
        } catch (err) {
            console.error('Promotion Error:', err);
            setError(err.response?.data?.message || 'Failed to promote user to moderator');
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
                            <span className="w-2 h-8 bg-[#22D3EE] rounded-full mr-3" />
                            Promote to Moderator
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
                                        placeholder="Enter user ID to promote"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md 
                                                 focus:ring-[#22D3EE] focus:border-[#22D3EE]"
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
                                        className={`flex-1 px-6 py-3 bg-[#22D3EE] text-white rounded-md 
                                                 hover:bg-cyan-600 transition-all
                                                 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    >
                                        {loading ? 'Searching...' : 'Search User'}
                                    </button>
                                </div>
                            </div>
                        </form>
                    ) : (
                        // Step 2: Confirmation and promotion
                        <form onSubmit={handlePromote} className="px-8 py-6">
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
                                        value={userData.user_type}
                                        className="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-md text-gray-500"
                                        disabled
                                    />
                                </div>

                                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                                    <div className="flex">
                                        <div className="ml-3">
                                            <p className="text-sm text-yellow-700">
                                                Are you sure you want to promote this user to moderator?
                                                This action will give them additional privileges.
                                            </p>
                                        </div>
                                    </div>
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
                                        className={`flex-1 px-6 py-3 bg-[#22D3EE] text-white rounded-md 
                                                 hover:bg-cyan-600 transition-all
                                                 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    >
                                        {loading ? 'Promoting...' : 'Promote to Moderator'}
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

export default PromoteToModerator; 