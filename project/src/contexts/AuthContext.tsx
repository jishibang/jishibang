import React, { createContext, useContext, useState, useEffect } from "react";
import { api } from "../utils/api";
import { useErrorHandler } from "../hooks/useErrorHandler";
import { User } from "../types/user";
interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (phone: string, password: string) => Promise<void>;
  loginWithCode: (phone: string, code: string) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (data: Partial<User>) => Promise<void>;
}
const AuthContext = createContext<AuthContextType | null>(null);
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { handleError } = useErrorHandler();
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem("auth_token");
        if (token) {
          const userData = await api.get<User>("/user/info");
          setUser(userData);
        }
      } catch (error) {
        handleError(error);
        localStorage.removeItem("auth_token");
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, [handleError]);
  const login = async (phone: string, password: string) => {
    setLoading(true);
    try {
      const { token, user: userData } = await api.post<{ token: string; user: User }>("/auth/login", {
        phone,
        password,
      });
      localStorage.setItem("auth_token", token);
      setUser(userData);
    } catch (error) {
      handleError(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };
  const loginWithCode = async (phone: string, code: string) => {
    setLoading(true);
    try {
      const { token, user: userData } = await api.post<{ token: string; user: User }>("/auth/login/code", {
        phone,
        code,
      });
      localStorage.setItem("auth_token", token);
      setUser(userData);
    } catch (error) {
      handleError(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };
  const logout = async () => {
    setLoading(true);
    try {
      await api.post("/auth/logout");
    } catch (error) {
      handleError(error);
    } finally {
      localStorage.removeItem("auth_token");
      setUser(null);
      setLoading(false);
    }
  };
  const updateUser = async (data: Partial<User>) => {
    setLoading(true);
    try {
      const updatedUser = await api.put<User>("/user/update", data);
      setUser(updatedUser);
    } catch (error) {
      handleError(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };
  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        loading, 
        isAuthenticated: !!user,
        login, 
        loginWithCode, 
        logout, 
        updateUser 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
