import React, { useState } from 'react';
import { Car, Bike, Mail, Phone, Lock, Eye, EyeOff, ShieldCheck, ArrowRight, Sparkles, CheckCircle2, DollarSign, Award, FileText } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const CaptainLoginPortal: React.FC = () => {
  const { login, signup, setActivePortal, openPassengerLogin } = useAuth();

  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [loginType, setLoginType] = useState<'email' | 'mobile'>('email');

  // Form fields
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [vehicleType, setVehicleType] = useState<'car' | 'bike'>('car');
  const [vehicleModel, setVehicleModel] = useState('Honda Amaze');
  const [vehicleNumber, setVehicleNumber] = useState('KA 05 EV 1008');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // OTP State
  const [showOtpStep, setShowOtpStep] = useState(false);
  const [otpCode, setOtpCode] = useState(['8', '4', '2', '0']);

  const handleDemoCaptainLogin = () => {
    login('vikram@hopon.com', 'pass123', 'captain');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginType === 'mobile' && !showOtpStep) {
      setShowOtpStep(true);
      return;
    }

    if (mode === 'login') {
      login(emailOrPhone || 'vikram@hopon.com', password || 'pass123', 'captain');
    } else {
      signup({
        fullName: fullName || 'Vikram Rathore',
        email: emailOrPhone,
        phone: emailOrPhone,
        vehicleType,
        vehicleModel,
        vehicleNumber
      }, 'captain');
    }
  };

  return (
    <div className="min-h-[80vh] py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto flex flex-col justify-center">
      
      {/* Portal Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3 mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-emerald-800 dark:text-emerald-300 text-xs font-black uppercase tracking-wider">
          <Car className="h-4 w-4 text-emerald-600" /> Captain (Driver) Partner Portal
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
          Earn More on Every Daily Route
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
          Sign in to view commute passenger ride requests, manage vehicle verification documents, track daily earnings, and accept instant UPI payouts.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Left Side: Captain Benefits Card */}
        <div className="lg:col-span-5 bg-gradient-to-br from-emerald-700 via-teal-800 to-slate-900 text-white p-8 rounded-3xl shadow-xl flex flex-col justify-between space-y-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-emerald-400/10 blur-2xl pointer-events-none" />

          <div className="space-y-6 relative z-10">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-200">Captain Earnings & Growth</span>
              <span className="px-3 py-1 rounded-full bg-emerald-500/30 text-emerald-200 text-[10px] font-black uppercase">Verified Partner Network</span>
            </div>

            <h2 className="text-2xl font-black leading-tight">
              Turn Empty Car Seats into ₹25,000+ Monthly Extra Income
            </h2>

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-white/10 shrink-0">
                  <DollarSign className="h-5 w-5 text-emerald-300" />
                </div>
                <div>
                  <h3 className="font-extrabold text-sm text-white">Direct Same-Day UPI Payouts</h3>
                  <p className="text-xs text-emerald-100/80">0 waiting period. Earnings transfer directly to your UPI ID after every trip completion.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-white/10 shrink-0">
                  <Award className="h-5 w-5 text-amber-300" />
                </div>
                <div>
                  <h3 className="font-extrabold text-sm text-white">100% Flexible Timings</h3>
                  <p className="text-xs text-emerald-100/80">Only publish rides on your existing office or personal commute routes. No detours.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-white/10 shrink-0">
                  <FileText className="h-5 w-5 text-cyan-300" />
                </div>
                <div>
                  <h3 className="font-extrabold text-sm text-white">Fast-Track Verification</h3>
                  <p className="text-xs text-emerald-100/80">Upload driving license and vehicle RC scan for approval within 2 hours.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-white/20 flex items-center justify-between relative z-10">
            <div className="text-xs font-bold text-emerald-200">Looking to book a ride?</div>
            <button
              onClick={openPassengerLogin}
              className="px-4 py-2 rounded-xl bg-white text-slate-900 text-xs font-extrabold hover:bg-emerald-50 transition shadow"
            >
              Go to Passenger Portal ➔
            </button>
          </div>
        </div>

        {/* Right Side: Captain Form */}
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
                      ? 'bg-emerald-600 text-white shadow-md shadow-emerald-500/20'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                  }`}
                >
                  Captain Sign In
                </button>
                <button
                  type="button"
                  onClick={() => { setMode('signup'); setShowOtpStep(false); }}
                  className={`px-5 py-2.5 rounded-2xl text-xs font-extrabold transition ${
                    mode === 'signup'
                      ? 'bg-emerald-600 text-white shadow-md shadow-emerald-500/20'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                  }`}
                >
                  Join as New Captain
                </button>
              </div>

              {/* Quick Demo Captain Login */}
              <button
                type="button"
                onClick={handleDemoCaptainLogin}
                className="px-3.5 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300 text-xs font-extrabold hover:bg-emerald-200 transition flex items-center gap-1"
              >
                <Sparkles className="h-3.5 w-3.5 text-emerald-600" />
                ⚡ Demo Captain Sign In
              </button>
            </div>

            {/* Login Type Selector */}
            <div className="flex justify-center gap-6 text-xs font-bold text-slate-500 border-b border-slate-100 dark:border-slate-800 pb-3 mb-6">
              <button
                type="button"
                onClick={() => { setLoginType('email'); setShowOtpStep(false); }}
                className={`pb-1 flex items-center gap-1.5 transition ${
                  loginType === 'email' ? 'text-emerald-600 dark:text-emerald-400 border-b-2 border-emerald-600 font-black' : 'hover:text-slate-800'
                }`}
              >
                <Mail className="h-4 w-4" /> Email & Password
              </button>
              <button
                type="button"
                onClick={() => { setLoginType('mobile'); setShowOtpStep(false); }}
                className={`pb-1 flex items-center gap-1.5 transition ${
                  loginType === 'mobile' ? 'text-emerald-600 dark:text-emerald-400 border-b-2 border-emerald-600 font-black' : 'hover:text-slate-800'
                }`}
              >
                <Phone className="h-4 w-4" /> Mobile OTP Login
              </button>
            </div>

            {showOtpStep ? (
              /* OTP Form */
              <div className="space-y-6 py-4 text-center">
                <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 text-xs text-slate-700 dark:text-slate-200">
                  Captain OTP verification code sent to <span className="font-extrabold text-emerald-600">{emailOrPhone || '+91 98888 77777'}</span>
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
                      className="w-12 h-12 text-center font-mono font-black text-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  ))}
                </div>

                <button
                  type="button"
                  onClick={handleSubmit}
                  className="w-full py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs shadow-lg shadow-emerald-500/25 transition"
                >
                  Verify OTP & Open Captain Control Center
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
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Captain Full Name</label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Vikram Rathore"
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-xs font-semibold text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    />
                  </div>
                )}

                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    {loginType === 'email' ? 'Registered Captain Email' : 'Mobile Number'}
                  </label>
                  <input
                    type={loginType === 'email' ? 'email' : 'tel'}
                    required
                    value={emailOrPhone}
                    onChange={(e) => setEmailOrPhone(e.target.value)}
                    placeholder={loginType === 'email' ? 'vikram@hopon.com' : '+91 98888 77777'}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-xs font-semibold text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>

                {loginType === 'email' && (
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Password</label>
                      {mode === 'login' && (
                        <button
                          type="button"
                          onClick={() => alert('Captain password reset link dispatched via SMS/Email.')}
                          className="text-[11px] font-bold text-emerald-600 hover:underline"
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
                        className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-xs font-semibold text-slate-900 dark:text-white pr-10 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
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

                {/* Captain Specific Signup Vehicle Config */}
                {mode === 'signup' && (
                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-3">
                    <div className="text-xs font-extrabold text-slate-800 dark:text-slate-200 uppercase tracking-wider">Vehicle Type & Registration Plate</div>
                    
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setVehicleType('car')}
                        className={`flex-1 py-2 rounded-xl text-xs font-extrabold flex items-center justify-center gap-1.5 ${
                          vehicleType === 'car' ? 'bg-emerald-600 text-white shadow' : 'bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200'
                        }`}
                      >
                        <Car className="h-4 w-4" /> Four-Wheeler (Car)
                      </button>
                      <button
                        type="button"
                        onClick={() => setVehicleType('bike')}
                        className={`flex-1 py-2 rounded-xl text-xs font-extrabold flex items-center justify-center gap-1.5 ${
                          vehicleType === 'bike' ? 'bg-emerald-600 text-white shadow' : 'bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200'
                        }`}
                      >
                        <Bike className="h-4 w-4" /> Two-Wheeler (Bike)
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        value={vehicleModel}
                        onChange={(e) => setVehicleModel(e.target.value)}
                        placeholder="Model (e.g. Honda Amaze)"
                        className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs font-semibold"
                      />
                      <input
                        type="text"
                        value={vehicleNumber}
                        onChange={(e) => setVehicleNumber(e.target.value)}
                        placeholder="Plate (e.g. KA 05 EV 1008)"
                        className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs font-mono font-extrabold uppercase"
                      />
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between text-xs pt-1">
                  <label className="flex items-center gap-2 cursor-pointer font-semibold text-slate-600 dark:text-slate-400">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="rounded text-emerald-600"
                    />
                    Keep Captain Device Verified
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs shadow-lg shadow-emerald-500/25 transition active:scale-95 flex items-center justify-center gap-2"
                >
                  {mode === 'login' ? 'Sign In to Captain Portal' : 'Register Captain Profile'}
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
