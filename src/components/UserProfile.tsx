import React, { useState } from 'react';
import { 
  User as UserIcon, 
  Heart, 
  BookOpen, 
  Calendar, 
  MapPin, 
  LogOut, 
  Globe, 
  Sparkles, 
  Check, 
  Trash2, 
  X,
  CreditCard,
  Tag
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { DESTINATIONS, STORIES, SPECIAL_OFFERS } from '../data/mockData';
import { Destination, Language } from '../types';

interface UserProfileProps {
  onSelectDestination: (dest: Destination) => void;
  onOpenStory: (destId: string) => void;
}

export const UserProfile: React.FC<UserProfileProps> = ({
  onSelectDestination,
  onOpenStory
}) => {
  const { user, logout, updateProfile, cancelBooking, toggleWishlist, toggleSavedStory } = useAuth();
  const { language, setLanguage, t } = useLanguage();

  const [activeProfileTab, setActiveProfileTab] = useState<'wishlist' | 'stories' | 'bookings' | 'settings'>('wishlist');
  const [editingName, setEditingName] = useState(user?.name || '');
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!user) {
    return (
      <div className="max-w-md mx-auto my-16 p-8 bg-white border border-stone-200 rounded-2xl text-center space-y-4 shadow-sm">
        <UserIcon className="w-12 h-12 text-stone-400 mx-auto" />
        <h2 className="font-display text-xl font-bold text-stone-900">
          Sign In to Access Profile
        </h2>
        <p className="text-xs text-stone-600">
          Log in to view saved destinations, cultural stories, booked stays, and travel itineraries.
        </p>
      </div>
    );
  }

  const wishlistDestinations = DESTINATIONS.filter(d => user.wishlist.includes(d.id));
  const savedStories = STORIES.filter(s => user.savedStories.includes(s.id));

  const handleUpdateName = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({ name: editingName });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    updateProfile({ preferredLanguage: lang });
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
      
      {/* Profile Header Hero */}
      <div className="bg-stone-900 text-stone-100 rounded-2xl p-6 sm:p-8 border border-stone-800 flex flex-wrap items-center justify-between gap-6 shadow-md">
        <div className="flex items-center gap-4">
          <img
            src={user.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80'}
            alt={user.name}
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-amber-500/60 shadow-md"
          />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-display text-xl sm:text-2xl font-bold text-white">
                {user.name}
              </h1>
              <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded font-mono border border-amber-500/30">
                {user.role === 'admin' ? 'ADMINISTRATOR' : 'EXPLORER'}
              </span>
            </div>
            <p className="text-xs text-stone-400 mt-0.5">{user.email}</p>
            <div className="flex items-center gap-3 text-xs text-amber-300/80 mt-2">
              <span>{user.wishlist.length} Saved Places</span>
              <span>·</span>
              <span>{user.savedStories.length} Stories</span>
              <span>·</span>
              <span>{user.bookings.length} Bookings</span>
            </div>
          </div>
        </div>

        <button
          onClick={logout}
          className="py-2 px-4 rounded-xl bg-stone-800 hover:bg-rose-950 text-stone-300 hover:text-rose-300 border border-stone-700 text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer"
        >
          <LogOut className="w-4 h-4" />
          <span>{t('logout')}</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-stone-200 overflow-x-auto pb-1 text-xs font-medium">
        {[
          { id: 'wishlist', label: `Saved Places (${wishlistDestinations.length})` },
          { id: 'stories', label: `Saved Stories (${savedStories.length})` },
          { id: 'bookings', label: `My Bookings (${user.bookings.length})` },
          { id: 'settings', label: 'Preferences & Settings' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveProfileTab(tab.id as any)}
            className={`py-2 px-3.5 border-b-2 transition-colors cursor-pointer whitespace-nowrap font-semibold ${
              activeProfileTab === tab.id
                ? 'border-amber-600 text-amber-900 font-bold'
                : 'border-transparent text-stone-500 hover:text-stone-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB 1: WISHLIST */}
      {activeProfileTab === 'wishlist' && (
        <div className="space-y-4">
          {wishlistDestinations.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {wishlistDestinations.map(dest => (
                <div key={dest.id} className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="aspect-[16/10] bg-stone-100 relative">
                      <img src={dest.images[0]} alt={dest.name} className="w-full h-full object-cover" />
                      <button
                        onClick={() => toggleWishlist(dest.id)}
                        className="absolute top-2 right-2 p-1.5 rounded-full bg-stone-900/80 text-rose-400 hover:bg-stone-900 cursor-pointer"
                        title="Remove from saved"
                      >
                        <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
                      </button>
                    </div>
                    <div className="p-4 space-y-1">
                      <span className="text-[11px] text-amber-800 font-bold uppercase">{dest.district}</span>
                      <h3 className="font-display font-bold text-stone-900 text-sm line-clamp-1">{dest.name}</h3>
                      <p className="text-xs text-stone-600 line-clamp-2">{dest.description}</p>
                    </div>
                  </div>
                  <div className="p-4 pt-0">
                    <button
                      onClick={() => onSelectDestination(dest)}
                      className="w-full py-2 rounded-lg bg-stone-900 hover:bg-amber-600 hover:text-stone-950 text-white font-bold text-xs transition-colors cursor-pointer"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-xl border border-stone-200 p-6 space-y-2">
              <Heart className="w-8 h-8 text-stone-300 mx-auto" />
              <h3 className="font-bold text-stone-700 text-sm">Your Saved List is Empty</h3>
              <p className="text-xs text-stone-500">Tap the heart icon on any temple, beach, or hill station to save it for your next trip.</p>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: SAVED STORIES */}
      {activeProfileTab === 'stories' && (
        <div className="space-y-4">
          {savedStories.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {savedStories.map(story => (
                <div key={story.id} className="p-5 bg-white rounded-xl border border-stone-200 shadow-sm space-y-3 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-xs text-amber-800 font-bold">
                      <span>{story.destinationName}</span>
                      <button
                        onClick={() => toggleSavedStory(story.id)}
                        className="text-stone-400 hover:text-rose-600"
                        title="Remove"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <h3 className="font-display font-bold text-stone-900 text-base mt-1">{story.title}</h3>
                    <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed mt-1">{story.summary}</p>
                  </div>
                  <button
                    onClick={() => onOpenStory(story.destinationId)}
                    className="py-2 px-3 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-900 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Read Story</span>
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-xl border border-stone-200 p-6 space-y-2">
              <BookOpen className="w-8 h-8 text-stone-300 mx-auto" />
              <h3 className="font-bold text-stone-700 text-sm">No Stories Saved Yet</h3>
              <p className="text-xs text-stone-500">Bookmark historical chronicles and temple legends to listen or read whenever you want.</p>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: BOOKINGS */}
      {activeProfileTab === 'bookings' && (
        <div className="space-y-4">
          {user.bookings.length > 0 ? (
            <div className="space-y-3">
              {user.bookings.map(book => (
                <div key={book.id} className="p-5 bg-white rounded-xl border border-stone-200 shadow-sm flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                        book.status === 'confirmed' ? 'bg-emerald-100 text-emerald-800' : 'bg-stone-200 text-stone-700'
                      }`}>
                        {book.status}
                      </span>
                      <span className="text-xs font-mono text-stone-400">ID: {book.id}</span>
                    </div>
                    <h3 className="font-bold text-stone-900 text-sm">{book.title}</h3>
                    <p className="text-xs text-stone-500 mt-0.5">
                      Travel Date: {book.date} · Travelers: {book.travelers}
                    </p>
                    {book.notes && (
                      <p className="text-[11px] text-stone-600 mt-1 font-mono">{book.notes}</p>
                    )}
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <span className="text-[11px] text-stone-400 block">Total Amount</span>
                      <span className="font-bold text-amber-900 text-base">₹{book.totalPrice.toLocaleString('en-IN')}</span>
                    </div>

                    {book.status !== 'cancelled' && (
                      <button
                        onClick={() => cancelBooking(book.id)}
                        className="py-1.5 px-3 rounded-lg border border-stone-300 hover:bg-rose-50 text-stone-600 hover:text-rose-700 text-xs font-medium transition-colors cursor-pointer"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-xl border border-stone-200 p-6 space-y-2">
              <Calendar className="w-8 h-8 text-stone-300 mx-auto" />
              <h3 className="font-bold text-stone-700 text-sm">No Active Reservations</h3>
              <p className="text-xs text-stone-500">Your booked hotels, vehicle rentals, and tour packages will appear here.</p>
            </div>
          )}
        </div>
      )}

      {/* TAB 4: SETTINGS & PREFERENCES */}
      {activeProfileTab === 'settings' && (
        <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-sm space-y-6 text-xs max-w-xl">
          
          <form onSubmit={handleUpdateName} className="space-y-3">
            <h3 className="font-bold text-stone-900 text-sm uppercase tracking-wide">Account Details</h3>
            <div>
              <label className="font-semibold text-stone-700 block mb-1">Display Name</label>
              <input
                type="text"
                value={editingName}
                onChange={(e) => setEditingName(e.target.value)}
                className="w-full bg-stone-50 border border-stone-300 rounded-lg p-2 text-xs"
              />
            </div>
            <button
              type="submit"
              className="py-2 px-4 rounded-lg bg-stone-900 hover:bg-stone-800 text-white font-bold transition-colors cursor-pointer"
            >
              {savedSuccess ? 'Updated Name!' : 'Update Profile'}
            </button>
          </form>

          <div className="pt-4 border-t border-stone-200 space-y-3">
            <h3 className="font-bold text-stone-900 text-sm uppercase tracking-wide">Language Preference</h3>
            <div className="flex gap-2">
              {[
                { id: 'en', label: 'English' },
                { id: 'ta', label: 'தமிழ்' },
                { id: 'hi', label: 'हिन्दी' }
              ].map(l => (
                <button
                  key={l.id}
                  onClick={() => handleLanguageChange(l.id as any)}
                  className={`py-1.5 px-3 rounded-lg border text-xs font-semibold cursor-pointer ${
                    language === l.id ? 'bg-amber-600 text-stone-950 border-amber-600' : 'bg-stone-50 text-stone-700'
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
