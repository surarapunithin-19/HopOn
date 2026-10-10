import React, { createContext, useContext, useState, useEffect } from 'react';
import { Ride, Booking, Transaction, Notification, SOSAlert, CaptainProfile } from '../types';
import { INITIAL_RIDES, INITIAL_BOOKINGS, INITIAL_TRANSACTIONS, INITIAL_NOTIFICATIONS, MOCK_CAPTAINS } from '../data/mockData';
import { api } from '../services/api';

interface RideContextType {
  rides: Ride[];
  bookings: Booking[];
  transactions: Transaction[];
  notifications: Notification[];
  sosAlerts: SOSAlert[];
  activeBooking: Booking | null;
  allCaptains: CaptainProfile[];
  searchRides: (criteria: { pickup?: string; destination?: string; date?: string; vehicleType?: string; seats?: number; womenOnly?: boolean }) => Promise<Ride[]>;
  bookRide: (rideId: string, seatsBooked: number, paymentMethod: 'upi' | 'cash' | 'wallet') => Promise<Booking | null>;
  offerRide: (rideData: Partial<Ride>) => Promise<boolean>;
  triggerSOS: (bookingId?: string) => Promise<boolean>;
  topupWallet: (amount: number, method: string) => Promise<boolean>;
  updateBookingStatus: (bookingId: string, status: any, rating?: number, review?: string) => void;
  approveCaptainDoc: (captainId: string, status: 'verified' | 'rejected') => void;
  markNotificationRead: (id: string) => void;
  clearNotifications: () => void;
  activeTripProgress: number; // 0 to 100% simulation
  setActiveBooking: (b: Booking | null) => void;
}

const RideContext = createContext<RideContextType | undefined>(undefined);

