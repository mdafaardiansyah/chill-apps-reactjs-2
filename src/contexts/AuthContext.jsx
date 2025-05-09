import React, { createContext, useState } from 'react';
import { useAuth as useAuthHook } from './authUtils';

// Membuat context untuk autentikasi
const AuthContext = createContext();

// Export custom hook untuk menggunakan AuthContext
export const useAuth = () => useAuthHook(AuthContext);

// Provider component untuk AuthContext
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading] = useState(true);

  // Fungsi untuk login
  const login = (username) => {
    // Implementasi login sebenarnya akan ditambahkan nanti
    // Untuk saat ini, hanya simulasi login berhasil
    setCurrentUser({ username });
    return Promise.resolve();
  };

  // Fungsi untuk logout
  const logout = () => {
    // Implementasi logout sebenarnya akan ditambahkan nanti
    setCurrentUser(null);
    return Promise.resolve();
  };

  // Fungsi untuk register
  const register = (username) => {
    // Implementasi register sebenarnya akan ditambahkan nanti
    setCurrentUser({ username });
    return Promise.resolve();
  };

  // Nilai yang akan disediakan oleh context
  const value = {
    currentUser,
    login,
    logout,
    register,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};