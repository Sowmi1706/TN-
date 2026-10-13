import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Booking, Language } from '../types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
  toggleWishlist: (destinationId: string) => void;
  toggleSavedStory: (storyId: string) => void;
  addBooking: (booking: Omit<Booking, 'id' | 'createdAt' | 'status'>) => Booking;
  cancelBooking: (bookingId: string) => void;
  resetPasswordRequest: (email: string) => Promise<{ success: boolean; message: string }>;
  showAuthModal: boolean;
  authModalTab: 'login' | 'register' | 'forgot' | 'preferences';
  openAuthModal: (tab?: 'login' | 'register' | 'forgot' | 'preferences') => void;
  closeAuthModal: () => void;
}

const DEFAULT_EXPLORER: User = {
  id: 'user-default',
  name: 'Karthikeyan Ramasamy',
  email: 'explorer@tnstories.com',
  role: 'user',
  preferredLanguage: 'en',
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80',
  travelCompanion: 'family',
  interests: ['Temples', 'Heritage', 'Filter Coffee', 'Hill Stations'],
  wishlist: ['thanjavur-big-temple', 'dhanushkodi-ghost-town', 'nilgiri-mountain-railway'],
  savedStories: ['story-thanjavur-big-temple', 'story-madurai-meenakshi'],
  savedItineraries: [],
  bookings: [
    {
      id: 'book-101',
      type: 'package',
      referenceId: 'pkg-chola-dynasty',
      title: 'The Great Chola Kingdom Trail (3D/2N)',
      date: '2026-11-14',
      travelers: 2,
      totalPrice: 12998,
      status: 'confirmed',
      contactPhone: '+91 98401 23456',
      notes: 'Vegetarian breakfast requested',
      createdAt: '2026-10-01'
    }
  ]
};

const ADMIN_USER: User = {
  id: 'admin-tnstories',
  name: 'Tourism Admin',
  email: 'admin@tnstories.com',
  role: 'admin',
  preferredLanguage: 'en',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=120&q=80',
  wishlist: [],
  savedStories: [],
  savedItineraries: [],
  bookings: []
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const stored = localStorage.getItem('tn_stories_user');
      if (stored) return JSON.parse(stored);
      // Auto provide logged in demo user for instant smooth experience or guest
      return DEFAULT_EXPLORER;
    } catch {
      return DEFAULT_EXPLORER;
    }
  });

  const [showAuthModal, setShowAuthModal] = useState<boolean>(false);
  const [authModalTab, setAuthModalTab] = useState<'login' | 'register' | 'forgot' | 'preferences'>('login');

  useEffect(() => {
    if (user) {
      localStorage.setItem('tn_stories_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('tn_stories_user');
    }
  }, [user]);

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    if (email.toLowerCase().includes('admin')) {
      setUser(ADMIN_USER);
      setShowAuthModal(false);
      return { success: true };
    }

    if (!email || !password) {
      return { success: false, error: 'Please enter valid email and password' };
    }

    // Standard user login
    const loggedUser: User = {
      ...DEFAULT_EXPLORER,
      email: email,
      name: email.split('@')[0].replace('.', ' ')
    };
    setUser(loggedUser);
    setShowAuthModal(false);
    return { success: true };
  };

  const register = async (name: string, email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    if (!name || !email || !password) {
      return { success: false, error: 'All fields are required' };
    }
    const newUser: User = {
      id: `user-${Date.now()}`,
      name,
      email,
      role: 'user',
      preferredLanguage: 'en',
      wishlist: [],
      savedStories: [],
      savedItineraries: [],
      bookings: []
    };
    setUser(newUser);
    // After registration, show preference setup
    setAuthModalTab('preferences');
    return { success: true };
  };

  const logout = () => {
    setUser(null);
  };

  const updateProfile = (data: Partial<User>) => {
    if (!user) return;
    setUser({ ...user, ...data });
  };

  const toggleWishlist = (destinationId: string) => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }
    const exists = user.wishlist.includes(destinationId);
    const newWishlist = exists
      ? user.wishlist.filter(id => id !== destinationId)
      : [...user.wishlist, destinationId];
    setUser({ ...user, wishlist: newWishlist });
  };

  const toggleSavedStory = (storyId: string) => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }
    const exists = user.savedStories.includes(storyId);
    const newSaved = exists
      ? user.savedStories.filter(id => id !== storyId)
      : [...user.savedStories, storyId];
    setUser({ ...user, savedStories: newSaved });
  };

  const addBooking = (bookingData: Omit<Booking, 'id' | 'createdAt' | 'status'>): Booking => {
    const newBooking: Booking = {
      ...bookingData,
      id: `book-${Date.now()}`,
      status: 'confirmed',
      createdAt: new Date().toISOString().split('T')[0]
    };
    if (user) {
      setUser({
        ...user,
        bookings: [newBooking, ...user.bookings]
      });
    }
    return newBooking;
  };

  const cancelBooking = (bookingId: string) => {
    if (!user) return;
    setUser({
      ...user,
      bookings: user.bookings.map(b => b.id === bookingId ? { ...b, status: 'cancelled' } : b)
    });
  };

  const resetPasswordRequest = async (email: string) => {
    return { success: true, message: `Password reset instructions have been sent to ${email}` };
  };

  const openAuthModal = (tab: 'login' | 'register' | 'forgot' | 'preferences' = 'login') => {
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
        isAuthenticated: !!user,
        isAdmin: user?.role === 'admin',
        login,
        register,
        logout,
        updateProfile,
        toggleWishlist,
        toggleSavedStory,
        addBooking,
        cancelBooking,
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
