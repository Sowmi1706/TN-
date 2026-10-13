import React, { useState } from 'react';
import { 
  X, 
  MapPin, 
  Clock, 
  Calendar, 
  IndianRupee, 
  CloudSun, 
  Navigation, 
  Heart, 
  Share2, 
  BookOpen, 
  ShieldAlert, 
  Bus, 
  Hotel as HotelIcon, 
  Utensils, 
  Star, 
  Check, 
  Volume2, 
  ExternalLink,
  ChevronRight,
  Sparkles,
  PhoneCall
} from 'lucide-react';
import { Destination, Review } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { HOTELS, RESTAURANTS, INITIAL_REVIEWS } from '../data/mockData';

interface DestinationDetailModalProps {
  destination: Destination | null;
  onClose: () => void;
  onOpenStory: (destinationId: string) => void;
  userCoords?: { lat: number; lng: number } | null;
}

export const DestinationDetailModal: React.FC<DestinationDetailModalProps> = ({
  destination,
  onClose,
  onOpenStory,
  userCoords
}) => {
  const { language, t } = useLanguage();
  const { user, toggleWishlist } = useAuth();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [reviewsList, setReviewsList] = useState<Review[]>(INITIAL_REVIEWS);
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState('');
  const [newTravelType, setNewTravelType] = useState('Family');
  const [copiedLink, setCopiedLink] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'culture' | 'transit' | 'food_stay' | 'reviews'>('overview');

  if (!destination) return null;

  const isSaved = user?.wishlist?.includes(destination.id);

  // Calculate live open/closed
  const isCurrentlyOpen = (): boolean => {
    try {
      const now = new Date();
      const istHours = (now.getUTCHours() + 5.5 + now.getUTCMinutes() / 60) % 24;
      const { open, close } = destination.openHours24;
      return istHours >= open && istHours <= close;
    } catch {
      return true;
    }
  };
  const isOpen = isCurrentlyOpen();

  // Distance calculation in km using Haversine formula
  const getDistanceFromUser = (): number | null => {
    if (!userCoords) return null;
    const R = 6371; // km
    const dLat = ((destination.latitude - userCoords.lat) * Math.PI) / 180;
    const dLon = ((destination.longitude - userCoords.lng) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((userCoords.lat * Math.PI) / 180) *
        Math.cos((destination.latitude * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return Math.round(R * c);
  };

  const distanceKm = getDistanceFromUser();

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const newRev: Review = {
      id: `rev-${Date.now()}`,
      destinationId: destination.id,
      userId: user?.id || 'guest-traveler',
      userName: user?.name || 'Explorer Friend',
      rating: newRating,
      comment: newComment.trim(),
      visitDate: 'October 2026',
      travelType: newTravelType,
      createdAt: new Date().toISOString().split('T')[0],
      likes: 1
    };

    setReviewsList([newRev, ...reviewsList]);
    setNewComment('');
  };

  // Nearby hotels & restaurants
  const nearbyHotels = HOTELS.filter(h => h.district.toLowerCase() === destination.district.toLowerCase() || h.destinationId === destination.id);
  const nearbyRestaurants = RESTAURANTS.filter(r => r.district.toLowerCase() === destination.district.toLowerCase() || r.destinationId === destination.id);
  const destinationReviews = reviewsList.filter(r => r.destinationId === destination.id);

  const displayName = language === 'ta' && destination.nameTa ? destination.nameTa : destination.name;
  const displayDesc = language === 'ta' && destination.descriptionTa ? destination.descriptionTa : destination.description;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/80 backdrop-blur-sm flex justify-center p-2 sm:p-4 md:p-6 animate-fadeIn">
      <div className="relative w-full max-w-5xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col my-auto max-h-[92vh] border border-stone-200">
        
        {/* Top Sticky Header */}
        <div className="sticky top-0 z-30 bg-stone-900 text-stone-100 px-4 sm:px-6 py-3 flex items-center justify-between border-b border-stone-800">
          <div className="flex items-center gap-2 truncate">
            <span className="text-xs text-amber-400 font-medium tracking-wide uppercase">
              {destination.district}
            </span>
            <span className="text-stone-600">/</span>
            <h2 className="text-sm sm:text-base font-semibold truncate text-stone-100">
              {displayName}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleWishlist(destination.id)}
              className="p-2 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 hover:text-rose-400 transition-colors cursor-pointer"
              title="Save to wishlist"
            >
              <Heart className={`w-4 h-4 ${isSaved ? 'fill-rose-500 text-rose-500' : ''}`} />
            </button>

            <button
              onClick={handleShare}
              className="p-2 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 transition-colors cursor-pointer"
              title="Share destination"
            >
              {copiedLink ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white transition-colors cursor-pointer ml-1"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body Container with custom scroll */}
        <div className="overflow-y-auto flex-1 p-4 sm:p-6 space-y-6">
          
          {/* Hero Gallery Section */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-4">
            {/* Primary Large Image */}
            <div className="lg:col-span-8 relative aspect-[16/10] sm:aspect-[16/9] rounded-xl overflow-hidden bg-stone-900">
              <img
                src={destination.images[activeImageIndex] || destination.images[0]}
                alt={destination.name}
                className="w-full h-full object-cover transition-all duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent pointer-events-none" />
              
              <div className="absolute bottom-4 left-4 right-4 text-white pointer-events-none">
                <div className="flex items-center gap-2 text-xs mb-1">
                  <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-medium ${
                    isOpen ? 'bg-emerald-500/90 text-white' : 'bg-rose-500/90 text-white'
                  }`}>
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                    {isOpen ? t('statusOpen') : t('statusClosed')}
                  </span>
                  {distanceKm !== null && (
                    <span className="bg-stone-900/80 px-2 py-0.5 rounded text-[11px] text-stone-200 font-mono">
                      {distanceKm} km from you
                    </span>
                  )}
                </div>
                <h1 className="font-display text-xl sm:text-3xl font-bold text-white drop-shadow-sm">
                  {displayName}
                </h1>
                {language !== 'ta' && destination.nameTa && (
                  <p className="text-amber-200 text-xs sm:text-sm mt-0.5">
                    {destination.nameTa}
                  </p>
                )}
              </div>
            </div>

            {/* Thumbnail selector and quick stats */}
            <div className="lg:col-span-4 flex flex-col justify-between gap-3">
              <div className="grid grid-cols-3 lg:grid-cols-1 gap-2">
                {destination.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative rounded-lg overflow-hidden aspect-[16/10] lg:aspect-[21/9] border-2 transition-all cursor-pointer ${
                      activeImageIndex === idx ? 'border-amber-600 scale-[1.02]' : 'border-transparent opacity-75 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`View ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>

              {/* Weather & Quick Highlights Card */}
              <div className="p-4 bg-amber-50/70 border border-amber-200/80 rounded-xl space-y-2.5 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-stone-600 flex items-center gap-1.5 font-medium">
                    <CloudSun className="w-4 h-4 text-amber-600" />
                    {t('weather')}
                  </span>
                  <span className="font-semibold text-stone-900 font-mono">
                    {destination.weatherInfo?.temp}°C · {destination.weatherInfo?.condition}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-stone-600 flex items-center gap-1.5 font-medium">
                    <Clock className="w-4 h-4 text-amber-600" />
                    Hours
                  </span>
                  <span className="font-semibold text-stone-900 font-mono">
                    {destination.openingTime} - {destination.closingTime}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-stone-600 flex items-center gap-1.5 font-medium">
                    <Calendar className="w-4 h-4 text-amber-600" />
                    Weekly Holiday
                  </span>
                  <span className="font-medium text-stone-800">
                    {destination.weeklyHoliday || 'Open Everyday'}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-stone-600 flex items-center gap-1.5 font-medium">
                    <IndianRupee className="w-4 h-4 text-amber-600" />
                    Est. Expense
                  </span>
                  <span className="font-bold text-amber-900">
                    ₹{destination.estimatedTripExpense} / person
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Sub-Tabs */}
          <div className="border-b border-stone-200 flex items-center gap-2 overflow-x-auto pb-1 text-xs font-medium">
            {[
              { id: 'overview', label: 'Overview & Story' },
              { id: 'culture', label: 'History & Heritage' },
              { id: 'transit', label: 'Transport & Route' },
              { id: 'food_stay', label: 'Food & Hotels' },
              { id: 'reviews', label: `Reviews (${destinationReviews.length})` }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-2 px-3 border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-amber-700 text-amber-900 font-bold'
                    : 'border-transparent text-stone-500 hover:text-stone-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* TAB 1: OVERVIEW & STORY */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              
              {/* Description */}
              <div>
                <h3 className="font-display text-lg font-bold text-stone-900 mb-2">
                  About the Place
                </h3>
                <p className="text-stone-700 text-sm leading-relaxed">
                  {displayDesc}
                </p>
              </div>

              {/* Dedicated "Discover the Story Behind the Place" Feature */}
              {destination.storyId && (
                <div className="p-5 bg-gradient-to-r from-amber-900 via-amber-950 to-stone-900 rounded-xl text-amber-100 shadow-md border border-amber-700/40 relative overflow-hidden">
                  <div className="relative z-10 space-y-2">
                    <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold uppercase tracking-wider">
                      <Sparkles className="w-4 h-4" />
                      <span>TN Stories Exclusive</span>
                    </div>
                    <h4 className="font-display text-xl sm:text-2xl font-bold text-amber-50">
                      Discover the Story Behind this Place
                    </h4>
                    <p className="text-xs sm:text-sm text-amber-200/80 max-w-2xl leading-relaxed">
                      Hear the sacred legends, engineering feats of ancient builders, and cultural lore passed down across centuries.
                    </p>
                    <div className="pt-2 flex flex-wrap items-center gap-3">
                      <button
                        onClick={() => onOpenStory(destination.id)}
                        className="py-2.5 px-4 rounded-lg bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs flex items-center gap-2 transition-colors cursor-pointer"
                      >
                        <BookOpen className="w-4 h-4" />
                        <span>Read Full Cultural Story</span>
                      </button>
                      <button
                        onClick={() => onOpenStory(destination.id)}
                        className="py-2.5 px-4 rounded-lg bg-stone-800/80 hover:bg-stone-800 text-amber-200 border border-amber-600/40 text-xs font-medium flex items-center gap-2 transition-colors cursor-pointer"
                      >
                        <Volume2 className="w-4 h-4 text-amber-400" />
                        <span>Listen to Audio Guide</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Practical Visiting Info Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                
                {/* Entry Fees */}
                <div className="p-4 bg-stone-50 border border-stone-200 rounded-xl space-y-2">
                  <h4 className="font-semibold text-stone-900 text-xs uppercase tracking-wider flex items-center gap-1.5">
                    <IndianRupee className="w-4 h-4 text-amber-700" />
                    Entry Fees & Tickets
                  </h4>
                  <ul className="text-xs text-stone-600 space-y-1">
                    <li className="flex justify-between">
                      <span>Indian Adults:</span>
                      <span className="font-medium text-stone-900">{destination.entryFee.adult === 0 ? 'Free' : `₹${destination.entryFee.adult}`}</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Children (under 12):</span>
                      <span className="font-medium text-stone-900">{destination.entryFee.child === 0 ? 'Free' : `₹${destination.entryFee.child}`}</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Foreign Tourists:</span>
                      <span className="font-medium text-stone-900">{destination.entryFee.foreigner === 0 ? 'Free' : `₹${destination.entryFee.foreigner}`}</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Still Camera / Phone:</span>
                      <span className="font-medium text-stone-900">{destination.entryFee.camera === 0 ? 'Free' : `₹${destination.entryFee.camera}`}</span>
                    </li>
                  </ul>
                </div>

                {/* Best Season & Duration */}
                <div className="p-4 bg-stone-50 border border-stone-200 rounded-xl space-y-2">
                  <h4 className="font-semibold text-stone-900 text-xs uppercase tracking-wider flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-amber-700" />
                    Optimal Visit Schedule
                  </h4>
                  <div className="text-xs text-stone-600 space-y-1.5">
                    <div>
                      <span className="text-stone-400 block text-[11px]">Best Time of Year:</span>
                      <span className="font-medium text-stone-900">{destination.bestTimeToVisit}</span>
                    </div>
                    <div>
                      <span className="text-stone-400 block text-[11px]">Visiting Duration:</span>
                      <span className="font-medium text-stone-900">{destination.estimatedVisitingDuration}</span>
                    </div>
                  </div>
                </div>

                {/* Accessibility Notes */}
                <div className="p-4 bg-stone-50 border border-stone-200 rounded-xl space-y-2">
                  <h4 className="font-semibold text-stone-900 text-xs uppercase tracking-wider flex items-center gap-1.5">
                    <ShieldAlert className="w-4 h-4 text-amber-700" />
                    Accessibility & Etiquette
                  </h4>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    {destination.accessibilityNotes}
                  </p>
                </div>
              </div>

              {/* Nearby Attractions */}
              <div>
                <h4 className="font-display text-base font-bold text-stone-900 mb-2">
                  Nearby Places to Combine
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {destination.nearbyAttractions.map((attraction, i) => (
                    <div key={i} className="p-3 bg-stone-50 border border-stone-200 rounded-lg flex items-center justify-between text-xs">
                      <span className="font-medium text-stone-800 truncate mr-2">{attraction.name}</span>
                      <span className="text-stone-500 font-mono text-[11px] shrink-0">{attraction.distanceKm} km</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: HISTORY & HERITAGE */}
          {activeTab === 'culture' && (
            <div className="space-y-5">
              <div className="p-4 bg-amber-50/50 border border-amber-200/60 rounded-xl">
                <h4 className="font-display text-base font-bold text-amber-950 mb-1.5">
                  Historical Background
                </h4>
                <p className="text-stone-700 text-sm leading-relaxed">
                  {destination.historicalBackground}
                </p>
              </div>

              <div className="p-4 bg-stone-50 border border-stone-200 rounded-xl">
                <h4 className="font-display text-base font-bold text-stone-900 mb-1.5">
                  Cultural & Architectural Importance
                </h4>
                <p className="text-stone-700 text-sm leading-relaxed">
                  {destination.culturalImportance}
                </p>
              </div>

              {destination.localFoodSpecialties && (
                <div className="p-4 bg-stone-50 border border-stone-200 rounded-xl">
                  <h4 className="font-display text-base font-bold text-stone-900 mb-2">
                    Famous Local Dishes of this Region
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {destination.localFoodSpecialties.map((dish, i) => (
                      <span key={i} className="px-3 py-1 bg-white border border-stone-200 rounded-md text-xs font-medium text-stone-800">
                        🍛 {dish}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: TRANSPORT & TRANSIT */}
          {activeTab === 'transit' && (
            <div className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                <div className="p-4 bg-stone-50 border border-stone-200 rounded-xl space-y-3">
                  <h4 className="font-semibold text-stone-900 text-xs uppercase tracking-wider flex items-center gap-2">
                    <Bus className="w-4 h-4 text-amber-700" />
                    Bus Connectivity & Terminals
                  </h4>
                  <div className="text-xs space-y-1.5 text-stone-700">
                    <p><strong className="text-stone-900">Nearest Bus Stand:</strong> {destination.transportation.nearestBusStand}</p>
                    <p><strong className="text-stone-900">Bus Frequency:</strong> {destination.transportation.busConnectivity}</p>
                    <a
                      href="https://www.tnstc.in"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-amber-800 font-semibold hover:underline pt-1"
                    >
                      <span>Check SETC / TNSTC Bus Timings</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>

                <div className="p-4 bg-stone-50 border border-stone-200 rounded-xl space-y-3">
                  <h4 className="font-semibold text-stone-900 text-xs uppercase tracking-wider flex items-center gap-2">
                    <Navigation className="w-4 h-4 text-amber-700" />
                    Railway & Cab Connectivity
                  </h4>
                  <div className="text-xs space-y-1.5 text-stone-700">
                    <p><strong className="text-stone-900">Nearest Railway Station:</strong> {destination.transportation.nearestRailwayStation}</p>
                    <p><strong className="text-stone-900">Train Links:</strong> {destination.transportation.trainConnectivity}</p>
                    <p><strong className="text-stone-900">Cabs / Auto:</strong> {destination.transportation.taxiAvailability}</p>
                  </div>
                </div>

              </div>

              {/* Emergency Contacts for this specific destination */}
              <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl space-y-2">
                <h4 className="font-semibold text-rose-950 text-xs uppercase tracking-wider flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 text-rose-700" />
                  Local Emergency Facilities
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="flex items-center justify-between p-2.5 bg-white rounded-lg border border-rose-100">
                    <div>
                      <p className="font-semibold text-stone-900">{destination.emergencyContacts.hospital}</p>
                      <p className="text-stone-500 text-[11px]">Primary Hospital</p>
                    </div>
                    <a
                      href={`tel:${destination.emergencyContacts.hospitalPhone}`}
                      className="p-2 bg-rose-100 hover:bg-rose-200 text-rose-800 rounded-md"
                      title="Call hospital"
                    >
                      <PhoneCall className="w-3.5 h-3.5" />
                    </a>
                  </div>

                  <div className="flex items-center justify-between p-2.5 bg-white rounded-lg border border-rose-100">
                    <div>
                      <p className="font-semibold text-stone-900">{destination.emergencyContacts.policeStation}</p>
                      <p className="text-stone-500 text-[11px]">Local Police Jurisdiction</p>
                    </div>
                    <a
                      href={`tel:${destination.emergencyContacts.policePhone}`}
                      className="p-2 bg-rose-100 hover:bg-rose-200 text-rose-800 rounded-md"
                      title="Call police"
                    >
                      <PhoneCall className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* TAB 4: FOOD & STAY */}
          {activeTab === 'food_stay' && (
            <div className="space-y-6">
              
              {/* Nearby Recommended Hotels */}
              <div>
                <h4 className="font-display text-base font-bold text-stone-900 mb-3 flex items-center gap-2">
                  <HotelIcon className="w-4 h-4 text-amber-700" />
                  Recommended Stays Nearby
                </h4>
                {nearbyHotels.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {nearbyHotels.map(hotel => (
                      <div key={hotel.id} className="p-3 bg-stone-50 border border-stone-200 rounded-xl flex gap-3">
                        <img src={hotel.image} alt={hotel.name} className="w-20 h-20 rounded-lg object-cover shrink-0" />
                        <div className="flex-1 min-w-0">
                          <h5 className="font-bold text-stone-900 text-xs truncate">{hotel.name}</h5>
                          <p className="text-[11px] text-stone-500 truncate">{hotel.distanceFromAttraction}</p>
                          <div className="flex items-center gap-1 my-1 text-[11px]">
                            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                            <span className="font-bold text-stone-800">{hotel.rating}</span>
                          </div>
                          <span className="text-xs font-bold text-amber-900">₹{hotel.pricePerNight} / night</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-stone-500">Verified heritage hotels and homestays are available in the district center.</p>
                )}
              </div>

              {/* Nearby Recommended Restaurants */}
              <div>
                <h4 className="font-display text-base font-bold text-stone-900 mb-3 flex items-center gap-2">
                  <Utensils className="w-4 h-4 text-amber-700" />
                  Authentic Regional Eateries
                </h4>
                {nearbyRestaurants.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {nearbyRestaurants.map(rest => (
                      <div key={rest.id} className="p-3 bg-stone-50 border border-stone-200 rounded-xl flex gap-3">
                        <img src={rest.image} alt={rest.name} className="w-20 h-20 rounded-lg object-cover shrink-0" />
                        <div className="flex-1 min-w-0">
                          <h5 className="font-bold text-stone-900 text-xs truncate">{rest.name}</h5>
                          <p className="text-[11px] text-stone-500 line-clamp-1">{rest.specialityDishes.join(', ')}</p>
                          <div className="flex items-center gap-2 mt-1 text-[11px]">
                            <span className="text-emerald-700 font-semibold">{rest.foodType === 'veg' ? 'Pure Veg' : 'Non-Veg & Veg'}</span>
                            <span className="text-stone-400">·</span>
                            <span className="font-bold text-stone-800">★ {rest.rating}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-stone-500">Local messes and South Indian vegetarian canteens located within 1 km.</p>
                )}
              </div>

            </div>
          )}

          {/* TAB 5: REVIEWS & RATINGS */}
          {activeTab === 'reviews' && (
            <div className="space-y-6">
              
              {/* Write Review Form */}
              <form onSubmit={handleAddReview} className="p-4 bg-stone-50 border border-stone-200 rounded-xl space-y-3">
                <h4 className="font-semibold text-stone-900 text-xs uppercase tracking-wider">
                  Leave a Travel Review & Rating
                </h4>
                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex items-center gap-1">
                    <span className="text-xs text-stone-600 mr-1">Your Rating:</span>
                    {[1, 2, 3, 4, 5].map(star => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setNewRating(star)}
                        className="cursor-pointer"
                      >
                        <Star className={`w-4 h-4 ${star <= newRating ? 'fill-amber-400 text-amber-400' : 'text-stone-300'}`} />
                      </button>
                    ))}
                  </div>

                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-stone-600">Travel Party:</span>
                    <select
                      value={newTravelType}
                      onChange={(e) => setNewTravelType(e.target.value)}
                      className="bg-white border border-stone-300 rounded px-2 py-1 text-xs"
                    >
                      <option value="Family">Family</option>
                      <option value="Solo">Solo</option>
                      <option value="Friends">Friends</option>
                      <option value="Couple">Couple</option>
                    </select>
                  </div>
                </div>

                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Share practical tips: best photography spots, queue times, dress etiquette..."
                  rows={3}
                  className="w-full bg-white border border-stone-300 rounded-lg p-2.5 text-xs text-stone-800 placeholder-stone-400 focus:outline-none focus:border-amber-600"
                />

                <button
                  type="submit"
                  className="py-2 px-4 rounded-lg bg-stone-900 hover:bg-amber-700 text-white font-semibold text-xs cursor-pointer transition-colors"
                >
                  Submit Travel Review
                </button>
              </form>

              {/* Reviews List */}
              <div className="space-y-3">
                {destinationReviews.length > 0 ? (
                  destinationReviews.map(rev => (
                    <div key={rev.id} className="p-3.5 bg-white border border-stone-200 rounded-xl space-y-1.5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <img
                            src={rev.userAvatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80'}
                            alt={rev.userName}
                            className="w-6 h-6 rounded-full object-cover"
                          />
                          <span className="font-semibold text-xs text-stone-900">{rev.userName}</span>
                          <span className="text-[11px] text-stone-400">· {rev.travelType}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          {[...Array(rev.rating)].map((_, i) => (
                            <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                          ))}
                        </div>
                      </div>
                      <p className="text-xs text-stone-700 leading-relaxed">{rev.comment}</p>
                      <span className="text-[10px] text-stone-400 block pt-1">{rev.visitDate}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-stone-500 py-4 text-center">Be the first explorer to review this destination!</p>
                )}
              </div>

            </div>
          )}

        </div>

        {/* Modal Bottom Actions Footer */}
        <div className="bg-stone-50 border-t border-stone-200 px-4 sm:px-6 py-3.5 flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs text-stone-600">
            <span className="font-semibold text-stone-900">Location:</span> {destination.district}, Tamil Nadu
          </div>

          <div className="flex items-center gap-2">
            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${destination.latitude},${destination.longitude}`}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2 px-3.5 rounded-lg bg-stone-200 hover:bg-stone-300 text-stone-900 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>{t('directions')}</span>
            </a>

            {destination.storyId && (
              <button
                onClick={() => onOpenStory(destination.id)}
                className="py-2 px-4 rounded-lg bg-amber-600 hover:bg-amber-500 text-stone-950 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>{t('discoverStory')}</span>
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
