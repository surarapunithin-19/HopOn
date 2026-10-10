import React from 'react';
import { Car, ShieldCheck, Heart, Phone, Mail, MapPin, Instagram, Twitter, Linkedin, Facebook } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const Footer: React.FC = () => {
  const { setActivePortal, openAuthModal } = useAuth();

  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-500 flex items-center justify-center text-white shadow-lg">
                <Car className="h-6 w-6 stroke-[2.2]" />
              </div>
              <span className="text-2xl font-black text-white tracking-tight">HopOn</span>
            </div>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              Next-generation urban mobility platform bringing passengers and verified captains together with real-time GPS tracking, women-only rides, and 24/7 Emergency SOS protection.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a href="#" className="p-2.5 rounded-xl bg-slate-900 hover:bg-blue-600 text-slate-400 hover:text-white transition"><Twitter className="h-4 w-4" /></a>
              <a href="#" className="p-2.5 rounded-xl bg-slate-900 hover:bg-blue-600 text-slate-400 hover:text-white transition"><Facebook className="h-4 w-4" /></a>
              <a href="#" className="p-2.5 rounded-xl bg-slate-900 hover:bg-blue-600 text-slate-400 hover:text-white transition"><Instagram className="h-4 w-4" /></a>
              <a href="#" className="p-2.5 rounded-xl bg-slate-900 hover:bg-blue-600 text-slate-400 hover:text-white transition"><Linkedin className="h-4 w-4" /></a>
            </div>
          </div>

          {/* Passengers */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">Passengers</h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li><button onClick={() => setActivePortal('passenger')} className="hover:text-white transition">Find a Ride</button></li>
              <li><button onClick={() => setActivePortal('passenger')} className="hover:text-white transition">Women Only Safety Shield</button></li>
              <li><button onClick={() => setActivePortal('passenger')} className="hover:text-white transition">Fare Calculator</button></li>
              <li><button onClick={() => setActivePortal('passenger')} className="hover:text-white transition">HopOn Wallet & Cashless</button></li>
              <li><button onClick={() => openAuthModal('passenger', 'login')} className="hover:text-white transition">Passenger Sign In</button></li>
            </ul>
          </div>

          {/* Captains */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">Captains (Drivers)</h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li><button onClick={() => openAuthModal('captain', 'signup')} className="hover:text-white transition">Become a Captain</button></li>
              <li><button onClick={() => setActivePortal('captain')} className="hover:text-white transition">Publish / Offer Ride</button></li>
              <li><button onClick={() => setActivePortal('captain')} className="hover:text-white transition">Weekly Earnings & UPI</button></li>
              <li><button onClick={() => setActivePortal('captain')} className="hover:text-white transition">Verification Process</button></li>
              <li><button onClick={() => openAuthModal('captain', 'login')} className="hover:text-white transition">Captain Portal</button></li>
            </ul>
          </div>

          {/* Emergency Support */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">Safety & Support</h4>
            <div className="space-y-3 text-xs text-slate-400">
              <div className="flex items-center gap-2 text-rose-400 font-bold">
                <Phone className="h-4 w-4 shrink-0" />
                <span>24/7 Helpline: 1800-419-8080</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0 text-slate-500" />
                <span>support@hoponride.com</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 shrink-0 text-slate-500" />
                <span>Cyber Towers, HITEC City, Hyderabad, TS</span>
              </div>
              <div className="pt-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[11px] font-bold">
                  <ShieldCheck className="h-3.5 w-3.5" /> ISO 27001 Safety Certified
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} HopOn Technologies Inc. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-slate-400 transition">Privacy Policy</a>
            <a href="#" className="hover:text-slate-400 transition">Terms of Service</a>
            <a href="#" className="hover:text-slate-400 transition">Security Guidelines</a>
          </div>
        </div>

      </div>
    </footer>
  );
};
