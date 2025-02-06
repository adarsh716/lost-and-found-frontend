import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import OTPPage from './components/auth/Otp';
import HomePage from './components/home/home';
import PrivateChat from './components/chat/PrivateChat';
import CommunityProfile from './components/profile';
import MessageRequestsPage from './components/friendRequest';
import FriendListPage from './components/friendList';
import SettingsPage from './components/settings';
import Navbar from './components/home/Navbar'; // Assuming you have a Navbar component
import ChangeUsernamePage from './components/profile/ChangeUsername';
import ChangePasswordPage from './components/profile/ChangePassword';
import BlockedAccountsPage from './components/profile/BlockedAccounts';
import UserProfilePage from './components/profile/UserProfile';

// A wrapper component to conditionally show the Navbar
const Layout = ({ children }) => {
  const location = useLocation();

  // Hide Navbar on Login, OTP, and Register pages
  const hideNavbarRoutes = ['/login', '/register', '/otp'];
  const shouldShowNavbar = !hideNavbarRoutes.includes(location.pathname);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '91.5dvh', // Limits height to the full viewport
        overflow: 'hidden',
      }}
    >
      {shouldShowNavbar && <Navbar />}
      <main style={{ flex: 1, overflowY: 'auto' }}>{children}</main>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/otp" element={<OTPPage />} />
          <Route path="/change-password" element={<ChangePasswordPage />} />
          <Route path="/change-username" element={<ChangeUsernamePage />} />
          <Route path="/blocked-accounts" element={<BlockedAccountsPage />} />
          <Route path="/contact-us" element={<OTPPage />} />
          <Route path="/user-profile" element={<UserProfilePage />} />
          <Route path="/private-chat" element={<PrivateChat />} />
          <Route path="/profile" element={<CommunityProfile />} />
          <Route path="/requests" element={<MessageRequestsPage />} />
          <Route path="/friends" element={<FriendListPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
