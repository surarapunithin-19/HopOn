import React from 'react';
import { AlertTriangle, PhoneCall, ShieldAlert, CheckCircle2, MapPin, ExternalLink } from 'lucide-react';
import { useRide } from '../../context/RideContext';

export const AdminSosMonitorView: React.FC = () => {
  const { sosAlerts, resolveSosAlert } = useRide();

  return (
    <div className="space-y-6">
      
      <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <h2 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            <AlertTriangle className="h-6 w-6 text-rose-600" /> Emergency SOS Dispatch Command
          </h2>
          <p className="text-xs text-slate-500">24/7 Priority Emergency Monitoring & Police/Contacts Dispatch desk.</p>
        </div>

        <span className="px-3.5 py-1.5 rounded-full bg-rose-600 text-white font-extrabold text-xs animate-pulse">
          {sosAlerts.filter(s => s.status === 'active').length} Active Emergencies
        </span>
      </div>

      {sosAlerts.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-12 text-center border border-slate-200 dark:border-slate-800 space-y-3">
          <ShieldAlert className="h-12 w-12 text-emerald-500 mx-auto" />
          <h3 className="text-lg font-bold text-slate-800 dark:text-white">All Clear - No Active SOS Emergencies</h3>
          <p className="text-xs text-slate-400">All passenger rides are operating safely with normal GPS heartbeats.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {sosAlerts.map((sos) => (
            <div
              key={sos.id}
              className={`rounded-3xl p-6 border shadow-xl space-y-4 transition ${
                sos.status === 'active'
                  ? 'bg-rose-50 dark:bg-rose-950/40 border-rose-300 dark:border-rose-800'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 opacity-70'
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-rose-200 dark:border-rose-800/60 pb-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-rose-600 text-white font-black text-[10px] uppercase">
                      {sos.status === 'active' ? 'CRITICAL SOS ALERT' : 'RESOLVED'}
                    </span>
                    <span className="text-xs text-slate-500 font-semibold">{sos.timestamp}</span>
                  </div>
                  <h3 className="font-extrabold text-lg text-slate-900 dark:text-white">
                    Passenger: {sos.passengerName} ({sos.passengerPhone})
                  </h3>
                </div>

                <div className="text-right">
                  <div className="text-xs font-bold text-slate-700 dark:text-slate-300">Captain / Vehicle:</div>
                  <div className="text-sm font-black text-rose-700 dark:text-rose-400">{sos.captainName} ({sos.vehicleNumber})</div>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-center gap-2 text-xs font-extrabold text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-900 p-3 rounded-xl border border-rose-200 dark:border-slate-800">
                <MapPin className="h-4 w-4 text-rose-600 shrink-0" />
                <span>GPS Coordinates: {sos.location.latitude}, {sos.location.longitude} — {sos.location.address}</span>
              </div>

              {/* Emergency Contacts Alerted */}
              <div className="space-y-1">
                <div className="text-xs font-bold text-slate-600 dark:text-slate-400">Notified Emergency Contacts:</div>
                <div className="flex flex-wrap gap-2 text-xs font-medium">
                  {sos.contactsAlerted.map((c, i) => (
                    <span key={i} className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                      {c}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              {sos.status === 'active' && (
                <div className="flex flex-wrap gap-3 pt-2">
                  <a
                    href={`tel:112`}
                    className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-black text-xs flex items-center gap-2 shadow-md shadow-rose-600/30"
                  >
                    <PhoneCall className="h-4 w-4" /> Dial Local Police Hotline (112)
                  </a>
                  <button
                    onClick={() => resolveSosAlert(sos.id)}
                    className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs flex items-center gap-2 shadow-md"
                  >
                    <CheckCircle2 className="h-4 w-4" /> Mark Emergency Resolved
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
