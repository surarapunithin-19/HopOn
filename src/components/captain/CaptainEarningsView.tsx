import React, { useState } from 'react';
import { DollarSign, Wallet, ArrowUpRight, TrendingUp, CreditCard, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const CaptainEarningsView: React.FC = () => {
  const { captainProfile, updateCaptainProfile } = useAuth();
  const [withdrawSuccess, setWithdrawSuccess] = useState(false);

  const handleWithdraw = () => {
    setWithdrawSuccess(true);
    setTimeout(() => {
      updateCaptainProfile({ walletBalance: 0 });
      setWithdrawSuccess(false);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Today's Net Earnings</div>
          <div className="text-3xl font-black text-emerald-600 dark:text-emerald-400">₹{captainProfile.earnings.today}</div>
          <p className="text-[10px] text-slate-400">From 8 completed carpool seats</p>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">This Week's Earnings</div>
          <div className="text-3xl font-black text-blue-600 dark:text-blue-400">₹{captainProfile.earnings.thisWeek}</div>
          <p className="text-[10px] text-slate-400">Directly transferred to UPI handle</p>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Lifetime Total</div>
          <div className="text-3xl font-black text-slate-900 dark:text-white">₹{captainProfile.earnings.total}</div>
          <p className="text-[10px] text-slate-400">342 Total Passengers Served</p>
        </div>

      </div>

      {/* Wallet Payout & UPI Handle */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-xl space-y-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div>
            <h3 className="font-black text-lg text-slate-900 dark:text-white">Captain Payout Wallet</h3>
            <p className="text-xs text-slate-400">Linked UPI handle: <span className="font-mono text-blue-600 font-bold">{captainProfile.upiId || 'vikram@upi'}</span></p>
          </div>

          <div className="text-right">
            <div className="text-xs text-slate-400 font-bold">Available for Payout</div>
            <div className="text-2xl font-black text-emerald-600">₹{captainProfile.walletBalance}</div>
          </div>
        </div>

        {withdrawSuccess ? (
          <div className="p-4 bg-emerald-50 text-emerald-800 rounded-2xl flex items-center gap-2 text-xs font-bold">
            <CheckCircle2 className="h-5 w-5 text-emerald-600" />
            Payout of ₹{captainProfile.walletBalance} dispatched to UPI: {captainProfile.upiId}!
          </div>
        ) : (
          <button
            onClick={handleWithdraw}
            disabled={captainProfile.walletBalance <= 0}
            className="w-full py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-md transition disabled:opacity-50"
          >
            Transfer Wallet Balance to Bank via UPI
          </button>
        )}
      </div>

    </div>
  );
};
