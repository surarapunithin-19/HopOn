import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How does HopOn ride matching work?',
      a: 'When a captain publishes their planned route, our algorithm checks passenger pickup and destination points along the way, finding the most efficient ride with available seats.'
    },
    {
      q: 'Is driver verification compulsory before publishing a ride?',
      a: 'Yes! Every captain must upload their valid Driving License, RC Book, Insurance copy, and a real-time Selfie verification. Our Admin team reviews each document.'
    },
    {
      q: 'What is the Women-Only Ride option?',
      a: 'Women commuters can enable the Women-Only toggle to match exclusively with verified female captains for added comfort and security.'
    },
    {
      q: 'How do payments work for rides?',
      a: 'Passengers can pay seamlessly using UPI apps (GPay, PhonePe), HopOn Wallet, or Cash directly to the captain upon reaching destination.'
    },
    {
      q: 'What happens if I press the Emergency SOS button?',
      a: 'The system instantly broadcasts your live GPS coordinates, vehicle registration number, and route data to your pre-configured emergency contacts and the 24/7 HopOn Incident Response Desk.'
    }
  ];

  return (
    <section className="py-20 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12 space-y-3">
          <h2 className="text-xs font-extrabold uppercase tracking-widest text-blue-600 dark:text-blue-400">Got Questions?</h2>
          <p className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            Frequently Asked Questions
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden transition"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full p-5 text-left font-extrabold text-sm text-slate-900 dark:text-white flex items-center justify-between bg-slate-50/50 dark:bg-slate-800/40 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                >
                  <span>{faq.q}</span>
                  {isOpen ? <ChevronUp className="h-5 w-5 text-blue-600" /> : <ChevronDown className="h-5 w-5 text-slate-400" />}
                </button>
                {isOpen && (
                  <div className="p-5 text-xs text-slate-600 dark:text-slate-300 border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
