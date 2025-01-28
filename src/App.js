import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import OTPPage from './components/auth/Otp';
import HomePage from './components/home/home';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register/>}/>
        <Route path="/otp" element={<OTPPage/>}/>
      </Routes>
    </Router>
  );
};

export default App;
