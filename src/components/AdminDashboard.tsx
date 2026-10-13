import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Plus, 
  Trash2, 
  Edit, 
  Check, 
  X, 
  BarChart3, 
  MapPin, 
  BookOpen, 
  Star, 
  Users, 
  AlertCircle 
} from 'lucide-react';
import { Destination, Story, Review } from '../types';
import { DESTINATIONS, STORIES, INITIAL_REVIEWS } from '../data/mockData';
import { useAuth } from '../context/AuthContext';

export const AdminDashboard: React.FC = () => {
  const { user, isAdmin } = useAuth();

  const [activeAdminTab, setActiveAdminTab] = useState<'stats' | 'destinations' | 'stories' | 'reviews'>('stats');
  const [destinationsList, setDestinationsList] = useState<Destination[]>(DESTINATIONS);
  const [reviewsList, setReviewsList] = useState<Review[]>(INITIAL_REVIEWS);
  const [showAddModal, setShowAddModal] = useState(false);

  // New Destination Form State
  const [newDestName, setNewDestName] = useState('');
  const [newDestDistrict, setNewDestDistrict] = useState('Madurai');
  const [newDestCategory, setNewDestCategory] = useState<any>('temples');
  const [newDestIsHidden, setNewDestIsHidden] = useState(false);
  const [newDestDesc, setNewDestDesc] = useState('');
  const [newDestFee, setNewDestFee] = useState(50);
  const [newDestOpen, setNewDestOpen] = useState('06:00 AM');
  const [newDestClose, setNewDestClose] = useState('08:00 PM');
  const [newDestImage, setNewDestImage] = useState('https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80');

  if (!isAdmin) {
    return (
      <div className="max-w-md mx-auto my-16 p-8 bg-white border border-rose-200 rounded-2xl text-center space-y-4 shadow-sm">
        <AlertCircle className="w-12 h-12 text-rose-600 mx-auto" />
        <h2 className="font-display text-xl font-bold text-stone-900">
          Admin Access Restricted
        </h2>
        <p className="text-xs text-stone-600">
          You must be logged in as an authorized Administrator to access this control panel. Please use the demo admin credentials.
        </p>
      </div>
    );
  }

  const handleDeleteDestination = (id: string) => {
    if (confirm('Are you sure you want to remove this destination listing?')) {
      setDestinationsList(destinationsList.filter(d => d.id !== id));
    }
  };

  const handleModerateReview = (reviewId: string, approve: boolean) => {
    if (approve) {
      alert('Review approved & published.');
    } else {
      setReviewsList(reviewsList.filter(r => r.id !== reviewId));
    }
  };

  const handleCreateDestination = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDestName.trim()) return;

    const newDest: Destination = {
      id: `dest-${Date.now()}`,
      name: newDestName.trim(),
      nameTa: newDestName.trim(),
      district: newDestDistrict,
      category: newDestCategory,
      isPopular: !newDestIsHidden,
      isHiddenSpot: newDestIsHidden,
      images: [newDestImage],
      description: newDestDesc,
      descriptionTa: newDestDesc,
      historicalBackground: `Verified historical site in ${newDestDistrict}.`,
      culturalImportance: `Preserved heritage monument in Tamil Nadu.`,
      latitude: 10.0 + Math.random() * 2,
      longitude: 78.0 + Math.random() * 2,
      openingTime: newDestOpen,
      closingTime: newDestClose,
      weeklyHoliday: 'None',
      openHours24: { open: 6.0, close: 20.0 },
      entryFee: { adult: newDestFee, child: 0, foreigner: newDestFee * 5, camera: 25 },
      bestTimeToVisit: 'October to March',
      estimatedVisitingDuration: '2 hours',
      accessibilityNotes: 'Paved entrance pathways.',
      estimatedTripExpense: 500,
      ratings: 4.8,
      reviewCount: 1,
      nearbyAttractions: [{ name: `${newDestDistrict} Town Center`, distanceKm: 4 }],
      localFoodSpecialties: ['South Indian Meals'],
      transportation: {
        nearestBusStand: `${newDestDistrict} Bus Stand`,
        nearestRailwayStation: `${newDestDistrict} Junction`,
        busConnectivity: 'Frequent local buses',
        trainConnectivity: 'Mainline trains',
        taxiAvailability: 'Autos and taxis available'
      },
      emergencyContacts: {
        hospital: `${newDestDistrict} District Hospital`,
        hospitalPhone: '108',
        policeStation: `${newDestDistrict} Town Police`,
        policePhone: '100'
      }
    };

    setDestinationsList([newDest, ...destinationsList]);
    setShowAddModal(false);
    setNewDestName('');
    setNewDestDesc('');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      
      {/* Top Admin Header */}
      <div className="bg-stone-900 text-stone-100 p-6 rounded-2xl flex flex-wrap items-center justify-between gap-4 border border-stone-800">
        <div>
          <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            <span>TN Stories · Administration Control Panel</span>
          </div>
          <h1 className="font-display text-2xl font-bold text-white mt-1">
            Tourism Moderation & Operations Dashboard
          </h1>
          <p className="text-xs text-stone-400">
            Logged in as {user?.email} (Role: Super Admin)
          </p>
        </div>

        {/* Tab switcher */}
        <div className="flex items-center gap-1 bg-stone-800 p-1 rounded-xl border border-stone-700 text-xs">
          {[
            { id: 'stats', label: 'Metrics & Stats' },
            { id: 'destinations', label: `Destinations (${destinationsList.length})` },
            { id: 'stories', label: 'Stories' },
            { id: 'reviews', label: 'Review Moderation' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveAdminTab(tab.id as any)}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer font-medium ${
                activeAdminTab === tab.id
                  ? 'bg-amber-600 text-stone-950 font-bold'
                  : 'text-stone-300 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* TAB 1: METRICS */}
      {activeAdminTab === 'stats' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 bg-white border border-stone-200 rounded-xl shadow-sm">
              <span className="text-xs text-stone-500 block uppercase font-bold">Total Destinations</span>
              <span className="font-mono text-3xl font-extrabold text-stone-900">{destinationsList.length}</span>
              <span className="text-[11px] text-emerald-700 block mt-1">★ {destinationsList.filter(d => d.isHiddenSpot).length} Verified Hidden Gems</span>
            </div>

            <div className="p-5 bg-white border border-stone-200 rounded-xl shadow-sm">
              <span className="text-xs text-stone-500 block uppercase font-bold">Cultural Stories</span>
              <span className="font-mono text-3xl font-extrabold text-stone-900">{STORIES.length}</span>
              <span className="text-[11px] text-amber-700 block mt-1">Bilingual Tamil & English</span>
            </div>

            <div className="p-5 bg-white border border-stone-200 rounded-xl shadow-sm">
              <span className="text-xs text-stone-500 block uppercase font-bold">User Reviews Moderated</span>
              <span className="font-mono text-3xl font-extrabold text-stone-900">{reviewsList.length + 42}</span>
              <span className="text-[11px] text-emerald-700 block mt-1">98.4% Clean safety score</span>
            </div>

            <div className="p-5 bg-white border border-stone-200 rounded-xl shadow-sm">
              <span className="text-xs text-stone-500 block uppercase font-bold">Active Reservations</span>
              <span className="font-mono text-3xl font-extrabold text-amber-900">128</span>
              <span className="text-[11px] text-stone-500 block mt-1">Hotels, Packages, Rentals</span>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: DESTINATIONS MANAGER */}
      {activeAdminTab === 'destinations' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg font-bold text-stone-900">
              Manage Tourist Listings & Hidden Spots
            </h2>
            <button
              onClick={() => setShowAddModal(true)}
              className="py-2 px-3.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Destination</span>
            </button>
          </div>

          <div className="bg-white border border-stone-200 rounded-xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-stone-50 text-stone-600 border-b border-stone-200">
                  <tr>
                    <th className="p-3">Destination</th>
                    <th className="p-3">District</th>
                    <th className="p-3">Category</th>
                    <th className="p-3">Timings</th>
                    <th className="p-3">Entry Fee</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {destinationsList.map((dest) => (
                    <tr key={dest.id} className="hover:bg-stone-50/70">
                      <td className="p-3">
                        <div className="font-bold text-stone-900">{dest.name}</div>
                        {dest.isHiddenSpot && (
                          <span className="text-[10px] text-emerald-700 font-semibold">★ Hidden Spot</span>
                        )}
                      </td>
                      <td className="p-3 font-medium text-stone-700">{dest.district}</td>
                      <td className="p-3 capitalize text-stone-600">{dest.category}</td>
                      <td className="p-3 text-stone-600 font-mono text-[11px]">{dest.openingTime} - {dest.closingTime}</td>
                      <td className="p-3 font-medium text-stone-800">₹{dest.entryFee.adult}</td>
                      <td className="p-3 text-right space-x-2">
                        <button
                          onClick={() => handleDeleteDestination(dest.id)}
                          className="p-1.5 rounded hover:bg-rose-50 text-rose-600 cursor-pointer"
                          title="Delete Listing"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: STORIES */}
      {activeAdminTab === 'stories' && (
        <div className="space-y-4">
          <h2 className="font-display text-lg font-bold text-stone-900">
            Curated Cultural Stories & Folklore
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {STORIES.map(story => (
              <div key={story.id} className="p-5 bg-white border border-stone-200 rounded-xl space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-amber-800 font-bold">{story.destinationName}</span>
                  <span className="text-stone-500 font-serif italic">{story.historicalEra}</span>
                </div>
                <h3 className="font-bold text-stone-900 text-sm">{story.title}</h3>
                <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">{story.summary}</p>
                <div className="pt-2 flex items-center justify-between text-[11px] text-stone-400">
                  <span>Type: {story.type.replace('_', ' ')}</span>
                  <span className="text-emerald-700 font-medium">✓ Narration Active</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: REVIEW MODERATION */}
      {activeAdminTab === 'reviews' && (
        <div className="space-y-4">
          <h2 className="font-display text-lg font-bold text-stone-900">
            User Travel Reviews Moderation
          </h2>
          <div className="space-y-3">
            {reviewsList.map(rev => (
              <div key={rev.id} className="p-4 bg-white border border-stone-200 rounded-xl flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs">
                    <span className="font-bold text-stone-900">{rev.userName}</span>
                    <span className="text-stone-400">· {rev.visitDate}</span>
                    <span className="text-amber-500">{'★'.repeat(rev.rating)}</span>
                  </div>
                  <p className="text-xs text-stone-700 leading-relaxed">{rev.comment}</p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => handleModerateReview(rev.id, true)}
                    className="p-1.5 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                    title="Approve"
                  >
                    <Check className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleModerateReview(rev.id, false)}
                    className="p-1.5 rounded-lg bg-rose-50 text-rose-700 hover:bg-rose-100"
                    title="Remove"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add Destination Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/80 backdrop-blur-sm flex justify-center p-4">
          <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl p-6 my-auto border border-stone-200 space-y-4">
            
            <div className="flex items-center justify-between pb-2 border-b border-stone-100">
              <h3 className="font-display font-bold text-base text-stone-900">
                Create New Verified Tourist Destination
              </h3>
              <button onClick={() => setShowAddModal(false)} className="text-stone-400 hover:text-stone-700">✕</button>
            </div>

            <form onSubmit={handleCreateDestination} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-stone-700 block mb-1">Destination Name</label>
                <input
                  type="text"
                  value={newDestName}
                  onChange={(e) => setNewDestName(e.target.value)}
                  placeholder="e.g. Sittanavasal Cave Shrines"
                  className="w-full bg-stone-50 border border-stone-300 rounded-lg p-2 text-xs"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-stone-700 block mb-1">District</label>
                  <input
                    type="text"
                    value={newDestDistrict}
                    onChange={(e) => setNewDestDistrict(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-300 rounded-lg p-2 text-xs"
                    required
                  />
                </div>
                <div>
                  <label className="font-semibold text-stone-700 block mb-1">Category</label>
                  <select
                    value={newDestCategory}
                    onChange={(e) => setNewDestCategory(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-300 rounded-lg p-2 text-xs"
                  >
                    <option value="temples">Temples</option>
                    <option value="hidden">Hidden Spot</option>
                    <option value="heritage">Heritage</option>
                    <option value="hill_stations">Hill Station</option>
                    <option value="waterfalls">Waterfalls</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="isHidden"
                  checked={newDestIsHidden}
                  onChange={(e) => setNewDestIsHidden(e.target.checked)}
                  className="w-4 h-4 text-amber-600 rounded"
                />
                <label htmlFor="isHidden" className="font-semibold text-stone-800">
                  Classify as Verified Hidden Tourist Spot
                </label>
              </div>

              <div>
                <label className="font-semibold text-stone-700 block mb-1">Description</label>
                <textarea
                  value={newDestDesc}
                  onChange={(e) => setNewDestDesc(e.target.value)}
                  rows={3}
                  placeholder="Historical and visitor significance..."
                  className="w-full bg-stone-50 border border-stone-300 rounded-lg p-2 text-xs"
                  required
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="font-semibold text-stone-700 block mb-1">Adult Fee (₹)</label>
                  <input
                    type="number"
                    value={newDestFee}
                    onChange={(e) => setNewDestFee(Number(e.target.value))}
                    className="w-full bg-stone-50 border border-stone-300 rounded-lg p-2 text-xs"
                  />
                </div>
                <div>
                  <label className="font-semibold text-stone-700 block mb-1">Open</label>
                  <input
                    type="text"
                    value={newDestOpen}
                    onChange={(e) => setNewDestOpen(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-300 rounded-lg p-2 text-xs"
                  />
                </div>
                <div>
                  <label className="font-semibold text-stone-700 block mb-1">Close</label>
                  <input
                    type="text"
                    value={newDestClose}
                    onChange={(e) => setNewDestClose(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-300 rounded-lg p-2 text-xs"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold uppercase tracking-wider text-xs transition-colors cursor-pointer mt-2"
              >
                Publish Destination Listing
              </button>
            </form>

          </div>
        </div>
      )}

    </div>
  );
};