export const RideProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [rides, setRides] = useState<Ride[]>(INITIAL_RIDES);
  const [bookings, setBookings] = useState<Booking[]>(INITIAL_BOOKINGS);
  const [transactions, setTransactions] = useState<Transaction[]>(INITIAL_TRANSACTIONS);
  const [notifications, setNotifications] = useState<Notification[]>(INITIAL_NOTIFICATIONS);
  const [sosAlerts, setSosAlerts] = useState<SOSAlert[]>([]);
  const [allCaptains, setAllCaptains] = useState<CaptainProfile[]>(MOCK_CAPTAINS);
  const [activeBooking, setActiveBooking] = useState<Booking | null>(INITIAL_BOOKINGS[0] || null);
  const [activeTripProgress, setActiveTripProgress] = useState<number>(35);

  // Fetch state on mount if API available
  useEffect(() => {
    api.getInitialState().then(data => {
      if (data) {
        if (data.rides?.length) setRides(data.rides);
        if (data.bookings?.length) setBookings(data.bookings);
        if (data.transactions?.length) setTransactions(data.transactions);
        if (data.notifications?.length) setNotifications(data.notifications);
        if (data.captains?.length) setAllCaptains(data.captains);
        if (data.sosAlerts?.length) setSosAlerts(data.sosAlerts);
      }
    });
  }, []);

  // Simulate active trip live progress
  useEffect(() => {
    if (!activeBooking || activeBooking.status === 'completed' || activeBooking.status === 'cancelled') return;

    const interval = setInterval(() => {
      setActiveTripProgress(prev => {
        if (prev >= 100) return 100;
        return prev + 2;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [activeBooking]);

  const searchRides = async (criteria: { pickup?: string; destination?: string; date?: string; vehicleType?: string; seats?: number; womenOnly?: boolean }) => {
    const apiResult = await api.searchRides(criteria);
    if (apiResult && apiResult.length > 0) {
      return apiResult;
    }

    // Local search filter
    return rides.filter(r => {
      if (r.status !== 'published') return false;
      if (criteria.vehicleType && criteria.vehicleType !== 'all' && r.vehicleType !== criteria.vehicleType) return false;
      if (criteria.womenOnly && !r.isWomenOnly) return false;
      if (criteria.seats && r.availableSeats < criteria.seats) return false;
      return true;
    });
  };

  const bookRide = async (rideId: string, seatsBooked: number, paymentMethod: 'upi' | 'cash' | 'wallet') => {
    const apiBooking = await api.bookRide(rideId, seatsBooked, paymentMethod);
    if (apiBooking) {
      setBookings(prev => [apiBooking, ...prev]);
      setActiveBooking(apiBooking);
      setRides(prev => prev.map(r => r.id === rideId ? { ...r, availableSeats: r.availableSeats - seatsBooked } : r));
      return apiBooking;
    }

    // Local fallback creation
    const ride = rides.find(r => r.id === rideId);
    if (!ride) return null;

    const totalFare = ride.pricePerSeat * seatsBooked;
    const platformFee = 15;
    const finalAmount = totalFare + platformFee;
    const otp = Math.floor(1000 + Math.random() * 9000).toString();

    const localBooking: Booking = {
      id: `bk_${Date.now()}`,
      rideId,
      passengerId: 'pass_101',
      passengerName: 'Ananya Sharma',
      passengerPhone: '+91 98765 43210',
      seatsBooked,
      totalFare,
      platformFee,
      finalAmount,
      paymentMethod,
      paymentStatus: 'completed',
      status: 'en_route',
      otp,
      bookedAt: new Date().toLocaleTimeString(),
      rideDetails: { ...ride }
    };

    setRides(prev => prev.map(r => r.id === rideId ? { ...r, availableSeats: r.availableSeats - seatsBooked } : r));
    setBookings(prev => [localBooking, ...prev]);
    setActiveBooking(localBooking);

    // Record Transaction
    setTransactions(prev => [{
      id: `tx_${Date.now()}`,
      userId: 'pass_101',
      type: 'debit',
      amount: finalAmount,
      description: `HopOn Fare - ${ride.pickup.address.split(',')[0]} to ${ride.destination.address.split(',')[0]}`,
      timestamp: new Date().toLocaleString(),
      method: paymentMethod,
      status: 'success'
    }, ...prev]);

    // Notification
    setNotifications(prev => [{
      id: `notif_${Date.now()}`,
      userId: 'pass_101',
      title: 'Booking Confirmed!',
      message: `Your ride with ${ride.captainName} is confirmed. Share OTP ${otp} upon boarding.`,
      timestamp: 'Just now',
      read: false,
      type: 'ride_update'
    }, ...prev]);

    return localBooking;
  };

  const offerRide = async (rideData: Partial<Ride>) => {
    const apiRide = await api.offerRide(rideData);
    if (apiRide) {
      setRides(prev => [apiRide, ...prev]);
      return true;
    }

    const localRide: Ride = {
      id: `ride_${Date.now()}`,
      captainId: 'cap_201',
      captainName: 'Vikram Singh',
      captainAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      captainRating: 4.9,
      captainPhone: '+91 98888 11223',
      vehicleType: rideData.vehicleType || 'car',
      vehicleModel: rideData.vehicleModel || 'Honda City',
      vehicleNumber: rideData.vehicleNumber || 'TS 09 MX 4821',
      vehiclePhoto: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=400&auto=format&fit=crop&q=80',
      pickup: rideData.pickup || { address: 'HITEC City Cyber Towers, Hyderabad, Telangana', lat: 17.4504, lng: 78.3808 },
      destination: rideData.destination || { address: 'Gachibowli DLF Cyber City, Hyderabad, Telangana', lat: 17.4401, lng: 78.3489 },
      departureTime: rideData.departureTime || '18:00',
      date: 'Today',
      pricePerSeat: Number(rideData.pricePerSeat) || 120,
      totalSeats: Number(rideData.totalSeats) || 3,
      availableSeats: Number(rideData.totalSeats) || 3,
      isWomenOnly: !!rideData.isWomenOnly,
      paymentMethods: rideData.paymentMethods || ['upi', 'cash'],
      status: 'published',
      estimatedDuration: '25 mins',
      distanceKm: 9.2
    };

    setRides(prev => [localRide, ...prev]);
    return true;
  };

  const triggerSOS = async (bookingId?: string) => {
    await api.triggerSOS(bookingId);
    
    const alert: SOSAlert = {
      id: `sos_${Date.now()}`,
      bookingId: bookingId || 'manual',
      passengerId: 'pass_101',
      passengerName: 'Ananya Sharma',
      passengerPhone: '+91 98765 43210',
      captainName: activeBooking?.rideDetails.captainName || 'Vikram Singh',
      captainPhone: activeBooking?.rideDetails.captainPhone || '+91 98888 11223',
      location: activeBooking?.rideDetails.pickup || { address: 'HITEC City Cyber Towers, Hyderabad, Telangana', lat: 17.4504, lng: 78.3808 },
      triggeredAt: new Date().toLocaleTimeString(),
      status: 'active',
      contactsAlerted: ['Rajesh Sharma (+91 98111 22334)', 'Priya Sharma (+91 98222 33445)']
    };

    setSosAlerts(prev => [alert, ...prev]);

    setNotifications(prev => [{
      id: `notif_sos_${Date.now()}`,
      userId: 'pass_101',
      title: 'EMERGENCY SOS BROADCASTED',
      message: 'Your live GPS location was dispatched to emergency contacts & HopOn Support Team.',
      timestamp: 'Just now',
      read: false,
      type: 'sos'
    }, ...prev]);

    return true;
  };

  const topupWallet = async (amount: number, method: string) => {
    await api.topupWallet(amount, method);
    
    setTransactions(prev => [{
      id: `tx_${Date.now()}`,
      userId: 'pass_101',
      type: 'credit',
      amount,
      description: `HopOn Wallet Topup via ${method.toUpperCase()}`,
      timestamp: new Date().toLocaleString(),
      method: method as any,
      status: 'success'
    }, ...prev]);

    return true;
  };

  const updateBookingStatus = (bookingId: string, status: any, rating?: number, review?: string) => {
    setBookings(prev => prev.map(b => {
      if (b.id === bookingId) {
        return { ...b, status, ratingGiven: rating || b.ratingGiven, reviewGiven: review || b.reviewGiven };
      }
      return b;
    }));
    if (activeBooking && activeBooking.id === bookingId) {
      setActiveBooking(prev => prev ? { ...prev, status, ratingGiven: rating || prev.ratingGiven, reviewGiven: review || prev.reviewGiven } : null);
    }
  };

  const approveCaptainDoc = async (captainId: string, status: 'verified' | 'rejected') => {
    await api.approveCaptain(captainId, status);
    setAllCaptains(prev => prev.map(c => c.id === captainId ? { ...c, verificationStatus: status } : c));
  };

  const markNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  return (
    <RideContext.Provider value={{
      rides,
      bookings,
      transactions,
      notifications,
      sosAlerts,
      activeBooking,
      allCaptains,
      searchRides,
      bookRide,
      offerRide,
      triggerSOS,
      topupWallet,
      updateBookingStatus,
      approveCaptainDoc,
      markNotificationRead,
      clearNotifications,
      activeTripProgress,
      setActiveBooking
    }}>
      {children}
    </RideContext.Provider>
  );
};

export const useRide = () => {
  const context = useContext(RideContext);
  if (!context) throw new Error('useRide must be used within RideProvider');
  return context;
};
