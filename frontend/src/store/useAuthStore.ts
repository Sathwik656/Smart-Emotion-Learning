import { create } from 'zustand';
import { jwtDecode } from 'jwt-decode';

interface User {
  id: string;
  role: 'student' | 'admin';
  name?: string;
}

interface AuthState {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => {
  // Initialize from local storage if available
  const storedToken = localStorage.getItem('auth_token');
  let initialUser: User | null = null;

  if (storedToken) {
    try {
      const decoded = jwtDecode<any>(storedToken);
      // Basic expiry check
      if (decoded.exp && decoded.exp * 1000 < Date.now()) {
        localStorage.removeItem('auth_token');
      } else {
        initialUser = {
          id: decoded.id || decoded._id,
          role: decoded.role,
          name: decoded.name,
        };
      }
    } catch (e) {
      localStorage.removeItem('auth_token');
    }
  }

  // Listen for the custom unauthorized event
  window.addEventListener('auth:unauthorized', () => {
    set({ token: null, user: null, isAuthenticated: false });
  });

  return {
    token: storedToken && initialUser ? storedToken : null,
    user: initialUser,
    isAuthenticated: !!(storedToken && initialUser),

    login: (token: string) => {
      localStorage.setItem('auth_token', token);
      try {
        const decoded = jwtDecode<any>(token);
        set({
          token,
          user: {
            id: decoded.id || decoded._id,
            role: decoded.role,
            name: decoded.name,
          },
          isAuthenticated: true,
        });
      } catch (e) {
        console.error('Invalid token on login', e);
      }
    },

    logout: () => {
      localStorage.removeItem('auth_token');
      set({ token: null, user: null, isAuthenticated: false });
    },
  };
});
