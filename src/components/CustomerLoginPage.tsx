import React, { useState } from 'react';
import { 
  User as UserIcon, 
  Lock, 
  Mail, 
  AlertCircle, 
  Loader2, 
  ArrowLeft,
  Sparkles,
  CheckCircle2,
  Globe
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { Language } from '../types';

interface CustomerLoginPageProps {
  onSuccess: () => void;
  onBackToApp: () => void;
  onGoToAdminLogin: () => void;
}

export const CustomerLoginPage: React.FC<CustomerLoginPageProps> = ({
  onSuccess,
  onBackToApp,
  onGoToAdminLogin
}) => {
  const { loginCustomer, registerCustomer } = useAuth();
  const { language, setLanguage } = useLanguage();

  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('customer@tnstories.com');
  const [password, setPassword] = useState('customer123');
  const [name, setName] = useState('');
  const [prefLang, setPrefLang] = useState<Language>(language);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (activeTab === 'login') {
      const res = await loginCustomer(email, password);
      setLoading(false);
      if (res.success) {
        onSuccess();
      } else {
        setError(res.error || 'Failed to sign in as customer');
      }
    } else {
      if (!name.trim()) {
        setError('Please enter your full name');
        setLoading(false);
        return;
      }
      const res = await registerCustomer(name, email, password);
      setLoading(false);
      if (res.success) {
        setLanguage(prefLang);
        onSuccess();
      } else {
        setError(res.error || 'Registration failed');
      }
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12 bg-gradient-to-b from-[#fdfbf7] via-amber-50/40 to-stone-100 text-stone-900">
      <div className="w-full max-w-md bg-white border border-amber-200/80 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
        
        {/* Navigation & Header */}
        <div className="flex items-center justify-between">
          <button
            onClick={onBackToApp}
            className="flex items-center gap-1.5 text-xs text-stone-500 hover:text-stone-900 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to TN Stories</span>
          </button>

          <span className="text-[10px] bg-amber-100 text-amber-900 border border-amber-300 px-2 py-0.5 rounded font-mono font-medium">
            CUSTOMER PORTAL
          </span>
        </div>

        {/* Branding & Welcome */}
        <div className="text-center space-y-1.5">
          <div className="w-13 h-13 rounded-2xl bg-gradient-to-br from-amber-600 to-amber-800 flex items-center justify-center mx-auto shadow-md text-white font-display font-bold text-2xl border border-amber-500/40">
            TN
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
            {activeTab === 'login' ? 'Customer Sign In' : 'Create Customer Account'}
          </h1>
          <p className="text-xs text-stone-500 max-w-sm mx-auto leading-relaxed">
            {activeTab === 'login' 
              ? 'Sign in to access your saved places, bookings, itineraries, and stories.' 
              : 'Join as a verified explorer to save favourites, book stays, and plan trips.'}
          </p>
        </div>

        {/* Login / Register Segmented Tab Switcher */}
        <div className="grid grid-cols-2 p-1 bg-stone-100 rounded-xl text-xs font-semibold">
          <button
            type="button"
            onClick={() => {
              setActiveTab('login');
              setError(null);
            }}
            className={`py-2 rounded-lg transition-colors cursor-pointer ${
              activeTab === 'login' ? 'bg-white text-stone-950 shadow-sm font-bold' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveTab('register');
              setError(null);
            }}
            className={`py-2 rounded-lg transition-colors cursor-pointer ${
              activeTab === 'register' ? 'bg-white text-stone-950 shadow-sm font-bold' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Create Account
          </button>
        </div>

        {/* Error notification */}
        {error && (
          <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-800 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* Customer Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          
          {activeTab === 'register' && (
            <div className="space-y-1.5">
              <label className="font-semibold text-stone-700 block">
                Full Name
              </label>
              <div className="relative">
                <UserIcon className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Anandhi Soundararajan"
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl pl-9 pr-3 py-2.5 text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:border-amber-600"
                  required
                />
              </div>
            </div>
          )}

          <div className="space-y-1.5">
            <label className="font-semibold text-stone-700 block">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="customer@tnstories.com"
                className="w-full bg-stone-50 border border-stone-300 rounded-xl pl-9 pr-3 py-2.5 text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:border-amber-600"
                required
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="font-semibold text-stone-700 block">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-stone-50 border border-stone-300 rounded-xl pl-9 pr-3 py-2.5 text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:border-amber-600"
                required
              />
            </div>
          </div>

          {activeTab === 'register' && (
            <div className="space-y-1.5">
              <label className="font-semibold text-stone-700 block">
                Preferred App Language
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'en', label: 'English' },
                  { id: 'ta', label: 'தமிழ்' },
                  { id: 'hi', label: 'हिन्दी' }
                ].map(l => (
                  <button
                    key={l.id}
                    type="button"
                    onClick={() => setPrefLang(l.id as any)}
                    className={`py-1.5 px-2 text-center rounded-lg border font-medium text-xs cursor-pointer ${
                      prefLang === l.id
                        ? 'bg-amber-600 text-stone-950 border-amber-600 font-bold'
                        : 'bg-stone-50 border-stone-200 text-stone-700'
                    }`}
                  >
                    {l.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold uppercase tracking-wider text-xs transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Processing...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>{activeTab === 'login' ? 'Sign In as Customer' : 'Register Customer Account'}</span>
              </>
            )}
          </button>

          {/* Quick Demo Credentials */}
          {activeTab === 'login' && (
            <div className="p-3 bg-stone-50 border border-stone-200 rounded-xl text-[11px] text-stone-600 space-y-1">
              <div className="flex items-center gap-1.5 text-amber-900 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Demo Customer Account:</span>
              </div>
              <p className="font-mono text-stone-700 pl-5">customer@tnstories.com / customer123</p>
            </div>
          )}

          {/* Link to Admin Login */}
          <div className="pt-2 text-center text-xs text-stone-500 border-t border-stone-100">
            <p>
              Are you an authorized administrator?{' '}
              <button
                type="button"
                onClick={onGoToAdminLogin}
                className="text-stone-900 font-bold hover:underline cursor-pointer"
              >
                Go to Admin Login
              </button>
            </p>
          </div>

        </form>

      </div>
    </div>
  );
};
