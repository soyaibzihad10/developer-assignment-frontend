import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ResendVerification = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        try {
            const response = await axios.post(
                'http://localhost:8080/api/v1/auth/resend-verification',
                { email },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );

            if (response.data.status === 'success') {
                setSuccess(response.data.message);
                setEmail(''); // Clear the email field
            }
        } catch (err) {
            if (err.response) {
                const errorMessage = err.response.data.message;
                switch (err.response.status) {
                    case 400:
                        setError(errorMessage || 'Email is required');
                        break;
                    case 404:
                        setError('User not found');
                        break;
                    case 500:
                        setError('Server error. Please try again later');
                        break;
                    default:
                        setError(errorMessage || 'Failed to resend verification email');
                }
            } else if (err.request) {
                setError('No response from server. Please check your internet connection');
            } else {
                setError('Failed to send request. Please try again');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                {/* Logo */}
                <div className="flex justify-center space-x-1 mb-6">
                    <span className="w-2 h-2 bg-[#4285F4] rounded-full"></span>
                    <span className="w-2 h-2 bg-[#EA4335] rounded-full"></span>
                    <span className="w-2 h-2 bg-[#FBBC05] rounded-full"></span>
                    <span className="w-2 h-2 bg-[#34A853] rounded-full"></span>
                </div>

                <h2 className="mt-6 text-center text-3xl font-normal text-gray-900">
                    Resend Verification Email
                </h2>
                <p className="mt-2 text-center text-sm text-gray-600">
                    Or{' '}
                    <Link to="/login" className="text-[#4285F4] hover:text-[#3367D6]">
                        return to sign in
                    </Link>
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow-sm rounded-lg sm:px-10">
                    {error && (
                        <div className="mb-4 p-3 rounded-md bg-red-50 text-red-500 text-sm">
                            {error}
                        </div>
                    )}

                    {success && (
                        <div className="mb-4 p-3 rounded-md bg-green-50 text-green-500 text-sm">
                            {success}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email address
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md 
                                         focus:outline-none focus:ring-[#4285F4] focus:border-[#4285F4]"
                                placeholder="Enter your email address"
                            />
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md 
                                         shadow-sm text-sm font-medium text-white bg-[#4285F4] hover:bg-[#3367D6] 
                                         focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4285F4] 
                                         disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                {loading ? (
                                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                ) : 'Resend Verification Email'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ResendVerification; 