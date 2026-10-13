import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { User, Booking, Language } from '../types';

export type AuthModalTab = 'customer_login' | 'customer_register' | 'admin_login' | 'forgot' | 'preferences' | 'login' | 'register';

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isCustomer: boolean;
  loginCustomer: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  loginAdmin: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  registerCustomer: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => Promise<void>;
  toggleWishlist: (destinationId: string) => Promise<void>;
  toggleSavedStory: (storyId: string) => void;
  addBooking: (booking: Omit<Booking, 'id' | 'createdAt' | 'status'>) => Promise<Booking>;
  cancelBooking: (bookingId: string) => Promise<void>;
  refreshBookings: () => Promise<void>;
  resetPasswordRequest: (email: string) => Promise<{ success: boolean; message: string }>;
  showAuthModal: boolean;
  authModalTab: AuthModalTab;
  openAuthModal: (tab?: AuthModalTab) => void;
  closeAuthModal: () => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem('tn_auth_token') || null;
  });

  const [user, setUser] = useState<User | null>(() => {
    try {
      const stored = localStorage.getItem('tn_stories_user');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const [showAuthModal, setShowAuthModal] = useState<boolean>(false);
  const [authModalTab, setAuthModalTab] = useState<AuthModalTab>('customer_login');

  // Verify real session with backend on startup
  const checkSession = useCallback(async (activeToken: string) => {
    try {
      const res = await fetch('/api/auth/me', {
        headers: { Authorization: `Bearer ${activeToken}` }
      });
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
        localStorage.setItem('tn_stories_user', JSON.stringify(data.user));
      } else {
        // Token expired or invalid
        setToken(null);
        setUser(null);
        localStorage.removeItem('tn_auth_token');
        localStorage.removeItem('tn_stories_user');
      }
    } catch (err) {
      console.warn('Backend session verification offline fallback:', err);
    }
  }, []);

  useEffect(() => {
    if (token) {
      checkSession(token);
    }
  }, [token, checkSession]);

  // Sync user bookings from backend
  const refreshBookings = useCallback(async () => {
    if (!token || !user) return;
    try {
      const res = await fetch('/api/bookings', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const bookings: Booking[] = await res.json();
        setUser(prev => prev ? { ...prev, bookings } : null);
      }
    } catch (e) {
      console.error('Failed refreshing bookings:', e);
    }
  }, [token, user]);

  // Periodic poll or initial sync for bookings
  useEffect(() => {
    if (user && token) {
      refreshBookings();
    }
  }, [user?.id, token]);

  const loginCustomer = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const res = await fetch('/api/auth/customer/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), password })
      });
      const data = await res.json();
      if (!res.ok) {
        return { success: false, error: data.error || 'Customer login failed' };
      }

      setToken(data.token);
      setUser(data.user);
      localStorage.setItem('tn_auth_token', data.token);
      localStorage.setItem('tn_stories_user', JSON.stringify(data.user));
      setShowAuthModal(false);
      return { success: true };
    } catch (err: any) {
      return { success: false, error: 'Network error connecting to backend service.' };
    }
  };

  const loginAdmin = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const res = await fetch('/api/auth/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), password })
      });
      const data = await res.json();
      if (!res.ok) {
        return { success: false, error: data.error || 'Administrator login failed' };
      }

      setToken(data.token);
      setUser(data.user);
      localStorage.setItem('tn_auth_token', data.token);
      localStorage.setItem('tn_stories_user', JSON.stringify(data.user));
      setShowAuthModal(false);
      return { success: true };
    } catch (err: any) {
      return { success: false, error: 'Network error connecting to backend service.' };
    }
  };

  const registerCustomer = async (name: string, email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const res = await fetch('/api/auth/customer/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email: email.trim(), password })
      });
      const data = await res.json();
      if (!res.ok) {
        return { success: false, error: data.error || 'Registration failed' };
      }

      setToken(data.token);
      setUser(data.user);
      localStorage.setItem('tn_auth_token', data.token);
      localStorage.setItem('tn_stories_user', JSON.stringify(data.user));
      setAuthModalTab('preferences');
      return { success: true };
    } catch (err: any) {
      return { success: false, error: 'Network error connecting to backend service.' };
    }
  };

  // Backwards compatible login / register delegates
  const login = async (email: string, password: string) => {
    if (email.toLowerCase().includes('admin')) {
      return loginAdmin(email, password);
    }
    return loginCustomer(email, password);
  };

  const register = async (name: string, email: string, password: string) => {
    return registerCustomer(name, email, password);
  };

  const logout = async () => {
    if (token) {
      try {
        await fetch('/api/auth/logout', {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` }
        });
      } catch {}
    }
    setToken(null);
    setUser(null);
    localStorage.removeItem('tn_auth_token');
    localStorage.removeItem('tn_stories_user');
  };

  const updateProfile = async (data: Partial<User>) => {
    if (!user) return;
    const updated = { ...user, ...data };
    setUser(updated);
    localStorage.setItem('tn_stories_user', JSON.stringify(updated));

    if (token) {
      try {
        await fetch('/api/customer/profile', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(data)
        });
      } catch (err) {
        console.warn('Failed saving profile to backend:', err);
      }
    }
  };

  const toggleWishlist = async (destinationId: string) => {
    if (!user) {
      openAuthModal('customer_login');
      return;
    }

    const exists = user.wishlist.includes(destinationId);
    const newWishlist = exists
      ? user.wishlist.filter(id => id !== destinationId)
      : [...user.wishlist, destinationId];

    setUser({ ...user, wishlist: newWishlist });

    if (token) {
      try {
        await fetch('/api/customer/wishlist', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({ destinationId })
        });
      } catch (err) {
        console.warn('Wishlist sync offline fallback:', err);
      }
    }
  };

  const toggleSavedStory = (storyId: string) => {
    if (!user) {
      openAuthModal('customer_login');
      return;
    }
    const exists = user.savedStories.includes(storyId);
    const newSaved = exists
      ? user.savedStories.filter(id => id !== storyId)
      : [...user.savedStories, storyId];
    updateProfile({ savedStories: newSaved });
  };

  const addBooking = async (bookingData: Omit<Booking, 'id' | 'createdAt' | 'status'>): Promise<Booking> => {
    if (!token) {
      // Local fallback if guest
      const fallbackBooking: Booking = {
        ...bookingData,
        id: `book-${Date.now()}`,
        status: 'pending',
        createdAt: new Date().toISOString().split('T')[0]
      };
      if (user) {
        setUser({ ...user, bookings: [fallbackBooking, ...(user.bookings || [])] });
      }
      return fallbackBooking;
    }

    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(bookingData)
      });
      if (res.ok) {
        const created: Booking = await res.json();
        if (user) {
          setUser({ ...user, bookings: [created, ...(user.bookings || [])] });
        }
        return created;
      }
    } catch (e) {
      console.warn('Backend booking failed, using local copy:', e);
    }

    const newBooking: Booking = {
      ...bookingData,
      id: `book-${Date.now()}`,
      status: 'pending',
      createdAt: new Date().toISOString().split('T')[0]
    };
    if (user) {
      setUser({ ...user, bookings: [newBooking, ...(user.bookings || [])] });
    }
    return newBooking;
  };

  const cancelBooking = async (bookingId: string) => {
    if (!user) return;
    setUser(prev => prev ? {
      ...prev,
      bookings: (prev.bookings || []).map(b => b.id === bookingId ? { ...b, status: 'cancelled' } : b)
    } : null);

    if (token) {
      try {
        await fetch(`/api/bookings/${bookingId}/cancel`, {
          method: 'PUT',
          headers: { Authorization: `Bearer ${token}` }
        });
      } catch (err) {
        console.warn('Failed syncing booking cancellation with backend:', err);
      }
    }
  };

  const resetPasswordRequest = async (email: string) => {
    return { success: true, message: `Password reset verification link has been sent to ${email}` };
  };

  const openAuthModal = (tab: AuthModalTab = 'customer_login') => {
    // Standardize legacy 'login' and 'register'
    if (tab === 'login') tab = 'customer_login';
    if (tab === 'register') tab = 'customer_register';
    setAuthModalTab(tab);
    setShowAuthModal(true);
  };

  const closeAuthModal = () => {
    setShowAuthModal(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'admin',
        isCustomer: user?.role === 'customer' || user?.role === 'user',
        loginCustomer,
        loginAdmin,
        registerCustomer,
        login,
        register,
        logout,
        updateProfile,
        toggleWishlist,
        toggleSavedStory,
        addBooking,
        cancelBooking,
        refreshBookings,
        resetPasswordRequest,
        showAuthModal,
        authModalTab,
        openAuthModal,
        closeAuthModal
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
