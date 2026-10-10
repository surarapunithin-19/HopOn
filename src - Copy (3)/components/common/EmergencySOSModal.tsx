import React, { useState } from 'react';
import { AlertTriangle, ShieldAlert, PhoneCall, CheckCircle2, MapPin, X, Users } from 'lucide-react';
import { useRide } from '../../context/RideContext';
import { useAuth } from '../../context/AuthContext';

interface EmergencySOSModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EmergencySOSModal: React.FC<EmergencySOSModalProps> = ({ isOpen, onClose }) => {
  const { triggerSOS, activeBooking } = useRide();
  const { passengerProfile } = useAuth();
  const [triggered, setTriggered] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleConfirmSOS = async () => {
    setLoading(true);
    await triggerSOS(activeBooking?.id);
    setLoading(false);
    setTriggered(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
      <div className="bg-slate-900 border border-rose-600/40 rounded-3xl max-w-md w-full p-6 text-white shadow-2xl relative overflow-hidden">
        
        {/* Glow accent */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-rose-600/30 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full bg-slate-800/80 transition"
        >
          <X className="h-5 w-5" />
        </button>

        {!triggered ? (
          <div className="text-center space-y-4 pt-2">
            <div className="mx-auto w-20 h-20 bg-rose-600/20 rounded-full flex items-center justify-center border-2 border-rose-500 animate-pulse">
              <AlertTriangle className="h-10 w-10 text-rose-500" />
            </div>

            <div className="space-y-1">
              <h3 className="text-2xl font-black text-rose-500">EMERGENCY SOS</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Pressing this will instantly broadcast your live GPS coordinates, captain details, and trip route to your emergency contacts & HopOn Incident Response Team.
              </p>
            </div>

            {/* Emergency Contacts List Preview */}
            <div className="bg-slate-800/80 rounded-2xl p-3.5 border border-slate-700/60 text-left space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
                <Users className="h-3.5 w-3.5 text-blue-400" /> Contacts To Alert ({passengerProfile.emergencyContacts.length})
              </div>
              <div className="space-y-1">
                {passengerProfile.emergencyContacts.map(c => (
                  <div key={c.id} className="text-xs flex justify-between font-medium text-slate-200">
                    <span>{c.name}</span>
                    <span className="text-rose-400 font-mono">{c.phone}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Current Trip Location Preview */}
            {activeBooking && (
              <div className="bg-slate-800/80 rounded-2xl p-3 text-left flex items-start gap-2.5 border border-slate-700/60">
                <MapPin className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                <div className="text-xs">
                  <div className="font-bold text-slate-300">Active Ride Location</div>
                  <div className="text-slate-400 truncate">{activeBooking.rideDetails.pickup.address}</div>
                </div>
              </div>
            )}

            {/* SOS Dispatch Action */}
            <button
              onClick={handleConfirmSOS}
              disabled={loading}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-700 hover:to-red-700 text-white font-extrabold text-base shadow-lg shadow-rose-600/40 transition active:scale-95 flex items-center justify-center gap-2"
            >
              {loading ? 'DISPATCHING EMERGENCY ALERT...' : 'TRIGGER SOS NOW'}
            </button>

            {/* Police Helpline shortcut */}
            <a
              href="tel:112"
              className="inline-flex items-center gap-2 text-xs text-rose-400 hover:underline font-bold pt-1"
            >
              <PhoneCall className="h-3.5 w-3.5" /> Direct Call Police Helpline (112)
            </a>
          </div>
        ) : (
          <div className="text-center space-y-5 py-4 animate-in zoom-in-95">
            <div className="mx-auto w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center border-2 border-emerald-500">
              <CheckCircle2 className="h-10 w-10 text-emerald-400" />
            </div>

            <div className="space-y-1">
              <h3 className="text-2xl font-black text-emerald-400">EMERGENCY SOS DISPATCHED</h3>
              <p className="text-xs text-slate-300">
                Live location broadcast is active. Our 24/7 Security Operations Room is monitoring your vehicle position.
              </p>
            </div>

            <div className="bg-emerald-950/40 border border-emerald-500/30 p-4 rounded-2xl space-y-2 text-xs text-left">
              <div className="flex items-center justify-between font-bold text-emerald-300">
                <span>SMS Alerts Sent:</span>
                <span className="text-white">SUCCESS ({passengerProfile.emergencyContacts.length})</span>
              </div>
              <div className="flex items-center justify-between font-bold text-emerald-300">
                <span>Admin Dispatch Log:</span>
                <span className="text-white">HIGH PRIORITY TICKET #SOS-892</span>
              </div>
              <div className="flex items-center justify-between font-bold text-emerald-300">
                <span>Live GPS Signal:</span>
                <span className="text-emerald-400 font-bold animate-pulse">● TRANSMITTING</span>
              </div>
            </div>

            <button
              onClick={() => { setTriggered(false); onClose(); }}
              className="w-full py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm transition"
            >
              Close SOS Window
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
