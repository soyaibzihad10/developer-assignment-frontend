import { useEffect, useState } from 'react';
import UserDashboard from '../components/UserDashboard';
import ModeratorDashboard from '../components/ModeratorDashboard';
import AdminDashboard from '../components/AdminDashboard';
import SystemAdminDashboard from '../components/SystemAdminDashboard';

const MainDashboard = () => {
    const [userType, setUserType] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            try {
                const user = JSON.parse(storedUser);
                setUserType(user.user_type); // 'user', 'moderator', 'admin', or 'system_admin'
            } catch (error) {
                console.error('Failed to parse user from localStorage:', error);
            }
        }
    }, []);

    const renderDashboard = () => {
        switch (userType) {
            case 'user':
                return <UserDashboard />;
            case 'moderator':
                return <ModeratorDashboard />;
            case 'admin':
                return <AdminDashboard />;
            case 'system_admin':
                return <SystemAdminDashboard />;
            default:
                return <p className="text-red-600">Unknown user type or not logged in.</p>;
        }
    };

    return (
        <main className="p-6 space-y-6 bg-gray-50 min-h-screen">
            {renderDashboard()}
        </main>
    );
};

export default MainDashboard;
