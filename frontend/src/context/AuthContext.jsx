import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(null);

  useEffect(() => {
    // Check if user is logged in on mount
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    
    if (token && storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        // Set axios default header
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      } catch (error) {
        console.error('Error parsing stored user data:', error);
        // Clear invalid data
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }
    
    setLoading(false);
  }, []);

  const login = (userData, token) => {
    // Clear any previous errors
    setAuthError(null);
    
    if (!userData) {
      const error = 'No user data provided';
      console.error(error);
      setAuthError(error);
      return false;
    }
    
    if (!token) {
      const error = 'No authentication token provided';
      console.error(error);
      setAuthError(error);
      return false;
    }
    
    try {
      // Ensure userData can be stringified
      JSON.stringify(userData);
      
      // Set user state and localStorage
      setUser(userData);
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userData));
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      return true;
    } catch (error) {
      console.error('Error during login:', error);
      setAuthError('Failed to process login data');
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    delete axios.defaults.headers.common['Authorization'];
  };

  const updateUser = (userData) => {
    if (!userData) {
      console.error('Invalid user data for update');
      return;
    }
    
    try {
      // Ensure userData can be stringified
      const userJSON = JSON.stringify(userData);
      
      setUser(userData);
      localStorage.setItem('user', userJSON);
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  if (loading) {
    return null; // or a loading spinner component
  }

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      login, 
      logout, 
      updateUser,
      authError
    }}>
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

export default AuthContext; 