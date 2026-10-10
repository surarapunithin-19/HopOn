import React, { useState } from 'react';
import { Shield, Car, Bike, UserCheck, Bell, Wallet, LogOut, Menu, X, AlertTriangle, Sparkles, ChevronDown } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useRide } from '../../context/RideContext';

interface NavbarProps {
  onOpenSOS: () => void;
  onOpenNotifications: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenSOS, onOpenNotifications }) => {
  const { role, user, isAuthenticated, activePortal, setActivePortal, openAuthModal, openPassengerLogin, openCaptainLogin, logout, switchDemoUser } = useAuth();
  const { notifications } = useRide();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [demoDropdownOpen, setDemoDropdownOpen] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 dark:border-slate-800/80 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActivePortal('landing')}>
          <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-500 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
            <Car className="h-6 w-6 stroke-[2.2]" />
          </div>
          <div>
            <span className="text-xl font-black tracking-tight text-slate-900 dark:text-white flex items-center gap-1.5">
              HopOn <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300 font-bold uppercase tracking-wider">Ride</span>
            </span>
          </div>
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-5 text-xs font-bold text-slate-600 dark:text-slate-300">
          <button
            onClick={() => setActivePortal('landing')}
            className={`hover:text-blue-600 dark:hover:text-blue-400 transition ${activePortal === 'landing' ? 'text-blue-600 dark:text-blue-400 font-extrabold' : ''}`}
          >
            Home
          </button>
          
          <button
            onClick={() => {
              if (!isAuthenticated) openPassengerLogin();
              else setActivePortal('passenger');
            }}
            className={`hover:text-blue-600 dark:hover:text-blue-400 transition ${activePortal === 'passenger' ? 'text-blue-600 dark:text-blue-400 font-extrabold' : ''}`}
          >
            Find a Ride
          </button>

          <button
            onClick={() => {
              if (!isAuthenticated) openCaptainLogin();
              else setActivePortal('captain');
            }}
            className={`hover:text-blue-600 dark:hover:text-blue-400 transition flex items-center gap-1 ${activePortal === 'captain' ? 'text-blue-600 dark:text-blue-400 font-extrabold' : ''}`}
          >
            Drive with Us
            <span className="text-[10px] bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-300 px-1.5 py-0.5 rounded-full font-extrabold">Earn $</span>
          </button>

          <button
            onClick={openPassengerLogin}
            className={`px-2.5 py-1 rounded-lg transition ${activePortal === 'passenger-login' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300 font-extrabold' : 'hover:bg-slate-100 dark:hover:bg-slate-800'}`}
          >
            Passenger Login
          </button>

          <button
            onClick={openCaptainLogin}
            className={`px-2.5 py-1 rounded-lg transition ${activePortal === 'captain-login' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-300 font-extrabold' : 'hover:bg-slate-100 dark:hover:bg-slate-800'}`}
          >
            Captain Login
          </button>

          <button
            onClick={() => setActivePortal('admin')}
            className={`hover:text-blue-600 dark:hover:text-blue-400 transition ${activePortal === 'admin' ? 'text-blue-600 dark:text-blue-400 font-extrabold' : ''}`}
          >
            Admin Portal
          </button>
        </nav>

        {/* Action Controls & User Profile */}
        <div className="hidden md:flex items-center gap-3">

          {/* Quick Portal / Demo Switcher Pill */}
          <div className="relative">
            <button
              onClick={() => setDemoDropdownOpen(!demoDropdownOpen)}
              className="px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200 flex items-center gap-1.5 border border-slate-200 dark:border-slate-700 transition"
            >
              <Sparkles className="h-3.5 w-3.5 text-amber-500" />
              Role: <span className="capitalize text-blue-600 dark:text-blue-400 font-extrabold">{role}</span>
              <ChevronDown className="h-3 w-3" />
            </button>

            {demoDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-900 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-800 py-1 z-50 animate-in fade-in zoom-in-95">
                <div className="px-3 py-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Switch Portal Persona</div>
                <button
                  onClick={() => { switchDemoUser('passenger'); setDemoDropdownOpen(false); }}
                  className="w-full text-left px-3 py-2 text-xs font-semibold hover:bg-blue-50 dark:hover:bg-blue-900/30 flex items-center justify-between text-slate-700 dark:text-slate-200"
                >
                  Passenger Portal {role === 'passenger' && '✓'}
                </button>
                <button
                  onClick={() => { switchDemoUser('captain'); setDemoDropdownOpen(false); }}
                  className="w-full text-left px-3 py-2 text-xs font-semibold hover:bg-blue-50 dark:hover:bg-blue-900/30 flex items-center justify-between text-slate-700 dark:text-slate-200"
                >
                  Captain (Driver) Portal {role === 'captain' && '✓'}
                </button>
                <button
                  onClick={() => { switchDemoUser('admin'); setDemoDropdownOpen(false); }}
                  className="w-full text-left px-3 py-2 text-xs font-semibold hover:bg-blue-50 dark:hover:bg-blue-900/30 flex items-center justify-between text-slate-700 dark:text-slate-200"
                >
                  Admin Control Center {role === 'admin' && '✓'}
                </button>
              </div>
            )}
          </div>

          {/* Emergency SOS Quick Trigger */}
          <button
            onClick={onOpenSOS}
            className="px-3.5 py-1.5 rounded-full bg-rose-600 hover:bg-rose-700 text-white text-xs font-extrabold flex items-center gap-1.5 shadow-md shadow-rose-500/20 transition active:scale-95 animate-pulse"
          >
            <AlertTriangle className="h-3.5 w-3.5 fill-white" />
            SOS
          </button>

          {/* Notification Icon */}
          <button
            onClick={onOpenNotifications}
            className="relative p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            <Bell className="h-5 w-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 h-4 w-4 bg-rose-500 text-white text-[10px] font-black rounded-full flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Auth State Button */}
          {isAuthenticated ? (
            <div className="flex items-center gap-2 pl-2 border-l border-slate-200 dark:border-slate-800">
              <img
                src={user?.avatar || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150'}
                alt={user?.name}
                referrerPolicy="no-referrer"
                className="h-8 w-8 rounded-full object-cover ring-2 ring-blue-500"
              />
              <div className="text-left hidden lg:block">
                <div className="text-xs font-bold text-slate-900 dark:text-white leading-tight">{user?.name}</div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400 capitalize">{role}</div>
              </div>
              <button
                onClick={logout}
                title="Log out"
                className="p-1.5 text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 transition"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={openPassengerLogin}
                className="px-3.5 py-2 rounded-xl text-xs font-bold bg-blue-50 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 hover:bg-blue-100 transition"
              >
                Passenger Login
              </button>
              <button
                onClick={openCaptainLogin}
                className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-500/20 transition"
              >
                Captain Login
              </button>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={onOpenSOS}
            className="px-2.5 py-1 rounded-full bg-rose-600 text-white text-xs font-bold flex items-center gap-1 animate-pulse"
          >
            <AlertTriangle className="h-3 w-3" /> SOS
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-700 dark:text-slate-200"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 pt-3 pb-6 space-y-3">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <span className="text-xs font-bold text-slate-400 uppercase">Switch Active Role</span>
            <div className="flex gap-1">
              <button onClick={() => { switchDemoUser('passenger'); setMobileMenuOpen(false); }} className={`px-2 py-1 rounded text-xs font-bold ${role === 'passenger' ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-slate-800'}`}>Rider</button>
              <button onClick={() => { switchDemoUser('captain'); setMobileMenuOpen(false); }} className={`px-2 py-1 rounded text-xs font-bold ${role === 'captain' ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-slate-800'}`}>Captain</button>
              <button onClick={() => { switchDemoUser('admin'); setMobileMenuOpen(false); }} className={`px-2 py-1 rounded text-xs font-bold ${role === 'admin' ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-slate-800'}`}>Admin</button>
            </div>
          </div>

          <button onClick={() => { setActivePortal('landing'); setMobileMenuOpen(false); }} className="block w-full text-left py-2 font-semibold text-slate-800 dark:text-slate-200">Home</button>
          <button onClick={() => { openPassengerLogin(); setMobileMenuOpen(false); }} className="block w-full text-left py-2 font-extrabold text-blue-600 dark:text-blue-400">Passenger Login Portal</button>
          <button onClick={() => { openCaptainLogin(); setMobileMenuOpen(false); }} className="block w-full text-left py-2 font-extrabold text-emerald-600 dark:text-emerald-400">Captain Login Portal</button>
          <button onClick={() => { setActivePortal('passenger'); setMobileMenuOpen(false); }} className="block w-full text-left py-2 font-semibold text-slate-800 dark:text-slate-200">Passenger Dashboard</button>
          <button onClick={() => { setActivePortal('captain'); setMobileMenuOpen(false); }} className="block w-full text-left py-2 font-semibold text-slate-800 dark:text-slate-200">Captain Portal</button>
          <button onClick={() => { setActivePortal('admin'); setMobileMenuOpen(false); }} className="block w-full text-left py-2 font-semibold text-slate-800 dark:text-slate-200">Admin Control Center</button>
          
          <div className="pt-2 flex flex-col gap-2">
            {!isAuthenticated ? (
              <>
                <button onClick={() => { openPassengerLogin(); setMobileMenuOpen(false); }} className="w-full py-2.5 rounded-xl border border-blue-500 text-blue-600 text-xs font-bold text-center">Passenger Sign In</button>
                <button onClick={() => { openCaptainLogin(); setMobileMenuOpen(false); }} className="w-full py-2.5 rounded-xl bg-emerald-600 text-white text-xs font-bold text-center">Captain Sign In</button>
              </>
            ) : (
              <button onClick={logout} className="w-full py-2 rounded-xl bg-rose-50 text-rose-600 text-xs font-bold">Logout ({user?.name})</button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
