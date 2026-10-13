import React from 'react';
import { Star, Clock, MapPin, Heart, BookOpen, ArrowUpRight } from 'lucide-react';
import { Destination } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';

interface DestinationCardProps {
  destination: Destination;
  onSelect: (destination: Destination) => void;
  onOpenStory?: (destinationId: string) => void;
  userDistanceKm?: number;
}

export const DestinationCard: React.FC<DestinationCardProps> = ({
  destination,
  onSelect,
  onOpenStory,
  userDistanceKm
}) => {
  const { language, t } = useLanguage();
  const { user, toggleWishlist } = useAuth();

  const isSaved = user?.wishlist?.includes(destination.id);

  // Check if destination is currently open based on Indian Standard Time (UTC+5.5)
  const isCurrentlyOpen = (): boolean => {
    try {
      const now = new Date();
      // UTC + 5:30 in hours
      const istHours = (now.getUTCHours() + 5.5 + now.getUTCMinutes() / 60) % 24;
      const { open, close } = destination.openHours24;
      return istHours >= open && istHours <= close;
    } catch {
      return true;
    }
  };

  const isOpen = isCurrentlyOpen();

  const displayName = language === 'ta' && destination.nameTa ? destination.nameTa : destination.name;
  const displayDesc = language === 'ta' && destination.descriptionTa ? destination.descriptionTa : destination.description;

  return (
    <div className="group bg-white rounded-xl border border-stone-200/80 hover:border-amber-400/80 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col overflow-hidden">
      
      {/* Image container */}
      <div className="relative aspect-[16/10] overflow-hidden bg-stone-100">
        <img
          src={destination.images[0]}
          alt={destination.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-stone-950/10 to-transparent pointer-events-none" />

        {/* Top Badges / Wishlist Button */}
        <div className="absolute top-3 inset-x-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {destination.isHiddenSpot ? (
              <span className="bg-amber-900/90 text-amber-200 text-[11px] font-medium px-2 py-0.5 rounded backdrop-blur-sm border border-amber-600/30">
                Hidden Gem
              </span>
            ) : destination.isPopular ? (
              <span className="bg-stone-900/80 text-amber-300 text-[11px] font-medium px-2 py-0.5 rounded backdrop-blur-sm border border-stone-700/50">
                Popular Landmark
              </span>
            ) : null}
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist(destination.id);
            }}
            className="w-8 h-8 rounded-full bg-stone-900/70 hover:bg-stone-900 text-stone-200 hover:text-rose-400 backdrop-blur-sm flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Save to wishlist"
          >
            <Heart className={`w-4 h-4 ${isSaved ? 'fill-rose-500 text-rose-500' : ''}`} />
          </button>
        </div>

        {/* Bottom overlay with Live Open/Closed and Rating */}
        <div className="absolute bottom-2.5 inset-x-3 flex items-center justify-between text-xs text-stone-200 pointer-events-none">
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1.5 font-medium">
              <span className={`w-2 h-2 rounded-full ${isOpen ? 'bg-emerald-400 animate-pulse' : 'bg-rose-400'}`} />
              <span className={isOpen ? 'text-emerald-300' : 'text-rose-300'}>
                {isOpen ? t('statusOpen') : t('statusClosed')}
              </span>
            </span>
          </div>

          <div className="flex items-center gap-1 bg-stone-900/80 px-2 py-0.5 rounded text-amber-300 font-semibold text-[11px]">
            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
            <span>{destination.ratings.toFixed(1)}</span>
            <span className="text-stone-400 font-normal">({destination.reviewCount})</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Unboxed Metadata (Zero-pill discipline) */}
          <div className="flex items-center gap-2 text-xs text-stone-500 mb-1.5">
            <span className="flex items-center gap-1 text-amber-800 font-medium">
              <MapPin className="w-3 h-3 text-amber-700" />
              <span>{destination.district}</span>
            </span>
            <span aria-hidden="true" className="text-stone-300">·</span>
            <span className="capitalize">{destination.category.replace('_', ' ')}</span>
            {userDistanceKm !== undefined && (
              <>
                <span aria-hidden="true" className="text-stone-300">·</span>
                <span className="text-stone-600 font-mono text-[11px]">{Math.round(userDistanceKm)} km away</span>
              </>
            )}
          </div>

          {/* Destination Name */}
          <h3 
            onClick={() => onSelect(destination)}
            className="font-display text-lg font-bold text-stone-900 group-hover:text-amber-800 transition-colors cursor-pointer line-clamp-1"
          >
            {displayName}
          </h3>

          {/* Description snippet */}
          <p className="text-xs text-stone-600 mt-1.5 line-clamp-2 leading-relaxed">
            {displayDesc}
          </p>

          {/* Practical Quick Info: Timings & Entry Fee */}
          <div className="mt-3 pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-stone-400" />
              <span>{destination.openingTime} - {destination.closingTime}</span>
            </div>
            <div>
              {destination.entryFee.adult === 0 ? (
                <span className="text-emerald-700 font-medium">{t('freeEntry')}</span>
              ) : (
                <span className="text-stone-800 font-medium">₹{destination.entryFee.adult} / person</span>
              )}
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="mt-4 pt-3 border-t border-stone-100 flex items-center gap-2">
          {destination.storyId && onOpenStory && (
            <button
              onClick={() => onOpenStory(destination.id)}
              className="flex-1 py-2 px-3 rounded-lg bg-amber-50 hover:bg-amber-100/80 text-amber-900 border border-amber-200/60 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <BookOpen className="w-3.5 h-3.5 text-amber-700" />
              <span>{t('discoverStory')}</span>
            </button>
          )}

          <button
            onClick={() => onSelect(destination)}
            className="flex-1 py-2 px-3 rounded-lg bg-stone-900 hover:bg-amber-700 text-stone-100 text-xs font-semibold flex items-center justify-center gap-1 transition-colors cursor-pointer"
          >
            <span>{t('viewDetails')}</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
};
