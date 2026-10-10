import React, { useState } from 'react';
import { X, Mail, Phone, Lock, Eye, EyeOff, CheckCircle2, Upload, Car, Bike, ShieldCheck, ArrowRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const { loginRole, authMode, login, signup } = useAuth();

  const [mode, setMode] = useState<'login' | 'signup'>(authMode);
  const [role, setRole] = useState<'passenger' | 'captain'>(loginRole);
  const [loginType, setLoginType] = useState<'email' | 'mobile'>('email');
  
  // Fields
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // OTP Step
  const [showOtpStep, setShowOtpStep] = useState(false);
  const [otpCode, setOtpCode] = useState(['4', '8', '2', '9']);

  // Forgot Password
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  // Captain Extra Fields
  const [vehicleType, setVehicleType] = useState<'bike' | 'car'>('car');
  const [vehicleModel, setVehicleModel] = useState('Honda City');
  const [vehicleNumber, setVehicleNumber] = useState('KA 03 MX 4821');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginType === 'mobile' && !showOtpStep) {
      setShowOtpStep(true);
      return;
    }

    if (mode === 'login') {
      login(emailOrPhone || 'demo@hopon.com', password || '123456', role);
    } else {
      signup({ fullName, email: emailOrPhone, phone: emailOrPhone, vehicleType, vehicleModel, vehicleNumber }, role);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        
        {/* Close */}
        <button onClick={onClose} className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-white rounded-full bg-slate-100 dark:bg-slate-800">
          <X className="h-5 w-5" />
        </button>

        {/* Header Role Selector */}
        <div className="text-center space-y-3 mb-6">
          <div className="inline-flex p-1 rounded-2xl bg-slate-100 dark:bg-slate-800">
            <button
              type="button"
              onClick={() => setRole('passenger')}
              className={`px-5 py-2 rounded-xl text-xs font-bold transition ${role === 'passenger' ? 'bg-blue-600 text-white shadow' : 'text-slate-600 dark:text-slate-300'}`}
            >
              Passenger
            </button>
            <button
              type="button"
              onClick={() => setRole('captain')}
              className={`px-5 py-2 rounded-xl text-xs font-bold transition ${role === 'captain' ? 'bg-blue-600 text-white shadow' : 'text-slate-600 dark:text-slate-300'}`}
            >
              Captain (Driver)
            </button>
          </div>

          <h3 className="text-2xl font-black text-slate-900 dark:text-white">
            {showForgotPassword ? 'Reset Password' : mode === 'login' ? `Sign In as ${role === 'passenger' ? 'Passenger' : 'Captain'}` : `Create ${role === 'passenger' ? 'Passenger' : 'Captain'} Account`}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {role === 'captain' ? 'Join our high-earning verified driver network' : 'Book affordable daily rides in seconds'}
          </p>
        </div>

        {/* Forgot Password View */}
        {showForgotPassword ? (
          <form onSubmit={(e) => { e.preventDefault(); setShowForgotPassword(false); alert('Password reset link sent to your registered email/phone.'); }} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Enter Registered Email or Mobile</label>
              <input
                type="text"
                required
                placeholder="ananya@example.com or +91 9876543210"
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-xs font-semibold"
              />
            </div>
            <button type="submit" className="w-full py-3 rounded-xl bg-blue-600 text-white font-bold text-xs">Send Reset Link</button>
            <button type="button" onClick={() => setShowForgotPassword(false)} className="w-full text-center text-xs text-slate-500 font-bold">Back to Login</button>
          </form>
        ) : showOtpStep ? (
          /* OTP Verification Step */
          <div className="space-y-6 text-center">
            <p className="text-xs text-slate-600 dark:text-slate-300">
              We sent a 4-digit verification code to <span className="font-bold text-blue-600">{emailOrPhone || '+91 98765 43210'}</span>
            </p>

            <div className="flex justify-center gap-3">
              {otpCode.map((digit, idx) => (
                <input
                  key={idx}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => {
                    const newOtp = [...otpCode];
                    newOtp[idx] = e.target.value;
                    setOtpCode(newOtp);
                  }}
                  className="w-12 h-12 text-center font-mono font-black text-lg bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ))}
            </div>

            <button
              onClick={handleSubmit}
              className="w-full py-3.5 rounded-xl bg-blue-600 text-white font-black text-xs shadow-md shadow-blue-500/20"
            >
              Verify & Proceed
            </button>
            <button type="button" onClick={() => setShowOtpStep(false)} className="text-xs text-slate-500 font-bold">Change Login Method</button>
          </div>
        ) : (
          /* Main Auth Form */
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Toggle Email vs Mobile */}
            <div className="flex justify-center gap-4 text-xs font-bold text-slate-500 border-b border-slate-100 dark:border-slate-800 pb-2">
              <button
                type="button"
                onClick={() => setLoginType('email')}
                className={`pb-1 flex items-center gap-1 ${loginType === 'email' ? 'text-blue-600 border-b-2 border-blue-600 font-extrabold' : ''}`}
              >
                <Mail className="h-3.5 w-3.5" /> Email Login
              </button>
              <button
                type="button"
                onClick={() => setLoginType('mobile')}
                className={`pb-1 flex items-center gap-1 ${loginType === 'mobile' ? 'text-blue-600 border-b-2 border-blue-600 font-extrabold' : ''}`}
              >
                <Phone className="h-3.5 w-3.5" /> Mobile OTP
              </button>
            </div>

            {mode === 'signup' && (
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Ananya Sharma"
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-xs font-semibold text-slate-900 dark:text-white"
                />
              </div>
            )}

            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                {loginType === 'email' ? 'Email Address' : 'Mobile Number'}
              </label>
              <input
                type={loginType === 'email' ? 'email' : 'tel'}
                required
                value={emailOrPhone}
                onChange={(e) => setEmailOrPhone(e.target.value)}
                placeholder={loginType === 'email' ? 'name@example.com' : '+91 98765 43210'}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-xs font-semibold text-slate-900 dark:text-white"
              />
            </div>

            {loginType === 'email' && (
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Password</label>
                  {mode === 'login' && (
                    <button type="button" onClick={() => setShowForgotPassword(true)} className="text-[11px] font-bold text-blue-600 hover:underline">Forgot Password?</button>
                  )}
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-xs font-semibold text-slate-900 dark:text-white pr-10"
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3.5 text-slate-400">
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
            )}

            {/* Captain Extra Fields for Signup */}
            {role === 'captain' && mode === 'signup' && (
              <div className="p-4 bg-blue-50/50 dark:bg-blue-950/30 rounded-2xl border border-blue-200 dark:border-blue-800/60 space-y-3">
                <div className="text-xs font-extrabold text-blue-700 dark:text-blue-300 uppercase tracking-wider">Vehicle Details</div>
                
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setVehicleType('car')}
                    className={`flex-1 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1 ${vehicleType === 'car' ? 'bg-blue-600 text-white' : 'bg-white dark:bg-slate-800 text-slate-600'}`}
                  >
                    <Car className="h-3.5 w-3.5" /> Car
                  </button>
                  <button
                    type="button"
                    onClick={() => setVehicleType('bike')}
                    className={`flex-1 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1 ${vehicleType === 'bike' ? 'bg-blue-600 text-white' : 'bg-white dark:bg-slate-800 text-slate-600'}`}
                  >
                    <Bike className="h-3.5 w-3.5" /> Bike
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={vehicleModel}
                    onChange={(e) => setVehicleModel(e.target.value)}
                    placeholder="Model (e.g. Honda City)"
                    className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs font-semibold"
                  />
                  <input
                    type="text"
                    value={vehicleNumber}
                    onChange={(e) => setVehicleNumber(e.target.value)}
                    placeholder="Plate (e.g. KA 03 MX 4821)"
                    className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs font-semibold"
                  />
                </div>
              </div>
            )}

            {/* Remember Me */}
            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 cursor-pointer font-semibold text-slate-600 dark:text-slate-400">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded text-blue-600"
                />
                Remember Me
              </label>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black text-xs shadow-md shadow-blue-500/20 transition"
            >
              {mode === 'login' ? 'Sign In to Dashboard' : 'Register Account'}
            </button>

            {/* Google OAuth Placeholder */}
            <div className="relative py-2">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200 dark:border-slate-800" /></div>
              <div className="relative flex justify-center text-[10px] text-slate-400 uppercase font-bold bg-white dark:bg-slate-900 px-2">or continue with</div>
            </div>

            <button
              type="button"
              onClick={handleSubmit}
              className="w-full py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 font-bold text-xs text-slate-700 dark:text-slate-200 flex items-center justify-center gap-2 transition"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
              Google Sign In
            </button>

            {/* Toggle Mode */}
            <div className="text-center pt-2 text-xs font-semibold text-slate-500">
              {mode === 'login' ? "Don't have an account? " : "Already have an account? "}
              <button
                type="button"
                onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
                className="text-blue-600 font-black hover:underline"
              >
                {mode === 'login' ? 'Create One' : 'Sign In'}
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
