import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({
    userId: null,
    communityName: '',
    email: '',
    phone: '',
    address: '',
    friends: [], 
  });

  const login = (userData) => {
    setUser(userData);
  };

  const updateUserData = (updatedData) => {
    setUser((prevUser) => ({ ...prevUser, ...updatedData }));
  };

  return (
    <AuthContext.Provider value={{ user, login, updateUserData }}>
      {children}
    </AuthContext.Provider>
  );
};
