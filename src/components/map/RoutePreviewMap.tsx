import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { LocationPoint } from '../../types';
import { Navigation } from 'lucide-react';

interface RoutePreviewMapProps {
  pickup: LocationPoint;
  destination: LocationPoint;
  className?: string;
  showLabels?: boolean;
  vehicleType?: 'car' | 'bike';
}

export const RoutePreviewMap: React.FC<RoutePreviewMapProps> = ({
  pickup,
  destination,
  className = 'h-[200px] w-full rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800',
  showLabels = true,
  vehicleType = 'car'
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const [isMapReady, setIsMapReady] = useState(false);

  const osmApiKey =
    (import.meta.env.VITE_OPENSTREETMAP_API_KEY as string) ||
    (import.meta.env.VITE_OSM_API_KEY as string) ||
    '';

  const getTileUrl = () => {
    if (osmApiKey) {
      if (osmApiKey.startsWith('pk.')) {
        return `https://{s}.tile.locationiq.com/v1/mode/streets/{z}/{x}/{y}.png?key=${osmApiKey}`;
      }
      return `https://api.maptiler.com/maps/streets-v2/{z}/{x}/{y}.png?key=${osmApiKey}`;
    }
    return 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
  };

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Destroy existing
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }

    const pLat = pickup.lat || 17.3323;
    const pLng = pickup.lng || 78.5375;
    const dLat = destination.lat || 17.3503;
    const dLng = destination.lng || 78.5494;

    const centerLat = (pLat + dLat) / 2;
    const centerLng = (pLng + dLng) / 2;

    const map = L.map(mapContainerRef.current, {
      zoomControl: false,
      scrollWheelZoom: false,
      dragging: true,
      attributionControl: false,
    }).setView([centerLat, centerLng], 13);

    // Add tile layer
    L.tileLayer(getTileUrl(), {
      maxZoom: 18,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    // Pickup marker
    const isTkrPickup = pickup.address.includes('TKR');
    const pickupIcon = L.divIcon({
      className: 'preview-pickup-marker',
      html: isTkrPickup ? `
        <div style="display:flex;align-items:center;justify-content:center;">
          <div style="background:linear-gradient(135deg,#f59e0b,#eab308);color:#1e293b;padding:3px 8px;border-radius:20px;border:2px solid white;box-shadow:0 2px 8px rgba(0,0,0,0.3);font-weight:900;font-size:10px;white-space:nowrap;">
            ⭐ TKR College
          </div>
        </div>
      ` : `
        <div style="display:flex;align-items:center;justify-content:center;">
          <div style="width:28px;height:28px;background:#10b981;border-radius:50%;border:2px solid white;box-shadow:0 2px 8px rgba(0,0,0,0.3);display:flex;align-items:center;justify-content:center;color:white;font-weight:bold;font-size:11px;">A</div>
        </div>
      `,
      iconSize: isTkrPickup ? [100, 28] : [28, 28],
      iconAnchor: isTkrPickup ? [50, 14] : [14, 14]
    });

    // Destination marker
    const isTkrDest = destination.address.includes('TKR');
    const destIcon = L.divIcon({
      className: 'preview-dest-marker',
      html: isTkrDest ? `
        <div style="display:flex;align-items:center;justify-content:center;">
          <div style="background:linear-gradient(135deg,#f59e0b,#eab308);color:#1e293b;padding:3px 8px;border-radius:20px;border:2px solid white;box-shadow:0 2px 8px rgba(0,0,0,0.3);font-weight:900;font-size:10px;white-space:nowrap;">
            ⭐ TKR College
          </div>
        </div>
      ` : `
        <div style="display:flex;align-items:center;justify-content:center;">
          <div style="width:28px;height:28px;background:#ef4444;border-radius:50%;border:2px solid white;box-shadow:0 2px 8px rgba(0,0,0,0.3);display:flex;align-items:center;justify-content:center;color:white;font-weight:bold;font-size:11px;">B</div>
        </div>
      `,
      iconSize: isTkrDest ? [100, 28] : [28, 28],
      iconAnchor: isTkrDest ? [50, 14] : [14, 14]
    });

    // Vehicle icon at pickup (ride start indicator)
    const vehicleEmoji = vehicleType === 'bike' ? '🏍️' : '🚘';
    const vehicleIcon = L.divIcon({
      className: 'preview-vehicle-marker',
      html: `
        <div style="background:#2563eb;color:white;padding:4px 6px;border-radius:10px;border:2px solid white;box-shadow:0 2px 10px rgba(37,99,235,0.5);display:flex;align-items:center;gap:3px;font-size:12px;">
          <span>${vehicleEmoji}</span>
          <span style="font-size:8px;font-weight:900;letter-spacing:0.5px;">START</span>
        </div>
      `,
      iconSize: [70, 30],
      iconAnchor: [35, 30]
    });

    L.marker([pLat, pLng], { icon: pickupIcon })
      .addTo(map)
      .bindPopup(`<b>Pickup</b><br/>${pickup.address}`);

    L.marker([dLat, dLng], { icon: destIcon })
      .addTo(map)
      .bindPopup(`<b>Destination</b><br/>${destination.address}`);

    L.marker([pLat, pLng], { icon: vehicleIcon })
      .addTo(map);

    // Route polyline with curve
    const latlngs: L.LatLngExpression[] = [
      [pLat, pLng],
      [pLat + (dLat - pLat) * 0.3 + 0.003, pLng + (dLng - pLng) * 0.3 - 0.004],
      [pLat + (dLat - pLat) * 0.5 + 0.005, pLng + (dLng - pLng) * 0.5 - 0.003],
      [pLat + (dLat - pLat) * 0.7 + 0.002, pLng + (dLng - pLng) * 0.7 + 0.002],
      [dLat, dLng]
    ];

    const routeLine = L.polyline(latlngs, {
      color: '#2563eb',
      weight: 4,
      opacity: 0.8,
      dashArray: '10, 6'
    }).addTo(map);

    // Route shadow
    L.polyline(latlngs, {
      color: '#1e40af',
      weight: 8,
      opacity: 0.15,
    }).addTo(map);

    map.fitBounds(routeLine.getBounds(), { padding: [35, 35] });

    mapInstanceRef.current = map;
    setIsMapReady(true);

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [pickup, destination, vehicleType, osmApiKey]);

  // Calculate distance
  const distance = pickup.lat && destination.lat
    ? (Math.sqrt(Math.pow(pickup.lat - destination.lat, 2) + Math.pow(pickup.lng - destination.lng, 2)) * 111).toFixed(1)
    : '–';

  return (
    <div className={`relative ${className}`}>
      <div ref={mapContainerRef} className="h-full w-full z-0" />

      {/* Compact Route Info Overlay */}
      {showLabels && (
        <div className="absolute bottom-2 left-2 right-2 z-10 flex items-center justify-between bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm px-3 py-2 rounded-xl border border-slate-200/50 dark:border-slate-700/50 shadow-lg">
          <div className="flex items-center gap-2">
            <Navigation className="h-3.5 w-3.5 text-blue-600 shrink-0" />
            <span className="text-[10px] font-bold text-slate-600 dark:text-slate-300">Route Preview</span>
          </div>
          <div className="text-[10px] font-black text-blue-600 dark:text-blue-400">
            ~{distance} km via OSM
          </div>
        </div>
      )}

      {/* Map Loading State */}
      {!isMapReady && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-slate-100 dark:bg-slate-800 animate-pulse rounded-2xl">
          <div className="text-xs font-bold text-slate-400">Loading Map...</div>
        </div>
      )}
    </div>
  );
};
