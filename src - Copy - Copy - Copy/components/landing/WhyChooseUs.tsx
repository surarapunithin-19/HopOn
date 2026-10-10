import React from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const comparisons = [
    { feature: 'Average Fare per km', hopon: '₹6 - ₹12 / km', traditional: '₹25 - ₹40 / km' },
    { feature: 'Driver Payout Commission', hopon: '10% Low Platform Fee', traditional: '25% - 30% Heavy Cut' },
    { feature: 'Women Only Matching', hopon: 'Dedicated Safety Filter', traditional: 'Not Available' },
    { feature: '24/7 Emergency SOS', hopon: 'Instant Live Dispatch', traditional: 'Standard Help Desk' },
    { feature: 'Instant UPI Payouts', hopon: 'Zero-Delay Direct UPI', traditional: 'Weekly Delayed Billing' },
  ];

  return (
    <section className="py-20 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <h2 className="text-xs font-extrabold uppercase tracking-widest text-blue-600 dark:text-blue-400">Clear Advantage</h2>
          <p className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            Why Choose HopOn?
          </p>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            See how HopOn compares against standard expensive cab services.
          </p>
        </div>

        <div className="max-w-4xl mx-auto overflow-hidden rounded-3xl border border-slate-200 dark:border-slate-800 shadow-lg bg-white dark:bg-slate-900">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
              <tr>
                <th className="p-4 font-extrabold text-slate-900 dark:text-white">Feature / Benefit</th>
                <th className="p-4 font-extrabold text-blue-600 dark:text-blue-400 bg-blue-50/50 dark:bg-blue-900/30">HopOn Carpool & Bike</th>
                <th className="p-4 font-extrabold text-slate-400">Traditional Cabs</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {comparisons.map((c, i) => (
                <tr key={i} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                  <td className="p-4 font-bold text-slate-800 dark:text-slate-200">{c.feature}</td>
                  <td className="p-4 font-extrabold text-emerald-600 dark:text-emerald-400 bg-blue-50/30 dark:bg-blue-900/10 flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />
                    {c.hopon}
                  </td>
                  <td className="p-4 text-slate-500 dark:text-slate-400">
                    {c.traditional}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </section>
  );
};
