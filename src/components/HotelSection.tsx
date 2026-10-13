import React, { useState, useEffect } from 'react';
import { 
  Hotel as HotelIcon, 
  Star, 
  MapPin, 
  PhoneCall, 
  Check, 
  IndianRupee, 
  Calendar, 
  Users, 
  ShieldCheck, 
  Filter 
} from 'lucide-react';
import { HOTELS } from '../data/mockData';
import { Hotel } from '../types';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

export const HotelSection: React.FC = () => {
  const { t } = useLanguage();
  const { user, addBooking } = useAuth();

  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('all');
  const [hotels, setHotels] = useState<Hotel[]>(HOTELS);
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);
  const [checkInDate, setCheckInDate] = useState('2026-11-12');
  const [nights, setNights] = useState(2);
  const [guests, setGuests] = useState(2);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  useEffect(() => {
    fetch('/api/hotels')
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (Array.isArray(data) && data.length > 0) setHotels(data);
      })
      .catch(() => {});
  }, []);

  const districts = ['all', 'Sivaganga', 'Madurai', 'Thanjavur', 'Nilgiris', 'Ramanathapuram', 'Dindigul'];

  const filteredHotels = hotels.filter(hotel => {
    const matchCat = filterCategory === 'all' || hotel.category === filterCategory;
    const matchDist = selectedDistrict === 'all' || hotel.district.toLowerCase() === selectedDistrict.toLowerCase();
    return matchCat && matchDist;
  });

  const handleBookStay = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedHotel) return;

    const totalPrice = selectedHotel.pricePerNight * nights;

    addBooking({
      type: 'hotel',
      referenceId: selectedHotel.id,
      title: `${selectedHotel.name} (${nights} Nights)`,
      date: checkInDate,
      travelers: guests,
      totalPrice,
      contactPhone: selectedHotel.contactPhone,
      notes: `Check-in: ${selectedHotel.checkInTime}, Check-out: ${selectedHotel.checkOutTime}. Address: ${selectedHotel.address}`
    });

    setBookingSuccess(true);
    setTimeout(() => {
      setSelectedHotel(null);
      setBookingSuccess(false);
    }, 2500);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="font-display text-2xl sm:text-4xl font-bold text-stone-900">
          Heritage Stays & Curated Hotels
        </h1>
        <p className="text-stone-600 text-xs sm:text-sm max-w-xl mx-auto">
          From 19th-century Chettinad palace homestays to colonial tea bungalows in Ooty and tranquil lodges near ancient temples.
        </p>

        {/* Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-4 text-xs">
          <select
            value={selectedDistrict}
            onChange={(e) => setSelectedDistrict(e.target.value)}
            className="bg-white border border-stone-300 rounded-lg px-3 py-1.5 text-xs text-stone-800"
          >
            <option value="all">All Districts</option>
            {districts.filter(d => d !== 'all').map(d => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>

          <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-lg border border-stone-200">
            {[
              { id: 'all', label: 'All Stays' },
              { id: 'homestay', label: 'Palace Homestays' },
              { id: 'resort', label: 'Resorts' },
              { id: 'family', label: 'Family Hotels' },
              { id: 'luxury', label: 'Luxury' }
            ].map(cat => (
              <button
                key={cat.id}
                onClick={() => setFilterCategory(cat.id)}
                className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
                  filterCategory === cat.id
                    ? 'bg-amber-600 text-stone-950 font-bold shadow-sm'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Hotel Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredHotels.map(hotel => (
          <div key={hotel.id} className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
            <div>
              <div className="aspect-[16/10] relative bg-stone-100 overflow-hidden">
                <img src={hotel.image} alt={hotel.name} className="w-full h-full object-cover" />
                <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-stone-900/80 text-amber-200 text-[11px] font-medium">
                  {hotel.category.toUpperCase()}
                </span>
                <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-stone-900/80 text-amber-300 text-xs font-bold flex items-center gap-1">
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                  <span>{hotel.rating}</span>
                </div>
              </div>

              <div className="p-5 space-y-2.5">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-display font-bold text-stone-900 text-base">{hotel.name}</h3>
                </div>

                <div className="flex items-center gap-1 text-xs text-stone-500">
                  <MapPin className="w-3.5 h-3.5 text-amber-700" />
                  <span className="truncate">{hotel.address}</span>
                </div>

                <p className="text-xs text-stone-600">
                  {hotel.distanceFromAttraction}
                </p>

                {/* Facilities */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {hotel.facilities.slice(0, 3).map((f, i) => (
                    <span key={i} className="px-2 py-0.5 rounded bg-stone-50 border border-stone-200 text-[10px] text-stone-600">
                      ✓ {f}
                    </span>
                  ))}
                </div>

                <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs">
                  <span className="text-stone-500">Check-in: {hotel.checkInTime}</span>
                  <span className="font-bold text-amber-900 text-sm">₹{hotel.pricePerNight} <span className="text-xs font-normal text-stone-500">/ night</span></span>
                </div>
              </div>
            </div>

            <div className="p-5 pt-0">
              <button
                onClick={() => setSelectedHotel(hotel)}
                className="w-full py-2.5 rounded-lg bg-stone-900 hover:bg-amber-600 hover:text-stone-950 text-white font-bold text-xs transition-colors cursor-pointer"
              >
                Book Accommodation
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Stay Reservation Modal */}
      {selectedHotel && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/80 backdrop-blur-sm flex justify-center p-4">
          <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl p-6 my-auto border border-stone-200 space-y-4">
            
            <div className="flex items-center justify-between pb-2 border-b border-stone-100">
              <h3 className="font-display font-bold text-base text-stone-900">
                Reserve Stay
              </h3>
              <button onClick={() => setSelectedHotel(null)} className="text-stone-400 hover:text-stone-700">✕</button>
            </div>

            {bookingSuccess ? (
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-center space-y-2">
                <Check className="w-8 h-8 text-emerald-600 mx-auto" />
                <h4 className="font-bold text-emerald-950 text-sm">Stay Booked Successfully!</h4>
                <p className="text-xs text-emerald-800">Your reservation details are saved in your profile.</p>
              </div>
            ) : (
              <form onSubmit={handleBookStay} className="space-y-4 text-xs">
                <div>
                  <h4 className="font-bold text-stone-900 text-sm">{selectedHotel.name}</h4>
                  <p className="text-stone-500">{selectedHotel.address}</p>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-stone-700">Check-in Date</label>
                  <input
                    type="date"
                    value={checkInDate}
                    onChange={(e) => setCheckInDate(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-300 rounded-lg p-2 text-xs"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="font-semibold text-stone-700">Nights</label>
                    <select
                      value={nights}
                      onChange={(e) => setNights(Number(e.target.value))}
                      className="w-full bg-stone-50 border border-stone-300 rounded-lg p-2 text-xs"
                    >
                      {[1, 2, 3, 4, 5, 7].map(n => (
                        <option key={n} value={n}>{n} {n === 1 ? 'Night' : 'Nights'}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="font-semibold text-stone-700">Guests</label>
                    <select
                      value={guests}
                      onChange={(e) => setGuests(Number(e.target.value))}
                      className="w-full bg-stone-50 border border-stone-300 rounded-lg p-2 text-xs"
                    >
                      {[1, 2, 3, 4, 6].map(g => (
                        <option key={g} value={g}>{g} {g === 1 ? 'Guest' : 'Guests'}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="p-3 bg-stone-50 rounded-xl space-y-1">
                  <div className="flex justify-between text-stone-600">
                    <span>Base Room:</span>
                    <span>₹{selectedHotel.pricePerNight} × {nights} nights</span>
                  </div>
                  <div className="flex justify-between font-bold text-stone-900 text-sm pt-1 border-t border-stone-200">
                    <span>Total Amount:</span>
                    <span className="text-amber-900">₹{selectedHotel.pricePerNight * nights}</span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold uppercase tracking-wider text-xs transition-colors cursor-pointer"
                >
                  Confirm Stay Reservation
                </button>
              </form>
            )}

          </div>
        </div>
      )}

    </div>
  );
};
