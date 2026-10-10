import React from 'react';
import { MapPin, Navigation, Car, Shield } from 'lucide-react';
import { useRide } from '../../context/RideContext';
import { InteractiveMap } from '../map/InteractiveMap';

export const AdminLiveMapView: React.FC = () => {
  const { rides, activeTripProgress } = useRide();

  const sampleRide = rides[0];

  return (
    <div className="space-y-6">
      
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-black text-slate-900 dark:text-white">Live City Commute Control Map</h2>
          <p className="text-xs text-slate-500">Real-time GPS tracking of active carpool routes, captain telemetry, and passenger safety locations.</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="flex h-3 w-3 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
          </span>
          <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase">Live GPS Stream</span>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-xl space-y-4">
        <InteractiveMap
          pickup={sampleRide.pickup}
          destination={sampleRide.destination}
          progress={activeTripProgress}
          vehicleType={sampleRide.vehicleType}
          vehicleNumber={sampleRide.vehicleNumber}
          captainName={sampleRide.captainName}
          isLiveTracking={true}
          className="h-[450px] w-full rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          {rides.map((r) => (
            <div key={r.id} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1.5 text-xs">
              <div className="flex justify-between font-extrabold text-slate-900 dark:text-white">
                <span>{r.captainName} ({r.vehicleNumber})</span>
                <span className="text-emerald-600">★ {r.captainRating}</span>
              </div>
              <div className="text-slate-500 font-semibold">{r.pickup.address} ➔ {r.destination.address}</div>
              <div className="flex justify-between text-[10px] text-slate-400 font-bold pt-1">
                <span>{r.availableSeats} Seats Left</span>
                <span>₹{r.pricePerSeat}/seat</span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
