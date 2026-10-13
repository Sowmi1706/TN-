import React, { useState } from 'react';
import { 
  Sparkles, 
  Calendar, 
  MapPin, 
  Users, 
  IndianRupee, 
  Bus, 
  Hotel, 
  Utensils, 
  Clock, 
  Bookmark, 
  Share2, 
  Download, 
  Check, 
  Loader2,
  ChevronRight,
  ArrowRight
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { DESTINATIONS, HOTELS, RESTAURANTS } from '../data/mockData';

export const ItineraryPlanner: React.FC = () => {
  const { language, t } = useLanguage();
  const { user, updateProfile } = useAuth();

  // Multi-step planner state
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [startingCity, setStartingCity] = useState('Chennai');
  const [companion, setCompanion] = useState<'family' | 'friends' | 'solo' | 'couple' | 'group'>('family');
  const [theme, setTheme] = useState('temples_heritage');
  const [durationDays, setDurationDays] = useState(3);
  const [budgetTier, setBudgetTier] = useState<'budget' | 'moderate' | 'luxury'>('moderate');
  const [transportMode, setTransportMode] = useState('taxi_cab');
  const [foodPref, setFoodPref] = useState('veg_and_regional');
  const [travelersCount, setTravelersCount] = useState(2);
  const [travelDate, setTravelDate] = useState('2026-11-15');

  const [generating, setGenerating] = useState(false);
  const [generatedItinerary, setGeneratedItinerary] = useState<any | null>(null);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [copiedShare, setCopiedShare] = useState(false);

  const tamilNaduHubs = [
    'Chennai', 'Madurai', 'Coimbatore', 'Tiruchirappalli', 'Salem', 'Tirunelveli', 'Bangalore'
  ];

  const handleGenerate = async () => {
    setGenerating(true);
    setStep(2);

    try {
      const response = await fetch('/api/itineraries/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          startingCity,
          destinationTheme: theme,
          durationDays,
          budget: budgetTier,
          companions: companion,
          foodPreference: foodPref,
          travelers: travelersCount
        })
      });

      const data = await response.json();

      // Assemble structured day plans based on database destinations
      const selectedSpots = DESTINATIONS.slice(0, durationDays * 2);
      
      const structuredDays = Array.from({ length: durationDays }, (_, i) => {
        const spot1 = selectedSpots[i * 2] || DESTINATIONS[0];
        const spot2 = selectedSpots[i * 2 + 1] || DESTINATIONS[1];
        const hotel = HOTELS[i % HOTELS.length];
        const rest = RESTAURANTS[i % RESTAURANTS.length];

        return {
          dayNumber: i + 1,
          theme: i === 0 ? 'Living Heritage & Sacred Grandeur' : i === 1 ? 'Nature Mist & Scenic Highlands' : 'Local Markets & Cultural Farewells',
          activities: [
            {
              time: '08:30 AM - 11:30 AM',
              placeName: spot1.name,
              district: spot1.district,
              description: `Morning visit during quiet darshan/visiting hours. Explore verified architecture and historical stories.`,
              entryCost: spot1.entryFee.adult * travelersCount,
              travelTime: '25 mins local transit'
            },
            {
              time: '01:00 PM - 02:30 PM',
              placeName: rest.name,
              district: rest.district,
              description: `Authentic regional feast featuring ${rest.specialityDishes.slice(0, 2).join(', ')}.`,
              entryCost: budgetTier === 'budget' ? 300 * travelersCount : 650 * travelersCount,
              travelTime: '15 mins'
            },
            {
              time: '03:30 PM - 06:30 PM',
              placeName: spot2.name,
              district: spot2.district,
              description: `Afternoon immersion. Photography during soft golden hour and local artisan markets.`,
              entryCost: spot2.entryFee.adult * travelersCount,
              travelTime: '30 mins'
            }
          ],
          stay: {
            name: hotel.name,
            address: hotel.address,
            costPerNight: hotel.pricePerNight
          }
        };
      });

      const totalEstimatedCost = durationDays * (
        budgetTier === 'budget' ? 2200 : budgetTier === 'moderate' ? 5200 : 9800
      ) * travelersCount;

      setGeneratedItinerary({
        id: `itin-${Date.now()}`,
        title: `${durationDays}-Day Tamil Nadu ${theme.replace('_', ' ').toUpperCase()} Odyssey`,
        startingCity,
        durationDays,
        companion,
        budgetTier,
        transportMode,
        travelDate,
        totalCost: totalEstimatedCost,
        days: structuredDays,
        aiPlanSummary: data.planText
      });
      setStep(3);
    } catch (err) {
      console.error('Itinerary generation error:', err);
    } finally {
      setGenerating(false);
    }
  };

  const handleSaveToProfile = () => {
    if (!user) {
      alert('Please log in to save itineraries to your profile.');
      return;
    }
    const currentSaved = user.savedItineraries || [];
    updateProfile({
      savedItineraries: [generatedItinerary, ...currentSaved]
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
      
      {/* Title & Introduction */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-amber-700" />
          <span>AI-Powered Itinerary Intelligence</span>
        </div>
        <h1 className="font-display text-2xl sm:text-4xl font-bold text-stone-900">
          Personalized Tamil Nadu Travel Planner
        </h1>
        <p className="text-stone-600 text-xs sm:text-sm max-w-xl mx-auto">
          Customized schedules crafted to match opening hours, realistic travel distances across highways and Western Ghats, and authentic regional dining.
        </p>
      </div>

      {/* STEP 1: PREFERENCES FORM */}
      {step === 1 && (
        <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6 sm:p-8 space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* 1. Starting Location */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-stone-800 uppercase tracking-wide flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-amber-700" />
                Starting Location
              </label>
              <select
                value={startingCity}
                onChange={(e) => setStartingCity(e.target.value)}
                className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2.5 text-xs text-stone-900 focus:outline-none focus:border-amber-600"
              >
                {tamilNaduHubs.map(hub => (
                  <option key={hub} value={hub}>{hub}, Tamil Nadu</option>
                ))}
              </select>
            </div>

            {/* 2. Travel Companion */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-stone-800 uppercase tracking-wide flex items-center gap-1.5">
                <Users className="w-4 h-4 text-amber-700" />
                Travel Companions
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-1.5">
                {[
                  { id: 'family', label: 'Family' },
                  { id: 'friends', label: 'Friends' },
                  { id: 'solo', label: 'Solo' },
                  { id: 'couple', label: 'Couple' },
                  { id: 'group', label: 'Group' }
                ].map(item => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setCompanion(item.id as any)}
                    className={`py-2 px-2 text-center rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
                      companion === item.id
                        ? 'bg-amber-600 text-stone-950 border-amber-600 font-bold'
                        : 'bg-stone-50 border-stone-200 text-stone-700 hover:border-amber-400'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Duration */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-stone-800 uppercase tracking-wide flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-amber-700" />
                Duration (Days)
              </label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map(d => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => setDurationDays(d)}
                    className={`flex-1 py-2 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
                      durationDays === d
                        ? 'bg-amber-600 text-stone-950 border-amber-600 font-bold'
                        : 'bg-stone-50 border-stone-200 text-stone-700 hover:border-amber-400'
                    }`}
                  >
                    {d} {d === 1 ? 'Day' : 'Days'}
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Budget Tier */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-stone-800 uppercase tracking-wide flex items-center gap-1.5">
                <IndianRupee className="w-4 h-4 text-amber-700" />
                Budget Category
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'budget', label: 'Budget', desc: '₹1.5k - 2k/day' },
                  { id: 'moderate', label: 'Comfort', desc: '₹3.5k - 5k/day' },
                  { id: 'luxury', label: 'Heritage', desc: '₹8k+/day' }
                ].map(item => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setBudgetTier(item.id as any)}
                    className={`p-2 rounded-lg text-left border transition-colors cursor-pointer ${
                      budgetTier === item.id
                        ? 'bg-amber-50 border-amber-600 text-amber-950 font-bold'
                        : 'bg-stone-50 border-stone-200 text-stone-700 hover:border-amber-400'
                    }`}
                  >
                    <div className="text-xs">{item.label}</div>
                    <div className="text-[10px] text-stone-500 font-mono">{item.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* 5. Vibe & Theme */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-stone-800 uppercase tracking-wide">
                Destination Theme & Focus
              </label>
              <select
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
                className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2.5 text-xs text-stone-900 focus:outline-none focus:border-amber-600"
              >
                <option value="temples_heritage">Ancient Temples & UNESCO Heritage</option>
                <option value="hills_nature">Western Ghats Mist & Hill Stations (Ooty, Kodai, Kolli)</option>
                <option value="coastal_seas">Sacred Coast & Beaches (Rameswaram, Dhanushkodi, Mahabs)</option>
                <option value="hidden_gems">Off-the-Beaten-Path & Hidden Eco Sanctuaries</option>
                <option value="food_culture">Chettinad & Madurai Gastronomy Explorer</option>
              </select>
            </div>

            {/* 6. Transport Preference */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-stone-800 uppercase tracking-wide flex items-center gap-1.5">
                <Bus className="w-4 h-4 text-amber-700" />
                Transport Mode
              </label>
              <select
                value={transportMode}
                onChange={(e) => setTransportMode(e.target.value)}
                className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2.5 text-xs text-stone-900 focus:outline-none focus:border-amber-600"
              >
                <option value="taxi_cab">Private AC Cab / Chauffeur</option>
                <option value="govt_bus">TNSTC / SETC Government Express Buses</option>
                <option value="train">Southern Railway / Vande Bharat Express</option>
                <option value="self_drive">Self-Drive Rental Car / Bike</option>
              </select>
            </div>

          </div>

          <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
            <span className="text-xs text-stone-500">
              Includes opening times verification & realistic transit pacing
            </span>
            <button
              onClick={handleGenerate}
              className="py-3 px-6 rounded-xl bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-md transition-colors cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>Generate My Itinerary</span>
            </button>
          </div>

        </div>
      )}

      {/* STEP 2: GENERATING ANIMATION */}
      {step === 2 && generating && (
        <div className="py-20 text-center space-y-4 bg-white rounded-2xl border border-stone-200 p-8 shadow-sm">
          <Loader2 className="w-10 h-10 animate-spin text-amber-600 mx-auto" />
          <h3 className="font-display text-xl font-bold text-stone-900">
            Crafting Your Tamil Nadu Itinerary...
          </h3>
          <p className="text-xs text-stone-500 max-w-md mx-auto">
            Checking temple opening schedules, highway transit durations, authentic regional messes, and heritage stay openings.
          </p>
        </div>
      )}

      {/* STEP 3: RESULT VIEW */}
      {step === 3 && generatedItinerary && (
        <div className="space-y-6">
          
          {/* Action Bar */}
          <div className="bg-stone-900 text-amber-100 p-4 sm:p-6 rounded-2xl flex flex-wrap items-center justify-between gap-4 border border-stone-800">
            <div>
              <span className="text-xs uppercase tracking-wider text-amber-400 font-bold">
                {generatedItinerary.durationDays}-Day Curated Journey
              </span>
              <h2 className="font-display text-xl sm:text-2xl font-bold text-white">
                {generatedItinerary.title}
              </h2>
              <div className="flex flex-wrap items-center gap-3 text-xs text-stone-300 mt-1">
                <span>Start: {generatedItinerary.startingCity}</span>
                <span>·</span>
                <span>Companions: {generatedItinerary.companion}</span>
                <span>·</span>
                <span className="text-amber-400 font-bold">Est. Total: ₹{generatedItinerary.totalCost.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleSaveToProfile}
                className="py-2 px-3.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                {savedSuccess ? <Check className="w-3.5 h-3.5 text-stone-950" /> : <Bookmark className="w-3.5 h-3.5" />}
                <span>{savedSuccess ? 'Saved to Profile!' : 'Save Itinerary'}</span>
              </button>

              <button
                onClick={handlePrint}
                className="py-2 px-3 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Print / PDF</span>
              </button>

              <button
                onClick={() => setStep(1)}
                className="py-2 px-3 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs transition-colors cursor-pointer"
              >
                Edit Form
              </button>
            </div>
          </div>

          {/* Day by Day Cards */}
          <div className="space-y-4">
            {generatedItinerary.days.map((day: any) => (
              <div key={day.dayNumber} className="bg-white rounded-xl border border-stone-200 p-5 sm:p-6 shadow-sm space-y-4">
                
                {/* Day Header */}
                <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                  <div className="flex items-center gap-2.5">
                    <span className="w-7 h-7 rounded-lg bg-amber-900 text-amber-200 font-bold text-xs flex items-center justify-center">
                      D{day.dayNumber}
                    </span>
                    <h3 className="font-display text-base font-bold text-stone-900">
                      Day {day.dayNumber}: {day.theme}
                    </h3>
                  </div>
                  <span className="text-xs font-mono text-stone-500">
                    Est. Day Cost: ₹{Math.round(generatedItinerary.totalCost / generatedItinerary.durationDays).toLocaleString()}
                  </span>
                </div>

                {/* Day Activities */}
                <div className="space-y-3">
                  {day.activities.map((act: any, i: number) => (
                    <div key={i} className="flex items-start gap-3 p-3 bg-stone-50 rounded-xl border border-stone-100">
                      <Clock className="w-4 h-4 text-amber-700 mt-0.5 shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center justify-between gap-1">
                          <h4 className="font-bold text-xs text-stone-900">{act.placeName} ({act.district})</h4>
                          <span className="text-[11px] font-mono text-stone-500">{act.time}</span>
                        </div>
                        <p className="text-xs text-stone-600 mt-0.5 leading-relaxed">{act.description}</p>
                        <div className="flex items-center gap-3 mt-1.5 text-[11px] text-stone-500">
                          <span>Transit: {act.travelTime}</span>
                          <span>·</span>
                          <span>Cost: ₹{act.entryCost}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Night Stay Suggestion */}
                <div className="pt-2 flex items-center justify-between text-xs text-stone-600 bg-amber-50/50 p-3 rounded-lg border border-amber-200/50">
                  <div className="flex items-center gap-2">
                    <Hotel className="w-4 h-4 text-amber-700 shrink-0" />
                    <span><strong className="text-stone-900">Recommended Night Stay:</strong> {day.stay.name}</span>
                  </div>
                  <span className="font-bold text-amber-900">₹{day.stay.costPerNight} / night</span>
                </div>

              </div>
            ))}
          </div>

        </div>
      )}

    </div>
  );
};
