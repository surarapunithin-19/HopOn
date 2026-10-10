import React from 'react';
import { PlusCircle, ListFilter, DollarSign, ShieldCheck, Star, User, ToggleLeft, ToggleRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export type CaptainTab = 'overview' | 'offer' | 'requests' | 'earnings' | 'verification' | 'profile';

interface CaptainSidebarProps {
  activeTab: CaptainTab;
  setActiveTab: (tab: CaptainTab) => void;
}

export const CaptainSidebar: React.FC<CaptainSidebarProps> = ({ activeTab, setActiveTab }) => {
  const { captainProfile, updateCaptainProfile } = useAuth();

  const menu = [
    { id: 'overview', label: 'Captain Command', icon: <PlusCircle className="h-4 w-4" /> },
    { id: 'offer', label: 'Offer / Publish Ride', icon: <PlusCircle className="h-4 w-4 text-emerald-500" /> },
    { id: 'requests', label: 'Ride Requests & Live', icon: <ListFilter className="h-4 w-4" /> },
    { id: 'earnings', label: 'Earnings & UPI Wallet', icon: <DollarSign className="h-4 w-4 text-emerald-500" /> },
    { id: 'verification', label: 'Vehicle & Documents', icon: <ShieldCheck className="h-4 w-4 text-blue-500" /> },
    { id: 'profile', label: 'Captain Profile', icon: <User className="h-4 w-4" /> },
  ];

  return (
    <aside className="w-full lg:w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 p-4 shrink-0 space-y-6">
      
      {/* Captain Profile & Online Toggle */}
      <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3">
        <div className="flex items-center gap-3">
          <img src={captainProfile.avatar} alt={captainProfile.name} className="h-10 w-10 rounded-full object-cover ring-2 ring-emerald-500" />
          <div>
            <div className="text-xs font-black text-slate-900 dark:text-white">{captainProfile.name}</div>
            <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold uppercase tracking-wider flex items-center gap-1">
              {captainProfile.verificationStatus === 'verified' ? '✓ Verified Captain' : '⌛ Verification Pending'}
            </div>
          </div>
        </div>

        {/* Online Toggle */}
        <button
          onClick={() => updateCaptainProfile({ isOnline: !captainProfile.isOnline })}
          className={`w-full py-2.5 rounded-xl text-xs font-black flex items-center justify-center gap-2 transition ${
            captainProfile.isOnline
              ? 'bg-emerald-600 text-white shadow-md shadow-emerald-500/20'
              : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
          }`}
        >
          {captainProfile.isOnline ? <ToggleRight className="h-5 w-5" /> : <ToggleLeft className="h-5 w-5" />}
          <span>{captainProfile.isOnline ? 'ONLINE (Accepting Rides)' : 'OFFLINE'}</span>
        </button>
      </div>

      <nav className="space-y-1.5">
        {menu.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as CaptainTab)}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl text-xs font-bold transition ${
                isActive
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <div className="flex items-center gap-3">
                {item.icon}
                <span>{item.label}</span>
              </div>
            </button>
          );
        })}
      </nav>

    </aside>
  );
};
