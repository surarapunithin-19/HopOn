export type UserRole = 'passenger' | 'captain' | 'admin';

export type VehicleType = 'bike' | 'car';

export type VerificationStatus = 'pending' | 'verified' | 'rejected' | 'unsubmitted';

export type RideStatus = 'published' | 'booked' | 'en_route' | 'in_progress' | 'completed' | 'cancelled';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  avatar: string;
  createdAt: string;
  rating?: number;
  totalRides?: number;
}

export interface EmergencyContact {
  id: string;
  name: string;
  phone: string;
  relation: string;
}

export interface PassengerProfile extends User {
  emergencyContacts: EmergencyContact[];
  womenOnlyPreference: boolean;
  preferredVehicle?: VehicleType;
  walletBalance: number;
}

export interface CaptainDocument {
  id: string;
  type: 'rc_book' | 'insurance' | 'license' | 'selfie';
  title: string;
  url: string;
  uploadedAt: string;
  status: 'pending' | 'approved' | 'rejected';
}

export interface CaptainProfile extends User {
  vehicleType: VehicleType;
  vehicleModel: string;
  vehicleNumber: string;
  vehiclePhoto: string;
  verificationStatus: VerificationStatus;
  documents: CaptainDocument[];
  earnings: {
    today: number;
    thisWeek: number;
    total: number;
  };
  walletBalance: number;
  isOnline: boolean;
  acceptedPayments: ('upi' | 'cash')[];
  upiId?: string;
}

export interface LocationPoint {
  address: string;
  lat: number;
  lng: number;
}

export interface Ride {
  id: string;
  captainId: string;
  captainName: string;
  captainAvatar: string;
  captainRating: number;
  captainPhone: string;
  vehicleType: VehicleType;
  vehicleModel: string;
  vehicleNumber: string;
  vehiclePhoto: string;
  pickup: LocationPoint;
  destination: LocationPoint;
  departureTime: string; // ISO string or format
  date: string;
  pricePerSeat: number;
  totalSeats: number;
  availableSeats: number;
  isWomenOnly: boolean;
  paymentMethods: ('upi' | 'cash')[];
  status: RideStatus;
  estimatedDuration: string; // e.g. "25 mins"
  distanceKm: number; // e.g. 12.5
  currentLocation?: { lat: number; lng: number };
}

export interface Booking {
  id: string;
  rideId: string;
  passengerId: string;
  passengerName: string;
  passengerPhone: string;
  seatsBooked: number;
  totalFare: number;
  platformFee: number;
  finalAmount: number;
  paymentMethod: 'upi' | 'cash' | 'wallet';
  paymentStatus: 'pending' | 'completed' | 'refunded';
  status: RideStatus;
  otp: string; // Start ride OTP
  bookedAt: string;
  ratingGiven?: number;
  reviewGiven?: string;
  rideDetails: Ride;
}

export interface Transaction {
  id: string;
  userId: string;
  type: 'credit' | 'debit';
  amount: number;
  description: string;
  timestamp: string;
  method: 'upi' | 'card' | 'cash' | 'wallet';
  status: 'success' | 'pending' | 'failed';
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: 'ride_update' | 'payment' | 'verification' | 'sos' | 'system';
}

export interface SOSAlert {
  id: string;
  bookingId: string;
  passengerId: string;
  passengerName: string;
  passengerPhone: string;
  captainName: string;
  captainPhone: string;
  location: LocationPoint;
  triggeredAt: string;
  status: 'active' | 'resolved';
  contactsAlerted: string[];
}
