import React, { useState } from 'react';
import { Wallet, Plus, ArrowUpRight, ArrowDownLeft, ShieldCheck, CreditCard } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useRide } from '../../context/RideContext';

export const WalletView: React.FC = () => {
  const { passengerProfile, updatePassengerProfile } = useAuth();
  const { transactions, topupWallet } = useRide();

  const [topupModalOpen, setTopupModalOpen] = useState(false);
  const [amount, setAmount] = useState(500);
  const [method, setMethod] = useState('upi');

  const handleTopUp = async () => {
    await topupWallet(amount, method);
    updatePassengerProfile({ walletBalance: passengerProfile.walletBalance + Number(amount) });
    setTopupModalOpen(false);
  };

  return (
    <div className="space-y-6">
      
      {/* Wallet Balance Card */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative z-10">
          <div>
            <div className="text-xs font-bold text-blue-200 uppercase tracking-widest flex items-center gap-1.5">
              <Wallet className="h-4 w-4" /> HopOn Cash Balance
            </div>
            <div className="text-4xl sm:text-5xl font-black tracking-tight mt-2">
              ₹{passengerProfile.walletBalance.toLocaleString('en-IN')}
            </div>
            <p className="text-xs text-blue-100 mt-1">Instant auto-deduct on bookings with 0 transaction failures</p>
          </div>

          <button
            onClick={() => setTopupModalOpen(true)}
            className="px-6 py-3.5 rounded-2xl bg-white text-blue-700 font-extrabold text-xs shadow-lg hover:bg-blue-50 transition active:scale-95 flex items-center gap-2"
          >
            <Plus className="h-4 w-4 stroke-[3]" /> Add Money
          </button>
        </div>
      </div>

      {/* Transaction History */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <h3 className="font-extrabold text-base text-slate-900 dark:text-white">Transaction Logs</h3>

        <div className="space-y-3">
          {transactions.map((tx) => (
            <div
              key={tx.id}
              className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className={`p-2.5 rounded-2xl ${tx.type === 'credit' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300' : 'bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300'}`}>
                  {tx.type === 'credit' ? <ArrowDownLeft className="h-5 w-5" /> : <ArrowUpRight className="h-5 w-5" />}
                </div>
                <div>
                  <div className="text-xs font-extrabold text-slate-900 dark:text-white">{tx.description}</div>
                  <div className="text-[10px] text-slate-400 font-semibold">{tx.timestamp} • {tx.method.toUpperCase()}</div>
                </div>
              </div>

              <div className={`text-sm font-black ${tx.type === 'credit' ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-900 dark:text-white'}`}>
                {tx.type === 'credit' ? '+' : '-'}₹{tx.amount}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Topup Modal */}
      {topupModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-sm w-full p-6 space-y-4 border border-slate-200 dark:border-slate-800 shadow-2xl">
            <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="font-extrabold text-slate-900 dark:text-white">Topup HopOn Wallet</h3>
              <button onClick={() => setTopupModalOpen(false)} className="text-slate-400">✕</button>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500">Select Preset Amount</label>
              <div className="grid grid-cols-3 gap-2">
                {[200, 500, 1000].map((a) => (
                  <button
                    key={a}
                    type="button"
                    onClick={() => setAmount(a)}
                    className={`py-2 rounded-xl text-xs font-black border ${amount === a ? 'bg-blue-600 text-white border-blue-600' : 'bg-slate-50 dark:bg-slate-800'}`}
                  >
                    +₹{a}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500">Payment Gateway</label>
              <select
                value={method}
                onChange={(e) => setMethod(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2.5 text-xs font-bold"
              >
                <option value="upi">UPI (GPay / PhonePe / Paytm)</option>
                <option value="card">Debit / Credit Card</option>
              </select>
            </div>

            <button
              onClick={handleTopUp}
              className="w-full py-3.5 rounded-2xl bg-blue-600 text-white font-black text-xs shadow-md"
            >
              Add ₹{amount} to Wallet
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
