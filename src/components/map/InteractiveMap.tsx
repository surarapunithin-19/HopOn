import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { LocationPoint, VehicleType } from '../../types';
import { Layers, ShieldCheck, MapPin } from 'lucide-react';

interface InteractiveMapProps {
  pickup: LocationPoint;
  destination: LocationPoint;
  progress?: number; // 0 to 100%
  vehicleType?: VehicleType;
  vehicleNumber?: string;
  captainName?: string;
  isLiveTracking?: boolean;
  className?: string;
}

export const InteractiveMap: React.FC<InteractiveMapProps> = ({
  pickup,
  destination,
  progress = 40,
  vehicleType = 'car',
  vehicleNumber = 'KA 03 MX 4821',
  captainName = 'Captain Vikram',
  isLiveTracking = true,
  className = 'h-[380px] w-full rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-inner'
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const tileLayerRef = useRef<L.TileLayer | null>(null);

  const [mapStyle, setMapStyle] = useState<'standard' | 'dark' | 'voyager'>('standard');

  // Retrieve OpenStreetMap API Key from env if available
  const osmApiKey =
    (import.meta.env.VITE_OPENSTREETMAP_API_KEY as string) ||
    (import.meta.env.VITE_OSM_API_KEY as string) ||
    '';

  // Determine OpenStreetMap tile URL template based on map style & API key
  const getOsmTileUrl = (style: 'standard' | 'dark' | 'voyager') => {
    if (osmApiKey) {
      // If user specified an OpenStreetMap provider key (e.g. MapTiler / LocationIQ OSM)
      if (osmApiKey.startsWith('pk.')) {
        return `https://{s}.tile.locationiq.com/v1/mode/streets/{z}/{x}/{y}.png?key=${osmApiKey}`;
      }
      return `https://api.maptiler.com/maps/streets-v2/{z}/{x}/{y}.png?key=${osmApiKey}`;
    }

    // Default OpenStreetMap / Carto OSM tiles
    switch (style) {
      case 'dark':
        return 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png';
      case 'voyager':
        return 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';
      case 'standard':
      default:
        return 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    }
  };

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Destroy existing map instance if any to avoid re-bind duplicates
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }

    const pickupLat = pickup.lat || 17.4504;
    const pickupLng = pickup.lng || 78.3808;
    const destLat = destination.lat || 17.4401;
    const destLng = destination.lng || 78.3489;

    // Calculate current interpolated vehicle position based on progress (0 to 100%)
    const currentLat = pickupLat + (destLat - pickupLat) * (progress / 100);
    const currentLng = pickupLng + (destLng - pickupLng) * (progress / 100);

    // Initialize Leaflet map instance
    const map = L.map(mapContainerRef.current, {
      zoomControl: false,
      scrollWheelZoom: false,
    }).setView([(pickupLat + destLat) / 2, (pickupLng + destLng) / 2], 13);

    L.control.zoom({ position: 'topright' }).addTo(map);

    // Add OpenStreetMap Tile Layer
    const tileUrl = getOsmTileUrl(mapStyle);
    const tileLayer = L.tileLayer(tileUrl, {
      maxZoom: 19,
      attribution: osmApiKey
        ? '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> (API Key Active)'
        : '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    tileLayerRef.current = tileLayer;

    const isTkrDest = destination.address.includes('TKR');
    const isTkrPickup = pickup.address.includes('TKR');

    // Custom Pickup Icon (Green Pin or Star for TKR)
    const pickupIcon = L.divIcon({
      className: 'custom-pickup-marker',
      html: isTkrPickup ? `
        <div class="relative flex items-center justify-center">
          <div class="absolute -inset-3 bg-amber-500/40 rounded-full animate-ping"></div>
          <div class="bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 px-2.5 py-1 rounded-full border-2 border-white shadow-2xl flex items-center gap-1 font-black text-xs">
            ⭐ TKR College
          </div>
        </div>
      ` : `
        <div class="relative flex items-center justify-center">
          <div class="absolute -inset-2 bg-emerald-500/30 rounded-full animate-ping"></div>
          <div class="w-8 h-8 bg-emerald-600 text-white rounded-full border-2 border-white shadow-lg flex items-center justify-center font-bold text-xs">
            A
          </div>
        </div>
      `,
      iconSize: isTkrPickup ? [110, 36] : [32, 32],
      iconAnchor: isTkrPickup ? [55, 18] : [16, 16]
    });

    // Custom Destination Icon (Red Pin or Star for TKR)
    const destIcon = L.divIcon({
      className: 'custom-dest-marker',
      html: isTkrDest ? `
        <div class="relative flex items-center justify-center">
          <div class="absolute -inset-3 bg-amber-500/40 rounded-full animate-ping"></div>
          <div class="bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 px-2.5 py-1 rounded-full border-2 border-white shadow-2xl flex items-center gap-1 font-black text-xs">
            ⭐ TKR College
          </div>
        </div>
      ` : `
        <div class="w-8 h-8 bg-rose-600 text-white rounded-full border-2 border-white shadow-lg flex items-center justify-center font-bold text-xs">
          B
        </div>
      `,
      iconSize: isTkrDest ? [110, 36] : [32, 32],
      iconAnchor: isTkrDest ? [55, 18] : [16, 16]
    });

    // Vehicle Animated Icon
    const vehicleEmoji = vehicleType === 'bike' ? '🏍️' : '🚘';
    const vehicleIcon = L.divIcon({
      className: 'custom-vehicle-marker',
      html: `
        <div class="relative bg-blue-600 text-white p-2 rounded-xl shadow-2xl border-2 border-white flex items-center gap-1 scale-110">
          <span class="text-base">${vehicleEmoji}</span>
          <span class="text-[10px] font-black uppercase tracking-wider bg-black/40 px-1 py-0.5 rounded">${vehicleNumber.split(' ')[0]}</span>
        </div>
      `,
      iconSize: [42, 36],
      iconAnchor: [21, 18]
    });

    // Add Markers
    L.marker([pickupLat, pickupLng], { icon: pickupIcon })
      .addTo(map)
      .bindPopup(`<b>Pickup Point</b><br/>${pickup.address}`);

    L.marker([destLat, destLng], { icon: destIcon })
      .addTo(map)
      .bindPopup(`<b>Destination</b><br/>${destination.address}`);

    if (isLiveTracking) {
      L.marker([currentLat, currentLng], { icon: vehicleIcon })
        .addTo(map)
        .bindPopup(`<b>${captainName}</b><br/>Status: In Transit (${progress}%)`);
    }

    // Polyline Route Line on OpenStreetMap
    const latlngs: L.LatLngExpression[] = [
      [pickupLat, pickupLng],
      // Mid-way curve point for realistic road curvature
      [
        pickupLat + (destLat - pickupLat) * 0.5 + 0.005,
        pickupLng + (destLng - pickupLng) * 0.5 - 0.005
      ],
      [destLat, destLng]
    ];

    const polyline = L.polyline(latlngs, {
      color: '#2563eb',
      weight: 5,
      opacity: 0.85,
      dashArray: '8, 8'
    }).addTo(map);

    // Fit Bounds around route
    map.fitBounds(polyline.getBounds(), { padding: [50, 50] });

    mapInstanceRef.current = map;

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [pickup, destination, progress, vehicleType, vehicleNumber, captainName, isLiveTracking, mapStyle, osmApiKey]);

  return (
    <div className={`relative ${className}`}>
      <div ref={mapContainerRef} className="h-full w-full z-0" />

      {/* OpenStreetMap API Status Badge & Layer Switcher */}
      <div className="absolute top-3 left-3 z-10 flex items-center gap-2">
        <div className="bg-slate-900/90 text-white backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-700/60 shadow-lg text-[11px] font-medium flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="font-bold text-slate-200">OpenStreetMap</span>
          {osmApiKey ? (
            <span className="bg-emerald-500/20 text-emerald-300 text-[9px] px-1.5 py-0.5 rounded font-mono font-bold flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" /> Key Active
            </span>
          ) : (
            <span className="bg-blue-500/20 text-blue-300 text-[9px] px-1.5 py-0.5 rounded font-mono font-semibold">
              Standard Tile Stream
            </span>
          )}
        </div>

        {/* Map Tile Style Switcher */}
        <div className="hidden sm:flex bg-slate-900/80 text-white backdrop-blur-md p-1 rounded-xl border border-slate-700/60 shadow-lg gap-1 text-[10px]">
          <button
            onClick={() => setMapStyle('standard')}
            className={`px-2 py-1 rounded-lg transition font-semibold ${mapStyle === 'standard' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'}`}
          >
            OSM Default
          </button>
          <button
            onClick={() => setMapStyle('voyager')}
            className={`px-2 py-1 rounded-lg transition font-semibold ${mapStyle === 'voyager' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'}`}
          >
            OSM Voyager
          </button>
          <button
            onClick={() => setMapStyle('dark')}
            className={`px-2 py-1 rounded-lg transition font-semibold ${mapStyle === 'dark' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'}`}
          >
            OSM Dark
          </button>
        </div>
      </div>

      {/* Live Tracking Telemetry HUD Overlay */}
      {isLiveTracking && (
        <div className="absolute bottom-4 left-4 right-4 z-10 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <span className="flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
            </div>
            <div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Live OpenStreetMap Telemetry</div>
              <div className="text-sm font-extrabold text-slate-900 dark:text-white">42 km/h • {Math.round(100 - progress)}% Remaining</div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">ETA via OSM Engine</div>
            <div className="text-sm font-black text-blue-600 dark:text-blue-400">{Math.max(2, Math.round((100 - progress) * 0.3))} mins away</div>
          </div>
        </div>
      )}
    </div>
  );
};

