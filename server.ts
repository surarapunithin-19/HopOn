import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { Booking } from './src/types/index.js';
import { INITIAL_RIDES, INITIAL_BOOKINGS, MOCK_CAPTAINS, MOCK_PASSENGER, INITIAL_TRANSACTIONS, INITIAL_NOTIFICATIONS } from './src/data/mockData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// In-memory data store for live persistence during container session
let ridesStore = [...INITIAL_RIDES];
let bookingsStore = [...INITIAL_BOOKINGS];
let captainsStore = [...MOCK_CAPTAINS];
let passengerStore = { ...MOCK_PASSENGER };
let transactionsStore = [...INITIAL_TRANSACTIONS];
let notificationsStore = [...INITIAL_NOTIFICATIONS];
let sosAlertsStore: any[] = [];

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '10mb' }));

  // API Routes
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', time: new Date().toISOString() });
  });

  // Get current initial data
  app.get('/api/initial-state', (req, res) => {
    res.json({
      passenger: passengerStore,
      captains: captainsStore,
      rides: ridesStore,
      bookings: bookingsStore,
      transactions: transactionsStore,
      notifications: notificationsStore,
      sosAlerts: sosAlertsStore
    });
  });

  // Ride Search API
  app.post('/api/rides/search', (req, res) => {
    const { vehicleType, seats, womenOnly, date } = req.body;
    let results = ridesStore.filter(r => r.status === 'published' && r.availableSeats >= (seats || 1));
    
    if (vehicleType && vehicleType !== 'all') {
      results = results.filter(r => r.vehicleType === vehicleType);
    }
    if (womenOnly) {
      results = results.filter(r => r.isWomenOnly === true);
    }
    res.json({ success: true, count: results.length, rides: results });
  });

  // Offer Ride (Captain)
  app.post('/api/rides/offer', (req, res) => {
    const rideData = req.body;
    const newRide = {
      id: `ride_${Date.now()}`,
      status: 'published',
      availableSeats: Number(rideData.totalSeats),
      ...rideData
    };
    ridesStore.unshift(newRide);
    res.json({ success: true, ride: newRide });
  });

  // Book Ride (Passenger)
  app.post('/api/rides/book', (req, res) => {
    const { rideId, seatsBooked, paymentMethod } = req.body;
    const ride = ridesStore.find(r => r.id === rideId);
    if (!ride) {
      return res.status(404).json({ success: false, message: 'Ride not found' });
    }
    if (ride.availableSeats < seatsBooked) {
      return res.status(400).json({ success: false, message: 'Not enough seats available' });
    }

    // Deduct seats
    ride.availableSeats -= seatsBooked;

    const totalFare = ride.pricePerSeat * seatsBooked;
    const platformFee = Math.round(totalFare * 0.1) || 15;
    const finalAmount = totalFare + platformFee;
    const otp = Math.floor(1000 + Math.random() * 9000).toString();

    const newBooking: Booking = {
      id: `bk_${Date.now()}`,
      rideId,
      passengerId: passengerStore.id,
      passengerName: passengerStore.name,
      passengerPhone: passengerStore.phone,
      seatsBooked,
      totalFare,
      platformFee,
      finalAmount,
      paymentMethod: paymentMethod as 'upi' | 'cash' | 'wallet',
      paymentStatus: 'completed',
      status: 'published',
      otp,
      bookedAt: new Date().toLocaleString('en-US', { hour12: false }),
      rideDetails: { ...ride }
    };

    bookingsStore.unshift(newBooking);

    // Record Transaction
    transactionsStore.unshift({
      id: `tx_${Date.now()}`,
      userId: passengerStore.id,
      type: 'debit',
      amount: finalAmount,
      description: `HopOn Ride Booking (${ride.pickup.address.split(',')[0]} to ${ride.destination.address.split(',')[0]})`,
      timestamp: new Date().toLocaleString(),
      method: paymentMethod,
      status: 'success'
    });

    // Add Notification
    notificationsStore.unshift({
      id: `notif_${Date.now()}`,
      userId: passengerStore.id,
      title: 'Ride Booked Successfully!',
      message: `Your ride with ${ride.captainName} is confirmed. Start OTP: ${otp}`,
      timestamp: 'Just now',
      read: false,
      type: 'ride_update'
    });

    res.json({ success: true, booking: newBooking });
  });

  // Update Ride Status (Start, Complete, Cancel)
  app.post('/api/rides/update-status', (req, res) => {
    const { bookingId, status, rating, review } = req.body;
    const booking = bookingsStore.find(b => b.id === bookingId);
    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }

    booking.status = status;
    const ride = ridesStore.find(r => r.id === booking.rideId);
    if (ride) ride.status = status;

    if (rating) {
      booking.ratingGiven = rating;
      booking.reviewGiven = review;
    }

    res.json({ success: true, booking });
  });

  // Emergency SOS Trigger
  app.post('/api/sos/trigger', (req, res) => {
    const { bookingId, location } = req.body;
    const newAlert = {
      id: `sos_${Date.now()}`,
      bookingId: bookingId || 'manual',
      passengerId: passengerStore.id,
      passengerName: passengerStore.name,
      passengerPhone: passengerStore.phone,
      captainName: 'Vikram Singh',
      captainPhone: '+91 98888 11223',
      location: location || { address: 'HITEC City Cyber Towers, Hyderabad, Telangana', lat: 17.4504, lng: 78.3808 },
      triggeredAt: new Date().toLocaleTimeString(),
      status: 'active',
      contactsAlerted: passengerStore.emergencyContacts.map(c => `${c.name} (${c.phone})`)
    };

    sosAlertsStore.unshift(newAlert);

    notificationsStore.unshift({
      id: `notif_sos_${Date.now()}`,
      userId: 'admin',
      title: 'EMERGENCY SOS ALERT TRIGGERED!',
      message: `Passenger ${passengerStore.name} pressed SOS button at ${newAlert.location.address}`,
      timestamp: 'Just now',
      read: false,
      type: 'sos'
    });

    res.json({ success: true, alert: newAlert });
  });

  // Captain Verification Document Upload / Approval
  app.post('/api/captain/approve', (req, res) => {
    const { captainId, status } = req.body;
    const captain = captainsStore.find(c => c.id === captainId);
    if (captain) {
      captain.verificationStatus = status;
      captain.documents.forEach(d => d.status = status === 'verified' ? 'approved' : 'rejected');
      res.json({ success: true, captain });
    } else {
      res.status(404).json({ success: false, message: 'Captain not found' });
    }
  });

  // Wallet Top Up
  app.post('/api/wallet/topup', (req, res) => {
    const { amount, method } = req.body;
    passengerStore.walletBalance += Number(amount);

    transactionsStore.unshift({
      id: `tx_${Date.now()}`,
      userId: passengerStore.id,
      type: 'credit',
      amount: Number(amount),
      description: `Wallet Top-up via ${method.toUpperCase()}`,
      timestamp: new Date().toLocaleString(),
      method,
      status: 'success'
    });

    res.json({ success: true, balance: passengerStore.walletBalance });
  });

  // Admin Dashboard Overview Stats
  app.get('/api/admin/stats', (req, res) => {
    const totalRides = ridesStore.length + 1240;
    const activeCaptains = captainsStore.filter(c => c.isOnline).length + 42;
    const totalEarnings = 184500;
    const pendingVerifications = captainsStore.filter(c => c.verificationStatus === 'pending');

    res.json({
      success: true,
      stats: {
        totalRides,
        activeCaptains,
        totalEarnings,
        pendingVerificationsCount: pendingVerifications.length,
        activeSosCount: sosAlertsStore.filter(s => s.status === 'active').length
      }
    });
  });

  // Vite development middleware or production static serving
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`HopOn server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
