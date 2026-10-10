import React, { useState } from 'react';
import { History, FileText, Star, MapPin, Download, CheckCircle2 } from 'lucide-react';
import { useRide } from '../../context/RideContext';

export const RideHistoryView: React.FC = () => {
  const { bookings } = useRide();
  const [selectedInvoice, setSelectedInvoice] = useState<any | null>(null);

  return (
    <div className="space-y-6">
      
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-black text-slate-900 dark:text-white">Your Ride History & Invoices</h2>
        <span className="text-xs font-extrabold text-slate-500">{bookings.length} Total Trips Recorded</span>
      </div>

      <div className="space-y-4">
        {bookings.map((booking) => {
          const ride = booking.rideDetails;
          return (
            <div
              key={booking.id}
              className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
            >
              
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-300 text-[10px] font-black uppercase">
                    COMPLETED
                  </span>
                  <span className="text-xs text-slate-400 font-semibold">{booking.bookedAt}</span>
                </div>

                <div className="text-sm font-extrabold text-slate-900 dark:text-white">
                  Captain {ride.captainName} ({ride.vehicleModel})
                </div>

                <div className="text-xs text-slate-600 dark:text-slate-300 space-y-1">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-3.5 w-3.5 text-emerald-500" />
                    <span>{ride.pickup.address}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-3.5 w-3.5 text-rose-500" />
                    <span>{ride.destination.address}</span>
                  </div>
                </div>
              </div>

              {/* Price & Invoice Action */}
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="text-lg font-black text-slate-900 dark:text-white">₹{booking.finalAmount}</div>
                  <div className="text-[10px] text-slate-400 uppercase font-bold">{booking.paymentMethod}</div>
                </div>

                <button
                  onClick={() => setSelectedInvoice(booking)}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-200 text-xs font-bold flex items-center gap-1.5 transition"
                >
                  <FileText className="h-3.5 w-3.5" /> View Invoice
                </button>
              </div>

            </div>
          );
        })}
      </div>

      {/* Downloadable Tax Invoice Modal */}
      {selectedInvoice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in">
          <div className="bg-white text-slate-900 rounded-3xl max-w-lg w-full p-8 space-y-6 shadow-2xl relative">
            <button
              onClick={() => setSelectedInvoice(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-800 font-bold"
            >
              ✕
            </button>

            <div className="border-b pb-4 flex justify-between items-center">
              <div>
                <h3 className="text-2xl font-black text-blue-600">HopOn Tax Invoice</h3>
                <p className="text-xs text-slate-500">Receipt ID: #{selectedInvoice.id}</p>
              </div>
              <div className="text-right text-xs text-slate-500 font-medium">
                <div>Date: {selectedInvoice.bookedAt}</div>
                <div>GSTIN: 29AAAAA0000A1Z5</div>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between font-bold">
                <span>Passenger Name:</span>
                <span>{selectedInvoice.passengerName}</span>
              </div>
              <div className="flex justify-between font-bold">
                <span>Captain / Driver:</span>
                <span>{selectedInvoice.rideDetails.captainName}</span>
              </div>
              <div className="flex justify-between font-bold">
                <span>Vehicle Number:</span>
                <span>{selectedInvoice.rideDetails.vehicleNumber}</span>
              </div>
            </div>

            <div className="border-y py-3 space-y-1.5 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Base Ride Fare:</span>
                <span>₹{selectedInvoice.totalFare}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Platform Safety Charge:</span>
                <span>₹{selectedInvoice.platformFee}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Taxes & GST (18% included):</span>
                <span>₹{Math.round(selectedInvoice.platformFee * 0.18)}</span>
              </div>
              <div className="flex justify-between font-black text-sm pt-2 border-t text-slate-900">
                <span>Total Amount Paid:</span>
                <span className="text-blue-600">₹{selectedInvoice.finalAmount}</span>
              </div>
            </div>

            <button
              onClick={() => { alert('Invoice PDF downloaded to device'); setSelectedInvoice(null); }}
              className="w-full py-3 rounded-2xl bg-blue-600 text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-md"
            >
              <Download className="h-4 w-4" /> Download PDF Receipt
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
