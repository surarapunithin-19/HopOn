import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { LocationPoint, VehicleType } from '../../types';

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

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Destroy existing map instance if any
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }

    const pickupLat = pickup.lat || 12.9784;
    const pickupLng = pickup.lng || 77.6408;
    const destLat = destination.lat || 12.9116;
    const destLng = destination.lng || 77.6389;

    // Calculate current interpolated vehicle position based on progress (0 to 100%)
    const currentLat = pickupLat + (destLat - pickupLat) * (progress / 100);
    const currentLng = pickupLng + (destLng - pickupLng) * (progress / 100);

    // Initialize Leaflet map
    const map = L.map(mapContainerRef.current, {
      zoomControl: false,
      scrollWheelZoom: false,
    }).setView([(pickupLat + destLat) / 2, (pickupLng + destLng) / 2], 13);

    L.control.zoom({ position: 'topright' }).addTo(map);

    // Add OpenStreetMap Tile Layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    // Custom Pickup Icon (Green Pin)
    const pickupIcon = L.divIcon({
      className: 'custom-pickup-marker',
      html: `
        <div class="relative flex items-center justify-center">
          <div class="absolute -inset-2 bg-emerald-500/30 rounded-full animate-ping"></div>
          <div class="w-8 h-8 bg-emerald-600 text-white rounded-full border-2 border-white shadow-lg flex items-center justify-center font-bold text-xs">
            A
          </div>
        </div>
      `,
      iconSize: [32, 32],
      iconAnchor: [16, 16]
    });

    // Custom Destination Icon (Red Pin)
    const destIcon = L.divIcon({
      className: 'custom-dest-marker',
      html: `
        <div class="w-8 h-8 bg-rose-600 text-white rounded-full border-2 border-white shadow-lg flex items-center justify-center font-bold text-xs">
          B
        </div>
      `,
      iconSize: [32, 32],
      iconAnchor: [16, 16]
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

    // Polyline Route Line
    const latlngs: L.LatLngExpression[] = [
      [pickupLat, pickupLng],
      // Add a mid-way curve point for realistic road curvature
      [
        pickupLat + (destLat - pickupLat) * 0.5 + 0.005,
        pickupLng + (destLng - pickupLng) * 0.5 - 0.005
      ],
      [destLat, destLng]
    ];

    const polyline = L.polyline(latlngs, {
      color: '#2563eb',
      weight: 5,
      opacity: 0.8,
      dashArray: '10, 10'
    }).addTo(map);

    // Fit Bounds
    map.fitBounds(polyline.getBounds(), { padding: [50, 50] });

    mapInstanceRef.current = map;

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [pickup, destination, progress, vehicleType, vehicleNumber, captainName, isLiveTracking]);

  return (
    <div className={`relative ${className}`}>
      <div ref={mapContainerRef} className="h-full w-full z-0" />
      
      {/* Live Tracking HUD Overlay */}
      {isLiveTracking && (
        <div className="absolute bottom-4 left-4 right-4 z-10 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <span className="flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
            </div>
            <div>
              <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Live GPS Speed</div>
              <div className="text-sm font-bold text-slate-900 dark:text-white">42 km/h • {100 - progress}% Dist Left</div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">Estimated Arrival</div>
            <div className="text-sm font-extrabold text-blue-600 dark:text-blue-400">{Math.max(2, Math.round((100 - progress) * 0.3))} mins away</div>
          </div>
        </div>
      )}
    </div>
  );
};
