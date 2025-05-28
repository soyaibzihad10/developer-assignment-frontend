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
import ListRoles from './page/ListRoles';
import RoleDetails from './page/RoleDetails';
import CreateRole from './page/CreateRole';
import UpdateRole from './page/UpdateRole';
import DeleteRole from './page/DeleteRole';
import ListPermissions from './page/ListPermissions';
import PermissionDetails from './page/PermissionDetails';
import MyPermissions from './page/MyPermissions';
import PromoteToAdmin from './page/PromoteToAdmin';
import ResendVerification from './page/ResendVerification';

function App() {
    return (
        <Router>
            <div className="min-h-screen bg-gray-50">
                <Navbar />
                <div className="">
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
                        <Route path="/my-permissions" element={<MyPermissions />} />
                        <Route path="/resend-verification" element={<ResendVerification />} />

                        {/* moderator routes */}
                        <Route path="/users/delete" element={<DeleteUser />} />
                        <Route path="/users/details" element={<UserDetails />} />

                        {/* admin routes */}
                        <Route path="/users/list-all" element={<ListAllUsers />} />
                        <Route path="/users/update" element={<UpdateUser />} />
                        <Route path="/users/change-role" element={<ChangeUserRole />} />
                        <Route path="/users/promote" element={<PromoteToModerator />} />
                        <Route path="/users/demote" element={<DemoteUser />} />
                        <Route path="/roles/list" element={<ListRoles />} />
                        <Route path="/roles/details" element={<RoleDetails />} />
                        <Route path="/roles/create" element={<CreateRole />} />
                        <Route path="/roles/update" element={<UpdateRole />} />
                        <Route path="/roles/delete" element={<DeleteRole />} />
                        <Route path="/permissions/list" element={<ListPermissions />} />
                        <Route path="/permissions/details" element={<PermissionDetails />} />

                        {/* system admin routes */}
                        <Route path="/users/promote-admin" element={<PromoteToAdmin />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;