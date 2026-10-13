import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  MapPin, 
  Search, 
  Compass, 
  BookOpen, 
  Bot, 
  Filter, 
  Calendar, 
  ShieldAlert, 
  ArrowRight, 
  Locate, 
  Clock, 
  Star, 
  ChevronRight,
  Heart,
  SlidersHorizontal,
  X
} from 'lucide-react';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { BottomNav } from './components/BottomNav';
import { DestinationCard } from './components/DestinationCard';
import { DestinationDetailModal } from './components/DestinationDetailModal';
import { TNStoriesModal } from './components/TNStoriesModal';
import { AiChatbot } from './components/AiChatbot';
import { ItineraryPlanner } from './components/ItineraryPlanner';
import { InteractiveMap } from './components/InteractiveMap';
import { TransportGuide } from './components/TransportGuide';
import { HotelSection } from './components/HotelSection';
import { FoodSection } from './components/FoodSection';
import { EmergencySection } from './components/EmergencySection';
import { EventsSection } from './components/EventsSection';
import { OffersPackagesSection } from './components/OffersPackagesSection';
import { AdminDashboard } from './components/AdminDashboard';
import { AdminLoginPage } from './components/AdminLoginPage';
import { CustomerLoginPage } from './components/CustomerLoginPage';
import { CustomerDashboard } from './components/CustomerDashboard';
import { AuthModal } from './components/AuthModal';
import { UserProfile } from './components/UserProfile';
import { DESTINATIONS, STORIES, SPECIAL_OFFERS, TOUR_PACKAGES } from './data/mockData';
import { Destination, Story } from './types';

