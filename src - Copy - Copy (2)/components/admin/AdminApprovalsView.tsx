import React from 'react';
import { Check, X, ShieldCheck, FileText, ExternalLink, UserCheck } from 'lucide-react';
import { useRide } from '../../context/RideContext';

export const AdminApprovalsView: React.FC = () => {
  const { allCaptains, approveCaptainDocument, rejectCaptainDocument } = useRide();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-black text-slate-900 dark:text-white">Captain Verification & KYC Requests</h2>
          <p className="text-xs text-slate-500">Verify driving licenses, RC books, and selfie identity before allowing captains on the road.</p>
        </div>
        <span className="px-3 py-1 bg-amber-100 text-amber-800 dark:bg-amber-900/60 dark:text-amber-300 rounded-full text-xs font-black">
          {allCaptains.filter(c => c.verificationStatus === 'pending').length} Pending Requests
        </span>
      </div>

      <div className="space-y-4">
        {allCaptains.map((captain) => (
          <div
            key={captain.id}
            className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4"
          >
            {/* Captain Header */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-3">
                <img src={captain.avatar} alt={captain.name} className="h-12 w-12 rounded-2xl object-cover ring-2 ring-blue-500" />
                <div>
                  <h3 className="font-extrabold text-base text-slate-900 dark:text-white">{captain.name}</h3>
                  <div className="text-xs text-slate-500">
                    {captain.vehicleModel} • <span className="font-mono text-blue-600 font-bold">{captain.vehicleNumber}</span> • {captain.phone}
                  </div>
                </div>
              </div>

              <span className={`px-3 py-1 rounded-full text-xs font-black uppercase ${
                captain.verificationStatus === 'verified'
                  ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-300'
                  : 'bg-amber-100 text-amber-800 dark:bg-amber-900/60 dark:text-amber-300'
              }`}>
                {captain.verificationStatus}
              </span>
            </div>

            {/* Documents List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
              {captain.documents.map((doc) => (
                <div key={doc.id} className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 space-y-2">
                  <div className="flex justify-between items-center text-xs font-extrabold text-slate-800 dark:text-slate-200">
                    <span>{doc.title}</span>
                    <span className={`text-[9px] px-1.5 py-0.5 rounded uppercase font-bold ${
                      doc.status === 'verified' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                    }`}>
                      {doc.status}
                    </span>
                  </div>

                  <a
                    href={doc.url}
                    target="_blank"
                    rel="noreferrer"
                    className="block text-[11px] text-blue-600 hover:underline flex items-center gap-1 font-semibold"
                  >
                    <ExternalLink className="h-3 w-3" /> View Uploaded File
                  </a>
                </div>
              ))}
            </div>

            {/* Actions */}
            {captain.verificationStatus === 'pending' && (
              <div className="flex gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                <button
                  onClick={() => approveCaptainDocument(captain.id, 'doc_all')}
                  className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs flex items-center gap-1.5 shadow-sm"
                >
                  <Check className="h-4 w-4" /> Approve Captain Account
                </button>
                <button
                  onClick={() => rejectCaptainDocument(captain.id, 'doc_all', 'Document scan unreadable')}
                  className="px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-black text-xs flex items-center gap-1.5 shadow-sm"
                >
                  <X className="h-4 w-4" /> Reject & Request Resubmission
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
