import React from 'react';
import { Bell, Check, Trash2, X, AlertCircle, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { useRide } from '../../context/RideContext';

interface NotificationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationDrawer: React.FC<NotificationDrawerProps> = ({ isOpen, onClose }) => {
  const { notifications, markNotificationRead, clearNotifications } = useRide();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-xs animate-in fade-in">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col">
          
          {/* Header */}
          <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400">
                <Bell className="h-5 w-5" />
              </div>
              <h3 className="font-extrabold text-slate-900 dark:text-white">Notifications</h3>
            </div>
            <div className="flex items-center gap-2">
              {notifications.length > 0 && (
                <button
                  onClick={clearNotifications}
                  className="p-1.5 text-slate-400 hover:text-rose-600 transition"
                  title="Clear all"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              )}
              <button
                onClick={onClose}
                className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {notifications.length === 0 ? (
              <div className="text-center py-16 text-slate-400">
                <Bell className="h-10 w-10 mx-auto stroke-1 opacity-40 mb-2" />
                <p className="text-xs font-semibold">No new notifications</p>
              </div>
            ) : (
              notifications.map((n) => (
                <div
                  key={n.id}
                  onClick={() => markNotificationRead(n.id)}
                  className={`p-4 rounded-2xl border transition cursor-pointer ${
                    n.read
                      ? 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 opacity-75'
                      : 'bg-blue-50/50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800/60 shadow-sm'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <span className="font-bold text-xs text-slate-900 dark:text-white flex items-center gap-1.5">
                      {n.type === 'sos' && <ShieldAlert className="h-3.5 w-3.5 text-rose-500" />}
                      {n.type === 'ride_update' && <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />}
                      {n.title}
                    </span>
                    <span className="text-[10px] text-slate-400 shrink-0">{n.timestamp}</span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{n.message}</p>
                </div>
              ))
            )}
          </div>

        </div>
      </div>
    </div>
  );
};
