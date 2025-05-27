import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const PasswordResetRequest = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validate email
        if (!email) {
            setError('Email is required');
            return;
        }

        setError('');
        setSuccess('');
        setLoading(true);

        try {
            const response = await axios.post(
                'http://localhost:8080/api/v1/auth/password-reset-request',
                { email },
                {
                    headers: { 'Content-Type': 'application/json' }
                }
            );

            if (response.data.status === 'success') {
                setSuccess(response.data.message || 'Password reset link sent to your email');
                setEmail('');
            }
        } catch (err) {
            setError(
                err.response?.data?.message || 
                'Failed to request password reset. Please try again.'
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    {/* Header */}
                    <div className="px-8 py-6 border-b border-gray-200">
                        <h2 className="text-2xl font-semibold text-gray-800 flex items-center">
                            <span className="w-2 h-8 bg-[#FBBC05] rounded-full mr-3" />
                            Reset Password
                        </h2>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="px-8 py-6">
                        {/* Alert Messages */}
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

                        {/* Email Input */}
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md 
                                             focus:ring-[#FBBC05] focus:border-[#FBBC05]"
                                    placeholder="Enter your email"
                                    disabled={loading}
                                />
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="mt-8 space-y-4">
                            <button
                                type="submit"
                                disabled={loading}
                                className={`w-full px-6 py-3 bg-[#FBBC05] text-white rounded-md 
                                         hover:bg-[#F9AB00] transition-all font-medium
                                         ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                {loading ? 'Sending Reset Link...' : 'Send Reset Link'}
                            </button>
                            <Link 
                                to="/reset-password"
                                className="block text-center text-sm text-[#4285F4] hover:text-[#3367D6]"
                            >
                                Reset Password
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default PasswordResetRequest;