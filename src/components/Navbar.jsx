import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

const Navbar = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));

    const handleLogout = async () => {
        try {
            const response = await axios.post(
                'http://localhost:8080/api/v1/auth/logout',
                {},
                {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                }
            );

            if (response.data.status === 'success') {
                localStorage.removeItem('user');
                localStorage.removeItem('token');
                navigate('/login');
            }
        } catch (error) {
            console.error('Logout failed:', error);
            alert('Logout failed. Please try again.');
        }
    };

    return (
        <div>
            <nav className="w-full bg-[#EAFDFC]">
                <div className="container mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        {/* Logo section - Left side */}
                        <div className="flex items-center">
                            <div className="grid grid-cols-2 gap-1">
                                <span className="w-2 h-2 bg-[#4285F4] rounded-full"></span>
                                <span className="w-2 h-2 bg-[#EA4335] rounded-full"></span>
                                <span className="w-2 h-2 bg-[#FBBC05] rounded-full"></span>
                                <span className="w-2 h-2 bg-[#34A853] rounded-full"></span>
                            </div>
                            <Link to="/" className="ml-3 text-xl font-normal text-gray-900">
                                AffPilot Auth
                            </Link>
                        </div>

                        {/* Auth buttons - Right side */}
                        <div className="flex items-center space-x-4">
                            {user ? (
                                <>
                                    <Link
                                        to="/dashboard"
                                        className="text-gray-600 hover:text-gray-900 transition-colors px-4 py-2"
                                    >
                                        Dashboard
                                    </Link>
                                    <span className="text-gray-600">{user.email}</span>
                                    <button
                                        onClick={handleLogout}
                                        className="px-6 py-2 bg-[#4285F4] text-white hover:bg-[#3367D6] rounded-md transition-all"
                                    >
                                        Sign out
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Link
                                        to="/login"
                                        className="text-gray-600 hover:text-gray-900 transition-colors px-4 py-2"
                                    >
                                        Sign in
                                    </Link>
                                    <Link
                                        to="/register"
                                        className="px-6 py-2 bg-[#4285F4] text-white rounded-md hover:bg-[#3367D6] transition-all font-medium"
                                    >
                                        Get started
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </nav>
            <div className="h-1 bg-[#34A853] w-full"></div>
        </div>
    );
};

export default Navbar;