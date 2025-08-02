import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApi } from './useApi';

interface AuthState {
  isAuthenticated: boolean;
  user: { id: string; username: string; email: string } | null;
  loading: boolean;
  error: string | null;
}

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    loading: false,
    error: null,
  });
  const api = useApi();
  const navigate = useNavigate();

  const login = async (username: string, password: string) => {
    setAuthState({ ...authState, loading: true });
    try {
      const response = await api.post('/auth/login', { username, password });
      setAuthState({
        isAuthenticated: true,
        user: response.data.user,
        loading: false,
        error: null,
      });
      navigate('/dashboard');
    } catch (error) {
      setAuthState({ ...authState, loading: false, error: error.message });
    }
  };

  const logout = async () => {
    setAuthState({ ...authState, loading: true });
    try {
      await api.post('/auth/logout');
      setAuthState({
        isAuthenticated: false,
        user: null,
        loading: false,
        error: null,
      });
      navigate('/');
    } catch (error) {
      setAuthState({ ...authState, loading: false, error: error.message });
    }
  };

  return { ...authState, login, logout };
};
