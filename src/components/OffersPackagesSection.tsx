import React, { useState } from 'react';
import { 
  Tag, 
  Check, 
  Sparkles, 
  Calendar, 
  Clock, 
  MapPin, 
  CheckCircle2, 
  XCircle, 
  Copy, 
  IndianRupee 
} from 'lucide-react';
import { SPECIAL_OFFERS, TOUR_PACKAGES } from '../data/mockData';
import { TourPackage } from '../types';
import { useAuth } from '../context/AuthContext';

export const OffersPackagesSection: React.FC = () => {
  const { user, addBooking } = useAuth();

  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [selectedPackage, setSelectedPackage] = useState<TourPackage | null>(null);
  const [travelers, setTravelers] = useState(2);
  const [selectedDate, setSelectedDate] = useState('2026-11-20');
  const [contactPhone, setContactPhone] = useState('+91 98401 23456');
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const handleCopyCode = (code: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(code);
      setCopiedCode(code);
      setTimeout(() => setCopiedCode(null), 2500);
    }
  };

  const handleBookPackage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPackage) return;

    const totalPrice = selectedPackage.price * travelers;

    addBooking({
      type: 'package',
      referenceId: selectedPackage.id,
      title: `${selectedPackage.title} (${selectedPackage.duration})`,
      date: selectedDate,
      travelers,
      totalPrice,
      contactPhone,
      notes: `Destinations: ${selectedPackage.destinationsCovered.join(', ')}`
    });

    setBookingSuccess(true);
    setTimeout(() => {
      setSelectedPackage(null);
      setBookingSuccess(false);
    }, 2500);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-12">
      
      {/* 1. SPECIAL PROMOTIONAL OFFERS */}
      <div className="space-y-4">
        <div className="text-center space-y-1.5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300 text-xs font-semibold">
            <Tag className="w-3.5 h-3.5 text-amber-700" />
            <span>Exclusive Explorer Discounts</span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-stone-900">
            Special Startup Offers & Coupons
          </h2>
          <p className="text-xs text-stone-500">
            Verified partner discounts applicable at checkout on tour packages, stays, and rentals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {SPECIAL_OFFERS.map((offer) => (
            <div key={offer.id} className="p-5 bg-gradient-to-br from-white to-amber-50/50 border border-amber-200/80 rounded-2xl shadow-sm space-y-3 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-amber-800 uppercase tracking-wider">{offer.category}</span>
                  <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    {offer.discount}
                  </span>
                </div>
                <h3 className="font-display font-bold text-stone-900 text-base mt-1">{offer.title}</h3>
                <p className="text-xs text-stone-600 mt-1 leading-relaxed">{offer.description}</p>
                <p className="text-[11px] text-stone-400 mt-2 font-mono">Eligibility: {offer.eligibility}</p>
              </div>

              <div className="pt-3 border-t border-amber-100 flex items-center justify-between">
                <span className="font-mono font-bold text-stone-900 bg-stone-100 px-2.5 py-1 rounded border border-stone-300 text-xs tracking-wider">
                  {offer.code}
                </span>
                <button
                  onClick={() => handleCopyCode(offer.code)}
                  className="py-1 px-3 rounded-lg bg-stone-900 hover:bg-amber-600 hover:text-stone-950 text-white text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                >
                  {copiedCode === offer.code ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedCode === offer.code ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. CURATED TOUR PACKAGES */}
      <div className="space-y-6 pt-4 border-t border-stone-200">
        <div className="text-center space-y-1.5">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-stone-900">
            Curated All-Inclusive Tour Packages
          </h2>
          <p className="text-xs text-stone-500 max-w-lg mx-auto">
            Hassle-free itineraries including heritage hotels, dedicated AC transport, verified historian guides, and entry passes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TOUR_PACKAGES.map((pkg) => (
            <div key={pkg.id} className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm flex flex-col justify-between">
              <div>
                <div className="aspect-[16/10] relative bg-stone-900 overflow-hidden">
                  <img src={pkg.image} alt={pkg.title} className="w-full h-full object-cover" />
                  <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded bg-stone-900/80 text-amber-300 text-[11px] font-bold">
                    {pkg.duration}
                  </span>
                  <span className="absolute bottom-2.5 right-2.5 px-2.5 py-0.5 rounded bg-amber-600 text-stone-950 text-xs font-bold">
                    ₹{pkg.price.toLocaleString('en-IN')} <span className="font-normal text-[10px]">/ person</span>
                  </span>
                </div>

                <div className="p-5 space-y-3">
                  <div>
                    <h3 className="font-display font-bold text-base text-stone-900">{pkg.title}</h3>
                    <p className="text-xs text-amber-800 font-medium">{pkg.subtitle}</p>
                  </div>

                  <div className="p-3 bg-stone-50 rounded-xl space-y-1 text-xs">
                    <span className="font-semibold text-stone-700 block text-[11px]">Destinations:</span>
                    <p className="text-stone-600 line-clamp-2">{pkg.destinationsCovered.join(' · ')}</p>
                  </div>

                  {/* Highlights */}
                  <div className="space-y-1.5 text-xs">
                    <span className="font-semibold text-stone-700 text-[11px]">Included in Package:</span>
                    <ul className="space-y-1 text-stone-600">
                      {pkg.inclusions.slice(0, 3).map((inc, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span className="line-clamp-1">{inc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <p className="text-[11px] text-stone-400">
                    Policy: {pkg.cancellationPolicy}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0">
                <button
                  onClick={() => setSelectedPackage(pkg)}
                  className="w-full py-2.5 rounded-lg bg-stone-900 hover:bg-amber-600 hover:text-stone-950 text-white font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Book Package
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Package Reservation Modal */}
      {selectedPackage && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/80 backdrop-blur-sm flex justify-center p-4">
          <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl p-6 my-auto border border-stone-200 space-y-4">
            
            <div className="flex items-center justify-between pb-2 border-b border-stone-100">
              <h3 className="font-display font-bold text-base text-stone-900">
                Reserve Tour Package
              </h3>
              <button onClick={() => setSelectedPackage(null)} className="text-stone-400 hover:text-stone-700">✕</button>
            </div>

            {bookingSuccess ? (
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-center space-y-2">
                <Check className="w-8 h-8 text-emerald-600 mx-auto" />
                <h4 className="font-bold text-emerald-950 text-sm">Package Reservation Confirmed!</h4>
                <p className="text-xs text-emerald-800">Your trip voucher and itinerary summary are saved in your profile.</p>
              </div>
            ) : (
              <form onSubmit={handleBookPackage} className="space-y-4 text-xs">
                <div>
                  <h4 className="font-bold text-stone-900 text-sm">{selectedPackage.title}</h4>
                  <p className="text-stone-500">{selectedPackage.duration} · {selectedPackage.subtitle}</p>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-stone-700">Select Travel Date</label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-300 rounded-lg p-2 text-xs"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-stone-700">Number of Travelers</label>
                  <select
                    value={travelers}
                    onChange={(e) => setTravelers(Number(e.target.value))}
                    className="w-full bg-stone-50 border border-stone-300 rounded-lg p-2 text-xs"
                  >
                    {[1, 2, 3, 4, 5, 6, 8].map(n => (
                      <option key={n} value={n}>{n} {n === 1 ? 'Traveler' : 'Travelers'}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-stone-700">Contact Phone Number</label>
                  <input
                    type="tel"
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-300 rounded-lg p-2 text-xs"
                    required
                  />
                </div>

                <div className="p-3 bg-stone-50 rounded-xl space-y-1">
                  <div className="flex justify-between text-stone-600">
                    <span>Package Price:</span>
                    <span>₹{selectedPackage.price.toLocaleString()} × {travelers} persons</span>
                  </div>
                  <div className="flex justify-between font-bold text-stone-900 text-sm pt-1 border-t border-stone-200">
                    <span>Total Package Cost:</span>
                    <span className="text-amber-900">₹{(selectedPackage.price * travelers).toLocaleString('en-IN')}</span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold uppercase tracking-wider text-xs transition-colors cursor-pointer"
                >
                  Confirm Package Booking
                </button>
              </form>
            )}

          </div>
        </div>
      )}

    </div>
  );
};
