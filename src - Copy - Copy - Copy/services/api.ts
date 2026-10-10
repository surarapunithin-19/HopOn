import { Ride, Booking, Transaction, Notification, CaptainProfile, PassengerProfile } from '../types';

export const api = {
  async getInitialState() {
    try {
      const res = await fetch('/api/initial-state');
      if (res.ok) {
        return await res.json();
      }
    } catch (e) {
      console.warn('Backend API fallback to local state', e);
    }
    return null;
  },

  async searchRides(params: { pickup?: string; destination?: string; date?: string; vehicleType?: string; seats?: number; womenOnly?: boolean }) {
    try {
      const res = await fetch('/api/rides/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params)
      });
      if (res.ok) {
        const data = await res.json();
        return data.rides as Ride[];
      }
    } catch (e) {
      console.error('Search failed', e);
    }
    return [];
  },

  async bookRide(rideId: string, seatsBooked: number, paymentMethod: 'upi' | 'cash' | 'wallet') {
    try {
      const res = await fetch('/api/rides/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rideId, seatsBooked, paymentMethod })
      });
      if (res.ok) {
        const data = await res.json();
        return data.booking as Booking;
      }
    } catch (e) {
      console.error('Booking failed', e);
    }
    return null;
  },

  async offerRide(rideData: Partial<Ride>) {
    try {
      const res = await fetch('/api/rides/offer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(rideData)
      });
      if (res.ok) {
        const data = await res.json();
        return data.ride as Ride;
      }
    } catch (e) {
      console.error('Offer ride failed', e);
    }
    return null;
  },

  async triggerSOS(bookingId?: string, location?: { address: string; lat: number; lng: number }) {
    try {
      const res = await fetch('/api/sos/trigger', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bookingId, location })
      });
      if (res.ok) {
        const data = await res.json();
        return data.alert;
      }
    } catch (e) {
      console.error('SOS trigger failed', e);
    }
    return null;
  },

  async topupWallet(amount: number, method: string) {
    try {
      const res = await fetch('/api/wallet/topup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount, method })
      });
      if (res.ok) {
        const data = await res.json();
        return data.balance as number;
      }
    } catch (e) {
      console.error('Wallet topup failed', e);
    }
    return null;
  },

  async approveCaptain(captainId: string, status: 'verified' | 'rejected') {
    try {
      const res = await fetch('/api/captain/approve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ captainId, status })
      });
      if (res.ok) {
        const data = await res.json();
        return data.captain as CaptainProfile;
      }
    } catch (e) {
      console.error('Approval failed', e);
    }
    return null;
  }
};
