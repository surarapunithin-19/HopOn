import React from 'react';
import { Shield, Zap, CreditCard, Clock, Heart, Users, CheckCircle2 } from 'lucide-react';

export const Features: React.FC = () => {
  const featureList = [
    {
      icon: <Zap className="h-6 w-6 text-blue-600 dark:text-blue-400" />,
      title: 'Smart Instant Matching',
      desc: 'Our real-time algorithm matches your exact pickup route with verified captains driving along the same trajectory.'
    },
    {
      icon: <Shield className="h-6 w-6 text-rose-600 dark:text-rose-400" />,
      title: 'Women Only Shield',
      desc: 'Dedicated safety toggle for female commuters to pair exclusively with verified female captains.'
    },
    {
      icon: <CreditCard className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />,
      title: 'UPI & Seamless Cashless',
      desc: 'Pay instantly via GPay, PhonePe, HopOn Wallet, or Cash directly to the captain upon reaching your destination.'
    },
    {
      icon: <Clock className="h-6 w-6 text-amber-600 dark:text-amber-400" />,
      title: 'Live GPS Tracking & ETA',
      desc: 'Share live GPS route movement with friends or family with real-time speed and arrival estimation.'
    },
    {
      icon: <Users className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />,
      title: 'Verified Captain Network',
      desc: 'Every captain undergoes strict government ID checks, driving license validation, and vehicle inspection.'
    },
    {
      icon: <Heart className="h-6 w-6 text-cyan-600 dark:text-cyan-400" />,
      title: 'Eco-Friendly Mobility',
      desc: 'Reduce urban traffic congestion and carbon footprint by filling empty seats in daily office commutes.'
    }
  ];

  return (
    <section className="py-20 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <h2 className="text-xs font-extrabold uppercase tracking-widest text-blue-600 dark:text-blue-400">Why HopOn Works Best</h2>
          <p className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            Engineered for Safety, Speed, & Economy
          </p>
          <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
            Everything you need for seamless city travel in one unified platform.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featureList.map((f, i) => (
            <div
              key={i}
              className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 hover:shadow-xl hover:-translate-y-1 transition duration-300 space-y-3"
            >
              <div className="p-3 rounded-2xl bg-white dark:bg-slate-800 w-fit shadow-md">
                {f.icon}
              </div>
              <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">{f.title}</h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
