import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Worker } from '../types/user';
import { apiService } from '../services/api';

interface AuthContextType {
  user: User | Worker | null;
  loading: boolean;
  isAuthenticated: boolean;
  isWorker: boolean;
  isAdmin: boolean;
  login: (phone: string, code: string) => Promise<void>;
  logout: () => void;
  updateProfile: (data: Partial<User | Worker>) => Promise<void>;
  sendVerificationCode: (phone: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | Worker | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      apiService.getCurrentUser()
        .then(({ data }) => {
          setUser(data);
        })
        .catch(() => {
          localStorage.removeItem('token');
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (phone: string, code: string) => {
    const { token, user } = await apiService.login(phone, code);
    localStorage.setItem('token', token);
    setUser(user);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  const updateProfile = async (data: Partial<User | Worker>) => {
    const { data: updatedUser } = user?.role === 'worker'
      ? await apiService.updateWorker(data as Partial<Worker>)
      : await apiService.updateUser(data as Partial<User>);
    setUser(updatedUser);
  };

  const sendVerificationCode = async (phone: string) => {
    await apiService.sendVerificationCode(phone);
  };

  return (
    <AuthContext.Provider 
      value={{
        user,
        loading,
        isAuthenticated: !!user,
        isWorker: user?.role === 'worker',
        isAdmin: user?.role === 'admin',
        login,
        logout,
        updateProfile,
        sendVerificationCode,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;