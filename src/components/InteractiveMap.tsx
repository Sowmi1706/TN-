import React, { useEffect, useRef, useState } from 'react';
import { 
  MapPin, 
  Navigation, 
  Locate, 
  Layers, 
  Search, 
  Compass, 
  ExternalLink,
  PhoneCall,
  Loader2
} from 'lucide-react';
import { Destination } from '../types';
import { DESTINATIONS } from '../data/mockData';
import { useLanguage } from '../context/LanguageContext';

interface InteractiveMapProps {
  onSelectDestination: (destination: Destination) => void;
  userCoords: { lat: number; lng: number } | null;
  onRequestUserLocation: () => void;
}

export const InteractiveMap: React.FC<InteractiveMapProps> = ({
  onSelectDestination,
  userCoords,
  onRequestUserLocation
}) => {
  const { t } = useLanguage();
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const leafletMapRef = useRef<any>(null);
  const markersGroupRef = useRef<any>(null);

  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [selectedPin, setSelectedPin] = useState<Destination | null>(null);
  const [loadingLocation, setLoadingLocation] = useState(false);

  useEffect(() => {
    let mapInstance: any = null;

    // Dynamically load Leaflet if not already in window
    import('leaflet').then((L) => {
      if (!mapContainerRef.current) return;

      if (leafletMapRef.current) {
        leafletMapRef.current.remove();
      }

      // Default center: Central Tamil Nadu (Tiruchirappalli / Thanjavur region)
      const initialLat = userCoords ? userCoords.lat : 10.7905;
      const initialLng = userCoords ? userCoords.lng : 78.7047;
      const initialZoom = userCoords ? 8 : 7;

      mapInstance = L.map(mapContainerRef.current).setView([initialLat, initialLng], initialZoom);
      leafletMapRef.current = mapInstance;

      // Add OpenStreetMap Tile Layer
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
        maxZoom: 18,
      }).addTo(mapInstance);

      // Add User location marker if available
      if (userCoords) {
        const userIcon = L.divIcon({
          className: 'custom-user-pin',
          html: `<div style="background-color: #0284c7; width: 16px; height: 16px; border-radius: 50%; border: 3px solid white; box-shadow: 0 0 10px rgba(0,0,0,0.5);"></div>`,
          iconSize: [16, 16],
          iconAnchor: [8, 8],
        });
        L.marker([userCoords.lat, userCoords.lng], { icon: userIcon })
          .addTo(mapInstance)
          .bindPopup('<b>Your Current Location</b>');
      }

      // Create LayerGroup for markers
      const markersGroup = L.layerGroup().addTo(mapInstance);
      markersGroupRef.current = markersGroup;

      renderMarkers(L, markersGroup, filterCategory);
    });

    return () => {
      if (leafletMapRef.current) {
        leafletMapRef.current.remove();
        leafletMapRef.current = null;
      }
    };
  }, [userCoords]);

  // Update markers when category filter changes
  useEffect(() => {
    if (markersGroupRef.current) {
      import('leaflet').then((L) => {
        markersGroupRef.current.clearLayers();
        renderMarkers(L, markersGroupRef.current, filterCategory);
      });
    }
  }, [filterCategory]);

  const renderMarkers = (L: any, markersGroup: any, category: string) => {
    const filtered = category === 'all'
      ? DESTINATIONS
      : category === 'hidden'
      ? DESTINATIONS.filter(d => d.isHiddenSpot)
      : DESTINATIONS.filter(d => d.category === category);

    filtered.forEach((dest) => {
      const pinColor = dest.isHiddenSpot 
        ? '#065f46' // emerald green for hidden eco gem
        : dest.category === 'temples'
        ? '#b45309' // ochre/vermilion for temple
        : dest.category === 'hill_stations'
        ? '#0369a1' // sky blue for hills
        : '#991b1b'; // deep red for heritage

      const customIcon = L.divIcon({
        className: 'custom-destination-marker',
        html: `
          <div style="background-color: ${pinColor}; color: white; width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 2px solid white; box-shadow: 0 2px 6px rgba(0,0,0,0.4); font-size: 11px; font-weight: bold;">
            ${dest.isHiddenSpot ? '★' : '🏛'}
          </div>
        `,
        iconSize: [28, 28],
        iconAnchor: [14, 14],
      });

      const marker = L.marker([dest.latitude, dest.longitude], { icon: customIcon });

      marker.on('click', () => {
        setSelectedPin(dest);
      });

      marker.bindPopup(`
        <div style="font-family: inherit; font-size: 12px; line-height: 1.4;">
          <strong style="color: #1c1917; font-size: 13px;">${dest.name}</strong><br/>
          <span style="color: #78716c;">${dest.district} · ${dest.category}</span><br/>
          <span style="color: #b45309; font-weight: 600;">₹${dest.entryFee.adult === 0 ? 'Free Entry' : `₹${dest.entryFee.adult}`}</span>
        </div>
      `);

      markersGroup.addLayer(marker);
    });
  };

  const handleLocateMe = () => {
    setLoadingLocation(true);
    onRequestUserLocation();
    setTimeout(() => {
      setLoadingLocation(false);
    }, 2000);
  };

  return (
    <div className="relative w-full h-[620px] rounded-2xl overflow-hidden border border-stone-200 shadow-sm bg-stone-100 flex flex-col">
      
      {/* Top Map Control Bar */}
      <div className="absolute top-3 inset-x-3 z-20 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
        
        {/* Category Filters */}
        <div className="bg-stone-900/90 backdrop-blur-md p-1 rounded-xl shadow-lg border border-stone-800 flex items-center gap-1 pointer-events-auto overflow-x-auto max-w-full">
          {[
            { id: 'all', label: 'All Markers' },
            { id: 'hidden', label: '★ Hidden Gems' },
            { id: 'temples', label: 'Temples' },
            { id: 'hill_stations', label: 'Hill Stations' },
            { id: 'heritage', label: 'Heritage' },
            { id: 'waterfalls', label: 'Waterfalls' }
          ].map(cat => (
            <button
              key={cat.id}
              onClick={() => setFilterCategory(cat.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                filterCategory === cat.id
                  ? 'bg-amber-600 text-stone-950 font-bold'
                  : 'text-stone-300 hover:text-white hover:bg-stone-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Locate Me Action Button */}
        <button
          onClick={handleLocateMe}
          disabled={loadingLocation}
          className="bg-white/95 hover:bg-white text-stone-900 p-2.5 rounded-xl shadow-lg border border-stone-200 pointer-events-auto flex items-center gap-1.5 text-xs font-semibold cursor-pointer transition-colors"
          title="Detect Current Location"
        >
          {loadingLocation ? (
            <Loader2 className="w-4 h-4 animate-spin text-amber-600" />
          ) : (
            <Locate className="w-4 h-4 text-amber-700" />
          )}
          <span className="hidden sm:inline">Locate Me</span>
        </button>

      </div>

      {/* Leaflet Map DOM Canvas */}
      <div ref={mapContainerRef} className="flex-1 w-full h-full" />

      {/* Selected Destination Floating Preview Card */}
      {selectedPin && (
        <div className="absolute bottom-4 inset-x-4 sm:inset-x-auto sm:left-4 sm:w-96 z-20 bg-white/95 backdrop-blur-md rounded-xl p-4 shadow-2xl border border-amber-300 animate-slideUp">
          <div className="flex items-start justify-between gap-2">
            <div>
              <span className="text-[11px] text-amber-800 font-bold uppercase tracking-wider">
                {selectedPin.district} · {selectedPin.category}
              </span>
              <h4 className="font-display font-bold text-stone-900 text-sm line-clamp-1">
                {selectedPin.name}
              </h4>
            </div>
            <button
              onClick={() => setSelectedPin(null)}
              className="text-stone-400 hover:text-stone-700 text-xs p-1"
            >
              ✕
            </button>
          </div>

          <p className="text-xs text-stone-600 mt-1 line-clamp-2 leading-relaxed">
            {selectedPin.description}
          </p>

          <div className="mt-3 pt-2.5 border-t border-stone-200/80 flex items-center justify-between text-xs">
            <span className="font-semibold text-stone-800">
              Hours: {selectedPin.openingTime} - {selectedPin.closingTime}
            </span>
            <div className="flex items-center gap-2">
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${selectedPin.latitude},${selectedPin.longitude}`}
                target="_blank"
                rel="noopener noreferrer"
                className="py-1 px-2 rounded bg-stone-100 hover:bg-stone-200 text-stone-800 font-medium flex items-center gap-1"
              >
                <Navigation className="w-3 h-3 text-amber-700" />
                <span>Directions</span>
              </a>
              <button
                onClick={() => onSelectDestination(selectedPin)}
                className="py-1 px-2.5 rounded bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold"
              >
                View
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
