import React, { useState } from 'react';
import { Calendar, MapPin, Ticket, Sparkles, Clock, Users } from 'lucide-react';
import { EVENTS } from '../data/mockData';
import { useLanguage } from '../context/LanguageContext';

export const EventsSection: React.FC = () => {
  const { language, t } = useLanguage();
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const filteredEvents = EVENTS.filter(ev => {
    if (filterCategory === 'all') return true;
    return ev.category === filterCategory;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-amber-700" />
          <span>Cultural Calendar & Temple Celebrations</span>
        </div>
        <h1 className="font-display text-2xl sm:text-4xl font-bold text-stone-900">
          Festivals & Heritage Celebrations of Tamil Nadu
        </h1>
        <p className="text-stone-600 text-xs sm:text-sm max-w-xl mx-auto">
          Experience millennia of living traditions: chariot festivals, harvest valour, classical Bharatanatyam dance under ancient monuments, and hill flower shows.
        </p>

        {/* Filters */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 mt-4 text-xs">
          {[
            { id: 'all', label: 'All Celebrations' },
            { id: 'cultural', label: 'Harvest & Valor' },
            { id: 'temple', label: 'Temple Chariot Festivals' },
            { id: 'music_dance', label: 'Classical Dance & Music' },
            { id: 'seasonal', label: 'Hill Botanical Shows' }
          ].map(cat => (
            <button
              key={cat.id}
              onClick={() => setFilterCategory(cat.id)}
              className={`px-3 py-1.5 rounded-lg border transition-colors cursor-pointer ${
                filterCategory === cat.id
                  ? 'bg-amber-600 border-amber-600 text-stone-950 font-bold shadow-sm'
                  : 'bg-white border-stone-200 text-stone-600 hover:border-amber-400'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredEvents.map(event => (
          <div key={event.id} className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm flex flex-col justify-between">
            <div>
              <div className="aspect-[16/9] relative bg-stone-900 overflow-hidden">
                <img src={event.image} alt={event.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-4 right-4 text-white">
                  <span className="text-amber-400 font-mono text-[11px] font-semibold block mb-0.5">
                    {event.district} · {event.date}
                  </span>
                  <h3 className="font-display text-lg font-bold text-white leading-tight">
                    {language === 'ta' && event.nameTa ? event.nameTa : event.name}
                  </h3>
                </div>
              </div>

              <div className="p-5 space-y-3">
                <p className="text-xs text-stone-600 leading-relaxed">
                  {event.description}
                </p>

                <div className="p-3 bg-stone-50 rounded-xl space-y-1.5 text-xs">
                  <div className="flex items-center gap-1.5 text-stone-700">
                    <MapPin className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                    <span><strong className="text-stone-900">Venue:</strong> {event.venue}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-stone-700">
                    <Ticket className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                    <span><strong className="text-stone-900">Tickets:</strong> {event.ticketPrice}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-stone-700">
                    <Users className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                    <span><strong className="text-stone-900">Organized by:</strong> {event.organizer}</span>
                  </div>
                </div>

                {/* Highlights */}
                <div className="space-y-1">
                  <span className="text-[11px] text-stone-400 uppercase tracking-wide font-semibold">Key Highlights:</span>
                  <div className="flex flex-wrap gap-1">
                    {event.highlights.map((h, i) => (
                      <span key={i} className="px-2.5 py-0.5 rounded bg-amber-50 border border-amber-200/80 text-[10px] text-amber-900 font-medium">
                        ★ {h}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="p-5 pt-0">
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.venue)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 rounded-lg bg-stone-900 hover:bg-amber-600 hover:text-stone-950 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
              >
                <span>View Event Location & Map</span>
              </a>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
