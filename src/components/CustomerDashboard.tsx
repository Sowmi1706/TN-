import React, { useState, useEffect } from 'react';
import { 
  User as UserIcon, 
  Heart, 
  BookOpen, 
  Calendar, 
  MapPin, 
  LogOut, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  XCircle, 
  Sparkles, 
  Compass, 
  Hotel, 
  Bus, 
  RefreshCw 
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { Destination, Language } from '../types';

interface CustomerDashboardProps {
  destinations: Destination[];
  onSelectDestination: (dest: Destination) => void;
  onOpenStory: (destId: string) => void;
  onNavigateTab: (tab: string) => void;
  onLogoutSuccess: () => void;
}

export const CustomerDashboard: React.FC<CustomerDashboardProps> = ({
  destinations,
  onSelectDestination,
  onOpenStory,
  onNavigateTab,
  onLogoutSuccess
}) => {
  const { user, logout, updateProfile, cancelBooking, toggleWishlist, refreshBookings } = useAuth();
  const { language, setLanguage, t } = useLanguage();

  const [activeTab, setActiveTab] = useState<'bookings' | 'wishlist' | 'stories' | 'profile'>('bookings');
  const [editingName, setEditingName] = useState(user?.name || '');
  const [refreshing, setRefreshing] = useState(false);
  const [successNotice, setSuccessNotice] = useState<string | null>(null);

  useEffect(() => {
    if (user?.name) setEditingName(user.name);
  }, [user?.name]);

  const handleManualRefresh = async () => {
    setRefreshing(true);
    await refreshBookings();
    setTimeout(() => setRefreshing(false), 800);
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateProfile({ name: editingName });
    setSuccessNotice('Profile updated successfully!');
    setTimeout(() => setSuccessNotice(null), 2500);
  };

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    updateProfile({ preferredLanguage: lang });
  };

  const handleLogout = () => {
    logout();
    onLogoutSuccess();
  };

  if (!user) {
    return (
      <div className="max-w-md mx-auto my-16 p-8 bg-white border border-stone-200 rounded-2xl text-center space-y-4 shadow-sm">
        <UserIcon className="w-12 h-12 text-stone-400 mx-auto" />
        <h2 className="font-display text-xl font-bold text-stone-900">
          Customer Session Required
        </h2>
        <p className="text-xs text-stone-600">
          Please log in using your customer account to view your bookings, saved places, and profile.
        </p>
        <button
          onClick={() => onNavigateTab('customer_login')}
          className="py-2.5 px-5 rounded-xl bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-xs"
        >
          Go to Customer Sign In
        </button>
      </div>
    );
  }

  const wishlistDestinations = destinations.filter(d => user.wishlist?.includes(d.id));

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8 animate-fadeIn">
      
      {/* Customer Header Banner */}
      <div className="bg-gradient-to-r from-stone-900 via-stone-850 to-amber-950 text-white rounded-2xl p-6 sm:p-8 border border-amber-900/40 shadow-xl flex flex-wrap items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <img
            src={user.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80'}
            alt={user.name}
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-amber-500/60 shadow-lg"
          />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-display text-xl sm:text-2xl font-bold text-white">
                {user.name}
              </h1>
              <span className="text-[10px] bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded font-mono font-medium">
                CUSTOMER DASHBOARD
              </span>
            </div>
            <p className="text-xs text-stone-400 mt-0.5">{user.email}</p>
            <div className="flex items-center gap-3 text-xs text-amber-200/80 mt-2">
              <span>{user.bookings?.length || 0} Bookings</span>
              <span>·</span>
              <span>{wishlistDestinations.length} Saved Places</span>
              <span>·</span>
              <span>Style: {user.travelCompanion || 'Family'}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleManualRefresh}
            className="p-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 border border-stone-700 transition-colors cursor-pointer"
            title="Sync latest booking updates from server"
          >
            <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin text-amber-400' : ''}`} />
          </button>
          
          <button
            onClick={handleLogout}
            className="py-2.5 px-4 rounded-xl bg-stone-800 hover:bg-rose-950 text-stone-300 hover:text-rose-300 border border-stone-700 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Secure Logout</span>
          </button>
        </div>
      </div>

      {/* Quick Navigation Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <button
          onClick={() => onNavigateTab('explore')}
          className="p-4 bg-white border border-stone-200 rounded-xl hover:border-amber-400 text-left transition-all shadow-sm cursor-pointer group"
        >
          <Compass className="w-5 h-5 text-amber-700 mb-2 group-hover:scale-110 transition-transform" />
          <h4 className="font-bold text-stone-900 text-xs">Explore Destinations</h4>
          <p className="text-[11px] text-stone-500">Discover all 38 districts</p>
        </button>

        <button
          onClick={() => onNavigateTab('trips')}
          className="p-4 bg-white border border-stone-200 rounded-xl hover:border-amber-400 text-left transition-all shadow-sm cursor-pointer group"
        >
          <Sparkles className="w-5 h-5 text-amber-700 mb-2 group-hover:scale-110 transition-transform" />
          <h4 className="font-bold text-stone-900 text-xs">Plan with AI</h4>
          <p className="text-[11px] text-stone-500">Personalized day itineraries</p>
        </button>

        <button
          onClick={() => onNavigateTab('hotels')}
          className="p-4 bg-white border border-stone-200 rounded-xl hover:border-amber-400 text-left transition-all shadow-sm cursor-pointer group"
        >
          <Hotel className="w-5 h-5 text-amber-700 mb-2 group-hover:scale-110 transition-transform" />
          <h4 className="font-bold text-stone-900 text-xs">Heritage Stays</h4>
          <p className="text-[11px] text-stone-500">Book palaces & resorts</p>
        </button>

        <button
          onClick={() => onNavigateTab('transport')}
          className="p-4 bg-white border border-stone-200 rounded-xl hover:border-amber-400 text-left transition-all shadow-sm cursor-pointer group"
        >
          <Bus className="w-5 h-5 text-amber-700 mb-2 group-hover:scale-110 transition-transform" />
          <h4 className="font-bold text-stone-900 text-xs">Transit & Rentals</h4>
          <p className="text-[11px] text-stone-500">SETC buses & vehicles</p>
        </button>
      </div>

      {/* Dashboard Sub-Tabs */}
      <div className="flex items-center gap-2 border-b border-stone-200 overflow-x-auto pb-1 text-xs font-semibold">
        {[
          { id: 'bookings', label: `My Booking Requests (${user.bookings?.length || 0})` },
          { id: 'wishlist', label: `Saved Favourites (${wishlistDestinations.length})` },
          { id: 'stories', label: `Saved Stories (${user.savedStories?.length || 0})` },
          { id: 'profile', label: 'Profile & Language Settings' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`py-2 px-3.5 border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === tab.id
                ? 'border-amber-600 text-amber-900 font-bold'
                : 'border-transparent text-stone-500 hover:text-stone-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB 1: BOOKING REQUESTS WITH LIVE REAL-TIME STATUS */}
      {activeTab === 'bookings' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-display font-bold text-base text-stone-900">
              Booking Requests & Reservation History
            </h3>
            <span className="text-xs text-stone-500 font-medium">
              Updates from administrators reflect in real-time
            </span>
          </div>

          {user.bookings && user.bookings.length > 0 ? (
            <div className="space-y-3">
              {user.bookings.map((booking) => (
                <div 
                  key={booking.id}
                  className="p-5 bg-white border border-stone-200 rounded-xl shadow-sm flex flex-wrap items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 ${
                        booking.status === 'confirmed' 
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' 
                          : booking.status === 'pending'
                          ? 'bg-amber-100 text-amber-800 border border-amber-300'
                          : 'bg-rose-100 text-rose-800 border border-rose-300'
                      }`}>
                        {booking.status === 'confirmed' && <CheckCircle className="w-3 h-3 text-emerald-700" />}
                        {booking.status === 'pending' && <Clock className="w-3 h-3 text-amber-700" />}
                        {booking.status === 'cancelled' && <XCircle className="w-3 h-3 text-rose-700" />}
                        <span>Status: {booking.status}</span>
                      </span>
                      <span className="text-[11px] font-mono text-stone-400">ID: {booking.id}</span>
                    </div>

                    <h4 className="font-bold text-stone-900 text-sm">{booking.title}</h4>
                    <p className="text-xs text-stone-500">
                      Travel Date: <strong className="text-stone-800">{booking.date}</strong> · Travelers: {booking.travelers}
                    </p>
                    {booking.adminNotes && (
                      <p className="text-[11px] text-amber-900 bg-amber-50 p-2 rounded border border-amber-200/60 mt-1">
                        <strong>Admin Note:</strong> {booking.adminNotes}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <span className="text-[10px] text-stone-400 block uppercase">Total Amount</span>
                      <span className="font-bold text-amber-900 text-base">₹{booking.totalPrice.toLocaleString('en-IN')}</span>
                    </div>

                    {booking.status !== 'cancelled' && (
                      <button
                        onClick={() => cancelBooking(booking.id)}
                        className="py-1.5 px-3 rounded-lg border border-stone-200 hover:bg-rose-50 text-stone-600 hover:text-rose-700 text-xs font-medium cursor-pointer"
                      >
                        Cancel Request
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-xl border border-stone-200 p-6 space-y-2">
              <Calendar className="w-8 h-8 text-stone-300 mx-auto" />
              <h4 className="font-bold text-stone-700 text-sm">No Active Booking Requests</h4>
              <p className="text-xs text-stone-500 max-w-sm mx-auto">
                Explore our curated tour packages, heritage homestays, or rental vehicles and submit your reservation request.
              </p>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: SAVED FAVOURITES */}
      {activeTab === 'wishlist' && (
        <div className="space-y-4">
          <h3 className="font-display font-bold text-base text-stone-900">
            Saved Tourist Destinations & Hidden Spots
          </h3>

          {wishlistDestinations.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {wishlistDestinations.map(dest => (
                <div key={dest.id} className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="aspect-[16/10] bg-stone-100 relative overflow-hidden">
                      <img src={dest.images[0]} alt={dest.name} className="w-full h-full object-cover" />
                      <button
                        onClick={() => toggleWishlist(dest.id)}
                        className="absolute top-2 right-2 p-1.5 rounded-full bg-stone-900/80 text-rose-500 hover:bg-stone-900 cursor-pointer"
                      >
                        <Heart className="w-4 h-4 fill-rose-500" />
                      </button>
                    </div>
                    <div className="p-4 space-y-1">
                      <span className="text-[11px] text-amber-800 font-bold uppercase">{dest.district}</span>
                      <h4 className="font-display font-bold text-stone-900 text-sm line-clamp-1">{dest.name}</h4>
                      <p className="text-xs text-stone-600 line-clamp-2">{dest.description}</p>
                    </div>
                  </div>
                  <div className="p-4 pt-0">
                    <button
                      onClick={() => onSelectDestination(dest)}
                      className="w-full py-2 rounded-lg bg-stone-900 hover:bg-amber-600 hover:text-stone-950 text-white font-bold text-xs transition-colors cursor-pointer"
                    >
                      View Place Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-xl border border-stone-200 p-6 space-y-2">
              <Heart className="w-8 h-8 text-stone-300 mx-auto" />
              <h4 className="font-bold text-stone-700 text-sm">No Saved Places</h4>
              <p className="text-xs text-stone-500">Tap the heart icon on any landmark or hidden gem while exploring.</p>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: SAVED STORIES */}
      {activeTab === 'stories' && (
        <div className="space-y-4">
          <h3 className="font-display font-bold text-base text-stone-900">
            Bookmarked Cultural Stories & Legends
          </h3>
          <p className="text-xs text-stone-500">
            You can read or listen to audio storytelling for your bookmarked historical places anytime.
          </p>
          <div className="p-6 bg-white border border-stone-200 rounded-xl text-center">
            <button
              onClick={() => onNavigateTab('stories')}
              className="py-2 px-4 rounded-xl bg-stone-900 text-white font-bold text-xs"
            >
              Browse All Cultural Stories
            </button>
          </div>
        </div>
      )}

      {/* TAB 4: PROFILE SETTINGS */}
      {activeTab === 'profile' && (
        <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-sm space-y-6 text-xs max-w-lg">
          {successNotice && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-800 font-medium">
              {successNotice}
            </div>
          )}

          <form onSubmit={handleSaveProfile} className="space-y-4">
            <h4 className="font-bold text-stone-900 text-sm uppercase tracking-wide">
              Customer Profile Settings
            </h4>
            
            <div className="space-y-1">
              <label className="font-semibold text-stone-700">Customer Name</label>
              <input
                type="text"
                value={editingName}
                onChange={(e) => setEditingName(e.target.value)}
                className="w-full bg-stone-50 border border-stone-300 rounded-lg p-2 text-xs text-stone-900"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-stone-700">Email Address (Read Only)</label>
              <input
                type="email"
                value={user.email}
                disabled
                className="w-full bg-stone-100 border border-stone-200 rounded-lg p-2 text-xs text-stone-500"
              />
            </div>

            <button
              type="submit"
              className="py-2.5 px-4 rounded-lg bg-stone-900 hover:bg-stone-800 text-white font-bold transition-colors cursor-pointer"
            >
              Save Profile Changes
            </button>
          </form>

          <div className="pt-4 border-t border-stone-200 space-y-3">
            <h4 className="font-bold text-stone-900 text-sm uppercase tracking-wide">
              Preferred Language
            </h4>
            <div className="flex gap-2">
              {[
                { id: 'en', label: 'English' },
                { id: 'ta', label: 'தமிழ்' },
                { id: 'hi', label: 'हिन्दी' }
              ].map(l => (
                <button
                  key={l.id}
                  type="button"
                  onClick={() => handleLanguageChange(l.id as any)}
                  className={`py-1.5 px-3 rounded-lg border text-xs font-semibold cursor-pointer ${
                    language === l.id ? 'bg-amber-600 text-stone-950 border-amber-600 font-bold' : 'bg-stone-50 text-stone-700'
                  }`}
                >
                  {l.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
