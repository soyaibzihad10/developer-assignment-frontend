import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Home = () => {
    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <div className="relative pt-20 pb-16 md:pt-16 md:pb-24"> 
                <div className="container mx-auto px-6">
                    <div className="max-w-4xl mx-auto text-center">
                        <h1 className="text-5xl md:text-7xl font-normal text-gray-900 mb-6 leading-tight">
                            Secure Authentication for the 
                            <div className="inline-flex flex-wrap font-medium">
                                <span className="text-[#4285F4]">M</span>
                                <span className="text-[#EA4335]">o</span>
                                <span className="text-[#FBBC05]">d</span>
                                <span className="text-[#4285F4]">e</span>
                                <span className="text-[#34A853]">r</span>
                                <span className="text-[#EA4335]">n</span>
                                <span className="text-gray-900">&nbsp;Web</span>
                            </div>
                        </h1>
                        <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
                            Build secure and scalable applications with our powerful authentication platform.
                            Get started in minutes.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link to="/register"
                                className="w-full sm:w-auto px-8 py-3 bg-[#4285F4] text-white rounded-md hover:bg-[#3367D6] transition-all font-medium text-lg">
                                Start for free
                            </Link>
                            <Link to="/docs"
                                className="w-full sm:w-auto px-8 py-3 text-[#4285F4] hover:bg-blue-50 transition-all font-medium text-lg rounded-md">
                                View documentation
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Stats Section */}
                <div className="container mx-auto px-6 mt-24">
                    <div className="grid md:grid-cols-4 gap-8 max-w-4xl mx-auto">
                        <div className="bg-[#4285F4]/5 p-6 rounded-lg text-center hover:bg-[#4285F4]/10 transition-colors">
                            <div className="text-3xl font-medium text-[#4285F4] mb-2">99.9%</div>
                            <div className="text-gray-600">Uptime</div>
                        </div>
                        <div className="bg-[#EA4335]/5 p-6 rounded-lg text-center hover:bg-[#EA4335]/10 transition-colors">
                            <div className="text-3xl font-medium text-[#EA4335] mb-2">10K+</div>
                            <div className="text-gray-600">Users</div>
                        </div>
                        <div className="bg-[#FBBC05]/5 p-6 rounded-lg text-center hover:bg-[#FBBC05]/10 transition-colors">
                            <div className="text-3xl font-medium text-[#FBBC05] mb-2">24/7</div>
                            <div className="text-gray-600">Support</div>
                        </div>
                        <div className="bg-[#34A853]/5 p-6 rounded-lg text-center hover:bg-[#34A853]/10 transition-colors">
                            <div className="text-3xl font-medium text-[#34A853] mb-2">100+</div>
                            <div className="text-gray-600">APIs</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Features Grid */}
            <div className="container mx-auto px-6 py-16">
                <div className="grid md:grid-cols-4 gap-8">
                    {[
                        {
                            title: 'Security',
                            description: 'Built with modern encryption standards',
                            icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
                            color: '#4285F4'
                        },
                        {
                            title: 'Speed',
                            description: 'Lightning fast authentication',
                            icon: 'M13 10V3L4 14h7v7l9-11h-7z',
                            color: '#EA4335'
                        },
                        {
                            title: 'Scale',
                            description: 'Built for millions of users',
                            icon: 'M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
                            color: '#FBBC05'
                        },
                        {
                            title: 'Support',
                            description: '24/7 developer support',
                            icon: 'M18 10h-4v4h4m0-4v-4h-4m4 4h4m-4 4h4m-12 4h4m-4 0v-4m0 4v4m0-4h-4m4-12h-4v4h4m0-4v-4m0 4h-4',
                            color: '#34A853'
                        }
                    ].map((feature, index) => (
                        <div key={index}
                            className="bg-white p-8 rounded-lg hover:shadow-lg transition-shadow border border-gray-100">
                            <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-6`}
                                style={{ backgroundColor: `${feature.color}15` }}>
                                <svg className="w-6 h-6"
                                    style={{ color: feature.color }}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={feature.icon} />
                                </svg>
                            </div>
                            <h3 className="text-xl font-medium text-gray-900 mb-4">{feature.title}</h3>
                            <p className="text-gray-600">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Home;