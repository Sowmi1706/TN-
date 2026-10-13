import React, { useState } from 'react';
import { 
  X, 
  Lock, 
  Mail, 
  User as UserIcon, 
  Sparkles, 
  Check, 
  ArrowRight, 
  ShieldCheck, 
  Compass, 
  Globe,
  Loader2 
} from 'lucide-react';
import { useAuth, AuthModalTab } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { Language } from '../types';

export const AuthModal: React.FC = () => {
  const { 
    showAuthModal, 
    authModalTab, 
    closeAuthModal, 
    loginCustomer,
    loginAdmin,
    registerCustomer, 
    resetPasswordRequest,
    openAuthModal,
    updateProfile,
    user
  } = useAuth();
  const { language, setLanguage, t } = useLanguage();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Preference setup post-signup
  const [prefCompanion, setPrefCompanion] = useState<'family' | 'friends' | 'solo' | 'group' | 'couple'>('family');
  const [prefLang, setPrefLang] = useState<Language>(language);
  const [prefInterests, setPrefInterests] = useState<string[]>(['Temples', 'Heritage']);

  if (!showAuthModal) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (authModalTab === 'admin_login') {
      const res = await loginAdmin(email, password);
      if (!res.success) {
        setError(res.error || 'Invalid administrator credentials');
      }
    } else if (authModalTab === 'customer_register' || authModalTab === 'register') {
      const res = await registerCustomer(name, email, password);
      if (!res.success) {
        setError(res.error || 'Failed to create customer account');
      }
    } else if (authModalTab === 'forgot') {
      const res = await resetPasswordRequest(email);
      setSuccessMsg(res.message);
    } else {
      // customer_login or default
      const res = await loginCustomer(email, password);
      if (!res.success) {
        setError(res.error || 'Invalid customer credentials');
      }
    }
    setLoading(false);
  };

  const handleSavePreferences = () => {
    setLanguage(prefLang);
    updateProfile({
      preferredLanguage: prefLang,
      travelCompanion: prefCompanion,
      interests: prefInterests
    });
    closeAuthModal();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/85 backdrop-blur-md flex justify-center p-4 animate-fadeIn">
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl p-6 sm:p-8 my-auto border border-amber-900/20 space-y-6">
        
        {/* Modal Close Button */}
        <button
          onClick={closeAuthModal}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header Branding */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-600 to-amber-800 text-amber-100 font-display font-bold text-2xl flex items-center justify-center mx-auto shadow-md border border-amber-400/40">
            {authModalTab === 'admin_login' ? <ShieldCheck className="w-6 h-6" /> : 'TN'}
          </div>
          <h2 className="font-display text-2xl font-bold text-stone-900">
            {authModalTab === 'admin_login' ? 'Administrator Login' : 
             authModalTab === 'customer_register' || authModalTab === 'register' ? 'Customer Registration' : 
             authModalTab === 'preferences' ? 'Set Travel Preferences' :
             authModalTab === 'forgot' ? 'Reset Password' :
             'Customer Sign In'}
          </h2>
          <p className="text-xs text-stone-500">
            {authModalTab === 'admin_login' 
              ? 'Authorized Tamil Nadu Tourism administrators portal.' 
              : authModalTab === 'preferences' 
              ? 'Tell us your preferred language and style.' 
              : 'Save favourite temples, book stays, and plan your trips.'}
          </p>
        </div>

        {/* Role Segmenter Tab Switcher */}
        {authModalTab !== 'preferences' && (
          <div className="grid grid-cols-2 p-1 bg-stone-100 rounded-xl text-xs font-semibold">
            <button
              type="button"
              onClick={() => {
                openAuthModal('customer_login');
                setError(null);
              }}
              className={`py-2 rounded-lg transition-colors cursor-pointer ${
                authModalTab !== 'admin_login' ? 'bg-white text-stone-950 shadow-sm font-bold' : 'text-stone-600'
              }`}
            >
              Customer Portal
            </button>
            <button
              type="button"
              onClick={() => {
                openAuthModal('admin_login');
                setError(null);
                setEmail('admin@tnstories.com');
                setPassword('admin123');
              }}
              className={`py-2 rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-1 ${
                authModalTab === 'admin_login' ? 'bg-stone-900 text-amber-300 shadow-sm font-bold' : 'text-stone-600'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Admin Portal</span>
            </button>
          </div>
        )}

        {/* Error or Success notification */}
        {error && (
          <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg text-xs text-rose-800 font-medium">
            {error}
          </div>
        )}
        {successMsg && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-800 font-medium">
            {successMsg}
          </div>
        )}

        {/* TAB: PREFERENCES */}
        {authModalTab === 'preferences' ? (
          <div className="space-y-4 text-xs">
            <div className="space-y-1.5">
              <label className="font-semibold text-stone-700 flex items-center gap-1.5">
                <Globe className="w-4 h-4 text-amber-700" />
                Select Preferred Language
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
                    className={`py-2 px-2 text-center rounded-lg border font-medium cursor-pointer ${
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

            <div className="space-y-1.5">
              <label className="font-semibold text-stone-700 flex items-center gap-1.5">
                <Compass className="w-4 h-4 text-amber-700" />
                Default Travel Style
              </label>
              <div className="grid grid-cols-3 gap-2">
                {['family', 'friends', 'solo', 'couple', 'group'].map(comp => (
                  <button
                    key={comp}
                    type="button"
                    onClick={() => setPrefCompanion(comp as any)}
                    className={`py-1.5 px-2 text-center rounded-lg border capitalize cursor-pointer ${
                      prefCompanion === comp
                        ? 'bg-amber-50 border-amber-600 text-amber-950 font-bold'
                        : 'bg-stone-50 border-stone-200 text-stone-700'
                    }`}
                  >
                    {comp}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleSavePreferences}
              className="w-full py-2.5 rounded-lg bg-stone-900 hover:bg-amber-600 hover:text-stone-950 text-white font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
            >
              Save Preferences & Start Exploring
            </button>
          </div>
        ) : (
          /* FORM */
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            
            {(authModalTab === 'customer_register' || authModalTab === 'register') && (
              <div className="space-y-1">
                <label className="font-semibold text-stone-700 block">Full Name</label>
                <div className="relative">
                  <UserIcon className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Senthil Nathan"
                    className="w-full bg-stone-50 border border-stone-300 rounded-lg pl-9 pr-3 py-2 text-xs text-stone-900 focus:outline-none focus:border-amber-600"
                    required
                  />
                </div>
              </div>
            )}

            <div className="space-y-1">
              <label className="font-semibold text-stone-700 block">
                {authModalTab === 'admin_login' ? 'Administrator Email' : 'Customer Email'}
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={authModalTab === 'admin_login' ? 'admin@tnstories.com' : 'customer@example.com'}
                  className="w-full bg-stone-50 border border-stone-300 rounded-lg pl-9 pr-3 py-2 text-xs text-stone-900 focus:outline-none focus:border-amber-600"
                  required
                />
              </div>
            </div>

            {authModalTab !== 'forgot' && (
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="font-semibold text-stone-700">Password</label>
                  {authModalTab !== 'admin_login' && (
                    <button
                      type="button"
                      onClick={() => openAuthModal('forgot')}
                      className="text-[11px] text-amber-800 hover:underline"
                    >
                      Forgot?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-stone-50 border border-stone-300 rounded-lg pl-9 pr-3 py-2 text-xs text-stone-900 focus:outline-none focus:border-amber-600"
                    required
                  />
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2.5 rounded-lg font-bold uppercase tracking-wider text-xs transition-colors cursor-pointer shadow-sm flex items-center justify-center gap-2 ${
                authModalTab === 'admin_login'
                  ? 'bg-stone-900 hover:bg-stone-800 text-amber-300'
                  : 'bg-amber-600 hover:bg-amber-500 text-stone-950'
              }`}
            >
              {loading && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
              <span>
                {authModalTab === 'admin_login' ? 'Sign In as Admin' : 
                 authModalTab === 'customer_register' || authModalTab === 'register' ? 'Register Customer' : 
                 authModalTab === 'forgot' ? 'Send Password Reset' :
                 'Sign In as Customer'}
              </span>
            </button>

            {/* Quick Demo Fill Helper */}
            <div className="p-2.5 bg-stone-50 rounded-lg border border-stone-200 text-[11px] flex items-center justify-between">
              <span className="text-stone-500">
                {authModalTab === 'admin_login' ? 'Admin: admin@tnstories.com' : 'Demo: customer@tnstories.com'}
              </span>
              <button
                type="button"
                onClick={() => {
                  if (authModalTab === 'admin_login') {
                    setEmail('admin@tnstories.com');
                    setPassword('admin123');
                  } else {
                    setEmail('customer@tnstories.com');
                    setPassword('customer123');
                  }
                }}
                className="text-amber-800 font-bold hover:underline"
              >
                Auto-fill
              </button>
            </div>

            {/* Switch between Customer Login & Customer Register */}
            {authModalTab !== 'admin_login' && authModalTab !== 'forgot' && (
              <div className="text-center text-xs text-stone-500 pt-1">
                {authModalTab === 'customer_register' || authModalTab === 'register' ? (
                  <p>
                    Already have an account?{' '}
                    <button
                      type="button"
                      onClick={() => openAuthModal('customer_login')}
                      className="text-amber-800 font-bold hover:underline"
                    >
                      Sign In
                    </button>
                  </p>
                ) : (
                  <p>
                    New explorer?{' '}
                    <button
                      type="button"
                      onClick={() => openAuthModal('customer_register')}
                      className="text-amber-800 font-bold hover:underline"
                    >
                      Create customer account
                    </button>
                  </p>
                )}
              </div>
            )}

          </form>
        )}

      </div>
    </div>
  );
};
