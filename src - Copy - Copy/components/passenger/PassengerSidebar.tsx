import React from 'react';
import { Search, Calendar, History, Wallet, AlertTriangle, Bell, User, Settings, ShieldCheck } from 'lucide-react';

export type PassengerTab = 'find' | 'bookings' | 'history' | 'wallet' | 'sos' | 'profile';

interface PassengerSidebarProps {
  activeTab: PassengerTab;
  setActiveTab: (tab: PassengerTab) => void;
  unreadNotifsCount: number;
}

export const PassengerSidebar: React.FC<PassengerSidebarProps> = ({ activeTab, setActiveTab, unreadNotifsCount }) => {
  const menu = [
    { id: 'find', label: 'Find Ride', icon: <Search className="h-4 w-4" /> },
    { id: 'bookings', label: 'My Bookings / Live', icon: <Calendar className="h-4 w-4" /> },
    { id: 'history', label: 'Ride History', icon: <History className="h-4 w-4" /> },
    { id: 'wallet', label: 'Wallet & Payments', icon: <Wallet className="h-4 w-4" /> },
    { id: 'sos', label: 'Emergency SOS', icon: <AlertTriangle className="h-4 w-4 text-rose-500" /> },
    { id: 'profile', label: 'Profile & Contacts', icon: <User className="h-4 w-4" /> },
  ];

  return (
    <aside className="w-full lg:w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 p-4 shrink-0 space-y-6">
      
      <div className="px-3 py-2 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Passenger Menu</span>
        <span className="text-[10px] bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-300 font-extrabold px-2 py-0.5 rounded-full">
          Rider Active
        </span>
      </div>

      <nav className="space-y-1.5">
        {menu.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as PassengerTab)}
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

      {/* Safety Shield Info Card */}
      <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-800/80 border border-blue-200/60 dark:border-slate-700/60 space-y-2">
        <div className="flex items-center gap-2 text-xs font-bold text-blue-700 dark:text-blue-300">
          <ShieldCheck className="h-4 w-4 text-blue-600" /> Women Only Active
        </div>
        <p className="text-[11px] text-slate-600 dark:text-slate-300">
          You are protected with 24/7 Live GPS tracking & emergency dispatch.
        </p>
      </div>

    </aside>
  );
};
