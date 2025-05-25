import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await axios.post(
                'http://localhost:8080/api/v1/auth/login',
                formData,
                {
                    withCredentials: true, 
                }
            );

            // Check if the response has the expected structure
            if (response.data.status === 'success' && response.data.token && response.data.user) {
                // Store user data and token in localStorage
                localStorage.setItem('user', JSON.stringify(response.data.user));
                localStorage.setItem('token', response.data.token);

                // Redirect to dashboard or home
                navigate('/dashboard');
            } else {
                setError('Invalid response from server');
            }
        } catch (err) {
            // Handle different error scenarios based on status codes
            if (err.response) {
                switch (err.response.status) {
                    case 400:
                        setError('Email and password are required');
                        break;
                    case 401:
                        setError('Invalid email or password');
                        break;
                    case 500:
                        setError('Server error. Please try again later');
                        break;
                    default:
                        setError(err.response.data.message || 'Login failed');
                }
            } else if (err.request) {
                setError('No response from server. Please check your internet connection');
            } else {
                setError('Login failed. Please try again');
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
                    Sign in to your account
                </h2>
                <p className="mt-2 text-center text-sm text-gray-600">
                    Or{' '}
                    <Link to="/register" className="text-[#4285F4] hover:text-[#3367D6]">
                        create a new account
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
                                value={formData.email}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md 
                                         focus:outline-none focus:ring-[#4285F4] focus:border-[#4285F4]"
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                value={formData.password}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md 
                                         focus:outline-none focus:ring-[#4285F4] focus:border-[#4285F4]"
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
                                ) : 'Sign in'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;