import { CaptainProfile, PassengerProfile, Ride, Booking, Transaction, Notification, SOSAlert } from '../types';

export const INITIAL_LOCATIONS = [
  { address: '⭐ TKR College of Engineering & Technology, Meerpet, Hyderabad, Telangana', lat: 17.3323, lng: 78.5375 },
  { address: 'LB Nagar Metro Station, Hyderabad, Telangana', lat: 17.3503, lng: 78.5494 },
  { address: 'HITEC City Cyber Towers, Hyderabad, Telangana', lat: 17.4504, lng: 78.3808 },
  { address: 'Gachibowli DLF Cyber City, Hyderabad, Telangana', lat: 17.4401, lng: 78.3489 },
  { address: 'Jubilee Hills Checkpost, Hyderabad, Telangana', lat: 17.4312, lng: 78.4072 },
  { address: 'Rajiv Gandhi Intl Airport (RGIA), Shamshabad, Telangana', lat: 17.2403, lng: 78.4294 },
  { address: 'Secunderabad Junction Station, Telangana', lat: 17.4334, lng: 78.5015 },
  { address: 'Kukatpally KPHB Colony, Hyderabad, Telangana', lat: 17.4947, lng: 78.3996 },
  { address: 'Warangal NIT Campus Gate, Telangana', lat: 17.9830, lng: 79.5300 },
];

export const MOCK_PASSENGER: PassengerProfile = {
  id: 'pass_101',
  name: 'Ananya Sharma',
  email: 'ananya.s@example.com',
  phone: '+91 98765 43210',
  role: 'passenger',
  avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
  createdAt: '2025-01-15',
  walletBalance: 450,
  womenOnlyPreference: true,
  preferredVehicle: 'car',
  emergencyContacts: [
    { id: 'ec_1', name: 'Rajesh Sharma (Father)', phone: '+91 98111 22334', relation: 'Father' },
    { id: 'ec_2', name: 'Priya Sharma (Sister)', phone: '+91 98222 33445', relation: 'Sister' },
  ]
};

