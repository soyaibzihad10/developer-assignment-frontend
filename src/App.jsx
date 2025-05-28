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
import DeleteRequest from './page/DeleteRequest';
import DeleteUser from './page/DeleteUser';
import UserDetails from './page/UserDetails';
import ListAllUsers from './page/ListAllUsers';
import UpdateUser from './page/UpdateUser';
import ChangeUserRole from './page/ChangeUserRole';
import PromoteToModerator from './page/PromoteToModerator';
import DemoteUser from './page/DemoteUser';

function App() {
    return (
        <Router>
            <div className="min-h-screen bg-gray-50">
                <Navbar />
                <div className="pt-16">
                    <Routes>
                        {/* user routes */}
                        <Route path="/" element={<Home />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/dashboard" element={<MainDashboard />} />
                        <Route path="/profile" element={<ViewProfile />} />
                        <Route path="/profile/update" element={<UpdateProfile />} />
                        <Route path="/password-reset-request" element={<PasswordResetRequest />} />
                        <Route path="/reset-password" element={<ResetPassword />} />
                        <Route path="/request-deletion" element={<DeleteRequest />} />

                        {/* moderator routes */}
                        <Route path="/users/delete" element={<DeleteUser />} />
                        <Route path="/users/details" element={<UserDetails />} />

                        {/* admin routes */}
                        <Route path="/users/list-all" element={<ListAllUsers />} />
                        <Route path="/users/update" element={<UpdateUser />} />
                        <Route path="/users/change-role" element={<ChangeUserRole />} />
                        <Route path="/users/promote" element={<PromoteToModerator />} />
                        <Route path="/users/demote" element={<DemoteUser />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;