import React, { useState } from 'react';
import { 
  Compass, 
  BookOpen, 
  MapPin, 
  Sparkles, 
  Bus, 
  Hotel, 
  Utensils, 
  PhoneCall, 
  Heart, 
  User as UserIcon, 
  ShieldCheck, 
  Menu, 
  X,
  Search,
  Globe
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { Language } from '../types';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onOpenAuth: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  searchQuery,
  setSearchQuery,
  onOpenAuth
}) => {
  const { language, setLanguage, t } = useLanguage();
  const { user, isAuthenticated, isAdmin } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: t('navHome'), icon: Compass },
    { id: 'explore', label: t('navExplore'), icon: MapPin },
    { id: 'stories', label: t('navStories'), icon: BookOpen },
    { id: 'trips', label: t('navTrips'), icon: Sparkles },
    { id: 'map', label: t('navMap'), icon: Compass },
    { id: 'transport', label: t('navTransport'), icon: Bus },
    { id: 'hotels', label: t('navHotels'), icon: Hotel },
    { id: 'food', label: t('navFood'), icon: Utensils },
    { id: 'emergency', label: t('navEmergency'), icon: PhoneCall },
  ];

  const handleNavClick = (tabId: string) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-stone-900/95 backdrop-blur-md text-amber-50 border-b border-amber-900/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-3">
          
          {/* Brand Logo */}
          <button 
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 text-left focus:outline-none group cursor-pointer"
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-lg bg-gradient-to-br from-amber-600 to-amber-800 flex items-center justify-center shadow-md border border-amber-500/30 group-hover:from-amber-500 group-hover:to-amber-700 transition-all">
              <span className="font-display font-bold text-xl text-amber-100">TN</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-display font-bold text-lg sm:text-xl tracking-tight text-amber-100">
                  TN Stories
                </span>
                <span className="text-[10px] bg-amber-500/20 text-amber-300 px-1.5 py-0.5 rounded font-mono font-medium border border-amber-500/30">
                  TAMIL NADU
                </span>
              </div>
              <p className="text-[11px] text-amber-200/70 hidden sm:block">
                Soul of Tamil Nadu · Heritage & Hidden Spots
              </p>
            </div>
          </button>

          {/* Desktop Search Bar */}
          <div className="hidden lg:flex items-center flex-1 max-w-xs xl:max-w-sm relative">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('searchPlaceholder')}
              className="w-full bg-stone-800/80 border border-stone-700/80 rounded-lg pl-9 pr-3 py-1.5 text-xs text-stone-100 placeholder-stone-400 focus:outline-none focus:border-amber-500/80 focus:ring-1 focus:ring-amber-500/50 transition-all"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-200 text-xs"
              >
                ✕
              </button>
            )}
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1">
            {navLinks.slice(0, 7).map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                  activeTab === item.id 
                    ? 'bg-amber-600/30 text-amber-300 border border-amber-500/40' 
                    : 'text-stone-300 hover:text-amber-200 hover:bg-stone-800/60'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Right Action Cluster: Language, Wishlist, User / Admin */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-stone-800/80 hover:bg-stone-800 border border-stone-700 text-xs text-amber-200 cursor-pointer"
                title={t('selectLanguage')}
              >
                <Globe className="w-3.5 h-3.5 text-amber-400" />
                <span className="font-medium">
                  {language === 'en' ? 'EN' : language === 'ta' ? 'தமிழ்' : 'हिन्दी'}
                </span>
              </button>
              
              {langDropdownOpen && (
                <div 
                  className="absolute right-0 mt-2 w-32 bg-stone-900 border border-stone-700 rounded-lg shadow-xl py-1 z-50 text-xs"
                  onClick={() => setLangDropdownOpen(false)}
                >
                  <button
                    onClick={() => setLanguage('en')}
                    className={`w-full text-left px-3 py-2 hover:bg-stone-800 flex items-center justify-between ${
                      language === 'en' ? 'text-amber-400 font-semibold' : 'text-stone-300'
                    }`}
                  >
                    <span>English</span>
                    {language === 'en' && <span className="text-[10px]">✓</span>}
                  </button>
                  <button
                    onClick={() => setLanguage('ta')}
                    className={`w-full text-left px-3 py-2 hover:bg-stone-800 flex items-center justify-between ${
                      language === 'ta' ? 'text-amber-400 font-semibold' : 'text-stone-300'
                    }`}
                  >
                    <span>தமிழ் (Tamil)</span>
                    {language === 'ta' && <span className="text-[10px]">✓</span>}
                  </button>
                  <button
                    onClick={() => setLanguage('hi')}
                    className={`w-full text-left px-3 py-2 hover:bg-stone-800 flex items-center justify-between ${
                      language === 'hi' ? 'text-amber-400 font-semibold' : 'text-stone-300'
                    }`}
                  >
                    <span>हिन्दी (Hindi)</span>
                    {language === 'hi' && <span className="text-[10px]">✓</span>}
                  </button>
                </div>
              )}
            </div>

            {/* Emergency Quick Action */}
            <button
              onClick={() => handleNavClick('emergency')}
              className="hidden md:flex items-center gap-1 px-2.5 py-1.5 rounded-md bg-rose-950/60 hover:bg-rose-900/80 border border-rose-800/60 text-xs text-rose-300 cursor-pointer transition-colors"
              title="24/7 Emergency Helplines"
            >
              <PhoneCall className="w-3.5 h-3.5 text-rose-400" />
              <span>SOS</span>
            </button>

            {/* Admin link if Admin */}
            {isAdmin && (
              <button
                onClick={() => handleNavClick('admin')}
                className={`hidden md:flex items-center gap-1 px-2.5 py-1.5 rounded-md text-xs font-medium cursor-pointer transition-colors ${
                  activeTab === 'admin'
                    ? 'bg-amber-500 text-stone-900 font-semibold'
                    : 'bg-amber-950/70 border border-amber-800 text-amber-300 hover:bg-amber-900/60'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Admin</span>
              </button>
            )}

            {/* Profile / Auth Button */}
            {isAuthenticated ? (
              <button
                onClick={() => handleNavClick('profile')}
                className={`flex items-center gap-2 pl-2 pr-3 py-1 rounded-md transition-all cursor-pointer border ${
                  activeTab === 'profile'
                    ? 'bg-amber-600/30 border-amber-500 text-amber-200'
                    : 'bg-stone-800/80 border-stone-700 text-stone-200 hover:border-amber-600/50'
                }`}
              >
                <img
                  src={user?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80'}
                  alt={user?.name}
                  className="w-6 h-6 rounded-full object-cover border border-amber-500/40"
                />
                <span className="text-xs font-medium max-w-[80px] sm:max-w-[120px] truncate">
                  {user?.name.split(' ')[0]}
                </span>
                {user?.wishlist && user.wishlist.length > 0 && (
                  <span className="flex items-center gap-0.5 text-[10px] text-amber-300">
                    <Heart className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <span>{user.wishlist.length}</span>
                  </span>
                )}
              </button>
            ) : (
              <button
                onClick={onOpenAuth}
                className="px-3.5 py-1.5 rounded-md bg-amber-600 hover:bg-amber-500 text-stone-950 font-semibold text-xs transition-colors cursor-pointer shadow-sm"
              >
                {t('login')}
              </button>
            )}

            {/* Mobile Hamburger Menu */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-md bg-stone-800 text-stone-300 hover:text-white hover:bg-stone-700 cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar inside header if small screen */}
        <div className="lg:hidden pb-3 pt-1">
          <div className="relative">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('searchPlaceholder')}
              className="w-full bg-stone-800 border border-stone-700 rounded-lg pl-9 pr-3 py-1.5 text-xs text-stone-100 placeholder-stone-400 focus:outline-none focus:border-amber-500"
            />
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-stone-900 border-b border-stone-800 px-4 pt-2 pb-6 space-y-1 shadow-2xl">
          <div className="grid grid-cols-2 gap-2 pt-2 pb-3">
            {navLinks.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-2 p-2.5 rounded-lg text-xs font-medium text-left cursor-pointer ${
                    activeTab === item.id
                      ? 'bg-amber-600 text-stone-950 font-semibold'
                      : 'bg-stone-800/80 text-stone-300 hover:bg-stone-800'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span className="truncate">{item.label}</span>
                </button>
              );
            })}
          </div>

          {isAdmin && (
            <button
              onClick={() => handleNavClick('admin')}
              className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-amber-950/80 border border-amber-800 text-amber-300 text-xs font-medium"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Admin Dashboard</span>
            </button>
          )}

          {!isAuthenticated && (
            <div className="pt-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAuth();
                }}
                className="w-full py-2.5 rounded-lg bg-amber-600 text-stone-950 font-bold text-xs uppercase tracking-wide text-center"
              >
                {t('login')} / {t('signup')}
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};
