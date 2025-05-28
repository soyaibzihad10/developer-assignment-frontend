import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const PromoteToAdmin = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [userId, setUserId] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!userId.trim()) {
            setError('Please enter a user ID');
            return;
        }

        setLoading(true);
        setError('');
        setSuccess('');

        try {
            const token = localStorage.getItem('token');
            const user = JSON.parse(localStorage.getItem('user'));

            if (!token || user.user_type !== 'system_admin') {
                navigate('/dashboard');
                return;
            }

            const response = await axios.post(
                `http://localhost:8080/api/v1/users/${userId}/promote/admin`,
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
                setSuccess(response.data.message);
                // Reset form after successful promotion
                setTimeout(() => {
                    setUserId('');
                    setSuccess('');
                }, 2000);
            }
        } catch (err) {
            console.error('Error promoting user:', err);
            setError(err.response?.data?.message || 'Failed to promote user to admin');
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
                            <span className="w-2 h-8 bg-[#9333EA] rounded-full mr-3"></span>
                            Promote to Admin
                        </h2>
                    </div>

                    <div className="px-8 py-6">
                        <form onSubmit={handleSubmit} className="space-y-6">
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
                                             focus:ring-[#9333EA] focus:border-[#9333EA]"
                                    required
                                />
                            </div>

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
                                    className={`flex-1 px-6 py-3 bg-[#9333EA] text-white rounded-md 
                                             hover:bg-purple-700 transition-all
                                             ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                >
                                    {loading ? 'Promoting...' : 'Promote to Admin'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PromoteToAdmin; 