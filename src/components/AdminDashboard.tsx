import React, { useState, useEffect } from 'react';
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
  AlertCircle,
  Calendar,
  Hotel,
  Package,
  Clock,
  CheckCircle,
  XCircle,
  RefreshCw,
  LogOut,
  IndianRupee,
  PhoneCall,
  Mail
} from 'lucide-react';
import { Destination, EventFestival, Hotel as HotelType, TourPackage, Booking } from '../types';
import { useAuth } from '../context/AuthContext';

interface AdminDashboardProps {
  onDataChanged?: () => void;
  onLogoutSuccess?: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  onDataChanged,
  onLogoutSuccess
}) => {
  const { user, token, isAdmin, logout } = useAuth();

  const [activeAdminTab, setActiveAdminTab] = useState<'stats' | 'destinations' | 'bookings' | 'events' | 'packages' | 'hotels'>('stats');
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [events, setEvents] = useState<EventFestival[]>([]);
  const [hotels, setHotels] = useState<HotelType[]>([]);
  const [packages, setPackages] = useState<TourPackage[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);

  // Modals for Adding
  const [showAddDestModal, setShowAddDestModal] = useState(false);
  const [showAddEventModal, setShowAddEventModal] = useState(false);

  // Destination Form State
  const [newDestName, setNewDestName] = useState('');
  const [newDestDistrict, setNewDestDistrict] = useState('Madurai');
  const [newDestCategory, setNewDestCategory] = useState<any>('temples');
  const [newDestIsHidden, setNewDestIsHidden] = useState(false);
  const [newDestDesc, setNewDestDesc] = useState('');
  const [newDestFee, setNewDestFee] = useState(50);
  const [newDestOpen, setNewDestOpen] = useState('06:00 AM');
  const [newDestClose, setNewDestClose] = useState('08:00 PM');
  const [newDestImage, setNewDestImage] = useState('https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80');

  // Event Form State
  const [newEventName, setNewEventName] = useState('');
  const [newEventDistrict, setNewEventDistrict] = useState('Madurai');
  const [newEventDate, setNewEventDate] = useState('January 14 - 17');
  const [newEventDesc, setNewEventDesc] = useState('');
  const [newEventVenue, setNewEventVenue] = useState('Alanganallur Arena');
  const [newEventPrice, setNewEventPrice] = useState('Free Admission');

  // Fetch all admin data from backend
  const fetchAdminData = async () => {
    if (!token) return;
    try {
      const [destRes, bookRes, evRes, hotRes, pkgRes, statRes] = await Promise.all([
        fetch('/api/destinations'),
        fetch('/api/bookings', { headers: { Authorization: `Bearer ${token}` } }),
        fetch('/api/events'),
        fetch('/api/hotels'),
        fetch('/api/packages'),
        fetch('/api/admin/stats', { headers: { Authorization: `Bearer ${token}` } })
      ]);

      if (destRes.ok) setDestinations(await destRes.json());
      if (bookRes.ok) setBookings(await bookRes.json());
      if (evRes.ok) setEvents(await evRes.json());
      if (hotRes.ok) setHotels(await hotRes.json());
      if (pkgRes.ok) setPackages(await pkgRes.json());
      if (statRes.ok) setStats(await statRes.json());
    } catch (e) {
      console.error('Failed fetching admin data:', e);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, [token]);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchAdminData();
  };

  const handleLogout = () => {
    logout();
    if (onLogoutSuccess) onLogoutSuccess();
  };

  const notifyChange = (msg: string) => {
    setActionSuccess(msg);
    setTimeout(() => setActionSuccess(null), 3000);
    fetchAdminData();
    if (onDataChanged) onDataChanged();
  };

  // 1. Create Destination
  const handleCreateDestination = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token || !newDestName.trim()) return;

    const newDest = {
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
      accessibilityNotes: 'Paved pathways.',
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

    try {
      const res = await fetch('/api/destinations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(newDest)
      });
      if (res.ok) {
        setShowAddDestModal(false);
        setNewDestName('');
        setNewDestDesc('');
        notifyChange('New destination published successfully!');
      }
    } catch (e) {
      alert('Failed to publish destination.');
    }
  };

  // 2. Delete Destination
  const handleDeleteDestination = async (id: string) => {
    if (!token || !confirm('Are you sure you want to delete this tourist place?')) return;
    try {
      const res = await fetch(`/api/destinations/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        notifyChange('Destination deleted.');
      }
    } catch (e) {
      alert('Failed to delete destination.');
    }
  };

  // 3. Moderate Booking Request Status
  const handleUpdateBookingStatus = async (bookingId: string, status: 'confirmed' | 'cancelled' | 'pending', adminNotes?: string) => {
    if (!token) return;
    try {
      const res = await fetch(`/api/bookings/${bookingId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ status, adminNotes: adminNotes || `Status updated to ${status} by Administrator.` })
      });
      if (res.ok) {
        notifyChange(`Booking #${bookingId} marked as ${status}.`);
      }
    } catch (e) {
      alert('Failed to update booking status.');
    }
  };

  // 4. Create Event
  const handleCreateEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token || !newEventName.trim()) return;

    const newEv = {
      name: newEventName.trim(),
      nameTa: newEventName.trim(),
      district: newEventDistrict,
      category: 'cultural',
      date: newEventDate,
      description: newEventDesc,
      venue: newEventVenue,
      ticketPrice: newEventPrice,
      organizer: 'TN Tourism Dept',
      image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80',
      highlights: ['Traditional Music', 'Cultural Showcase']
    };

    try {
      const res = await fetch('/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(newEv)
      });
      if (res.ok) {
        setShowAddEventModal(false);
        setNewEventName('');
        setNewEventDesc('');
        notifyChange('Event created successfully!');
      }
    } catch (e) {
      alert('Failed to create event.');
    }
  };

  // 5. Delete Event
  const handleDeleteEvent = async (id: string) => {
    if (!token || !confirm('Delete this event listing?')) return;
    try {
      const res = await fetch(`/api/events/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        notifyChange('Event removed.');
      }
    } catch (e) {
      alert('Failed to delete event.');
    }
  };

  if (!isAdmin) {
    return (
      <div className="max-w-md mx-auto my-16 p-8 bg-white border border-rose-200 rounded-2xl text-center space-y-4 shadow-sm">
        <AlertCircle className="w-12 h-12 text-rose-600 mx-auto" />
        <h2 className="font-display text-xl font-bold text-stone-900">
          Admin Access Restricted
        </h2>
        <p className="text-xs text-stone-600">
          You must be logged in as an authorized Administrator to access this control panel.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8 animate-fadeIn">
      
      {/* Top Admin Header */}
      <div className="bg-stone-900 text-stone-100 p-6 rounded-2xl flex flex-wrap items-center justify-between gap-4 border border-stone-800 shadow-xl">
        <div>
          <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            <span>TN Stories · Administrator Operations Center</span>
          </div>
          <h1 className="font-display text-2xl font-bold text-white mt-1">
            Admin Management Dashboard
          </h1>
          <p className="text-xs text-stone-400">
            Logged in as {user?.email} (Role: Super Admin) · Real-time Persistent Database
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleRefresh}
            className="p-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 border border-stone-700 transition-colors cursor-pointer"
            title="Refresh database"
          >
            <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin text-amber-400' : ''}`} />
          </button>

          <button
            onClick={handleLogout}
            className="py-2 px-3.5 rounded-xl bg-stone-800 hover:bg-rose-950 text-stone-300 hover:text-rose-300 border border-stone-700 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Success Notification Bar */}
      {actionSuccess && (
        <div className="p-3 bg-emerald-50 border border-emerald-300 text-emerald-900 rounded-xl text-xs font-medium flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{actionSuccess}</span>
        </div>
      )}

      {/* Admin Tab Navigation */}
      <div className="flex items-center gap-1.5 bg-stone-100 p-1.5 rounded-xl border border-stone-200 text-xs overflow-x-auto font-semibold">
        {[
          { id: 'stats', label: 'Overview Metrics' },
          { id: 'bookings', label: `Booking Requests (${bookings.length})` },
          { id: 'destinations', label: `Destinations (${destinations.length})` },
          { id: 'events', label: `Events & Festivals (${events.length})` },
          { id: 'hotels', label: `Stays & Hotels (${hotels.length})` },
          { id: 'packages', label: `Tour Packages (${packages.length})` }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveAdminTab(tab.id as any)}
            className={`px-3.5 py-2 rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
              activeAdminTab === tab.id
                ? 'bg-amber-600 text-stone-950 font-bold shadow-sm'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB 1: METRICS STATS */}
      {activeAdminTab === 'stats' && stats && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 bg-white border border-stone-200 rounded-xl shadow-sm space-y-1">
              <span className="text-xs text-stone-500 font-bold uppercase">Customer Bookings</span>
              <div className="font-mono text-3xl font-extrabold text-amber-900">{stats.totalBookings}</div>
              <span className="text-[11px] text-amber-700 font-medium">
                {stats.pendingBookings} pending review · {stats.confirmedBookings} confirmed
              </span>
            </div>

            <div className="p-5 bg-white border border-stone-200 rounded-xl shadow-sm space-y-1">
              <span className="text-xs text-stone-500 font-bold uppercase">Tourist Destinations</span>
              <div className="font-mono text-3xl font-extrabold text-stone-900">{stats.totalDestinations}</div>
              <span className="text-[11px] text-emerald-700 font-medium">
                ★ {stats.hiddenGemsCount} verified hidden gems
              </span>
            </div>

            <div className="p-5 bg-white border border-stone-200 rounded-xl shadow-sm space-y-1">
              <span className="text-xs text-stone-500 font-bold uppercase">Registered Customers</span>
              <div className="font-mono text-3xl font-extrabold text-stone-900">{stats.totalCustomers}</div>
              <span className="text-[11px] text-stone-500">
                Persistent database accounts
              </span>
            </div>

            <div className="p-5 bg-white border border-stone-200 rounded-xl shadow-sm space-y-1">
              <span className="text-xs text-stone-500 font-bold uppercase">Events & Packages</span>
              <div className="font-mono text-3xl font-extrabold text-stone-900">{stats.totalEvents + stats.totalPackages}</div>
              <span className="text-[11px] text-stone-500">
                Active seasonal offerings
              </span>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: BOOKING REQUESTS MODERATION */}
      {activeAdminTab === 'bookings' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-display text-lg font-bold text-stone-900">
                Customer Booking Requests & Status Updates
              </h2>
              <p className="text-xs text-stone-500">
                Review incoming requests from customers. Updating status notifies customer app in real-time.
              </p>
            </div>
          </div>

          <div className="bg-white border border-stone-200 rounded-xl overflow-hidden shadow-sm">
            {bookings.length > 0 ? (
              <div className="divide-y divide-stone-100">
                {bookings.map(b => (
                  <div key={b.id} className="p-5 flex flex-wrap items-center justify-between gap-4 hover:bg-stone-50/50">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase ${
                          b.status === 'confirmed' 
                            ? 'bg-emerald-100 text-emerald-800' 
                            : b.status === 'pending'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-rose-100 text-rose-800'
                        }`}>
                          {b.status}
                        </span>
                        <span className="text-xs font-mono text-stone-400">ID: {b.id}</span>
                        <span className="text-xs text-stone-500">· Type: {b.type}</span>
                      </div>

                      <h4 className="font-bold text-stone-900 text-sm">{b.title}</h4>
                      
                      <div className="flex flex-wrap items-center gap-3 text-xs text-stone-600">
                        <span className="flex items-center gap-1">
                          <Users className="w-3.5 h-3.5 text-stone-400" />
                          <span>{b.customerName || 'Explorer'}</span>
                        </span>
                        <span>·</span>
                        <span className="flex items-center gap-1">
                          <Mail className="w-3.5 h-3.5 text-stone-400" />
                          <span>{b.customerEmail}</span>
                        </span>
                        <span>·</span>
                        <span className="flex items-center gap-1">
                          <PhoneCall className="w-3.5 h-3.5 text-stone-400" />
                          <span>{b.contactPhone}</span>
                        </span>
                        <span>·</span>
                        <span>Travel Date: <strong>{b.date}</strong></span>
                      </div>

                      {b.notes && (
                        <p className="text-[11px] text-stone-500 font-mono">Customer Notes: {b.notes}</p>
                      )}
                      {b.adminNotes && (
                        <p className="text-[11px] text-amber-900 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                          Admin: {b.adminNotes}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <span className="text-[10px] text-stone-400 block uppercase">Price</span>
                        <span className="font-bold text-amber-900 text-base">₹{b.totalPrice.toLocaleString('en-IN')}</span>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => handleUpdateBookingStatus(b.id, 'confirmed', 'Confirmed by Tamil Nadu tourism booking desk.')}
                          className="py-1.5 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1 cursor-pointer"
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>Confirm</span>
                        </button>
                        <button
                          onClick={() => handleUpdateBookingStatus(b.id, 'cancelled', 'Cancelled due to capacity or traveler request.')}
                          className="py-1.5 px-3 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs flex items-center gap-1 cursor-pointer"
                        >
                          <X className="w-3.5 h-3.5" />
                          <span>Decline</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center text-xs text-stone-500">
                No customer booking requests yet.
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 3: DESTINATIONS */}
      {activeAdminTab === 'destinations' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg font-bold text-stone-900">
              Manage Tourist Places ({destinations.length})
            </h2>
            <button
              onClick={() => setShowAddDestModal(true)}
              className="py-2 px-3.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Place</span>
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
                    <th className="p-3">Adult Fee</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {destinations.map((dest) => (
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
                      <td className="p-3 text-right">
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

      {/* TAB 4: EVENTS */}
      {activeAdminTab === 'events' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg font-bold text-stone-900">
              Manage Events & Festivals ({events.length})
            </h2>
            <button
              onClick={() => setShowAddEventModal(true)}
              className="py-2 px-3.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add Event</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {events.map(ev => (
              <div key={ev.id} className="p-4 bg-white border border-stone-200 rounded-xl space-y-2 flex justify-between items-start gap-4">
                <div>
                  <span className="text-[11px] font-bold text-amber-900 uppercase">{ev.district} · {ev.date}</span>
                  <h4 className="font-bold text-stone-900 text-sm mt-0.5">{ev.name}</h4>
                  <p className="text-xs text-stone-600 line-clamp-2">{ev.description}</p>
                  <p className="text-[11px] text-stone-500 mt-1">Venue: {ev.venue}</p>
                </div>
                <button
                  onClick={() => handleDeleteEvent(ev.id)}
                  className="p-1.5 text-rose-600 hover:bg-rose-50 rounded"
                  title="Remove event"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: HOTELS */}
      {activeAdminTab === 'hotels' && (
        <div className="space-y-4">
          <h2 className="font-display text-lg font-bold text-stone-900">
            Active Hotels & Heritage Stays ({hotels.length})
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {hotels.map(h => (
              <div key={h.id} className="p-4 bg-white border border-stone-200 rounded-xl space-y-2 shadow-sm">
                <span className="text-[11px] font-bold text-amber-900 uppercase">{h.district} · {h.category}</span>
                <h4 className="font-bold text-stone-900 text-sm">{h.name}</h4>
                <p className="text-xs text-stone-500">{h.address}</p>
                <div className="flex justify-between items-center text-xs pt-1 border-t border-stone-100">
                  <span className="font-semibold text-stone-800">★ {h.rating}</span>
                  <span className="font-bold text-amber-900">₹{h.pricePerNight} / night</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 6: PACKAGES */}
      {activeAdminTab === 'packages' && (
        <div className="space-y-4">
          <h2 className="font-display text-lg font-bold text-stone-900">
            Active Tour Packages ({packages.length})
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {packages.map(p => (
              <div key={p.id} className="p-4 bg-white border border-stone-200 rounded-xl space-y-2 shadow-sm">
                <span className="text-[11px] font-bold text-amber-900 uppercase">{p.duration}</span>
                <h4 className="font-bold text-stone-900 text-sm">{p.title}</h4>
                <p className="text-xs text-stone-500 line-clamp-2">{p.subtitle}</p>
                <div className="flex justify-between items-center text-xs pt-1 border-t border-stone-100">
                  <span className="text-[11px] text-stone-400">{p.destinationsCovered.length} Destinations</span>
                  <span className="font-bold text-amber-900">₹{p.price.toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add Destination Modal */}
      {showAddDestModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/80 backdrop-blur-sm flex justify-center p-4">
          <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl p-6 my-auto border border-stone-200 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-stone-100">
              <h3 className="font-display font-bold text-base text-stone-900">
                Add Verified Tourist Destination
              </h3>
              <button onClick={() => setShowAddDestModal(false)} className="text-stone-400 hover:text-stone-700">✕</button>
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
                  placeholder="Historical and cultural significance..."
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
                Publish Listing to Database
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Add Event Modal */}
      {showAddEventModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/80 backdrop-blur-sm flex justify-center p-4">
          <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl p-6 my-auto border border-stone-200 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-stone-100">
              <h3 className="font-display font-bold text-base text-stone-900">
                Add Cultural Event or Festival
              </h3>
              <button onClick={() => setShowAddEventModal(false)} className="text-stone-400 hover:text-stone-700">✕</button>
            </div>

            <form onSubmit={handleCreateEvent} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-stone-700 block mb-1">Event Name</label>
                <input
                  type="text"
                  value={newEventName}
                  onChange={(e) => setNewEventName(e.target.value)}
                  placeholder="e.g. Thiruvaiyaru Thyagaraja Aradhana"
                  className="w-full bg-stone-50 border border-stone-300 rounded-lg p-2 text-xs"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-stone-700 block mb-1">District</label>
                  <input
                    type="text"
                    value={newEventDistrict}
                    onChange={(e) => setNewEventDistrict(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-300 rounded-lg p-2 text-xs"
                    required
                  />
                </div>
                <div>
                  <label className="font-semibold text-stone-700 block mb-1">Date</label>
                  <input
                    type="text"
                    value={newEventDate}
                    onChange={(e) => setNewEventDate(e.target.value)}
                    placeholder="e.g. January 20 - 24"
                    className="w-full bg-stone-50 border border-stone-300 rounded-lg p-2 text-xs"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-stone-700 block mb-1">Venue</label>
                <input
                  type="text"
                  value={newEventVenue}
                  onChange={(e) => setNewEventVenue(e.target.value)}
                  placeholder="e.g. Samadhi Grounds, Thiruvaiyaru"
                  className="w-full bg-stone-50 border border-stone-300 rounded-lg p-2 text-xs"
                  required
                />
              </div>

              <div>
                <label className="font-semibold text-stone-700 block mb-1">Description</label>
                <textarea
                  value={newEventDesc}
                  onChange={(e) => setNewEventDesc(e.target.value)}
                  rows={2}
                  placeholder="Celebration details..."
                  className="w-full bg-stone-50 border border-stone-300 rounded-lg p-2 text-xs"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold uppercase tracking-wider text-xs transition-colors cursor-pointer mt-2"
              >
                Publish Event
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
