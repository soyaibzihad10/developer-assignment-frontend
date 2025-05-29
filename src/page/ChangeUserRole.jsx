import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ChangeUserRole = () => {
    const navigate = useNavigate();
    const [userId, setUserId] = useState('');
    const [role, setRole] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [roles, setRoles] = useState([]);

    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    navigate('/login');
                    return;
                }

                const response = await axios.get('http://localhost:8080/api/v1/roles', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
                    withCredentials: true
                });

                if (response.data.roles) {
                    setRoles(response.data.roles);
                }
            } catch (err) {
                setError('Failed to fetch roles');
            }
        };

        fetchRoles();
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        try {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/login');
                return;
            }

            // First, check the user's current role
            const userResponse = await axios.get(
                `http://localhost:8080/api/v1/users/${userId}`,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
                    withCredentials: true
                }
            );

            const userType = userResponse.data.user?.user_type;

            // Check if user is admin, system_admin, or moderator
            if (['admin', 'system_admin', 'moderator'].includes(userType)) {
                setError(`Cannot change role of ${userType.replace('_', ' ')}. This is a protected role.`);
                setLoading(false);
                return;
            }

            const response = await axios.post(
                `http://localhost:8080/api/v1/users/${userId}/role`,
                { role: role.toLowerCase() },
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
                setUserId('');
                setRole('');
            }
        } catch (err) {
            // Handle specific error cases
            if (err.response?.data?.message?.includes('cannot change role of admin') ||
                err.response?.data?.message?.includes('system admin') ||
                err.response?.data?.message?.includes('moderator')) {
                setError('Cannot change role of admin, system admin, or moderator. This is a protected role.');
            } else {
                setError(err.response?.data?.message || 'Failed to change role');
            }
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

                    <div className="px-8 py-6">
                        {error && (
                            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                                {error}
                            </div>
                        )}

                        {success && (
                            <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
                                {success}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    User ID
                                </label>
                                <input
                                    type="text"
                                    value={userId}
                                    onChange={(e) => setUserId(e.target.value.trim())}
                                    placeholder="Enter user ID"
                                    className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                                <p className="mt-1 text-sm text-gray-500">
                                    Note: Cannot change roles of admin, system admin, or moderator users
                                </p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    New Role
                                </label>
                                <select
                                    value={role}
                                    onChange={(e) => setRole(e.target.value)}
                                    className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                                    required
                                >
                                    <option value="">Select a role</option>
                                    {roles.map(role => (
                                        <option key={role.id} value={role.name}>
                                            {role.name.charAt(0).toUpperCase() + role.name.slice(1)}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="flex space-x-4">
                                <button
                                    type="button"
                                    onClick={() => navigate('/dashboard')}
                                    className="flex-1 p-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={loading || !userId || !role}
                                    className={`flex-1 p-2 bg-blue-500 text-white rounded hover:bg-blue-600 
                                        ${loading || !userId || !role ? 'opacity-50 cursor-not-allowed' : ''}`}
                                >
                                    {loading ? 'Updating...' : 'Change Role'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChangeUserRole; 