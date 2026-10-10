import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { RideProvider, useRide } from './context/RideContext';

// Common Components
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { EmergencySOSModal } from './components/common/EmergencySOSModal';
import { NotificationDrawer } from './components/common/NotificationDrawer';
import { AuthModal } from './components/auth/AuthModal';

// Landing Components
import { Hero } from './components/landing/Hero';
import { Features } from './components/landing/Features';
import { SafetySection } from './components/landing/SafetySection';
import { HowItWorks } from './components/landing/HowItWorks';
import { WhyChooseUs } from './components/landing/WhyChooseUs';
import { FAQ } from './components/landing/FAQ';
import { ContactUs } from './components/landing/ContactUs';

// Passenger Components
import { PassengerSidebar, PassengerTab } from './components/passenger/PassengerSidebar';
import { FindRideView } from './components/passenger/FindRideView';
import { UpcomingTripsView } from './components/passenger/UpcomingTripsView';
import { RideHistoryView } from './components/passenger/RideHistoryView';
import { WalletView } from './components/passenger/WalletView';
import { PassengerProfileView } from './components/passenger/PassengerProfileView';

// Captain Components
import { CaptainSidebar, CaptainTab } from './components/captain/CaptainSidebar';
import { OfferRideModal } from './components/captain/OfferRideModal';
import { RideRequestsView } from './components/captain/RideRequestsView';
import { CaptainEarningsView } from './components/captain/CaptainEarningsView';
import { CaptainVerificationView } from './components/captain/CaptainVerificationView';
import { CaptainProfileView } from './components/captain/CaptainProfileView';

// Admin Components
import { AdminSidebar, AdminTab } from './components/admin/AdminSidebar';
import { AdminOverview } from './components/admin/AdminOverview';
import { AdminApprovalsView } from './components/admin/AdminApprovalsView';
import { AdminLiveMapView } from './components/admin/AdminLiveMapView';
import { AdminSosMonitorView } from './components/admin/AdminSosMonitorView';
import { AdminReportsView } from './components/admin/AdminReportsView';

import { PassengerLoginPortal } from './components/auth/PassengerLoginPortal';
import { CaptainLoginPortal } from './components/auth/CaptainLoginPortal';

