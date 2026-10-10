import React from 'react';
import { ShieldCheck, AlertTriangle, PhoneCall, Lock, UserCheck, Eye } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const SafetySection: React.FC = () => {
  const { openAuthModal } = useAuth();

  return (
    <section className="py-20 bg-slate-950 text-white relative overflow-hidden">
      
      {/* Red/Blue Glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-rose-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20 text-xs font-extrabold uppercase tracking-wider">
              <ShieldCheck className="h-4 w-4" /> Safety First Philosophy
            </div>

            <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              Your Safety is Non-Negotiable. <br />
              <span className="text-rose-500">24/7 Emergency Protection.</span>
            </h2>

            <p className="text-sm text-slate-300 leading-relaxed">
              We built HopOn around comprehensive multi-layered security protocols — from physical document verification to live telemetry tracking and instant Emergency SOS triggers.
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-rose-500/20 text-rose-400 shrink-0">
                  <AlertTriangle className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">One-Touch Emergency SOS Button</h4>
                  <p className="text-xs text-slate-400">Instantly alerts your trusted emergency contacts and dispatches live GPS location to local law enforcement & HopOn Command.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-blue-500/20 text-blue-400 shrink-0">
                  <UserCheck className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">100% Verified Captains & Documents</h4>
                  <p className="text-xs text-slate-400">Driving license, RC Book, selfie checks, and vehicle background verification before any ride gets published.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 shrink-0">
                  <Lock className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Anonymized Contact Masking</h4>
                  <p className="text-xs text-slate-400">Phone numbers are masked automatically during calls and chat to protect rider privacy.</p>
                </div>
              </div>
            </div>

            <div className="pt-4 flex gap-4">
              <button
                onClick={() => openAuthModal('passenger', 'signup')}
                className="px-6 py-3.5 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-lg shadow-rose-600/30 transition"
              >
                Join Safe Commute Today
              </button>
            </div>

          </div>

          {/* Right Visual Safety Card */}
          <div className="relative">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-6">
              
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div className="flex items-center gap-3">
                  <div className="h-3 w-3 bg-rose-500 rounded-full animate-ping" />
                  <span className="text-xs font-bold text-rose-400 uppercase tracking-wider">Live SOS Telemetry Monitor</span>
                </div>
                <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded font-mono">STATUS: ACTIVE</span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex justify-between text-xs text-slate-400">
                  <span>Current Vehicle:</span>
                  <span className="text-white font-bold">Honda City (KA 03 MX 4821)</span>
                </div>
                <div className="flex justify-between text-xs text-slate-400">
                  <span>Rider Status:</span>
                  <span className="text-emerald-400 font-bold">OTP Verified (#4829)</span>
                </div>
                <div className="flex justify-between text-xs text-slate-400">
                  <span>Emergency Contacts:</span>
                  <span className="text-white font-bold">2 Contacts Synced</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-rose-950/40 border border-rose-600/40 text-center space-y-2">
                <AlertTriangle className="h-8 w-8 text-rose-500 mx-auto animate-bounce" />
                <h4 className="text-sm font-extrabold text-white">Emergency Response Hotline</h4>
                <p className="text-xs text-slate-300">Toll-Free Direct Dispatch: <span className="text-rose-400 font-mono font-bold">1800-419-8080</span></p>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
