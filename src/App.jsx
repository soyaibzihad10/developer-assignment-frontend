import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './page/Home';
import Register from './page/Register';
import Login from './page/Login';
import MainDashboard from './page/MainDashBoard';
import ViewProfile from './page/ViewProfile';
import UpdateProfile from './page/UpdateProfile';
import PasswordResetRequest from './page/PasswordResetRequest';
import ResetPassword from './page/ResetPassword';
import EmailVerification from './page/EmailVerification';

function App() {
    return (
        <Router>
            <div className="min-h-screen bg-gray-50">
                <Navbar />
                <div className="pt-16"> {/* Add padding-top to prevent content from going under navbar */}
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/dashboard" element={<MainDashboard />} />
                        <Route path="/profile" element={<ViewProfile />} />
                        <Route path="/profile/update" element={<UpdateProfile />} />
                        <Route path="/password-reset-request" element={<PasswordResetRequest />} />
                        <Route path="/reset-password" element={<ResetPassword />} />
                        <Route path="/auth/verify" element={<EmailVerification />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;