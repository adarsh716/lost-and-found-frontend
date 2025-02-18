import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('authUser');
    return storedUser
      ? JSON.parse(storedUser)
      : {
          userId: null,
          fullName: '',
          email: '',
          phone: '',
          address: '',
          friends: [],
        };
  });

  useEffect(() => {
    if (user.userId) {
      localStorage.setItem('authUser', JSON.stringify(user));
    }
  }, [user]);

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
