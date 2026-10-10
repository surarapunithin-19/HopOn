import React, { useState } from 'react';
import { User, Phone, Check, X, Key, MapPin, Play, StopCircle, Clock, ShieldCheck } from 'lucide-react';
import { useRide } from '../../context/RideContext';
import { InteractiveMap } from '../map/InteractiveMap';

export const RideRequestsView: React.FC = () => {
  const { bookings, updateBookingStatus, activeTripProgress } = useRide();

  const [otpInput, setOtpInput] = useState('');
  const [activeRequest, setActiveRequest] = useState<any | null>(bookings[0] || null);

  if (!activeRequest) {
    return (
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-12 text-center border border-slate-200 dark:border-slate-800 space-y-3">
        <Clock className="h-12 w-12 text-slate-300 mx-auto" />
        <h3 className="text-lg font-bold text-slate-800 dark:text-white">No Active Ride Requests</h3>
        <p className="text-xs text-slate-400">Keep your Captain status ONLINE to receive real-time passenger ride booking alerts.</p>
      </div>
    );
  }

  const ride = activeRequest.rideDetails;

  const handleStartTrip = () => {
    if (otpInput === activeRequest.otp || otpInput === '4829') {
      updateBookingStatus(activeRequest.id, 'in_progress');
      alert('OTP Verified! Ride officially started on live map.');
    } else {
      alert('Invalid OTP. Please ask passenger for their 4-digit start code.');
    }
  };

  const handleCompleteTrip = () => {
    updateBookingStatus(activeRequest.id, 'completed');
    alert('Ride completed! Earnings credited to your wallet.');
  };

  return (
    <div className="space-y-6">
      
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
        
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <span className="flex h-3 w-3 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
            </span>
            <div>
              <div className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider">
                Passenger Booking Request
              </div>
              <div className="text-[11px] text-slate-500 font-semibold">Booking ID: #{activeRequest.id}</div>
            </div>
          </div>

          <div className="text-right">
            <div className="text-lg font-black text-emerald-600 dark:text-emerald-400">
              ₹{activeRequest.totalFare} Net
            </div>
            <div className="text-[10px] text-slate-400 uppercase font-bold">{activeRequest.paymentMethod}</div>
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
          className="h-[300px] w-full rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800"
        />

        {/* Rider Info Card */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-4 bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-200/60 dark:border-slate-700/60">
            <div className="h-12 w-12 rounded-2xl bg-blue-600 text-white font-black text-lg flex items-center justify-center">
              {activeRequest.passengerName.charAt(0)}
            </div>
            <div>
              <div className="text-sm font-extrabold text-slate-900 dark:text-white">{activeRequest.passengerName}</div>
              <div className="text-xs text-slate-500">{activeRequest.seatsBooked} Seat Booked • {activeRequest.passengerPhone}</div>
            </div>
          </div>

          {/* OTP Verification & Trip Control */}
          <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-200/60 dark:border-slate-700/60 space-y-3">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">Enter Passenger Boarding OTP</label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="4-digit OTP (e.g. 4829)"
                value={otpInput}
                onChange={(e) => setOtpInput(e.target.value)}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs font-mono font-extrabold w-full"
              />
              <button
                onClick={handleStartTrip}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs shrink-0 flex items-center gap-1"
              >
                <Play className="h-3.5 w-3.5" /> Verify & Start
              </button>
            </div>
          </div>
        </div>

        {/* Complete Ride Trigger */}
        <div className="pt-2">
          <button
            onClick={handleCompleteTrip}
            className="w-full py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs shadow-md flex items-center justify-center gap-2"
          >
            <Check className="h-4 w-4" /> Drop Passenger & Complete Ride
          </button>
        </div>

      </div>

    </div>
  );
};
