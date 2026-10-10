import React, { useState } from 'react';
import { Search, MapPin, Calendar, Users, Car, Bike, Shield, Star, Clock, CheckCircle2, DollarSign, CreditCard, Navigation } from 'lucide-react';
import { useRide } from '../../context/RideContext';
import { INITIAL_LOCATIONS } from '../../data/mockData';
import { Ride, VehicleType } from '../../types';
import { RoutePreviewMap } from '../map/RoutePreviewMap';

interface FindRideViewProps {
  onRideBooked: () => void;
}

export const FindRideView: React.FC<FindRideViewProps> = ({ onRideBooked }) => {
  const { rides, bookRide } = useRide();

  const [pickup, setPickup] = useState(INITIAL_LOCATIONS[0].address);
  const [destination, setDestination] = useState(INITIAL_LOCATIONS[1].address);
  const [vehicleType, setVehicleType] = useState<'all' | 'car' | 'bike'>('all');
  const [seats, setSeats] = useState(1);
  const [womenOnly, setWomenOnly] = useState(false);

  // Selected Ride for Booking Modal
  const [selectedRide, setSelectedRide] = useState<Ride | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'cash' | 'wallet'>('upi');
  const [bookingLoading, setBookingLoading] = useState(false);

  // Filter rides
  const filteredRides = rides.filter(r => {
    if (r.status !== 'published') return false;
    if (vehicleType !== 'all' && r.vehicleType !== vehicleType) return false;
    if (womenOnly && !r.isWomenOnly) return false;
    if (r.availableSeats < seats) return false;
    return true;
  });

  const handleConfirmBooking = async () => {
    if (!selectedRide) return;
    setBookingLoading(true);
    await bookRide(selectedRide.id, seats, paymentMethod);
    setBookingLoading(false);
    setSelectedRide(null);
    onRideBooked();
  };

  return (
    <div className="space-y-6">
      
      {/* Search Header Filters */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-md space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-black text-slate-900 dark:text-white">Find Available Rides</h2>
          
          {/* Women Only Toggle */}
          <label className="flex items-center gap-2 cursor-pointer bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-700 text-xs font-bold">
            <Shield className={`h-4 w-4 ${womenOnly ? 'text-rose-500 fill-rose-500' : 'text-slate-400'}`} />
            <span>Women Only</span>
            <input
              type="checkbox"
              checked={womenOnly}
              onChange={(e) => setWomenOnly(e.target.checked)}
              className="sr-only"
            />
            <div className={`w-8 h-4 rounded-full relative transition-colors ${womenOnly ? 'bg-rose-500' : 'bg-slate-300 dark:bg-slate-700'}`}>
              <div className={`w-3 h-3 rounded-full bg-white absolute top-0.5 transition-transform ${womenOnly ? 'translate-x-4' : 'translate-x-0.5'}`} />
            </div>
          </label>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          
          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase">Pickup Location</label>
            <select
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 dark:text-slate-100"
            >
              {INITIAL_LOCATIONS.map(l => (
                <option key={l.address} value={l.address}>{l.address}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase">Destination</label>
            <select
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 dark:text-slate-100"
            >
              {INITIAL_LOCATIONS.map(l => (
                <option key={l.address} value={l.address}>{l.address}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase">Vehicle Type</label>
            <div className="flex gap-1">
              <button
                type="button"
                onClick={() => setVehicleType('all')}
                className={`flex-1 py-2 rounded-xl text-[11px] font-extrabold ${vehicleType === 'all' ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-slate-800'}`}
              >
                All
              </button>
              <button
                type="button"
                onClick={() => setVehicleType('car')}
                className={`flex-1 py-2 rounded-xl text-[11px] font-extrabold flex items-center justify-center gap-1 ${vehicleType === 'car' ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-slate-800'}`}
              >
                <Car className="h-3 w-3" /> Car
              </button>
              <button
                type="button"
                onClick={() => setVehicleType('bike')}
                className={`flex-1 py-2 rounded-xl text-[11px] font-extrabold flex items-center justify-center gap-1 ${vehicleType === 'bike' ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-slate-800'}`}
              >
                <Bike className="h-3 w-3" /> Bike
              </button>
            </div>
          </div>

          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase">Seats Required</label>
            <select
              value={seats}
              onChange={(e) => setSeats(Number(e.target.value))}
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 dark:text-slate-100"
            >
              <option value={1}>1 Passenger Seat</option>
              <option value={2}>2 Passenger Seats</option>
              <option value={3}>3 Passenger Seats</option>
            </select>
          </div>

        </div>
      </div>

      {/* Results List */}
      <div className="space-y-4">
        <div className="flex justify-between items-center px-1">
          <span className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">
            Matching Captains ({filteredRides.length})
          </span>
          <span className="text-xs font-bold text-blue-600">Showing best route matches</span>
        </div>

        {filteredRides.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 space-y-3">
            <Car className="h-12 w-12 text-slate-300 mx-auto" />
            <h3 className="text-base font-bold text-slate-700 dark:text-slate-200">No Matching Rides Found</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              Try adjusting your filter preferences or check back in a few minutes as captains publish new routes.
            </p>
          </div>
        ) : (
          filteredRides.map((ride) => (
            <div
              key={ride.id}
              className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
            >
              
              {/* Captain & Vehicle Info */}
              <div className="flex items-start gap-4">
                <img
                  src={ride.captainAvatar}
                  alt={ride.captainName}
                  className="h-14 w-14 rounded-2xl object-cover ring-2 ring-blue-500 shrink-0"
                />
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-extrabold text-base text-slate-900 dark:text-white">{ride.captainName}</h3>
                    <span className="px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-900/50 text-amber-800 dark:text-amber-300 text-[10px] font-black flex items-center gap-1">
                      <Star className="h-3 w-3 fill-amber-400" /> {ride.captainRating}
                    </span>
                    {ride.isWomenOnly && (
                      <span className="px-2 py-0.5 rounded-full bg-rose-100 dark:bg-rose-900/50 text-rose-700 dark:text-rose-300 text-[10px] font-extrabold flex items-center gap-1">
                        <Shield className="h-3 w-3" /> Women Only
                      </span>
                    )}
                  </div>

                  <div className="text-xs text-slate-500 font-semibold flex items-center gap-2">
                    <span>{ride.vehicleType === 'bike' ? '🏍️' : '🚘'} {ride.vehicleModel}</span>
                    <span>•</span>
                    <span className="font-mono bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-[11px]">{ride.vehicleNumber}</span>
                  </div>

                  {/* Route points */}
                  <div className="pt-2 space-y-1 text-xs">
                    <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                      <MapPin className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                      <span className="font-semibold">{ride.pickup.address}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                      <MapPin className="h-3.5 w-3.5 text-rose-500 shrink-0" />
                      <span className="font-semibold">{ride.destination.address}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Price & Action */}
              <div className="w-full md:w-auto flex md:flex-col items-center md:items-end justify-between border-t md:border-t-0 pt-4 md:pt-0 border-slate-100 dark:border-slate-800 gap-3">
                <div className="text-left md:text-right">
                  <div className="text-2xl font-black text-blue-600 dark:text-blue-400">
                    ₹{ride.pricePerSeat} <span className="text-xs font-normal text-slate-400">/ seat</span>
                  </div>
                  <div className="text-[11px] font-bold text-slate-500">
                    {ride.availableSeats} of {ride.totalSeats} seats left • {ride.estimatedDuration}
                  </div>
                </div>

                <button
                  onClick={() => setSelectedRide(ride)}
                  className="px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-black shadow-md shadow-blue-500/20 transition active:scale-95 shrink-0"
                >
                  Book Ride
                </button>
              </div>

            </div>
          ))
        )}
      </div>

      {/* Booking Modal */}
      {selectedRide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-md w-full p-6 space-y-5 border border-slate-200 dark:border-slate-800 shadow-2xl">
            
            <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="font-black text-lg text-slate-900 dark:text-white">Confirm Booking</h3>
              <button onClick={() => setSelectedRide(null)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>

            {/* Route Preview Map */}
            <RoutePreviewMap
              pickup={selectedRide.pickup}
              destination={selectedRide.destination}
              vehicleType={selectedRide.vehicleType}
              showLabels={true}
              className="h-[200px] w-full rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-inner"
            />

            {/* Ride Details Summary */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 space-y-2 text-xs">
              <div className="flex justify-between font-bold text-slate-800 dark:text-slate-200">
                <span>Captain:</span>
                <span>{selectedRide.captainName} ★ {selectedRide.captainRating}</span>
              </div>
              <div className="flex justify-between text-slate-600 dark:text-slate-300">
                <span>Vehicle:</span>
                <span>{selectedRide.vehicleModel} ({selectedRide.vehicleNumber})</span>
              </div>
              <div className="flex justify-between text-slate-600 dark:text-slate-300">
                <span>Seats Selected:</span>
                <span>{seats} Seat(s)</span>
              </div>
            </div>

            {/* Price Fare Calculation */}
            <div className="space-y-2 text-xs border-y border-slate-100 dark:border-slate-800 py-3">
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>Fare (₹{selectedRide.pricePerSeat} x {seats}):</span>
                <span className="font-bold">₹{selectedRide.pricePerSeat * seats}</span>
              </div>
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>HopOn Safety & Platform Fee:</span>
                <span className="font-bold">₹15</span>
              </div>
              <div className="flex justify-between text-sm font-black text-slate-900 dark:text-white pt-1">
                <span>Total Amount:</span>
                <span className="text-blue-600 dark:text-blue-400">₹{selectedRide.pricePerSeat * seats + 15}</span>
              </div>
            </div>

            {/* Payment Method Selection */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">Choose Payment Method</label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('upi')}
                  className={`p-2.5 rounded-xl text-xs font-extrabold border transition ${paymentMethod === 'upi' ? 'bg-blue-600 text-white border-blue-600' : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700'}`}
                >
                  GPay / UPI
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('wallet')}
                  className={`p-2.5 rounded-xl text-xs font-extrabold border transition ${paymentMethod === 'wallet' ? 'bg-blue-600 text-white border-blue-600' : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700'}`}
                >
                  HopOn Wallet
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('cash')}
                  className={`p-2.5 rounded-xl text-xs font-extrabold border transition ${paymentMethod === 'cash' ? 'bg-blue-600 text-white border-blue-600' : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700'}`}
                >
                  Cash on Trip
                </button>
              </div>
            </div>

            {/* Confirm */}
            <button
              onClick={handleConfirmBooking}
              disabled={bookingLoading}
              className="w-full py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-black text-xs shadow-lg shadow-blue-500/25 transition active:scale-95"
            >
              {bookingLoading ? 'Processing Booking...' : 'Pay & Confirm Booking'}
            </button>

          </div>
        </div>
      )}

    </div>
  );
};
