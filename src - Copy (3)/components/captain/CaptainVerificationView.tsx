import React, { useState } from 'react';
import { ShieldCheck, Upload, FileText, CheckCircle2, AlertCircle, Clock } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const CaptainVerificationView: React.FC = () => {
  const { captainProfile, updateCaptainProfile } = useAuth();
  const [uploadedDocs, setUploadedDocs] = useState(captainProfile.documents || []);

  const handleUploadSim = (type: string, title: string) => {
    const newDoc = {
      id: `doc_${Date.now()}`,
      type: type as any,
      title,
      url: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600',
      uploadedAt: new Date().toLocaleDateString(),
      status: 'pending' as const
    };
    const updated = [...uploadedDocs, newDoc];
    setUploadedDocs(updated);
    updateCaptainProfile({ documents: updated, verificationStatus: 'pending' });
    alert(`${title} uploaded successfully! Status changed to Pending Verification.`);
  };

  return (
    <div className="space-y-6">
      
      {/* Verification Status Header */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`p-3 rounded-2xl ${captainProfile.verificationStatus === 'verified' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60' : 'bg-amber-100 text-amber-700 dark:bg-amber-950/60'}`}>
            <ShieldCheck className="h-6 w-6" />
          </div>
          <div>
            <h3 className="font-extrabold text-base text-slate-900 dark:text-white">Verification Status</h3>
            <p className="text-xs text-slate-400 capitalize">Current Account Status: <span className="font-bold text-blue-600">{captainProfile.verificationStatus}</span></p>
          </div>
        </div>

        <span className={`px-3 py-1 rounded-full text-xs font-black uppercase ${
          captainProfile.verificationStatus === 'verified' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-300' : 'bg-amber-100 text-amber-800 dark:bg-amber-900/60 dark:text-amber-300'
        }`}>
          {captainProfile.verificationStatus}
        </span>
      </div>

      {/* Document Upload Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Driving License */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <FileText className="h-4 w-4 text-blue-500" /> Driving License
            </span>
            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded">APPROVED</span>
          </div>
          <p className="text-xs text-slate-500">Government issued driver license front & back image.</p>
          <button
            onClick={() => handleUploadSim('license', 'Driving License')}
            className="w-full py-2.5 rounded-xl border border-dashed border-slate-300 dark:border-slate-700 hover:bg-slate-50 text-xs font-bold text-slate-600 dark:text-slate-300 flex items-center justify-center gap-2"
          >
            <Upload className="h-4 w-4" /> Re-upload Driving License
          </button>
        </div>

        {/* RC Book */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <FileText className="h-4 w-4 text-blue-500" /> Vehicle Registration (RC Book)
            </span>
            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded">APPROVED</span>
          </div>
          <p className="text-xs text-slate-500">RC book image showing vehicle plate & owner details.</p>
          <button
            onClick={() => handleUploadSim('rc_book', 'RC Book')}
            className="w-full py-2.5 rounded-xl border border-dashed border-slate-300 dark:border-slate-700 hover:bg-slate-50 text-xs font-bold text-slate-600 dark:text-slate-300 flex items-center justify-center gap-2"
          >
            <Upload className="h-4 w-4" /> Upload RC Book Copy
          </button>
        </div>

        {/* Insurance */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <FileText className="h-4 w-4 text-blue-500" /> Vehicle Insurance Policy
            </span>
            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded">APPROVED</span>
          </div>
          <p className="text-xs text-slate-500">Active insurance policy document copy.</p>
          <button
            onClick={() => handleUploadSim('insurance', 'Insurance Document')}
            className="w-full py-2.5 rounded-xl border border-dashed border-slate-300 dark:border-slate-700 hover:bg-slate-50 text-xs font-bold text-slate-600 dark:text-slate-300 flex items-center justify-center gap-2"
          >
            <Upload className="h-4 w-4" /> Upload Insurance Copy
          </button>
        </div>

        {/* Selfie Verification */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <FileText className="h-4 w-4 text-blue-500" /> Real-time Selfie Verification
            </span>
            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded">APPROVED</span>
          </div>
          <p className="text-xs text-slate-500">Clear selfie portrait matching driver license photo.</p>
          <button
            onClick={() => handleUploadSim('selfie', 'Selfie Verification')}
            className="w-full py-2.5 rounded-xl border border-dashed border-slate-300 dark:border-slate-700 hover:bg-slate-50 text-xs font-bold text-slate-600 dark:text-slate-300 flex items-center justify-center gap-2"
          >
            <Upload className="h-4 w-4" /> Take / Upload Selfie
          </button>
        </div>

      </div>

    </div>
  );
};
