import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserRole, PassengerProfile, CaptainProfile, User } from '../types';
import { MOCK_PASSENGER, MOCK_CAPTAINS } from '../data/mockData';

interface AuthContextType {
  role: UserRole;
  user: User | null;
  passengerProfile: PassengerProfile;
  captainProfile: CaptainProfile;
  isAuthenticated: boolean;
  activePortal: 'landing' | 'passenger' | 'captain' | 'admin' | 'auth' | 'passenger-login' | 'captain-login';
  authMode: 'login' | 'signup';
  loginRole: 'passenger' | 'captain';
  setRole: (role: UserRole) => void;
  setActivePortal: (portal: 'landing' | 'passenger' | 'captain' | 'admin' | 'auth' | 'passenger-login' | 'captain-login') => void;
  openAuthModal: (role: 'passenger' | 'captain', mode?: 'login' | 'signup') => void;
  openPassengerLogin: () => void;
  openCaptainLogin: () => void;
  login: (emailOrPhone: string, pass: string, role: 'passenger' | 'captain') => void;
  signup: (userData: any, role: 'passenger' | 'captain') => void;
  logout: () => void;
  updatePassengerProfile: (updated: Partial<PassengerProfile>) => void;
  updateCaptainProfile: (updated: Partial<CaptainProfile>) => void;
  switchDemoUser: (role: UserRole) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<UserRole>('passenger');
  const [activePortal, setActivePortal] = useState<'landing' | 'passenger' | 'captain' | 'admin' | 'auth' | 'passenger-login' | 'captain-login'>('landing');
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [loginRole, setLoginRole] = useState<'passenger' | 'captain'>('passenger');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const [passengerProfile, setPassengerProfile] = useState<PassengerProfile>(MOCK_PASSENGER);
  const [captainProfile, setCaptainProfile] = useState<CaptainProfile>(MOCK_CAPTAINS[0]);

  const user: User = role === 'captain' ? captainProfile : role === 'admin' ? {
    id: 'admin_1',
    name: 'Admin Command Center',
    email: 'admin@hopon.com',
    phone: '+91 80000 00000',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    createdAt: '2024-01-01'
  } : passengerProfile;

  const openAuthModal = (roleTarget: 'passenger' | 'captain', mode: 'login' | 'signup' = 'login') => {
    setLoginRole(roleTarget);
    setAuthMode(mode);
    if (roleTarget === 'passenger') {
      setActivePortal('passenger-login');
    } else {
      setActivePortal('captain-login');
    }
  };

  const openPassengerLogin = () => {
    setLoginRole('passenger');
    setAuthMode('login');
    setActivePortal('passenger-login');
  };

  const openCaptainLogin = () => {
    setLoginRole('captain');
    setAuthMode('login');
    setActivePortal('captain-login');
  };

  const login = (emailOrPhone: string, pass: string, targetRole: 'passenger' | 'captain') => {
    setRole(targetRole);
    setIsAuthenticated(true);
    if (targetRole === 'passenger') {
      setActivePortal('passenger');
    } else {
      setActivePortal('captain');
    }
  };

  const signup = (userData: any, targetRole: 'passenger' | 'captain') => {
    if (targetRole === 'passenger') {
      setPassengerProfile(prev => ({ ...prev, name: userData.fullName || prev.name, email: userData.email || prev.email, phone: userData.phone || prev.phone }));
      setRole('passenger');
      setActivePortal('passenger');
    } else {
      setCaptainProfile(prev => ({
        ...prev,
        name: userData.fullName || prev.name,
        email: userData.email || prev.email,
        phone: userData.phone || prev.phone,
        vehicleType: userData.vehicleType || 'car',
        vehicleModel: userData.vehicleModel || 'Honda Amaze',
        vehicleNumber: userData.vehicleNumber || 'KA 05 EV 1008',
        verificationStatus: 'pending'
      }));
      setRole('captain');
      setActivePortal('captain');
    }
    setIsAuthenticated(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setActivePortal('landing');
  };

  const updatePassengerProfile = (updated: Partial<PassengerProfile>) => {
    setPassengerProfile(prev => ({ ...prev, ...updated }));
  };

  const updateCaptainProfile = (updated: Partial<CaptainProfile>) => {
    setCaptainProfile(prev => ({ ...prev, ...updated }));
  };

  const switchDemoUser = (targetRole: UserRole) => {
    setRole(targetRole);
    setIsAuthenticated(true);
    if (targetRole === 'passenger') setActivePortal('passenger');
    else if (targetRole === 'captain') setActivePortal('captain');
    else if (targetRole === 'admin') setActivePortal('admin');
  };

  return (
    <AuthContext.Provider value={{
      role,
      user,
      passengerProfile,
      captainProfile,
      isAuthenticated,
      activePortal,
      authMode,
      loginRole,
      setRole,
      setActivePortal,
      openAuthModal,
      openPassengerLogin,
      openCaptainLogin,
      login,
      signup,
      logout,
      updatePassengerProfile,
      updateCaptainProfile,
      switchDemoUser
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
