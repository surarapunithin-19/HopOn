import React, { useState } from 'react';
import { User, Mail, Phone, Lock, Eye, EyeOff, ShieldCheck, ArrowRight, Sparkles, CheckCircle2, Wallet, Navigation, MapPin } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const PassengerLoginPortal: React.FC = () => {
  const { login, signup, setActivePortal, openCaptainLogin } = useAuth();

  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [loginType, setLoginType] = useState<'email' | 'mobile'>('email');

  // Form fields
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // OTP State
  const [showOtpStep, setShowOtpStep] = useState(false);
  const [otpCode, setOtpCode] = useState(['5', '9', '1', '2']);

  const handleDemoPassengerLogin = () => {
    login('ananya@example.com', 'pass123', 'passenger');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginType === 'mobile' && !showOtpStep) {
      setShowOtpStep(true);
      return;
    }

    if (mode === 'login') {
      login(emailOrPhone || 'ananya@example.com', password || 'pass123', 'passenger');
    } else {
      signup({ fullName: fullName || 'Ananya Sharma', email: emailOrPhone, phone: emailOrPhone }, 'passenger');
    }
  };

  return (
    <div className="min-h-[80vh] py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto flex flex-col justify-center">
      
      {/* Portal Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3 mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 text-xs font-black uppercase tracking-wider">
          <User className="h-4 w-4 text-blue-600" /> Passenger Commute Portal
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
          Welcome Back, Passenger!
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
          Sign in to access your saved commutes, upcoming pooled rides, HopOn wallet cashbacks, and 24/7 emergency safety network.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Left Side: Passenger Benefits Card */}
        <div className="lg:col-span-5 bg-gradient-to-br from-blue-600 via-indigo-600 to-blue-800 text-white p-8 rounded-3xl shadow-xl flex flex-col justify-between space-y-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-white/10 blur-2xl pointer-events-none" />

          <div className="space-y-6 relative z-10">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold uppercase tracking-widest text-blue-200">HopOn Passenger Features</span>
              <span className="px-3 py-1 rounded-full bg-white/20 text-[10px] font-black uppercase">Verified Community</span>
            </div>

            <h2 className="text-2xl font-black leading-tight">
              Affordable Daily Commutes with Total Peace of Mind
            </h2>

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-white/10 shrink-0">
                  <ShieldCheck className="h-5 w-5 text-emerald-300" />
                </div>
                <div>
                  <h3 className="font-extrabold text-sm text-white">24/7 SOS Emergency Protection</h3>
                  <p className="text-xs text-blue-100/80">Real-time GPS trip tracking and instant alert dispatch to contacts and police hotline.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-white/10 shrink-0">
                  <Wallet className="h-5 w-5 text-amber-300" />
                </div>
                <div>
                  <h3 className="font-extrabold text-sm text-white">Instant UPI & HopOn Wallet</h3>
                  <p className="text-xs text-blue-100/80">Pay seamlessly via GooglePay, PhonePe, Paytm, or direct wallet cashback points.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-white/10 shrink-0">
                  <Navigation className="h-5 w-5 text-cyan-300" />
                </div>
                <div>
                  <h3 className="font-extrabold text-sm text-white">Verified Local Captains</h3>
                  <p className="text-xs text-blue-100/80">Every captain undergoes mandatory government ID, driving license, and police verification.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-white/20 flex items-center justify-between relative z-10">
            <div className="text-xs font-bold text-blue-200">Are you a driver?</div>
            <button
              onClick={openCaptainLogin}
              className="px-4 py-2 rounded-xl bg-white text-blue-900 text-xs font-extrabold hover:bg-blue-50 transition shadow"
            >
              Go to Captain Portal ➔
            </button>
          </div>
        </div>

        {/* Right Side: Login / Register Form */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-3xl shadow-xl flex flex-col justify-between space-y-6">
          
          <div>
            {/* Tab Header for Login vs Signup */}
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4 mb-6">
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => { setMode('login'); setShowOtpStep(false); }}
                  className={`px-5 py-2.5 rounded-2xl text-xs font-extrabold transition ${
                    mode === 'login'
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                  }`}
                >
                  Passenger Sign In
                </button>
                <button
                  type="button"
                  onClick={() => { setMode('signup'); setShowOtpStep(false); }}
                  className={`px-5 py-2.5 rounded-2xl text-xs font-extrabold transition ${
                    mode === 'signup'
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                  }`}
                >
                  New Passenger Register
                </button>
              </div>

              {/* Quick Demo Login */}
              <button
                type="button"
                onClick={handleDemoPassengerLogin}
                className="px-3.5 py-1.5 rounded-full bg-amber-100 dark:bg-amber-900/60 text-amber-800 dark:text-amber-300 text-xs font-extrabold hover:bg-amber-200 transition flex items-center gap-1"
              >
                <Sparkles className="h-3.5 w-3.5 text-amber-600" />
                ⚡ Demo Passenger Sign In
              </button>
            </div>

            {/* Login Type Selector */}
            <div className="flex justify-center gap-6 text-xs font-bold text-slate-500 border-b border-slate-100 dark:border-slate-800 pb-3 mb-6">
              <button
                type="button"
                onClick={() => { setLoginType('email'); setShowOtpStep(false); }}
                className={`pb-1 flex items-center gap-1.5 transition ${
                  loginType === 'email' ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 font-black' : 'hover:text-slate-800'
                }`}
              >
                <Mail className="h-4 w-4" /> Email & Password
              </button>
              <button
                type="button"
                onClick={() => { setLoginType('mobile'); setShowOtpStep(false); }}
                className={`pb-1 flex items-center gap-1.5 transition ${
                  loginType === 'mobile' ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 font-black' : 'hover:text-slate-800'
                }`}
              >
                <Phone className="h-4 w-4" /> Mobile OTP Login
              </button>
            </div>

            {showOtpStep ? (
              /* OTP Form */
              <div className="space-y-6 py-4 text-center">
                <div className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800/60 text-xs text-slate-700 dark:text-slate-200">
                  OTP code sent to mobile number <span className="font-extrabold text-blue-600">{emailOrPhone || '+91 98765 43210'}</span>
                </div>

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
                      className="w-12 h-12 text-center font-mono font-black text-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ))}
                </div>

                <button
                  type="button"
                  onClick={handleSubmit}
                  className="w-full py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-black text-xs shadow-lg shadow-blue-500/25 transition"
                >
                  Verify OTP & Open Passenger Dashboard
                </button>
                <button
                  type="button"
                  onClick={() => setShowOtpStep(false)}
                  className="text-xs font-bold text-slate-500 hover:underline"
                >
                  ← Edit Phone Number
                </button>
              </div>
            ) : (
              /* Main Form */
              <form onSubmit={handleSubmit} className="space-y-4">
                
                {mode === 'signup' && (
                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Passenger Full Name</label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Ananya Sharma"
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-xs font-semibold text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                )}

                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    {loginType === 'email' ? 'Registered Email Address' : 'Mobile Number'}
                  </label>
                  <input
                    type={loginType === 'email' ? 'email' : 'tel'}
                    required
                    value={emailOrPhone}
                    onChange={(e) => setEmailOrPhone(e.target.value)}
                    placeholder={loginType === 'email' ? 'ananya@example.com' : '+91 98765 43210'}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-xs font-semibold text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                {loginType === 'email' && (
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Password</label>
                      {mode === 'login' && (
                        <button
                          type="button"
                          onClick={() => alert('Password reset instructions sent to your email.')}
                          className="text-[11px] font-bold text-blue-600 hover:underline"
                        >
                          Forgot Password?
                        </button>
                      )}
                    </div>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-xs font-semibold text-slate-900 dark:text-white pr-10 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3.5 text-slate-400"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between text-xs pt-1">
                  <label className="flex items-center gap-2 cursor-pointer font-semibold text-slate-600 dark:text-slate-400">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="rounded text-blue-600"
                    />
                    Keep Passenger Session Logged In
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-black text-xs shadow-lg shadow-blue-500/25 transition active:scale-95 flex items-center justify-center gap-2"
                >
                  {mode === 'login' ? 'Sign In to Passenger Portal' : 'Register Passenger Account'}
                  <ArrowRight className="h-4 w-4" />
                </button>
              </form>
            )}

          </div>

          <div className="text-center pt-4 border-t border-slate-100 dark:border-slate-800">
            <button
              onClick={() => setActivePortal('landing')}
              className="text-xs font-extrabold text-slate-500 hover:text-slate-800 dark:hover:text-white transition"
            >
              ← Back to Main Homepage
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
