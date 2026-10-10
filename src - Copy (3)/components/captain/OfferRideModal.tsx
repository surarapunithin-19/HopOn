import React, { useState } from 'react';
import { PlusCircle, MapPin, Clock, Car, Bike, DollarSign, Shield, CheckCircle2 } from 'lucide-react';
import { useRide } from '../../context/RideContext';
import { useAuth } from '../../context/AuthContext';
import { INITIAL_LOCATIONS } from '../../data/mockData';

interface OfferRideModalProps {
  onPublished?: () => void;
}

export const OfferRideModal: React.FC<OfferRideModalProps> = ({ onPublished }) => {
  const { offerRide } = useRide();
  const { captainProfile } = useAuth();

  const [pickup, setPickup] = useState(INITIAL_LOCATIONS[0].address);
  const [destination, setDestination] = useState(INITIAL_LOCATIONS[1].address);
  const [departureTime, setDepartureTime] = useState('18:00');
  const [vehicleType, setVehicleType] = useState<'car' | 'bike'>(captainProfile.vehicleType || 'car');
  const [totalSeats, setTotalSeats] = useState(vehicleType === 'bike' ? 1 : 3);
  const [pricePerSeat, setPricePerSeat] = useState(140);
  const [acceptUpi, setAcceptUpi] = useState(true);
  const [acceptCash, setAcceptCash] = useState(true);
  const [isWomenOnly, setIsWomenOnly] = useState(false);
  const [loading, setLoading] = useState(false);
  const [published, setPublished] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const pickupObj = INITIAL_LOCATIONS.find(l => l.address === pickup) || INITIAL_LOCATIONS[0];
    const destObj = INITIAL_LOCATIONS.find(l => l.address === destination) || INITIAL_LOCATIONS[1];

    await offerRide({
      captainId: captainProfile.id,
      captainName: captainProfile.name,
      captainAvatar: captainProfile.avatar,
      captainRating: captainProfile.rating || 4.9,
      captainPhone: captainProfile.phone,
      vehicleType,
      vehicleModel: captainProfile.vehicleModel,
      vehicleNumber: captainProfile.vehicleNumber,
      pickup: pickupObj,
      destination: destObj,
      departureTime,
      date: 'Today',
      pricePerSeat,
      totalSeats,
      isWomenOnly,
      paymentMethods: [acceptUpi ? 'upi' : null, acceptCash ? 'cash' : null].filter(Boolean) as any
    });

    setLoading(false);
    setPublished(true);
    if (onPublished) onPublished();
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 md:p-8 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6 max-w-2xl">
      
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
        <div>
          <h2 className="text-xl font-black text-slate-900 dark:text-white">Offer / Publish a Ride</h2>
          <p className="text-xs text-slate-400">Share empty seats during your regular commute and cover fuel costs</p>
        </div>
        <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-300 text-xs font-bold">
          Captain Active
        </span>
      </div>

      {published ? (
        <div className="text-center py-10 space-y-4">
          <CheckCircle2 className="h-16 w-16 text-emerald-500 mx-auto" />
          <h3 className="text-2xl font-black text-slate-900 dark:text-white">Ride Published Successfully!</h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Your ride from <span className="font-bold text-slate-700 dark:text-slate-200">{pickup}</span> to <span className="font-bold text-slate-700 dark:text-slate-200">{destination}</span> is now live for passengers to book.
          </p>
          <button
            onClick={() => setPublished(false)}
            className="px-6 py-2.5 rounded-xl bg-blue-600 text-white font-bold text-xs shadow"
          >
            Offer Another Ride
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Pickup */}
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Pickup Point</label>
              <select
                value={pickup}
                onChange={(e) => setPickup(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-3 text-xs font-bold"
              >
                {INITIAL_LOCATIONS.map(l => (
                  <option key={l.address} value={l.address}>{l.address}</option>
                ))}
              </select>
            </div>

            {/* Destination */}
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Destination Point</label>
              <select
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-3 text-xs font-bold"
              >
                {INITIAL_LOCATIONS.map(l => (
                  <option key={l.address} value={l.address}>{l.address}</option>
                ))}
              </select>
            </div>

            {/* Vehicle Type */}
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Vehicle Choice</label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => { setVehicleType('car'); setTotalSeats(3); }}
                  className={`flex-1 py-2.5 rounded-xl text-xs font-black flex items-center justify-center gap-1.5 border ${vehicleType === 'car' ? 'bg-blue-600 text-white border-blue-600' : 'bg-slate-50 dark:bg-slate-800'}`}
                >
                  <Car className="h-4 w-4" /> Car (3 Seats)
                </button>
                <button
                  type="button"
                  onClick={() => { setVehicleType('bike'); setTotalSeats(1); }}
                  className={`flex-1 py-2.5 rounded-xl text-xs font-black flex items-center justify-center gap-1.5 border ${vehicleType === 'bike' ? 'bg-blue-600 text-white border-blue-600' : 'bg-slate-50 dark:bg-slate-800'}`}
                >
                  <Bike className="h-4 w-4" /> Bike (1 Seat)
                </button>
              </div>
            </div>

            {/* Time & Price */}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Departure Time</label>
                <input
                  type="time"
                  value={departureTime}
                  onChange={(e) => setDepartureTime(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2.5 text-xs font-bold"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Price per Seat (₹)</label>
                <input
                  type="number"
                  value={pricePerSeat}
                  onChange={(e) => setPricePerSeat(Number(e.target.value))}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2.5 text-xs font-bold"
                />
              </div>
            </div>

          </div>

          {/* Payment Options & Women Only */}
          <div className="pt-2 grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-slate-100 dark:border-slate-800">
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Accept Payment Methods</label>
              <div className="flex gap-3 text-xs font-bold">
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input type="checkbox" checked={acceptUpi} onChange={(e) => setAcceptUpi(e.target.checked)} />
                  UPI (GPay/PhonePe)
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input type="checkbox" checked={acceptCash} onChange={(e) => setAcceptCash(e.target.checked)} />
                  Cash
                </label>
              </div>
            </div>

            <div>
              <label className="flex items-center gap-2 cursor-pointer pt-4 text-xs font-bold text-rose-600 dark:text-rose-400">
                <Shield className="h-4 w-4 fill-rose-500" />
                <input type="checkbox" checked={isWomenOnly} onChange={(e) => setIsWomenOnly(e.target.checked)} />
                Women-Only Ride Option
              </label>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-black text-sm shadow-lg shadow-blue-500/20 transition active:scale-95"
          >
            {loading ? 'Publishing Ride Route...' : 'Publish Ride Route Now'}
          </button>

        </form>
      )}

    </div>
  );
};
