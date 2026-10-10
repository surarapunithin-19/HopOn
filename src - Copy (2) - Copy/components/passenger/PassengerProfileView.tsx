import React, { useState } from 'react';
import { User, Shield, Phone, Mail, Plus, Trash2, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const PassengerProfileView: React.FC = () => {
  const { passengerProfile, updatePassengerProfile } = useAuth();

  const [name, setName] = useState(passengerProfile.name);
  const [phone, setPhone] = useState(passengerProfile.phone);
  const [email, setEmail] = useState(passengerProfile.email);
  const [womenOnly, setWomenOnly] = useState(passengerProfile.womenOnlyPreference);

  // New emergency contact
  const [newContactName, setNewContactName] = useState('');
  const [newContactPhone, setNewContactPhone] = useState('');
  const [newContactRelation, setNewContactRelation] = useState('Parent');

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updatePassengerProfile({ name, phone, email, womenOnlyPreference: womenOnly });
    alert('Profile settings saved successfully.');
  };

  const handleAddContact = () => {
    if (!newContactName || !newContactPhone) return;
    const newContact = {
      id: `ec_${Date.now()}`,
      name: `${newContactName} (${newContactRelation})`,
      phone: newContactPhone,
      relation: newContactRelation
    };
    updatePassengerProfile({ emergencyContacts: [...passengerProfile.emergencyContacts, newContact] });
    setNewContactName('');
    setNewContactPhone('');
  };

  const handleDeleteContact = (id: string) => {
    updatePassengerProfile({ emergencyContacts: passengerProfile.emergencyContacts.filter(c => c.id !== id) });
  };

  return (
    <div className="space-y-6 max-w-3xl">
      
      {/* Profile Info */}
      <form onSubmit={handleSaveProfile} className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <h3 className="font-black text-lg text-slate-900 dark:text-white">Passenger Profile</h3>

        <div className="flex items-center gap-4">
          <img
            src={passengerProfile.avatar}
            alt={passengerProfile.name}
            className="h-16 w-16 rounded-2xl object-cover ring-2 ring-blue-500"
          />
          <div>
            <div className="text-base font-extrabold text-slate-900 dark:text-white">{passengerProfile.name}</div>
            <div className="text-xs text-slate-400">Verified Rider • Member since 2025</div>
          </div>
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

          <div className="flex items-end">
            <label className="flex items-center gap-2 cursor-pointer bg-rose-50 dark:bg-rose-950/40 p-3 rounded-xl border border-rose-200 dark:border-rose-800/60 w-full">
              <Shield className="h-4 w-4 text-rose-500 fill-rose-500" />
              <div className="text-xs">
                <span className="font-extrabold text-rose-700 dark:text-rose-300">Women Only Preference</span>
                <p className="text-[10px] text-slate-500">Filter female captains by default</p>
              </div>
              <input
                type="checkbox"
                checked={womenOnly}
                onChange={(e) => setWomenOnly(e.target.checked)}
                className="ml-auto"
              />
            </label>
          </div>
        </div>

        <button
          type="submit"
          className="px-6 py-2.5 rounded-xl bg-blue-600 text-white font-black text-xs shadow-md"
        >
          Save Profile
        </button>
      </form>

      {/* Emergency Contacts Manager */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <h3 className="font-black text-lg text-slate-900 dark:text-white flex items-center gap-2">
          <Shield className="h-5 w-5 text-rose-500" /> Emergency SOS Contacts
        </h3>
        <p className="text-xs text-slate-500">These trusted contacts will receive live SMS location alerts whenever you press the SOS button.</p>

        <div className="space-y-2">
          {passengerProfile.emergencyContacts.map((c) => (
            <div key={c.id} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-xs">
              <div>
                <span className="font-bold text-slate-900 dark:text-white">{c.name}</span>
                <span className="text-slate-400 font-mono ml-2">{c.phone}</span>
              </div>
              <button
                onClick={() => handleDeleteContact(c.id)}
                className="text-slate-400 hover:text-rose-600"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>

        {/* Add New Contact Form */}
        <div className="pt-2 grid grid-cols-1 md:grid-cols-3 gap-2">
          <input
            type="text"
            placeholder="Contact Name"
            value={newContactName}
            onChange={(e) => setNewContactName(e.target.value)}
            className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs font-semibold"
          />
          <input
            type="text"
            placeholder="+91 Mobile Number"
            value={newContactPhone}
            onChange={(e) => setNewContactPhone(e.target.value)}
            className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs font-semibold"
          />
          <button
            onClick={handleAddContact}
            className="py-2 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl flex items-center justify-center gap-1"
          >
            <Plus className="h-4 w-4" /> Add Emergency Contact
          </button>
        </div>

      </div>

    </div>
  );
};
