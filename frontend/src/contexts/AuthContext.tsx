import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, LoginDTO } from '@types/index';
import apiService from '@services/api';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (credentials: LoginDTO) => Promise<void>;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize auth from stored token (mock implementation)
  useEffect(() => {
    const initAuth = async () => {
      try {
        // In a real app, you would retrieve the token from secure storage
        // const token = await AsyncStorage.getItem('accessToken');
        // if (token) {
        //   apiService.setAccessToken(token);
        //   await refreshUser();
        // }
      } catch (error) {
        console.error('Auth initialization error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = async (credentials: LoginDTO): Promise<void> => {
    try {
      setIsLoading(true);
      const response = await apiService.login(credentials);

      if (response.success && response.data) {
        const { accessToken, user: userData } = response.data;
        apiService.setAccessToken(accessToken);

        // In a real app, you would save the token to secure storage
        // await AsyncStorage.setItem('accessToken', accessToken);

        setUser(userData);
      } else {
        throw new Error(response.error?.message || 'Login failed');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const logout = (): void => {
    setUser(null);
    apiService.setAccessToken(null);

    // In a real app, you would remove the token from secure storage
    // await AsyncStorage.removeItem('accessToken');
  };

  const refreshUser = async (): Promise<void> => {
    try {
      const response = await apiService.getMe();

      if (response.success && response.data) {
        setUser(response.data);
      } else {
        logout();
      }
    } catch (error) {
      console.error('Refresh user error:', error);
      logout();
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
