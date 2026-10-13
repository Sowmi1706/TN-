import React, { useState } from 'react';
import { 
  Bus, 
  Train, 
  Car, 
  ExternalLink, 
  Clock, 
  IndianRupee, 
  Check, 
  Calendar, 
  PhoneCall, 
  ShieldCheck, 
  AlertCircle 
} from 'lucide-react';
import { TRANSPORT_ROUTES, RENTAL_VEHICLES } from '../data/mockData';
import { RentalVehicle } from '../types';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

export const TransportGuide: React.FC = () => {
  const { t } = useLanguage();
  const { user, addBooking } = useAuth();

  const [activeTab, setActiveTab] = useState<'govt_bus' | 'train' | 'rentals'>('govt_bus');
  const [selectedRental, setSelectedRental] = useState<RentalVehicle | null>(null);
  const [bookingRentalDays, setBookingRentalDays] = useState(2);
  const [bookingDate, setBookingDate] = useState('2026-11-10');
  const [bookingSuccessMessage, setBookingSuccessMessage] = useState<string | null>(null);

  const busRoutes = TRANSPORT_ROUTES.filter(r => r.type === 'govt_bus');
  const trainRoutes = TRANSPORT_ROUTES.filter(r => r.type === 'train');

  const handleBookRental = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRental) return;

    const totalPrice = selectedRental.pricePerDay * bookingRentalDays;

    addBooking({
      type: 'vehicle',
      referenceId: selectedRental.id,
      title: `${selectedRental.name} (${bookingRentalDays} Days Rental)`,
      date: bookingDate,
      travelers: selectedRental.seatingCapacity,
      totalPrice,
      contactPhone: selectedRental.providerPhone,
      notes: `Pickup: ${selectedRental.pickupLocation}. Provider: ${selectedRental.provider}`
    });

    setBookingSuccessMessage(`Reservation confirmed for ${selectedRental.name}! You can view your voucher in Profile.`);
    setTimeout(() => {
      setSelectedRental(null);
      setBookingSuccessMessage(null);
    }, 3000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="font-display text-2xl sm:text-4xl font-bold text-stone-900">
          Tamil Nadu Transit & Vehicle Rental Hub
        </h1>
        <p className="text-stone-600 text-xs sm:text-sm max-w-xl mx-auto">
          Verified Government buses (SETC / TNSTC), Southern Railway lines, and trusted local vehicle rentals across all districts.
        </p>

        {/* Tab Switcher */}
        <div className="inline-flex bg-stone-100 p-1 rounded-xl border border-stone-200 mt-4 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('govt_bus')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors cursor-pointer ${
              activeTab === 'govt_bus' ? 'bg-amber-600 text-stone-950 font-bold shadow-sm' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Bus className="w-4 h-4" />
            <span>Government Buses (SETC)</span>
          </button>

          <button
            onClick={() => setActiveTab('train')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors cursor-pointer ${
              activeTab === 'train' ? 'bg-amber-600 text-stone-950 font-bold shadow-sm' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Train className="w-4 h-4" />
            <span>Southern Railway</span>
          </button>

          <button
            onClick={() => setActiveTab('rentals')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors cursor-pointer ${
              activeTab === 'rentals' ? 'bg-amber-600 text-stone-950 font-bold shadow-sm' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Car className="w-4 h-4" />
            <span>Vehicle Rentals & Cabs</span>
          </button>
        </div>
      </div>

      {/* 1. GOVERNMENT BUS SECTION */}
      {activeTab === 'govt_bus' && (
        <div className="space-y-6">
          <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-xl flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-stone-800">
              <Bus className="w-5 h-5 text-amber-700" />
              <span>
                <strong>Official Portal:</strong> Book government buses online securely via State Express Transport Corporation (SETC).
              </span>
            </div>
            <a
              href="https://www.tnstc.in"
              target="_blank"
              rel="noopener noreferrer"
              className="py-2 px-4 rounded-lg bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold flex items-center gap-1.5 transition-colors"
            >
              <span>Visit www.tnstc.in</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {busRoutes.map((route) => (
              <div key={route.id} className="bg-white rounded-xl border border-stone-200 p-5 shadow-sm space-y-3 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs text-stone-500 mb-1">
                    <span className="font-semibold text-amber-900">{route.operator}</span>
                    <span className="font-mono text-[11px]">{route.frequency}</span>
                  </div>
                  <h3 className="font-bold text-stone-900 text-sm">{route.from} ➔ {route.to}</h3>
                  <p className="text-xs text-stone-600 mt-1 font-medium">{route.serviceName}</p>

                  <div className="mt-3 pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                    <div>
                      <span className="text-stone-400 block text-[10px]">Departs / Duration</span>
                      <span className="font-semibold text-stone-800">{route.departureTime} ({route.duration})</span>
                    </div>
                    <div className="text-right">
                      <span className="text-stone-400 block text-[10px]">Approx Fare</span>
                      <span className="font-bold text-amber-900 text-sm">₹{route.approxFare}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <a
                    href="https://www.tnstc.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2 rounded-lg bg-stone-900 hover:bg-amber-700 text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <span>Book on TNSTC Portal</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 2. TRAIN CONNECTIVITY SECTION */}
      {activeTab === 'train' && (
        <div className="space-y-6">
          <div className="p-4 bg-sky-50 border border-sky-200 rounded-xl flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-stone-800">
              <Train className="w-5 h-5 text-sky-700" />
              <span>
                <strong>Southern Railway:</strong> Connect easily across Tamil Nadu on Vande Bharat and heritage trains.
              </span>
            </div>
            <a
              href="https://www.irctc.co.in"
              target="_blank"
              rel="noopener noreferrer"
              className="py-2 px-4 rounded-lg bg-stone-900 hover:bg-stone-800 text-white font-bold flex items-center gap-1.5 transition-colors"
            >
              <span>Book on IRCTC</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {trainRoutes.map((route) => (
              <div key={route.id} className="bg-white rounded-xl border border-stone-200 p-5 shadow-sm space-y-3 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs text-stone-500 mb-1">
                    <span className="font-semibold text-sky-900">{route.operator}</span>
                    <span className="font-mono text-[11px]">{route.frequency}</span>
                  </div>
                  <h3 className="font-bold text-stone-900 text-sm">{route.from} ➔ {route.to}</h3>
                  <p className="text-xs text-stone-600 mt-1 font-medium">{route.serviceName}</p>

                  <div className="mt-3 pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                    <div>
                      <span className="text-stone-400 block text-[10px]">Departs / Duration</span>
                      <span className="font-semibold text-stone-800">{route.departureTime} ({route.duration})</span>
                    </div>
                    <div className="text-right">
                      <span className="text-stone-400 block text-[10px]">Starting Fare</span>
                      <span className="font-bold text-stone-900 text-sm">₹{route.approxFare}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <a
                    href="https://www.irctc.co.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2 rounded-lg bg-stone-900 hover:bg-amber-700 text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <span>Reserve on IRCTC</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. RENTAL VEHICLES & TAXIS */}
      {activeTab === 'rentals' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {RENTAL_VEHICLES.map((vehicle) => (
              <div key={vehicle.id} className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-sm flex flex-col justify-between">
                <div>
                  <div className="aspect-[16/10] bg-stone-100 overflow-hidden relative">
                    <img src={vehicle.image} alt={vehicle.name} className="w-full h-full object-cover" />
                    <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-stone-900/80 text-white text-[11px] font-medium">
                      {vehicle.district}
                    </span>
                  </div>

                  <div className="p-4 space-y-2">
                    <h3 className="font-bold text-stone-900 text-sm">{vehicle.name}</h3>
                    <p className="text-[11px] text-stone-500">Provided by {vehicle.provider}</p>
                    <div className="flex items-center justify-between text-xs pt-1">
                      <span className="text-stone-600">{vehicle.seatingCapacity} Seater · {vehicle.fuelType}</span>
                      <span className="font-bold text-amber-900 text-sm">₹{vehicle.pricePerDay} / day</span>
                    </div>
                    <p className="text-[11px] text-stone-500 line-clamp-2 pt-1 border-t border-stone-100">
                      {vehicle.terms}
                    </p>
                  </div>
                </div>

                <div className="p-4 pt-0">
                  <button
                    onClick={() => setSelectedRental(vehicle)}
                    className="w-full py-2 rounded-lg bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-xs transition-colors cursor-pointer"
                  >
                    Reserve Vehicle
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Rental Booking Modal */}
      {selectedRental && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/80 backdrop-blur-sm flex justify-center p-4">
          <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl p-6 my-auto border border-stone-200 space-y-4">
            
            <div className="flex items-center justify-between pb-2 border-b border-stone-100">
              <h3 className="font-display font-bold text-base text-stone-900">
                Reserve Rental Vehicle
              </h3>
              <button onClick={() => setSelectedRental(null)} className="text-stone-400 hover:text-stone-700">✕</button>
            </div>

            {bookingSuccessMessage ? (
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-center space-y-2">
                <Check className="w-8 h-8 text-emerald-600 mx-auto" />
                <h4 className="font-bold text-emerald-950 text-sm">Booking Confirmed!</h4>
                <p className="text-xs text-emerald-800">{bookingSuccessMessage}</p>
              </div>
            ) : (
              <form onSubmit={handleBookRental} className="space-y-4 text-xs">
                <div>
                  <h4 className="font-bold text-stone-900 text-sm">{selectedRental.name}</h4>
                  <p className="text-stone-500">Pickup: {selectedRental.pickupLocation}</p>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-stone-700">Pickup Date</label>
                  <input
                    type="date"
                    value={bookingDate}
                    onChange={(e) => setBookingDate(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-300 rounded-lg p-2 text-xs"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-stone-700">Rental Duration (Days)</label>
                  <select
                    value={bookingRentalDays}
                    onChange={(e) => setBookingRentalDays(Number(e.target.value))}
                    className="w-full bg-stone-50 border border-stone-300 rounded-lg p-2 text-xs"
                  >
                    {[1, 2, 3, 4, 5, 7].map(num => (
                      <option key={num} value={num}>{num} {num === 1 ? 'Day' : 'Days'}</option>
                    ))}
                  </select>
                </div>

                <div className="p-3 bg-stone-50 rounded-xl space-y-1">
                  <div className="flex justify-between text-stone-600">
                    <span>Rate:</span>
                    <span>₹{selectedRental.pricePerDay} × {bookingRentalDays} days</span>
                  </div>
                  <div className="flex justify-between font-bold text-stone-900 text-sm pt-1 border-t border-stone-200">
                    <span>Total Estimated:</span>
                    <span className="text-amber-900">₹{selectedRental.pricePerDay * bookingRentalDays}</span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold uppercase tracking-wider text-xs transition-colors cursor-pointer"
                >
                  Confirm Reservation Voucher
                </button>
              </form>
            )}

          </div>
        </div>
      )}

    </div>
  );
};
