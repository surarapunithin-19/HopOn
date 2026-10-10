import React from 'react';
import { LayoutDashboard, CheckSquare, MapPin, AlertTriangle, BarChart3, ShieldAlert } from 'lucide-react';

export type AdminTab = 'overview' | 'approvals' | 'livetrips' | 'sos' | 'reports';

interface AdminSidebarProps {
  activeTab: AdminTab;
  setActiveTab: (tab: AdminTab) => void;
  pendingCount: number;
  activeSosCount: number;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({ activeTab, setActiveTab, pendingCount, activeSosCount }) => {
  const menu = [
    { id: 'overview', label: 'Platform Analytics', icon: <LayoutDashboard className="h-4 w-4" /> },
    { id: 'approvals', label: 'Document Approvals', icon: <CheckSquare className="h-4 w-4" />, badge: pendingCount > 0 ? pendingCount : null },
    { id: 'livetrips', label: 'Live City Map', icon: <MapPin className="h-4 w-4 text-emerald-500" /> },
    { id: 'sos', label: 'SOS Emergency Monitor', icon: <AlertTriangle className="h-4 w-4 text-rose-500" />, badge: activeSosCount > 0 ? activeSosCount : null, alert: true },
    { id: 'reports', label: 'Revenue & Commission', icon: <BarChart3 className="h-4 w-4" /> },
  ];

  return (
    <aside className="w-full lg:w-64 bg-slate-900 text-slate-200 border-r border-slate-800 p-4 shrink-0 space-y-6">
      
      <div className="px-3 py-2 border-b border-slate-800 flex items-center justify-between">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Admin Control</span>
        <span className="text-[10px] bg-rose-500/20 text-rose-400 border border-rose-500/30 font-extrabold px-2 py-0.5 rounded-full">
          Super Admin
        </span>
      </div>

      <nav className="space-y-1.5">
        {menu.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as AdminTab)}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl text-xs font-bold transition ${
                isActive
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              <div className="flex items-center gap-3">
                {item.icon}
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-black ${item.alert ? 'bg-rose-600 text-white animate-pulse' : 'bg-slate-800 text-slate-200'}`}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

    </aside>
  );
};
