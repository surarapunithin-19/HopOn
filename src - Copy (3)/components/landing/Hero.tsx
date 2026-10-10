import React, { useState } from 'react';
import { Search, MapPin, Calendar, Clock, Car, Bike, Shield, Users, ArrowRight, Sparkles } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useRide } from '../../context/RideContext';
import { INITIAL_LOCATIONS } from '../../data/mockData';

export const Hero: React.FC = () => {
  const { isAuthenticated, openPassengerLogin, setActivePortal } = useAuth();
  const { searchRides } = useRide();

  const [pickup, setPickup] = useState(INITIAL_LOCATIONS[0].address);
  const [destination, setDestination] = useState(INITIAL_LOCATIONS[1].address);
  const [date, setDate] = useState('Today');
  const [time, setTime] = useState('17:30');
  const [vehicleType, setVehicleType] = useState<'car' | 'bike'>('car');
  const [seats, setSeats] = useState(1);
  const [womenOnly, setWomenOnly] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      openPassengerLogin();
    } else {
      setActivePortal('passenger');
    }
  };

  return (
    <section className="relative pt-8 pb-20 md:pt-16 md:pb-28 overflow-hidden bg-gradient-to-b from-blue-50/50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      
      {/* Background decoration elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-r from-blue-400/10 via-indigo-500/10 to-cyan-400/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-10">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 text-xs font-extrabold tracking-wide uppercase border border-blue-200 dark:border-blue-800">
            <Sparkles className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
            Next-Gen Urban Carpooling & Bike Taxis
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.1]">
            Commute Smarter. <br />
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 bg-clip-text text-transparent">
              HopOn Your Ride.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 font-medium leading-relaxed max-w-2xl mx-auto">
            Connect with verified captains heading your way. Enjoy affordable daily rides, instant UPI payments, and 24/7 Emergency SOS protection.
          </p>

        </div>

        {/* Floating Search Ride Card */}
        <div className="max-w-4xl mx-auto bg-white dark:bg-slate-900 rounded-3xl p-6 md:p-8 border border-slate-200 dark:border-slate-800 shadow-2xl shadow-blue-500/5">
          
          {/* Tabs: Vehicle Choice */}
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-5 mb-6">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setVehicleType('car')}
                className={`px-5 py-2.5 rounded-2xl text-xs font-extrabold flex items-center gap-2 transition ${
                  vehicleType === 'car'
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                }`}
              >
                <Car className="h-4 w-4" /> Car Pool
              </button>
              <button
                type="button"
                onClick={() => setVehicleType('bike')}
                className={`px-5 py-2.5 rounded-2xl text-xs font-extrabold flex items-center gap-2 transition ${
                  vehicleType === 'bike'
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                }`}
              >
                <Bike className="h-4 w-4" /> Bike Taxi
              </button>
            </div>

            {/* Women Only Shield Toggle */}
            <label className="flex items-center gap-2 cursor-pointer bg-slate-50 dark:bg-slate-800 px-3.5 py-1.5 rounded-full border border-slate-200 dark:border-slate-700">
              <Shield className={`h-4 w-4 ${womenOnly ? 'text-rose-500 fill-rose-500' : 'text-slate-400'}`} />
              <span className="text-xs font-bold text-slate-700 dark:text-slate-200">Women Only</span>
              <input
                type="checkbox"
                checked={womenOnly}
                onChange={(e) => setWomenOnly(e.target.checked)}
                className="sr-only"
              />
              <div className={`w-8 h-4 rounded-full transition-colors relative ${womenOnly ? 'bg-rose-500' : 'bg-slate-300 dark:bg-slate-700'}`}>
                <div className={`w-3 h-3 rounded-full bg-white absolute top-0.5 transition-transform ${womenOnly ? 'translate-x-4' : 'translate-x-0.5'}`} />
              </div>
            </label>
          </div>

          {/* Form Inputs */}
          <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Pickup */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5 text-emerald-500" /> Pickup Location
              </label>
              <select
                value={pickup}
                onChange={(e) => setPickup(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl px-3.5 py-3 text-xs font-bold text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {INITIAL_LOCATIONS.map(loc => (
                  <option key={loc.address} value={loc.address}>{loc.address}</option>
                ))}
              </select>
            </div>

            {/* Destination */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5 text-rose-500" /> Destination
              </label>
              <select
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl px-3.5 py-3 text-xs font-bold text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {INITIAL_LOCATIONS.map(loc => (
                  <option key={loc.address} value={loc.address}>{loc.address}</option>
                ))}
              </select>
            </div>

            {/* Date & Time */}
            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5 text-blue-500" /> Date
                </label>
                <select
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl px-2.5 py-3 text-xs font-bold text-slate-800 dark:text-slate-100 focus:outline-none"
                >
                  <option value="Today">Today</option>
                  <option value="Tomorrow">Tomorrow</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                  <Users className="h-3.5 w-3.5 text-indigo-500" /> Seats
                </label>
                <select
                  value={seats}
                  onChange={(e) => setSeats(Number(e.target.value))}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl px-2.5 py-3 text-xs font-bold text-slate-800 dark:text-slate-100 focus:outline-none"
                >
                  <option value={1}>1 Seat</option>
                  <option value={2}>2 Seats</option>
                  <option value={3}>3 Seats</option>
                </select>
              </div>
            </div>

            {/* Search Submit */}
            <div className="flex items-end">
              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-black text-sm shadow-lg shadow-blue-500/25 transition active:scale-95 flex items-center justify-center gap-2"
              >
                <Search className="h-4 w-4" />
                Find Rides Now
              </button>
            </div>

          </form>

        </div>

        {/* Metrics Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mt-12 text-center">
          <div className="p-4 rounded-2xl bg-white/60 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800/60 backdrop-blur-xs">
            <div className="text-2xl font-black text-blue-600 dark:text-blue-400">0</div>
            <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">Completed Rides</div>
          </div>
          <div className="p-4 rounded-2xl bg-white/60 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800/60 backdrop-blur-xs">
            <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400">0</div>
            <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">Verified Captains</div>
          </div>
          <div className="p-4 rounded-2xl bg-white/60 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800/60 backdrop-blur-xs">
            <div className="text-2xl font-black text-indigo-600 dark:text-indigo-400">0</div>
            <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">Average Rating</div>
          </div>
          <div className="p-4 rounded-2xl bg-white/60 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800/60 backdrop-blur-xs">
            <div className="text-2xl font-black text-rose-600 dark:text-rose-400">0</div>
            <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">Emergency Protected</div>
          </div>
        </div>

      </div>
    </section>
  );
};
