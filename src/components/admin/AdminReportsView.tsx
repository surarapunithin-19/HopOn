import React from 'react';
import { DollarSign, BarChart3, TrendingUp, PieChart, ShieldCheck, Download } from 'lucide-react';
import { useRide } from '../../context/RideContext';

export const AdminReportsView: React.FC = () => {
  const { bookings } = useRide();

  const platformTotalGMV = bookings.reduce((sum, b) => sum + b.finalAmount, 0) + 248500;
  const platformRevenue = Math.round(platformTotalGMV * 0.1);
  const gstCollected = Math.round(platformRevenue * 0.18);

  return (
    <div className="space-y-6">
      
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-black text-slate-900 dark:text-white">Revenue, GST & Commission Analytics</h2>
          <p className="text-xs text-slate-500">Breakdown of gross seat GMV, HopOn platform cut, and government GST filing summaries.</p>
        </div>

        <button
          onClick={() => alert('Financial ledger exported to CSV')}
          className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-black flex items-center gap-2 shadow"
        >
          <Download className="h-4 w-4" /> Export CSV Financial Ledger
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Gross GMV</div>
          <div className="text-3xl font-black text-slate-900 dark:text-white">₹{platformTotalGMV.toLocaleString('en-IN')}</div>
          <div className="text-xs text-emerald-600 font-bold">100% Ride Value</div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">HopOn Net Revenue (10%)</div>
          <div className="text-3xl font-black text-blue-600 dark:text-blue-400">₹{platformRevenue.toLocaleString('en-IN')}</div>
          <div className="text-xs text-slate-400 font-semibold">Platform Fee Earnings</div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">GST Filing Obligation (18%)</div>
          <div className="text-3xl font-black text-slate-900 dark:text-white">₹{gstCollected.toLocaleString('en-IN')}</div>
          <div className="text-xs text-slate-400 font-semibold">Automated GST Audit Compliant</div>
        </div>

      </div>

      {/* Breakdown Card */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <h3 className="font-extrabold text-base text-slate-900 dark:text-white">City Corridor Revenue Distribution</h3>
        
        <div className="space-y-3 text-xs">
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 flex justify-between items-center">
            <div>
              <div className="font-extrabold text-slate-900 dark:text-white">Telangana Cyberabad Corridor (HITEC City ➔ Gachibowli DLF)</div>
              <div className="text-slate-400 font-medium">540 Rides Completed This Week</div>
            </div>
            <div className="text-right">
              <div className="font-black text-emerald-600 dark:text-emerald-400">₹128,400 GMV</div>
              <div className="text-[10px] text-slate-400">₹12,840 Commission</div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 flex justify-between items-center">
            <div>
              <div className="font-extrabold text-slate-900 dark:text-white">Hyderabad Airport Express Corridor (Jubilee Hills ➔ RGIA Shamshabad)</div>
              <div className="text-slate-400 font-medium">380 Rides Completed This Week</div>
            </div>
            <div className="text-right">
              <div className="font-black text-emerald-600 dark:text-emerald-400">₹120,100 GMV</div>
              <div className="text-[10px] text-slate-400">₹12,010 Commission</div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};
