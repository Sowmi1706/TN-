import React, { useState } from 'react';
import { Utensils, Star, MapPin, Clock, PhoneCall, ExternalLink } from 'lucide-react';
import { RESTAURANTS } from '../data/mockData';

export const FoodSection: React.FC = () => {
  const [filterType, setFilterType] = useState<'all' | 'veg' | 'both'>('all');

  const famousDishes = [
    {
      name: 'Madurai Kari Dosa & Bun Parotta',
      district: 'Madurai',
      desc: 'Three-layered egg & minced mutton thick dosa cooked on cast-iron tava, paired with flaky bun parotta.',
      veg: false,
      tag: 'Iconic Street Food'
    },
    {
      name: 'Famous Jigarthanda',
      district: 'Madurai',
      desc: 'Almond gum (badam pisin), nannari syrup, chilled basundi, and rich indigenous ice cream. Natural coolant.',
      veg: true,
      tag: 'Royal Dessert'
    },
    {
      name: 'Chettinad Kozhi Varuval',
      district: 'Sivaganga (Chettinad)',
      desc: 'Country chicken pan-roasted in stone-ground black pepper, shallots, fennel, and curry leaves.',
      veg: false,
      tag: 'Spicy Heritage'
    },
    {
      name: 'Tirunelveli Iruttu Kadai Halwa',
      district: 'Tirunelveli',
      desc: 'Wheat milk slow-stirred in pure ghee over woodfire. Melts on the tongue with rich caramel notes.',
      veg: true,
      tag: 'GI Tagged Sweet'
    },
    {
      name: 'Kumbakonam Degree Filter Coffee',
      district: 'Thanjavur',
      desc: 'Brewed with pure chicory-free chicory blend in unadulterated hot cow milk served in brass davarah-tumbler.',
      veg: true,
      tag: 'Morning Ritual'
    },
    {
      name: 'Thanjavur Kadappa with Idli',
      district: 'Thanjavur',
      desc: 'Mild coconut, moong dal, and potato gravy seasoned with fennel and cloves, traditional accompaniment to soft idlis.',
      veg: true,
      tag: 'Delta Tradition'
    }
  ];

  const filteredRestaurants = RESTAURANTS.filter(r => {
    if (filterType === 'all') return true;
    return r.foodType === filterType;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-10">
      
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="font-display text-2xl sm:text-4xl font-bold text-stone-900">
          Authentic Flavours & Cuisine of Tamil Nadu
        </h1>
        <p className="text-stone-600 text-xs sm:text-sm max-w-xl mx-auto">
          Explore regional culinary wonders from Chettinad royal feasts and Madurai night street messes to Tanjore banana leaf thalis.
        </p>
      </div>

      {/* Famous Dishes Showcase */}
      <div className="space-y-4">
        <h2 className="font-display text-xl font-bold text-stone-900">
          Legendary Regional Specialities
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {famousDishes.map((dish, i) => (
            <div key={i} className="p-5 bg-white border border-stone-200 rounded-xl shadow-sm space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-amber-900">{dish.district}</span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                  dish.veg ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                }`}>
                  {dish.veg ? '● Pure Veg' : '▲ Non-Veg'}
                </span>
              </div>
              <h3 className="font-display font-bold text-base text-stone-900">{dish.name}</h3>
              <p className="text-xs text-stone-600 leading-relaxed">{dish.desc}</p>
              <div className="pt-2 text-[11px] text-amber-800 font-semibold">
                ✨ {dish.tag}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Verified Iconic Eateries */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="font-display text-xl font-bold text-stone-900">
            Recommended Authentic Eateries
          </h2>
          <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-lg border border-stone-200 text-xs font-semibold">
            <button
              onClick={() => setFilterType('all')}
              className={`px-3 py-1 rounded-md transition-colors ${filterType === 'all' ? 'bg-amber-600 text-stone-950 font-bold' : 'text-stone-600'}`}
            >
              All Restaurants
            </button>
            <button
              onClick={() => setFilterType('veg')}
              className={`px-3 py-1 rounded-md transition-colors ${filterType === 'veg' ? 'bg-amber-600 text-stone-950 font-bold' : 'text-stone-600'}`}
            >
              Pure Veg
            </button>
            <button
              onClick={() => setFilterType('both')}
              className={`px-3 py-1 rounded-md transition-colors ${filterType === 'both' ? 'bg-amber-600 text-stone-950 font-bold' : 'text-stone-600'}`}
            >
              Non-Veg Messes
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRestaurants.map((rest) => (
            <div key={rest.id} className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-sm flex flex-col justify-between">
              <div>
                <div className="aspect-[16/10] bg-stone-100 relative overflow-hidden">
                  <img src={rest.image} alt={rest.name} className="w-full h-full object-cover" />
                  <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-stone-900/80 text-amber-200 text-[11px] font-medium">
                    {rest.priceRange} · {rest.district}
                  </span>
                  <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-stone-900/80 text-amber-300 text-xs font-bold flex items-center gap-1">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <span>{rest.rating}</span>
                  </div>
                </div>

                <div className="p-5 space-y-2">
                  <h3 className="font-display font-bold text-base text-stone-900">{rest.name}</h3>
                  <div className="flex items-center gap-1 text-xs text-stone-500">
                    <MapPin className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                    <span className="truncate">{rest.address}</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-stone-500">
                    <Clock className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                    <span>{rest.operatingHours}</span>
                  </div>

                  <div className="pt-2 border-t border-stone-100">
                    <span className="text-[11px] text-stone-400 block mb-1">Signature Items:</span>
                    <div className="flex flex-wrap gap-1">
                      {rest.specialityDishes.map((dish, i) => (
                        <span key={i} className="px-2 py-0.5 rounded bg-stone-50 border border-stone-200 text-[10px] text-stone-700">
                          {dish}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-5 pt-0">
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(rest.name + ' ' + rest.district)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 rounded-lg bg-stone-900 hover:bg-amber-600 hover:text-stone-950 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                >
                  <span>Get Directions</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
