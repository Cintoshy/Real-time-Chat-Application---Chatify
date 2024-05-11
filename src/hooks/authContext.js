import React, {useEffect, createContext, useContext, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {jwtDecode} from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadToken = async () => {
      try {
        setIsLoading(true);
        const storedToken = await AsyncStorage.getItem('token');

        if (storedToken) {
          setToken(storedToken);
          const decodedUser = jwtDecode(storedToken);
          setUser(decodedUser);
        }
      } catch (error) {
        console.error('Error loading token:', error);
      } finally {
        setIsLoading(false);
        // const timeout = setTimeout(() => {
        //   setIsLoading(false);
        //   clearTimeout(timeout);
        // }, 500);
      }
    };

    loadToken();
  }, []);

  const login = async userData => {
    try {
      setToken(userData);
      await AsyncStorage.setItem('token', userData);
      const decodedUser = jwtDecode(userData);
      setUser(decodedUser);
    } catch (error) {
      console.error('Error saving token:', error);
    }
  };

  const logout = async () => {
    try {
      setToken(null);
      await AsyncStorage.removeItem('token');
    } catch (error) {
      console.error('Error removing token:', error);
    }
  };

  return (
    <AuthContext.Provider value={{token, user, login, logout, isLoading}}>
      {children}
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
