import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ViewProfile = () => {
    const navigate = useNavigate();
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchProfile = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
            return;
        }

        try {
            const response = await axios.get('http://localhost:8080/api/v1/me', {
                withCredentials: true,
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.data.status === 'success') {
                setProfile(response.data.user);
            } else {
                setError('Failed to load profile data');
            }
        } catch (err) {
            if (err.response?.status === 401) {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                navigate('/login');
            } else {
                setError('Error loading profile');
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProfile();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#4285F4]"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-red-500 bg-red-50 px-4 py-3 rounded-md">
                    {error}
                </div>
            </div>
        );
    }

    const profileFields = [
        { label: 'Username', key: 'username' },
        { label: 'Email', key: 'email' },
        { label: 'First Name', key: 'first_name' },
        { label: 'Last Name', key: 'last_name' },
        { label: 'Role', key: 'user_type' },
        { 
            label: 'Email Verified', 
            key: 'email_verified',
            format: (value) => (
                <span className={`px-2 py-1 rounded-full text-sm ${
                    value ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                    {value ? 'Verified' : 'Not Verified'}
                </span>
            )
        },
        { 
            label: 'Account Status', 
            key: 'active',
            format: (value) => (
                <span className={`px-2 py-1 rounded-full text-sm ${
                    value ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                    {value ? 'Active' : 'Inactive'}
                </span>
            )
        },
        { 
            label: 'Member Since', 
            key: 'created_at',
            format: (value) => new Date(value).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            })
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    {/* Header */}
                    <div className="px-8 py-6 border-b border-gray-200">
                        <h2 className="text-2xl font-semibold text-gray-800 flex items-center">
                            <span className="w-2 h-8 bg-[#4285F4] rounded-full mr-3"></span>
                            Profile Information
                        </h2>
                    </div>

                    {/* Profile Content */}
                    <div className="px-8 py-6">
                        <div className="grid gap-6">
                            {profileFields.map(({ label, key, format }) => (
                                <div key={key} className="flex flex-col">
                                    <label className="text-sm font-medium text-gray-500 mb-1">
                                        {label}
                                    </label>
                                    <div className="text-gray-900">
                                        {format 
                                            ? format(profile[key])
                                            : profile[key] || 'Not provided'}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="px-8 py-6 bg-gray-50 border-t border-gray-200">
                        <div className="flex justify-end space-x-4">
                            <button
                                onClick={() => navigate('/dashboard')}
                                className="px-6 py-2 text-gray-700 bg-white border border-gray-300 
                                         rounded-md hover:bg-gray-50 transition-all"
                            >
                                Back to Dashboard
                            </button>
                            <button
                                onClick={() => navigate('/profile/update')}
                                className="px-6 py-2 bg-[#4285F4] text-white rounded-md 
                                         hover:bg-[#3367D6] transition-all"
                            >
                                Update Profile
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewProfile;