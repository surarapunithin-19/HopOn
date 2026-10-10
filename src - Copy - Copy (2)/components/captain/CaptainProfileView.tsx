import React, { useState } from 'react';
import { User, Shield, Car, Phone, Mail, CheckCircle2, Star, ShieldCheck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const CaptainProfileView: React.FC = () => {
  const { captainProfile, updateCaptainProfile } = useAuth();

  const [name, setName] = useState(captainProfile.name);
  const [phone, setPhone] = useState(captainProfile.phone);
  const [email, setEmail] = useState(captainProfile.email);
  const [vehicleModel, setVehicleModel] = useState(captainProfile.vehicleModel);
  const [vehicleNumber, setVehicleNumber] = useState(captainProfile.vehicleNumber);
  const [upiId, setUpiId] = useState(captainProfile.upiId || 'vikram@upi');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateCaptainProfile({
      name,
      phone,
      email,
      vehicleModel,
      vehicleNumber,
      upiId
    });
    alert('Captain profile updated successfully!');
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <form onSubmit={handleSave} className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
          <div className="flex items-center gap-4">
            <img src={captainProfile.avatar} alt={captainProfile.name} className="h-16 w-16 rounded-2xl object-cover ring-2 ring-emerald-500" />
            <div>
              <h3 className="text-lg font-black text-slate-900 dark:text-white">{captainProfile.name}</h3>
              <div className="text-xs text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                <ShieldCheck className="h-4 w-4" /> Verified Captain (Rating: ★ {captainProfile.rating || 4.9})
              </div>
            </div>
          </div>

          <span className="px-3 py-1 bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300 font-extrabold text-xs rounded-full uppercase">
            {captainProfile.verificationStatus}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          
          <div>
            <label className="text-xs font-bold text-slate-600 dark:text-slate-300 block mb-1">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs font-semibold"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-600 dark:text-slate-300 block mb-1">Mobile Number</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs font-semibold"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-600 dark:text-slate-300 block mb-1">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs font-semibold"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-600 dark:text-slate-300 block mb-1">UPI ID for Direct Payouts</label>
            <input
              type="text"
              value={upiId}
              onChange={(e) => setUpiId(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs font-mono font-bold text-blue-600"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-600 dark:text-slate-300 block mb-1">Vehicle Model</label>
            <input
              type="text"
              value={vehicleModel}
              onChange={(e) => setVehicleModel(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs font-semibold"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-600 dark:text-slate-300 block mb-1">Vehicle Registration Plate Number</label>
            <input
              type="text"
              value={vehicleNumber}
              onChange={(e) => setVehicleNumber(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs font-mono uppercase font-extrabold"
            />
          </div>

        </div>

        <button
          type="submit"
          className="px-6 py-2.5 rounded-xl bg-blue-600 text-white font-black text-xs shadow"
        >
          Save Captain Details
        </button>

      </form>
    </div>
  );
};
