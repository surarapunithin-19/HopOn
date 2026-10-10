import React from 'react';
import { Users, Car, DollarSign, AlertTriangle, TrendingUp, ShieldCheck, ArrowUpRight } from 'lucide-react';
import { useRide } from '../../context/RideContext';

export const AdminOverview: React.FC = () => {
  const { rides, bookings, sosAlerts, allCaptains } = useRide();

  const totalGrossRevenue = bookings.reduce((sum, b) => sum + (b.finalAmount || 0), 0) + 145000;
  const platformCommission = Math.round(totalGrossRevenue * 0.1);
  const activeVerifiedCaptainsCount = allCaptains.filter(c => c.verificationStatus === 'verified').length;
  const totalCompletedRides = bookings.length + 1280;
  const pendingCaptainsCount = allCaptains.filter(c => c.verificationStatus === 'pending').length;

  return (
    <div className="space-y-6">
      
      {/* Active Emergency Alert Banner if any */}
      {sosAlerts.length > 0 && (
        <div className="p-4 rounded-3xl bg-rose-600 text-white flex items-center justify-between shadow-lg shadow-rose-600/30 animate-pulse">
          <div className="flex items-center gap-3">
            <AlertTriangle className="h-6 w-6 stroke-[2.5]" />
            <div>
              <div className="font-black text-sm uppercase tracking-wider">ACTIVE EMERGENCY SOS ALERT ({sosAlerts.length})</div>
              <div className="text-xs opacity-90">Passenger {sosAlerts[0]?.passengerName} triggered SOS at {sosAlerts[0]?.location.address}</div>
            </div>
          </div>
          <span className="px-3 py-1 bg-white text-rose-700 font-extrabold text-xs rounded-full">
            Inspect Immediately
          </span>
        </div>
      )}

      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Gross Platform GMV</div>
          <div className="text-3xl font-black text-slate-900 dark:text-white">₹{totalGrossRevenue.toLocaleString()}</div>
          <div className="text-[11px] text-emerald-600 font-bold flex items-center gap-1">
            <TrendingUp className="h-3.5 w-3.5" /> +18.4% this month
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Platform Fee Revenue</div>
          <div className="text-3xl font-black text-blue-600 dark:text-blue-400">₹{platformCommission.toLocaleString()}</div>
          <div className="text-[11px] text-slate-400 font-semibold">10% Platform Cut</div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Active Verified Captains</div>
          <div className="text-3xl font-black text-emerald-600 dark:text-emerald-400">{activeVerifiedCaptainsCount}</div>
          <div className="text-[11px] text-amber-500 font-bold">{pendingCaptainsCount} Pending Documents</div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Completed Rides</div>
          <div className="text-3xl font-black text-slate-900 dark:text-white">{totalCompletedRides.toLocaleString()}</div>
          <div className="text-[11px] text-emerald-600 font-bold">100% Completion Rate</div>
        </div>

      </div>

      {/* Live System Activity Log */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <h3 className="font-extrabold text-base text-slate-900 dark:text-white">Recent System Events</h3>

        <div className="space-y-3 text-xs">
          {bookings.map((b) => (
            <div key={b.id} className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-blue-100 dark:bg-blue-900/60 text-blue-600">
                  <Car className="h-4 w-4" />
                </div>
                <div>
                  <span className="font-bold text-slate-900 dark:text-white">{b.passengerName}</span> booked ride with <span className="font-bold text-blue-600">{b.rideDetails.captainName}</span>
                  <div className="text-[10px] text-slate-400">{b.bookedAt} • Fare: ₹{b.finalAmount}</div>
                </div>
              </div>

              <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-300 font-black text-[10px]">
                {b.status.toUpperCase()}
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