export const MOCK_CAPTAINS: CaptainProfile[] = [
  {
    id: 'cap_201',
    name: 'Vikram Singh',
    email: 'vikram.captain@hopon.com',
    phone: '+91 98888 11223',
    role: 'captain',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    createdAt: '2024-11-10',
    rating: 4.9,
    totalRides: 342,
    vehicleType: 'car',
    vehicleModel: 'Honda City (Pearl White)',
    vehicleNumber: 'TS 09 MX 4821',
    vehiclePhoto: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=400&auto=format&fit=crop&q=80',
    verificationStatus: 'verified',
    documents: [
      { id: 'doc_1', type: 'license', title: 'Driving License', url: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&auto=format&fit=crop&q=80', uploadedAt: '2024-11-10', status: 'approved' },
      { id: 'doc_2', type: 'rc_book', title: 'RC Book (Registration)', url: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&auto=format&fit=crop&q=80', uploadedAt: '2024-11-10', status: 'approved' },
      { id: 'doc_3', type: 'insurance', title: 'Comprehensive Insurance', url: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?w=600&auto=format&fit=crop&q=80', uploadedAt: '2024-11-10', status: 'approved' },
      { id: 'doc_4', type: 'selfie', title: 'Driver Verification Photo', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80', uploadedAt: '2024-11-10', status: 'approved' }
    ],
    earnings: { today: 1250, thisWeek: 8400, total: 64200 },
    walletBalance: 2400,
    isOnline: true,
    acceptedPayments: ['upi', 'cash'],
    upiId: 'vikram@upi'
  },
  {
    id: 'cap_202',
    name: 'Neha Kapoor',
    email: 'neha.k@hopon.com',
    phone: '+91 97777 33445',
    role: 'captain',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    createdAt: '2024-12-01',
    rating: 4.95,
    totalRides: 189,
    vehicleType: 'car',
    vehicleModel: 'Hyundai i20 (Metallic Gray)',
    vehicleNumber: 'TS 07 HV 9901',
    vehiclePhoto: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=400&auto=format&fit=crop&q=80',
    verificationStatus: 'verified',
    documents: [
      { id: 'doc_5', type: 'license', title: 'Driving License', url: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&auto=format&fit=crop&q=80', uploadedAt: '2024-12-01', status: 'approved' }
    ],
    earnings: { today: 1800, thisWeek: 11200, total: 42000 },
    walletBalance: 3100,
    isOnline: true,
    acceptedPayments: ['upi', 'cash'],
    upiId: 'neha@okaxis'
  },
  {
    id: 'cap_203',
    name: 'Rahul Reddy',
    email: 'rahul.r@hopon.com',
    phone: '+91 96666 55443',
    role: 'captain',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    createdAt: '2025-01-05',
    rating: 4.8,
    totalRides: 410,
    vehicleType: 'bike',
    vehicleModel: 'Royal Enfield Hunter 350 (Black)',
    vehicleNumber: 'TS 08 EP 1209',
    vehiclePhoto: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=400&auto=format&fit=crop&q=80',
    verificationStatus: 'verified',
    documents: [],
    earnings: { today: 850, thisWeek: 5600, total: 38900 },
    walletBalance: 1250,
    isOnline: true,
    acceptedPayments: ['upi', 'cash'],
    upiId: 'rahul@ybl'
  },
  {
    id: 'cap_204',
    name: 'Aman Varma',
    email: 'aman.varma@example.com',
    phone: '+91 95555 88990',
    role: 'captain',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
    createdAt: '2026-02-01',
    rating: 0,
    totalRides: 0,
    vehicleType: 'car',
    vehicleModel: 'Tata Nexon EV (Signature Blue)',
    vehicleNumber: 'TS 10 EA 2026',
    vehiclePhoto: 'https://images.unsplash.com/photo-1563720223185-11003d516935?w=400&auto=format&fit=crop&q=80',
    verificationStatus: 'pending',
    documents: [
      { id: 'doc_10', type: 'license', title: 'Driving License', url: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&auto=format&fit=crop&q=80', uploadedAt: '2026-02-01', status: 'pending' },
      { id: 'doc_11', type: 'rc_book', title: 'RC Book Copy', url: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&auto=format&fit=crop&q=80', uploadedAt: '2026-02-01', status: 'pending' },
      { id: 'doc_12', type: 'selfie', title: 'Selfie Verification', url: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=400&auto=format&fit=crop&q=80', uploadedAt: '2026-02-01', status: 'pending' }
    ],
    earnings: { today: 0, thisWeek: 0, total: 0 },
    walletBalance: 0,
    isOnline: false,
    acceptedPayments: ['upi']
  }
];

export const INITIAL_RIDES: Ride[] = [
  {
    id: 'ride_301',
    captainId: 'cap_201',
    captainName: 'Vikram Singh',
    captainAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    captainRating: 4.9,
    captainPhone: '+91 98888 11223',
    vehicleType: 'car',
    vehicleModel: 'Honda City (Pearl White)',
    vehicleNumber: 'TS 09 MX 4821',
    vehiclePhoto: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=400&auto=format&fit=crop&q=80',
    pickup: INITIAL_LOCATIONS[1], // LB Nagar Metro Station
    destination: INITIAL_LOCATIONS[0], // ⭐ TKR College of Engineering & Technology, Meerpet
    departureTime: '17:30',
    date: 'Today',
    pricePerSeat: 60,
    totalSeats: 3,
    availableSeats: 2,
    isWomenOnly: false,
    paymentMethods: ['upi', 'cash'],
    status: 'published',
    estimatedDuration: '14 mins',
    distanceKm: 5.2,
    currentLocation: { lat: 17.3503, lng: 78.5494 }
  },
  {
    id: 'ride_302',
    captainId: 'cap_202',
    captainName: 'Neha Kapoor',
    captainAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    captainRating: 4.95,
    captainPhone: '+91 97777 33445',
    vehicleType: 'car',
    vehicleModel: 'Hyundai i20 (Metallic Gray)',
    vehicleNumber: 'TS 07 HV 9901',
    vehiclePhoto: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=400&auto=format&fit=crop&q=80',
    pickup: INITIAL_LOCATIONS[2], // HITEC City
    destination: INITIAL_LOCATIONS[0], // ⭐ TKR College of Engineering & Technology, Meerpet
    departureTime: '18:15',
    date: 'Today',
    pricePerSeat: 180,
    totalSeats: 3,
    availableSeats: 3,
    isWomenOnly: true,
    paymentMethods: ['upi', 'cash'],
    status: 'published',
    estimatedDuration: '38 mins',
    distanceKm: 24.5,
    currentLocation: { lat: 17.4504, lng: 78.3808 }
  },
  {
    id: 'ride_303',
    captainId: 'cap_203',
    captainName: 'Rahul Reddy',
    captainAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    captainRating: 4.8,
    captainPhone: '+91 96666 55443',
    vehicleType: 'bike',
    vehicleModel: 'Royal Enfield Hunter 350',
    vehicleNumber: 'TS 08 EP 1209',
    vehiclePhoto: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=400&auto=format&fit=crop&q=80',
    pickup: INITIAL_LOCATIONS[4], // Jubilee Hills
    destination: INITIAL_LOCATIONS[0], // ⭐ TKR College of Engineering & Technology, Meerpet
    departureTime: '17:45',
    date: 'Today',
    pricePerSeat: 90,
    totalSeats: 1,
    availableSeats: 1,
    isWomenOnly: false,
    paymentMethods: ['upi', 'cash'],
    status: 'published',
    estimatedDuration: '28 mins',
    distanceKm: 19.4,
    currentLocation: { lat: 17.4312, lng: 78.4072 }
  }
];

export const INITIAL_BOOKINGS: Booking[] = [
  {
    id: 'bk_401',
    rideId: 'ride_301',
    passengerId: 'pass_101',
    passengerName: 'Ananya Sharma',
    passengerPhone: '+91 98765 43210',
    seatsBooked: 1,
    totalFare: 60,
    platformFee: 15,
    finalAmount: 75,
    paymentMethod: 'upi',
    paymentStatus: 'completed',
    status: 'en_route',
    otp: '4829',
    bookedAt: '2026-08-06 16:40',
    rideDetails: INITIAL_RIDES[0]
  }
];

export const INITIAL_TRANSACTIONS: Transaction[] = [
  {
    id: 'tx_1',
    userId: 'pass_101',
    type: 'credit',
    amount: 500,
    description: 'Wallet Topup via UPI (GPay)',
    timestamp: '2026-08-05 14:20',
    method: 'upi',
    status: 'success'
  },
  {
    id: 'tx_2',
    userId: 'pass_101',
    type: 'debit',
    amount: 75,
    description: 'Ride Booking Fare - LB Nagar Metro to ⭐ TKR College Campus, Meerpet',
    timestamp: '2026-08-06 16:40',
    method: 'upi',
    status: 'success'
  }
];

export const INITIAL_NOTIFICATIONS: Notification[] = [
  {
    id: 'notif_1',
    userId: 'pass_101',
    title: 'Ride Confirmed!',
    message: 'Captain Vikram Singh accepted your ride request for LB Nagar to ⭐ TKR College Campus, Meerpet. OTP: 4829',
    timestamp: '10 mins ago',
    read: false,
    type: 'ride_update'
  },
  {
    id: 'notif_2',
    userId: 'pass_101',
    title: 'TKR Campus Safety Shield Active',
    message: 'TKR College Campus Safety Route Verification is active on your profile.',
    timestamp: '2 hours ago',
    read: true,
    type: 'system'
  }
];
