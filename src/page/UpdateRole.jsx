import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const UpdateRole = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [roleId, setRoleId] = useState('');
    const [roleData, setRoleData] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        description: ''
    });

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
                const role = response.data;
                setRoleData(role);
                setFormData({
                    name: role.name,
                    description: role.description || ''
                });
            }
        } catch (err) {
            console.error('Error fetching role details:', err);
            setError(err.response?.data?.message || 'Role not found');
            setRoleData(null);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('No authentication token found');
            }

            // Validate role name
            if (!formData.name.trim()) {
                setError('Role name is required');
                return;
            }

            const response = await axios.put(
                `http://localhost:8080/api/v1/roles/${roleId}`,
                {
                    name: formData.name.trim(),
                    description: formData.description.trim()
                },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    withCredentials: true
                }
            );

            if (response.data) {
                setSuccess('Role updated successfully');
                // Reset form after successful update
                setTimeout(() => {
                    setRoleData(null);
                    setRoleId('');
                    setFormData({
                        name: '',
                        description: ''
                    });
                    setSuccess('');
                }, 2000);
            }
        } catch (err) {
            console.error('Error updating role:', err);
            setError(err.response?.data?.message || 'Failed to update role');
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
                            <span className="w-2 h-8 bg-[#F97316] rounded-full mr-3"></span>
                            Update Role
                        </h2>
                    </div>

                    <div className="px-8 py-6">
                        {!roleData ? (
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
                                        placeholder="Enter role ID"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md 
                                                 focus:ring-[#F97316] focus:border-[#F97316]"
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
                                        className={`flex-1 px-6 py-3 bg-[#F97316] text-white rounded-md 
                                                 hover:bg-orange-600 transition-all
                                                 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    >
                                        {loading ? 'Searching...' : 'Search Role'}
                                    </button>
                                </div>
                            </form>
                        ) : (
                            // Step 2: Update role form
                            <form onSubmit={handleUpdate} className="space-y-6">
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

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Role Name *
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md 
                                                 focus:ring-[#F97316] focus:border-[#F97316]"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Description
                                    </label>
                                    <textarea
                                        name="description"
                                        value={formData.description}
                                        onChange={handleInputChange}
                                        rows="3"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md 
                                                 focus:ring-[#F97316] focus:border-[#F97316]"
                                    />
                                </div>

                                <div className="flex space-x-4">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setRoleData(null);
                                            setRoleId('');
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
                                        className={`flex-1 px-6 py-3 bg-[#F97316] text-white rounded-md 
                                                 hover:bg-orange-600 transition-all
                                                 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    >
                                        {loading ? 'Updating...' : 'Update Role'}
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateRole; 