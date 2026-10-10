import React, { useState } from 'react';
import { Search, MapPin, CheckCircle, ShieldCheck, Car, Key, CreditCard, Sparkles } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'passenger' | 'captain'>('passenger');

  const passengerSteps = [
    {
      step: '01',
      title: 'Search Your Route',
      desc: 'Enter your pickup point, destination, preferred vehicle (bike or car), and seat requirement.'
    },
    {
      step: '02',
      title: 'Choose Captain & Book',
      desc: 'Compare ratings, vehicle details, departure times, and seat pricing. Click Book Ride.'
    },
    {
      step: '03',
      title: 'Board with OTP',
      desc: 'Track captain live location on map. Share start OTP upon boarding the vehicle.'
    },
    {
      step: '04',
      title: 'Pay & Rate',
      desc: 'Complete trip smoothly. Pay via UPI, Wallet, or Cash and rate your captain experience.'
    }
  ];

  const captainSteps = [
    {
      step: '01',
      title: 'Register & Upload Docs',
      desc: 'Sign up with vehicle details (Bike/Car) and upload driving license & RC book for verification.'
    },
    {
      step: '02',
      title: 'Offer a Ride',
      desc: 'Publish your commute route, departure time, available seats, and price per seat.'
    },
    {
      step: '03',
      title: 'Accept Requests & Start',
      desc: 'Receive passenger booking alerts, verify rider OTP, and start the ride on the live map.'
    },
    {
      step: '04',
      title: 'Instant Earnings Payout',
      desc: 'Collect fare via UPI or Cash. Transfer weekly earnings instantly to your bank account.'
    }
  ];

  const currentSteps = activeTab === 'passenger' ? passengerSteps : captainSteps;

  return (
    <section className="py-20 bg-slate-50 dark:bg-slate-950/60 border-t border-slate-200/60 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-4">
          <h2 className="text-xs font-extrabold uppercase tracking-widest text-blue-600 dark:text-blue-400">Step by Step Guide</h2>
          <p className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            How HopOn Works
          </p>

          {/* Tab Switcher */}
          <div className="inline-flex p-1 rounded-2xl bg-slate-200 dark:bg-slate-800">
            <button
              onClick={() => setActiveTab('passenger')}
              className={`px-6 py-2.5 rounded-xl text-xs font-extrabold transition ${
                activeTab === 'passenger'
                  ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-md'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              For Passengers
            </button>
            <button
              onClick={() => setActiveTab('captain')}
              className={`px-6 py-2.5 rounded-xl text-xs font-extrabold transition ${
                activeTab === 'captain'
                  ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-md'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              For Captains (Drivers)
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {currentSteps.map((s, idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm relative space-y-3 hover:border-blue-500/50 transition"
            >
              <div className="text-3xl font-black text-blue-600 dark:text-blue-400 font-mono opacity-80">
                {s.step}
              </div>
              <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">{s.title}</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