function MainApp() {
  const { language, t } = useLanguage();
  const { user, openAuthModal, isAdmin } = useAuth();

  const [activeTab, setActiveTab] = useState<string>('home');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('all');
  const [budgetFilter, setBudgetFilter] = useState<string>('all');
  const [onlyHiddenGems, setOnlyHiddenGems] = useState<boolean>(false);

  // Live database destinations state (connected to backend persistent database)
  const [destinations, setDestinations] = useState<Destination[]>(DESTINATIONS);
  const [dbVersion, setDbVersion] = useState<number>(1);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);

  // Fetch live destinations from backend database
  const fetchDestinations = async () => {
    try {
      setIsSyncing(true);
      const res = await fetch('/api/destinations');
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          setDestinations(data);
        }
      }
    } catch (e) {
      console.warn('Backend sync offline fallback:', e);
    } finally {
      setIsSyncing(false);
    }
  };

  useEffect(() => {
    fetchDestinations();
  }, []);

  // Real-time updates: poll DB version periodically to update customer app when admin publishes changes
  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const res = await fetch('/api/db/version');
        if (res.ok) {
          const data = await res.json();
          if (data.version && data.version !== dbVersion) {
            setDbVersion(data.version);
            fetchDestinations();
          }
        }
      } catch {}
    }, 6000);
    return () => clearInterval(interval);
  }, [dbVersion]);

  // Modals state
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);

  // User Geolocation
  const [userCoords, setUserCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [locationStatus, setLocationStatus] = useState<'idle' | 'detecting' | 'granted' | 'denied'>('idle');

  const requestUserLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser.');
      return;
    }
    setLocationStatus('detecting');
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setLocationStatus('granted');
      },
      (err) => {
        console.warn('Geolocation denied or unavailable:', err);
        setLocationStatus('denied');
      },
      { timeout: 10000 }
    );
  };

  const handleOpenStoryByDestinationId = (destinationId: string) => {
    const found = STORIES.find(s => s.destinationId === destinationId) || STORIES[0];
    setSelectedStory(found);
  };

  // Districts list
  const districts = ['all', 'Thanjavur', 'Madurai', 'Nilgiris', 'Ramanathapuram', 'Cuddalore', 'Chengalpattu', 'Dindigul', 'Kanyakumari', 'Dharmapuri', 'Sivaganga', 'Namakkal'];

  // Categories list
  const categories = [
    { id: 'all', label: t('categoryAll') },
    { id: 'popular', label: t('categoryPopular') },
    { id: 'hidden', label: t('categoryHidden') },
    { id: 'temples', label: t('categoryTemples') },
    { id: 'historical', label: t('categoryHistorical') },
    { id: 'hill_stations', label: t('categoryHills') },
    { id: 'beaches', label: t('categoryBeaches') },
    { id: 'waterfalls', label: t('categoryWaterfalls') },
    { id: 'wildlife', label: t('categoryWildlife') },
    { id: 'heritage', label: t('categoryHeritage') }
  ];

  // Filter logic (connected to live persistent destinations)
  const filteredDestinations = destinations.filter((dest) => {
    // 1. Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchText = 
        dest.name.toLowerCase().includes(q) ||
        (dest.nameTa && dest.nameTa.includes(q)) ||
        dest.district.toLowerCase().includes(q) ||
        dest.description.toLowerCase().includes(q);
      if (!matchText) return false;
    }

    // 2. Hidden Gems Toggle
    if (onlyHiddenGems && !dest.isHiddenSpot) return false;

    // 3. Category
    if (selectedCategory !== 'all') {
      if (selectedCategory === 'popular' && !dest.isPopular) return false;
      if (selectedCategory === 'hidden' && !dest.isHiddenSpot) return false;
      if (selectedCategory !== 'popular' && selectedCategory !== 'hidden' && dest.category !== selectedCategory) return false;
    }

    // 4. District
    if (selectedDistrict !== 'all' && dest.district.toLowerCase() !== selectedDistrict.toLowerCase()) {
      return false;
    }

    // 5. Budget Filter
    if (budgetFilter === 'free' && dest.entryFee.adult > 0) return false;
    if (budgetFilter === 'under100' && dest.entryFee.adult > 100) return false;

    return true;
  });

  return (
    <div className="min-h-screen flex flex-col bg-[#fdfbf7] text-stone-900 pb-20 sm:pb-0">
      
      {/* 1. Global Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onOpenAuth={() => openAuthModal('login')}
      />

      {/* 2. Main Content Router */}
      <main className="flex-1">
        
        {/* TAB: HOME */}
        {activeTab === 'home' && (
          <div className="space-y-12 sm:space-y-16">
            
            {/* HERO BANNER: Soul of Tamil Nadu */}
            <section className="relative overflow-hidden bg-gradient-to-b from-stone-950 via-stone-900 to-amber-950 text-amber-50 py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-b border-amber-900/40">
              
              {/* Background ambient lighting */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(217,119,6,0.25),rgba(255,255,255,0))] pointer-events-none" />
              
              <div className="max-w-4xl mx-auto text-center relative z-10 space-y-6">
                
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-semibold backdrop-blur-sm">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Discover Ancient Mysteries & Living Heritage</span>
                </div>

                <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.15]">
                  {language === 'ta' 
                    ? 'தமிழ்நாட்டின் ஆன்மாவை உணருங்கள்' 
                    : 'Uncover the Living Stories of Tamil Nadu'}
                </h1>

                <p className="text-stone-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
                  {t('welcomeSubtitle')} From the 80-tonne capstone of Thanjavur to the mist of Avalanche Lake, explore verified spots with real cultural storytelling.
                </p>

                {/* Hero Quick Search & Location Detection */}
                <div className="max-w-xl mx-auto pt-2 flex flex-col sm:flex-row items-center gap-2">
                  <div className="relative w-full">
                    <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search temples, hill stations, hidden gems..."
                      className="w-full bg-stone-900/90 border border-stone-700/80 rounded-xl pl-10 pr-4 py-3 text-xs sm:text-sm text-white placeholder-stone-400 focus:outline-none focus:border-amber-500 shadow-inner"
                    />
                  </div>

                  <button
                    onClick={requestUserLocation}
                    className="w-full sm:w-auto px-4 py-3 rounded-xl bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-xs whitespace-nowrap flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-md"
                  >
                    <Locate className="w-4 h-4" />
                    <span>{locationStatus === 'granted' ? 'Location Active' : 'Near Me'}</span>
                  </button>
                </div>

                {/* Hero Quick Category Pills */}
                <div className="pt-4 flex flex-wrap items-center justify-center gap-2 text-xs">
                  <button
                    onClick={() => {
                      setOnlyHiddenGems(true);
                      setActiveTab('explore');
                    }}
                    className="px-3 py-1.5 rounded-lg bg-emerald-950/70 border border-emerald-700/60 text-emerald-300 hover:bg-emerald-900 cursor-pointer font-medium"
                  >
                    ★ Verified Hidden Spots
                  </button>
                  <button
                    onClick={() => {
                      setSelectedCategory('temples');
                      setActiveTab('explore');
                    }}
                    className="px-3 py-1.5 rounded-lg bg-stone-800 border border-stone-700 text-amber-200 hover:bg-stone-700 cursor-pointer font-medium"
                  >
                    🏛 Sacred Chola & Pandya Temples
                  </button>
                  <button
                    onClick={() => setActiveTab('trips')}
                    className="px-3 py-1.5 rounded-lg bg-amber-500/20 border border-amber-500/40 text-amber-300 hover:bg-amber-500/30 cursor-pointer font-medium"
                  >
                    ✨ AI Trip Planner
                  </button>
                </div>

              </div>
            </section>

            {/* SECTION: FEATURED HIGHLIGHTS (VERIFIED HIDDEN GEMS) */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <span className="text-amber-800 text-xs font-bold uppercase tracking-wider">
                    Uncrowded Wonders
                  </span>
                  <h2 className="font-display text-2xl sm:text-3xl font-bold text-stone-900 mt-0.5">
                    Verified Hidden Tourist Spots
                  </h2>
                </div>
                <button
                  onClick={() => {
                    setOnlyHiddenGems(true);
                    setActiveTab('explore');
                  }}
                  className="text-xs font-semibold text-amber-800 hover:text-amber-900 flex items-center gap-1"
                >
                  <span>View All Hidden Gems</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {destinations.filter(d => d.isHiddenSpot).slice(0, 4).map(dest => (
                  <DestinationCard
                    key={dest.id}
                    destination={dest}
                    onSelect={(d) => setSelectedDestination(d)}
                    onOpenStory={(id) => handleOpenStoryByDestinationId(id)}
                  />
                ))}
              </div>
            </section>

            {/* SECTION: UNIQUE FEATURE - "TN STORIES" BANNER */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="bg-gradient-to-r from-stone-900 via-amber-950 to-stone-900 rounded-2xl p-6 sm:p-10 text-amber-50 shadow-xl border border-amber-900/40 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="space-y-3 max-w-xl">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold border border-amber-500/30">
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>The Signature Feature</span>
                  </div>
                  <h3 className="font-display text-2xl sm:text-3xl font-bold text-white leading-tight">
                    TN Stories: Discover the Soul Behind Every Place
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                    Hear why Thanjavur's 80-tonne granite capstone casts no ground shadow, listen to how the Swiss-engineered Blue Mountain train climbs the Nilgiris, and explore living traditions in Tamil and English audio narration.
                  </p>
                  <div className="pt-2 flex flex-wrap gap-3">
                    <button
                      onClick={() => setActiveTab('stories')}
                      className="py-2.5 px-5 rounded-xl bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer shadow-md"
                    >
                      Explore Cultural Stories
                    </button>
                    <button
                      onClick={() => {
                        const firstStory = STORIES[0];
                        setSelectedStory(firstStory);
                      }}
                      className="py-2.5 px-4 rounded-xl bg-stone-800 hover:bg-stone-700 text-amber-200 border border-stone-700 text-xs font-semibold transition-colors cursor-pointer"
                    >
                      Sample Big Temple Story
                    </button>
                  </div>
                </div>

                <div className="w-full md:w-72 aspect-[4/3] rounded-xl overflow-hidden bg-stone-800 border border-amber-700/30 shadow-lg shrink-0">
                  <img
                    src="https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80"
                    alt="Temple Architecture"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </section>

            {/* SECTION: ICONIC POPULAR LANDMARKS */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <span className="text-amber-800 text-xs font-bold uppercase tracking-wider">
                    Historic Pride
                  </span>
                  <h2 className="font-display text-2xl sm:text-3xl font-bold text-stone-900 mt-0.5">
                    Iconic Heritage & Sacred Sanctuaries
                  </h2>
                </div>
                <button
                  onClick={() => {
                    setSelectedCategory('temples');
                    setActiveTab('explore');
                  }}
                  className="text-xs font-semibold text-amber-800 hover:text-amber-900 flex items-center gap-1"
                >
                  <span>View All Temples</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {destinations.filter(d => d.isPopular).slice(0, 4).map(dest => (
                  <DestinationCard
                    key={dest.id}
                    destination={dest}
                    onSelect={(d) => setSelectedDestination(d)}
                    onOpenStory={(id) => handleOpenStoryByDestinationId(id)}
                  />
                ))}
              </div>
            </section>

            {/* SECTION: PROMOTIONAL OFFERS & TOUR PACKAGES PREVIEW */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
              <div className="bg-amber-50/60 rounded-2xl border border-amber-200/80 p-6 sm:p-8 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <h3 className="font-display text-xl font-bold text-stone-900">
                      Curated All-Inclusive Tour Packages
                    </h3>
                    <p className="text-xs text-stone-600">
                      Chola trails, Western Ghats misty tea bungalows, and sacred coastal circuits.
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveTab('packages')}
                    className="text-xs font-bold text-amber-900 hover:underline"
                  >
                    View All Packages ➔
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                  {TOUR_PACKAGES.map(pkg => (
                    <div key={pkg.id} className="p-4 bg-white rounded-xl border border-stone-200 space-y-2 shadow-sm">
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-bold text-amber-900">{pkg.duration}</span>
                        <span className="font-bold text-stone-900">₹{pkg.price.toLocaleString('en-IN')}</span>
                      </div>
                      <h4 className="font-bold text-stone-900 text-sm line-clamp-1">{pkg.title}</h4>
                      <p className="text-xs text-stone-500 line-clamp-2">{pkg.subtitle}</p>
                      <button
                        onClick={() => setActiveTab('packages')}
                        className="w-full py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-900 text-xs font-semibold mt-1"
                      >
                        Explore Package
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </section>

          </div>
        )}

        {/* TAB: EXPLORE / ALL DESTINATIONS */}
        {activeTab === 'explore' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
            
            {/* Header & Filter Controls */}
            <div className="space-y-4">
              <div>
                <h1 className="font-display text-2xl sm:text-4xl font-bold text-stone-900">
                  Explore Tourist Places & Hidden Spots
                </h1>
                <p className="text-stone-600 text-xs sm:text-sm mt-1">
                  Discover verified destinations across all 38 districts of Tamil Nadu.
                </p>
              </div>

              {/* Filters Toolbar */}
              <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-white border border-stone-200 rounded-xl shadow-sm text-xs">
                
                {/* District Filter */}
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-stone-600">District:</span>
                  <select
                    value={selectedDistrict}
                    onChange={(e) => setSelectedDistrict(e.target.value)}
                    className="bg-stone-50 border border-stone-300 rounded-lg px-2.5 py-1.5 text-xs text-stone-900 focus:outline-none"
                  >
                    <option value="all">All Districts</option>
                    {districts.filter(d => d !== 'all').map(d => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>

                {/* Budget Filter */}
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-stone-600">Budget:</span>
                  <select
                    value={budgetFilter}
                    onChange={(e) => setBudgetFilter(e.target.value)}
                    className="bg-stone-50 border border-stone-300 rounded-lg px-2.5 py-1.5 text-xs text-stone-900 focus:outline-none"
                  >
                    <option value="all">All Fees</option>
                    <option value="free">Free Entry Only</option>
                    <option value="under100">Under ₹100</option>
                  </select>
                </div>

                {/* Hidden Spot Toggle */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setOnlyHiddenGems(!onlyHiddenGems)}
                    className={`px-3 py-1.5 rounded-lg border font-semibold transition-colors cursor-pointer ${
                      onlyHiddenGems
                        ? 'bg-emerald-700 text-white border-emerald-700'
                        : 'bg-stone-50 border-stone-300 text-stone-700 hover:bg-stone-100'
                    }`}
                  >
                    ★ Hidden Spots Only
                  </button>
                </div>

                {/* Clear Filters */}
                {(selectedCategory !== 'all' || selectedDistrict !== 'all' || onlyHiddenGems || searchQuery) && (
                  <button
                    onClick={() => {
                      setSelectedCategory('all');
                      setSelectedDistrict('all');
                      setOnlyHiddenGems(false);
                      setBudgetFilter('all');
                      setSearchQuery('');
                    }}
                    className="text-rose-600 hover:underline font-medium"
                  >
                    Reset Filters
                  </button>
                )}

              </div>

              {/* Categories Bar */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-2 no-scrollbar text-xs">
                {categories.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setSelectedCategory(cat.id);
                      if (cat.id === 'hidden') setOnlyHiddenGems(true);
                      else setOnlyHiddenGems(false);
                    }}
                    className={`px-3.5 py-1.5 rounded-lg border whitespace-nowrap font-medium transition-colors cursor-pointer ${
                      selectedCategory === cat.id
                        ? 'bg-amber-600 border-amber-600 text-stone-950 font-bold shadow-sm'
                        : 'bg-white border-stone-200 text-stone-600 hover:border-amber-400'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Results Grid */}
            {filteredDestinations.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredDestinations.map(dest => (
                  <DestinationCard
                    key={dest.id}
                    destination={dest}
                    onSelect={(d) => setSelectedDestination(d)}
                    onOpenStory={(id) => handleOpenStoryByDestinationId(id)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-white border border-stone-200 rounded-2xl p-8 space-y-3">
                <Search className="w-10 h-10 text-stone-300 mx-auto" />
                <h3 className="font-display text-lg font-bold text-stone-800">
                  No destinations match your filters
                </h3>
                <p className="text-xs text-stone-500 max-w-sm mx-auto">
                  Try clearing your search query or selecting another district to explore all wonders.
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setSelectedDistrict('all');
                    setOnlyHiddenGems(false);
                    setSearchQuery('');
                  }}
                  className="py-2 px-4 rounded-lg bg-stone-900 text-white text-xs font-bold"
                >
                  Clear All Filters
                </button>
              </div>
            )}

          </div>
        )}

        {/* TAB: TN STORIES CHRONICLE */}
        {activeTab === 'stories' && (
          <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
            <div className="text-center space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300 text-xs font-semibold">
                <BookOpen className="w-3.5 h-3.5 text-amber-700" />
                <span>TN Stories Living Archive</span>
              </div>
              <h1 className="font-display text-2xl sm:text-4xl font-bold text-stone-900">
                Discover the Story Behind Every Place
              </h1>
              <p className="text-stone-600 text-xs sm:text-sm max-w-xl mx-auto">
                Archaeological facts, royal Chola and Pandya epigraphy, Western Ghats folklore, and bilingual Tamil/English audio narration.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {STORIES.map(story => (
                <div key={story.id} className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm flex flex-col justify-between">
                  <div className="p-6 space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-amber-800">{story.destinationName}</span>
                      <span className="text-stone-500 font-serif italic">{story.historicalEra}</span>
                    </div>

                    <h2 className="font-display text-xl font-bold text-stone-900 leading-snug">
                      {story.title}
                    </h2>

                    <p className="text-xs text-stone-600 leading-relaxed">
                      {story.summary}
                    </p>

                    <div className="pt-2 flex items-center gap-2 text-[11px]">
                      <span className="px-2 py-0.5 rounded bg-amber-50 text-amber-900 border border-amber-200 font-medium">
                        {story.type === 'historical_fact' ? 'Verified Fact' : 'Sacred Legend'}
                      </span>
                      <span className="text-emerald-700 font-medium">
                        ✓ Audio Guide Available
                      </span>
                    </div>
                  </div>

                  <div className="p-6 pt-0">
                    <button
                      onClick={() => setSelectedStory(story)}
                      className="w-full py-2.5 rounded-lg bg-stone-900 hover:bg-amber-600 hover:text-stone-950 text-white font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
                    >
                      Read & Listen to Audio Story
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB: ITINERARY PLANNER */}
        {activeTab === 'trips' && <ItineraryPlanner />}

        {/* TAB: INTERACTIVE MAP */}
        {activeTab === 'map' && (
          <div className="max-w-7xl mx-auto px-4 py-8 space-y-4">
            <div>
              <h1 className="font-display text-2xl sm:text-3xl font-bold text-stone-900">
                Interactive Tamil Nadu Tourism Map
              </h1>
              <p className="text-xs text-stone-500">
                Click any marker to view details, distance from your location, and driving directions.
              </p>
            </div>
            <InteractiveMap
              destinations={destinations}
              onSelectDestination={(d) => setSelectedDestination(d)}
              userCoords={userCoords}
              onRequestUserLocation={requestUserLocation}
            />
          </div>
        )}

        {/* TAB: TRANSPORTATION */}
        {activeTab === 'transport' && <TransportGuide />}

        {/* TAB: HOTELS & STAY */}
        {activeTab === 'hotels' && <HotelSection />}

        {/* TAB: FOOD & EATERIES */}
        {activeTab === 'food' && <FoodSection />}

        {/* TAB: EMERGENCY HELPLINE */}
        {activeTab === 'emergency' && <EmergencySection />}

        {/* TAB: FESTIVALS & EVENTS */}
        {activeTab === 'events' && <EventsSection />}

        {/* TAB: OFFERS & PACKAGES */}
        {activeTab === 'packages' && <OffersPackagesSection />}

        {/* TAB: SEPARATE ADMIN LOGIN PAGE */}
        {activeTab === 'admin_login' && (
          <AdminLoginPage
            onSuccess={() => {
              setActiveTab('admin');
              fetchDestinations();
            }}
            onBackToApp={() => setActiveTab('home')}
            onGoToCustomerLogin={() => setActiveTab('customer_login')}
          />
        )}

        {/* TAB: SEPARATE CUSTOMER LOGIN & REGISTRATION PAGE */}
        {activeTab === 'customer_login' && (
          <CustomerLoginPage
            onSuccess={() => {
              setActiveTab('customer_dashboard');
              fetchDestinations();
            }}
            onBackToApp={() => setActiveTab('home')}
            onGoToAdminLogin={() => setActiveTab('admin_login')}
          />
        )}

        {/* TAB: CUSTOMER DASHBOARD */}
        {(activeTab === 'customer_dashboard' || (activeTab === 'profile' && user?.role !== 'admin')) && (
          <CustomerDashboard
            destinations={destinations}
            onSelectDestination={(d) => setSelectedDestination(d)}
            onOpenStory={(id) => handleOpenStoryByDestinationId(id)}
            onNavigateTab={(tabId) => setActiveTab(tabId)}
            onLogoutSuccess={() => setActiveTab('home')}
          />
        )}

        {/* TAB: ADMIN DASHBOARD (STRICT ROLE-BASED ACCESS CONTROL) */}
        {activeTab === 'admin' && (
          isAdmin ? (
            <AdminDashboard
              onDataChanged={() => fetchDestinations()}
              onLogoutSuccess={() => setActiveTab('home')}
            />
          ) : (
            <div className="max-w-md mx-auto my-16 p-8 bg-white border border-stone-200 rounded-2xl text-center space-y-4 shadow-xl">
              <div className="w-14 h-14 rounded-2xl bg-rose-100 border border-rose-200 flex items-center justify-center mx-auto text-rose-700">
                <ShieldAlert className="w-8 h-8" />
              </div>
              <h2 className="font-display text-xl font-bold text-stone-900">
                Access Restricted
              </h2>
              <p className="text-xs text-stone-600 leading-relaxed">
                The Administrator Portal requires an authorized administrator account. Customers and travelers cannot access administrative functions or moderation APIs.
              </p>
              <div className="pt-2 flex flex-col gap-2">
                <button
                  onClick={() => setActiveTab('admin_login')}
                  className="w-full py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-amber-300 font-bold text-xs uppercase tracking-wider cursor-pointer"
                >
                  Go to Admin Login Portal
                </button>
                <button
                  onClick={() => setActiveTab('home')}
                  className="w-full py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold text-xs cursor-pointer"
                >
                  Return to TN Stories
                </button>
              </div>
            </div>
          )
        )}

      </main>

      {/* 3. Global Footer */}
      <footer className="bg-stone-950 text-stone-400 border-t border-stone-800 text-xs py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-amber-600 text-stone-950 font-display font-bold flex items-center justify-center">
                TN
              </div>
              <span className="font-display font-bold text-base text-amber-100">
                TN Stories
              </span>
            </div>
            <p className="text-xs text-stone-400 leading-relaxed">
              AI-Powered Tamil Nadu Tourism startup application dedicated to discovering verified hidden spots, cultural stories, and sustainable travel.
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold text-amber-200 text-xs uppercase tracking-wider">Quick Navigation</h4>
            <ul className="space-y-1.5 text-stone-400">
              <li><button onClick={() => setActiveTab('explore')} className="hover:text-white cursor-pointer">Explore Tourist Spots</button></li>
              <li><button onClick={() => setActiveTab('stories')} className="hover:text-white cursor-pointer">TN Stories Archive</button></li>
              <li><button onClick={() => setActiveTab('trips')} className="hover:text-white cursor-pointer">AI Itinerary Planner</button></li>
              <li><button onClick={() => setActiveTab('map')} className="hover:text-white cursor-pointer">Interactive Live Map</button></li>
            </ul>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold text-amber-200 text-xs uppercase tracking-wider">Transit & Hospitality</h4>
            <ul className="space-y-1.5 text-stone-400">
              <li><button onClick={() => setActiveTab('transport')} className="hover:text-white cursor-pointer">SETC Government Buses</button></li>
              <li><button onClick={() => setActiveTab('hotels')} className="hover:text-white cursor-pointer">Heritage Homestays</button></li>
              <li><button onClick={() => setActiveTab('food')} className="hover:text-white cursor-pointer">Regional Specialties</button></li>
              <li><button onClick={() => setActiveTab('emergency')} className="hover:text-white cursor-pointer">24x7 Emergency Helplines</button></li>
            </ul>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold text-amber-200 text-xs uppercase tracking-wider">Official Tourism Partners</h4>
            <p className="text-[11px] text-stone-400">
              Data verified against Archaeological Survey of India (ASI) records, HR&CE temple schedules, and official Tamil Nadu Tourism directories.
            </p>
            <div className="pt-2 flex items-center gap-2">
              <span className="text-[10px] bg-stone-900 border border-stone-800 px-2 py-1 rounded text-stone-300">
                100% Verified Data
              </span>
              <span className="text-[10px] bg-stone-900 border border-stone-800 px-2 py-1 rounded text-stone-300">
                Gemini 3.8 AI
              </span>
            </div>
          </div>

        </div>

        <div className="max-w-7xl mx-auto pt-8 mt-8 border-t border-stone-900 flex flex-wrap items-center justify-between gap-2 text-[11px] text-stone-400">
          <span>© 2026 TN Stories Startup Application. Soul of Tamil Nadu.</span>
          <span>Made for Travelers, Historians & Pilgrims</span>
        </div>
      </footer>

      {/* 4. Mobile Bottom Navigation Bar */}
      <BottomNav
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenChat={() => setIsChatOpen(true)}
        isChatOpen={isChatOpen}
      />

      {/* 5. Floating AI Assistant Trigger (Desktop) */}
      <div className="fixed bottom-6 right-6 z-40 hidden sm:block">
        {!isChatOpen && (
          <button
            onClick={() => setIsChatOpen(true)}
            className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-stone-900 hover:bg-stone-800 text-amber-300 border border-amber-500/40 shadow-2xl transition-all cursor-pointer group"
          >
            <div className="w-8 h-8 rounded-xl bg-amber-600/20 flex items-center justify-center text-amber-400">
              <Bot className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </div>
            <div className="text-left">
              <div className="text-xs font-bold text-white">Ask TN Stories AI</div>
              <div className="text-[10px] text-amber-400">Gemini 3.8 Travel Guide</div>
            </div>
          </button>
        )}
      </div>

      {/* 6. AI Chatbot Drawer/Modal */}
      <AiChatbot
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        isFloating={true}
      />

      {/* 7. Destination Detailed View Modal */}
      <DestinationDetailModal
        destination={selectedDestination}
        onClose={() => setSelectedDestination(null)}
        onOpenStory={(destId) => {
          setSelectedDestination(null);
          handleOpenStoryByDestinationId(destId);
        }}
        userCoords={userCoords}
      />

      {/* 8. TN Stories Dedicated Cultural Modal */}
      <TNStoriesModal
        story={selectedStory}
        onClose={() => setSelectedStory(null)}
      />

      {/* 9. User Authentication Modal */}
      <AuthModal />

    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <MainApp />
      </AuthProvider>
    </LanguageProvider>
  );
}
