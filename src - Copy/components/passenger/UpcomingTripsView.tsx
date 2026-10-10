import React, { useState } from 'react';
import { Phone, Shield, Star, Key, MapPin, CheckCircle2, Clock, AlertTriangle } from 'lucide-react';
import { useRide } from '../../context/RideContext';
import { InteractiveMap } from '../map/InteractiveMap';

export const UpcomingTripsView: React.FC = () => {
  const { bookings, activeBooking, activeTripProgress, updateBookingStatus } = useRide();

  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState('Excellent drive! Very safe and polite.');
  const [showRatingModal, setShowRatingModal] = useState(false);

  const active = activeBooking || bookings[0];

  if (!active || active.status === 'completed' || active.status === 'cancelled') {
    return (
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-12 text-center border border-slate-200 dark:border-slate-800 space-y-3">
        <Clock className="h-12 w-12 text-slate-300 mx-auto" />
        <h3 className="text-lg font-bold text-slate-800 dark:text-white">No Active Rides Right Now</h3>
        <p className="text-xs text-slate-400">Search for available rides and book your commute to track live GPS routes here.</p>
      </div>
    );
  }

  const ride = active.rideDetails;

  const handleCompleteRide = () => {
    updateBookingStatus(active.id, 'completed', rating, reviewText);
    setShowRatingModal(false);
  };

  return (
    <div className="space-y-6">
      
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
        
        {/* Header Status Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <span className="flex h-3 w-3 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
            <div>
              <div className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider">
                Trip In Progress ({activeTripProgress}%)
              </div>
              <div className="text-[11px] text-slate-500 font-semibold">Booking ID: #{active.id}</div>
            </div>
          </div>

          {/* OTP Box */}
          <div className="flex items-center gap-2 bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 px-4 py-2 rounded-2xl">
            <Key className="h-4 w-4 text-blue-600" />
            <div>
              <div className="text-[9px] font-bold text-blue-600 uppercase tracking-widest">Share Start OTP</div>
              <div className="text-sm font-black tracking-widest text-blue-700 dark:text-blue-300 font-mono">{active.otp}</div>
            </div>
          </div>
        </div>

        {/* Live GPS Map */}
        <InteractiveMap
          pickup={ride.pickup}
          destination={ride.destination}
          progress={activeTripProgress}
          vehicleType={ride.vehicleType}
          vehicleNumber={ride.vehicleNumber}
          captainName={ride.captainName}
          isLiveTracking={true}
          className="h-[340px] w-full rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-inner"
        />

        {/* Captain & Vehicle Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          
          <div className="flex items-center gap-4 bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-200/60 dark:border-slate-700/60">
            <img src={ride.captainAvatar} alt={ride.captainName} className="h-12 w-12 rounded-2xl object-cover ring-2 ring-blue-500" />
            <div className="space-y-0.5">
              <div className="text-sm font-extrabold text-slate-900 dark:text-white">{ride.captainName}</div>
              <div className="text-xs text-slate-500 font-semibold">{ride.vehicleModel} • <span className="font-mono text-blue-600 font-bold">{ride.vehicleNumber}</span></div>
              <div className="text-[10px] text-amber-500 font-bold">★ {ride.captainRating} Rating</div>
            </div>
          </div>

          <div className="flex items-center justify-between bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-200/60 dark:border-slate-700/60">
            <div>
              <div className="text-xs font-bold text-slate-500">Fare Amount Paid</div>
              <div className="text-xl font-black text-emerald-600 dark:text-emerald-400">₹{active.finalAmount}</div>
              <div className="text-[10px] text-slate-400 capitalize">Method: {active.paymentMethod.toUpperCase()}</div>
            </div>

            <a
              href={`tel:${ride.captainPhone}`}
              className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-extrabold flex items-center gap-1.5 shadow-md shadow-blue-500/20 transition"
            >
              <Phone className="h-3.5 w-3.5" /> Call Captain
            </a>
          </div>

        </div>

        {/* End / Rate Ride Button */}
        <div className="pt-2">
          <button
            onClick={() => setShowRatingModal(true)}
            className="w-full py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-md shadow-emerald-500/20 transition flex items-center justify-center gap-2"
          >
            <CheckCircle2 className="h-4 w-4" /> Destination Reached - Complete & Rate Ride
          </button>
        </div>

      </div>

      {/* Rating & Review Modal */}
      {showRatingModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-md w-full p-6 space-y-4 border border-slate-200 dark:border-slate-800 shadow-2xl text-center">
            <h3 className="text-xl font-black text-slate-900 dark:text-white">How was your ride with {ride.captainName}?</h3>
            
            <div className="flex justify-center gap-2 py-2">
              {[1, 2, 3, 4, 5].map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setRating(s)}
                  className="p-1 transition hover:scale-110"
                >
                  <Star className={`h-8 w-8 ${s <= rating ? 'fill-amber-400 text-amber-400' : 'text-slate-300 dark:text-slate-700'}`} />
                </button>
              ))}
            </div>

            <textarea
              rows={3}
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="Write a feedback review for your captain..."
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-3 text-xs font-medium"
            />

            <button
              onClick={handleCompleteRide}
              className="w-full py-3.5 rounded-2xl bg-blue-600 text-white font-black text-xs shadow-md"
            >
              Submit Rating & Finish
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