const MainApp: React.FC = () => {
  const { role, user, isAuthenticated, activePortal, setActivePortal, openPassengerLogin, openCaptainLogin } = useAuth();
  const { unreadCount, sosAlerts, allCaptains } = useRide();

  // Active Tabs
  const [passengerTab, setPassengerTab] = useState<PassengerTab>('find');
  const [captainTab, setCaptainTab] = useState<CaptainTab>('overview');
  const [adminTab, setAdminTab] = useState<AdminTab>('overview');

  // Modals & Drawers
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [sosModalOpen, setSosModalOpen] = useState(false);
  const [notifDrawerOpen, setNotifDrawerOpen] = useState(false);

  const handleSetPassengerTab = (tab: PassengerTab) => {
    if (tab === 'sos') {
      setSosModalOpen(true);
    } else {
      setPassengerTab(tab);
    }
  };

  const pendingApprovalsCount = allCaptains.filter(c => c.verificationStatus === 'pending').length;
  const activeSosCount = sosAlerts.filter(s => s.status === 'active').length;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors duration-200">
      
      {/* Navigation Bar */}
      <Navbar
        onOpenSOS={() => setSosModalOpen(true)}
        onOpenNotifications={() => setNotifDrawerOpen(true)}
      />

      {/* Role Context Quick Switcher Banner */}
      <div className="bg-slate-900 text-white py-2 px-4 text-xs flex flex-wrap items-center justify-between border-b border-slate-800">
        <div className="flex items-center gap-2">
          <span className="font-extrabold uppercase tracking-wider text-[10px] text-blue-400">HopOn Multi-Portal System:</span>
          <span className="text-slate-300 hidden sm:inline">Switch views or access Login Portals instantly</span>
        </div>

        <div className="flex items-center gap-1.5 flex-wrap">
          <button
            onClick={() => setActivePortal('landing')}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition ${activePortal === 'landing' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
          >
            🏠 Guest Landing
          </button>
          <button
            onClick={openPassengerLogin}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition ${activePortal === 'passenger-login' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
          >
            🔑 Passenger Login
          </button>
          <button
            onClick={openCaptainLogin}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition ${activePortal === 'captain-login' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
          >
            🔑 Captain Login
          </button>
          {isAuthenticated && role === 'passenger' && (
            <button
              onClick={() => setActivePortal('passenger')}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition ${activePortal === 'passenger' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
            >
              🚗 Passenger App
            </button>
          )}
          {isAuthenticated && role === 'captain' && (
            <button
              onClick={() => setActivePortal('captain')}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition ${activePortal === 'captain' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
            >
              🚘 Captain App
            </button>
          )}
          <button
            onClick={() => setActivePortal('admin')}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition ${activePortal === 'admin' ? 'bg-rose-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
          >
            🛡️ Admin Command
          </button>
        </div>
      </div>

      {/* Main Body Content based on activePortal */}
      <main className="flex-1">
        
        {/* LANDING PAGE */}
        {activePortal === 'landing' && (
          <div>
            <Hero />
            <Features />
            <HowItWorks />
            <SafetySection />
            <WhyChooseUs />
            <FAQ />
            <ContactUs />
          </div>
        )}

        {/* PASSENGER LOGIN PORTAL */}
        {activePortal === 'passenger-login' && <PassengerLoginPortal />}

        {/* CAPTAIN LOGIN PORTAL */}
        {activePortal === 'captain-login' && <CaptainLoginPortal />}

        {/* PASSENGER DASHBOARD */}
        {activePortal === 'passenger' && (
          <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col lg:flex-row gap-8">
            <PassengerSidebar
              activeTab={passengerTab}
              setActiveTab={handleSetPassengerTab}
              unreadNotifsCount={unreadCount}
            />

            <div className="flex-1 min-w-0">
              {passengerTab === 'find' && (
                <FindRideView onRideBooked={() => setPassengerTab('bookings')} />
              )}
              {passengerTab === 'bookings' && <UpcomingTripsView />}
              {passengerTab === 'history' && <RideHistoryView />}
              {passengerTab === 'wallet' && <WalletView />}
              {passengerTab === 'profile' && <PassengerProfileView />}
            </div>
          </div>
        )}

        {/* CAPTAIN DASHBOARD */}
        {activePortal === 'captain' && (
          <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col lg:flex-row gap-8">
            <CaptainSidebar
              activeTab={captainTab}
              setActiveTab={setCaptainTab}
            />

            <div className="flex-1 min-w-0">
              {captainTab === 'overview' && (
                <div className="space-y-8">
                  <OfferRideModal onPublished={() => setCaptainTab('requests')} />
                </div>
              )}
              {captainTab === 'offer' && <OfferRideModal onPublished={() => setCaptainTab('requests')} />}
              {captainTab === 'requests' && <RideRequestsView />}
              {captainTab === 'earnings' && <CaptainEarningsView />}
              {captainTab === 'verification' && <CaptainVerificationView />}
              {captainTab === 'profile' && <CaptainProfileView />}
            </div>
          </div>
        )}

        {/* ADMIN PORTAL */}
        {activePortal === 'admin' && (
          <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col lg:flex-row gap-8">
            <AdminSidebar
              activeTab={adminTab}
              setActiveTab={setAdminTab}
              pendingCount={pendingApprovalsCount}
              activeSosCount={activeSosCount}
            />

            <div className="flex-1 min-w-0">
              {adminTab === 'overview' && <AdminOverview />}
              {adminTab === 'approvals' && <AdminApprovalsView />}
              {adminTab === 'livetrips' && <AdminLiveMapView />}
              {adminTab === 'sos' && <AdminSosMonitorView />}
              {adminTab === 'reports' && <AdminReportsView />}
            </div>
          </div>
        )}

      </main>

      {/* Footer */}
      <Footer />

      {/* Modals & Drawers */}
      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
      <EmergencySOSModal isOpen={sosModalOpen} onClose={() => setSosModalOpen(false)} />
      <NotificationDrawer isOpen={notifDrawerOpen} onClose={() => setNotifDrawerOpen(false)} />

    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <RideProvider>
        <MainApp />
      </RideProvider>
    </AuthProvider>
  );
}
