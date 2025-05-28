import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const UpdateUser = () => {
    const navigate = useNavigate();
    const [userId, setUserId] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [userData, setUserData] = useState(null);

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        first_name: '',
        last_name: ''
    });

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
                setFormData({
                    username: fetchedUserData.username || '',
                    email: fetchedUserData.email || '',
                    first_name: fetchedUserData.first_name || '',
                    last_name: fetchedUserData.last_name || ''
                });
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
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

            // Only include fields that have been modified
            const updateData = {};
            Object.keys(formData).forEach(key => {
                if (formData[key].trim() && formData[key] !== userData[key]) {
                    updateData[key] = formData[key];
                }
            });

            if (Object.keys(updateData).length === 0) {
                setError('No changes made to update');
                setLoading(false);
                return;
            }

            const response = await axios.put(
                `http://localhost:8080/api/v1/users/${userId}`,
                updateData,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    withCredentials: true
                }
            );

            if (response.data.status === 'success') {
                setSuccess('User updated successfully');
                // Reset form after successful update
                setTimeout(() => {
                    setUserData(null);
                    setUserId('');
                    setFormData({
                        username: '',
                        email: '',
                        first_name: '',
                        last_name: ''
                    });
                    setSuccess('');
                }, 2000);
            }
        } catch (err) {
            console.error('Update Error:', err);
            setError(err.response?.data?.message || 'Failed to update user');
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
                            <span className="w-2 h-8 bg-[#3B82F6] rounded-full mr-3" />
                            Update User
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
                                        placeholder="Enter user ID to update"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md 
                                                 focus:ring-[#3B82F6] focus:border-[#3B82F6]"
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
                                        className={`flex-1 px-6 py-3 bg-[#3B82F6] text-white rounded-md 
                                                 hover:bg-blue-600 transition-all
                                                 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    >
                                        {loading ? 'Searching...' : 'Search User'}
                                    </button>
                                </div>
                            </div>
                        </form>
                    ) : (
                        // Step 2: Update user form
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
                                        name="username"
                                        value={formData.username}
                                        onChange={handleChange}
                                        placeholder="Enter username"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md 
                                                 focus:ring-[#3B82F6] focus:border-[#3B82F6]"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="Enter email"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md 
                                                 focus:ring-[#3B82F6] focus:border-[#3B82F6]"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        First Name
                                    </label>
                                    <input
                                        type="text"
                                        name="first_name"
                                        value={formData.first_name}
                                        onChange={handleChange}
                                        placeholder="Enter first name"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md 
                                                 focus:ring-[#3B82F6] focus:border-[#3B82F6]"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Last Name
                                    </label>
                                    <input
                                        type="text"
                                        name="last_name"
                                        value={formData.last_name}
                                        onChange={handleChange}
                                        placeholder="Enter last name"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md 
                                                 focus:ring-[#3B82F6] focus:border-[#3B82F6]"
                                    />
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
                                        className={`flex-1 px-6 py-3 bg-[#3B82F6] text-white rounded-md 
                                                 hover:bg-blue-600 transition-all
                                                 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    >
                                        {loading ? 'Updating...' : 'Update User'}
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

export default UpdateUser; 