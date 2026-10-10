import React from 'react';
import { Star, Quote } from 'lucide-react';

export const Testimonials: React.FC = () => {
  const reviews = [
    {
      name: 'Priyanka Sen',
      role: 'IT Professional (Indiranagar)',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      comment: 'The Women-Only ride shield gives me complete peace of mind during late evening airport rides. The captains are incredibly polite and punctual.',
      rating: 5
    },
    {
      name: 'Rohan Mehra',
      role: 'Captain (Honda City)',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      comment: 'I offer rides during my daily office commute from Koramangala to Whitefield. HopOn covers my monthly fuel costs effortlessly with instant UPI payouts!',
      rating: 5
    },
    {
      name: 'Siddharth Nair',
      role: 'Daily Commuter',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
      comment: 'Replaced expensive solo cabs with HopOn Bike Taxis. I save over ₹4,000 every month and reach office 20 minutes faster!',
      rating: 5
    }
  ];

  return (
    <section className="py-20 bg-slate-50 dark:bg-slate-950/80 border-t border-slate-200/60 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <h2 className="text-xs font-extrabold uppercase tracking-widest text-blue-600 dark:text-blue-400">Community Loved</h2>
          <p className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            Loved by 100,000+ Daily Riders
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((r, i) => (
            <div key={i} className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md space-y-4 relative">
              <Quote className="h-8 w-8 text-blue-500/20 absolute top-4 right-4" />
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(r.rating)].map((_, idx) => (
                  <Star key={idx} className="h-4 w-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed italic">"{r.comment}"</p>
              <div className="flex items-center gap-3 pt-2">
                <img src={r.avatar} alt={r.name} className="h-10 w-10 rounded-full object-cover ring-2 ring-blue-500" />
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">{r.name}</h4>
                  <p className="text-[10px] text-slate-400">{r.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
