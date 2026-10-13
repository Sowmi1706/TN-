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
  Globe 
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { Language } from '../types';

export const AuthModal: React.FC = () => {
  const { 
    showAuthModal, 
    authModalTab, 
    closeAuthModal, 
    login, 
    register, 
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

    if (authModalTab === 'login') {
      const res = await login(email, password);
      if (!res.success) {
        setError(res.error || 'Invalid credentials');
      }
    } else if (authModalTab === 'register') {
      const res = await register(name, email, password);
      if (!res.success) {
        setError(res.error || 'Failed to register account');
      }
    } else if (authModalTab === 'forgot') {
      const res = await resetPasswordRequest(email);
      setSuccessMsg(res.message);
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

  const handleQuickLogin = (role: 'explorer' | 'admin') => {
    if (role === 'admin') {
      login('admin@tnstories.com', 'admin123');
    } else {
      login('explorer@tnstories.com', 'explorer123');
    }
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
            TN
          </div>
          <h2 className="font-display text-2xl font-bold text-stone-900">
            {authModalTab === 'login' ? 'Vanakkam! Welcome Back' : 
             authModalTab === 'register' ? 'Join TN Stories Explorer Club' : 
             authModalTab === 'preferences' ? 'Set Your Travel Preferences' :
             'Reset Your Password'}
          </h2>
          <p className="text-xs text-stone-500">
            {authModalTab === 'preferences' 
              ? 'Tell us your preferred language and travel style to curate personalized stories.' 
              : 'Discover living heritage, sacred temples, and hidden spots across Tamil Nadu.'}
          </p>
        </div>

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

        {/* TAB: PREFERENCES SETUP POST-SIGNUP */}
        {authModalTab === 'preferences' ? (
          <div className="space-y-4 text-xs">
            
            {/* Preferred Language */}
            <div className="space-y-1.5">
              <label className="font-semibold text-stone-700 flex items-center gap-1.5">
                <Globe className="w-4 h-4 text-amber-700" />
                Select Preferred Language
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'en', label: 'English' },
                  { id: 'ta', label: 'தமிழ் (Tamil)' },
                  { id: 'hi', label: 'हिन्दी (Hindi)' }
                ].map(l => (
                  <button
                    key={l.id}
                    type="button"
                    onClick={() => setPrefLang(l.id as any)}
                    className={`py-2 px-2 text-center rounded-lg border font-medium transition-colors cursor-pointer ${
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

            {/* Travel Companion */}
            <div className="space-y-1.5">
              <label className="font-semibold text-stone-700 flex items-center gap-1.5">
                <Compass className="w-4 h-4 text-amber-700" />
                Default Travel Companion Style
              </label>
              <div className="grid grid-cols-3 gap-2">
                {['family', 'friends', 'solo', 'couple', 'group'].map(comp => (
                  <button
                    key={comp}
                    type="button"
                    onClick={() => setPrefCompanion(comp as any)}
                    className={`py-1.5 px-2 text-center rounded-lg border capitalize transition-colors cursor-pointer ${
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
          /* TAB: LOGIN / REGISTER / FORGOT */
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            
            {authModalTab === 'register' && (
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
              <label className="font-semibold text-stone-700 block">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@example.com"
                  className="w-full bg-stone-50 border border-stone-300 rounded-lg pl-9 pr-3 py-2 text-xs text-stone-900 focus:outline-none focus:border-amber-600"
                  required
                />
              </div>
            </div>

            {authModalTab !== 'forgot' && (
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="font-semibold text-stone-700">Password</label>
                  {authModalTab === 'login' && (
                    <button
                      type="button"
                      onClick={() => openAuthModal('forgot')}
                      className="text-[11px] text-amber-800 hover:underline"
                    >
                      Forgot Password?
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
              className="w-full py-2.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold uppercase tracking-wider text-xs transition-colors cursor-pointer shadow-sm"
            >
              {loading ? 'Processing...' : 
               authModalTab === 'login' ? 'Sign In to Account' : 
               authModalTab === 'register' ? 'Create Free Explorer Account' : 
               'Send Password Reset Instructions'}
            </button>

            {/* Quick Demo Logins for Testing */}
            <div className="pt-2 border-t border-stone-100">
              <span className="text-[11px] text-stone-400 block text-center mb-2">1-Click Quick Demo Access</span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => handleQuickLogin('explorer')}
                  className="py-1.5 px-2 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-md text-[11px] font-semibold text-center transition-colors cursor-pointer"
                >
                  👤 Explorer User
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickLogin('admin')}
                  className="py-1.5 px-2 bg-amber-950/10 hover:bg-amber-950/20 text-amber-900 rounded-md text-[11px] font-semibold text-center transition-colors cursor-pointer"
                >
                  🛡️ Tourism Admin
                </button>
              </div>
            </div>

            {/* Switch between Login and Register */}
            <div className="text-center text-xs text-stone-500 pt-1">
              {authModalTab === 'login' ? (
                <p>
                  Don't have an account yet?{' '}
                  <button
                    type="button"
                    onClick={() => openAuthModal('register')}
                    className="text-amber-800 font-bold hover:underline"
                  >
                    Sign up now
                  </button>
                </p>
              ) : (
                <p>
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={() => openAuthModal('login')}
                    className="text-amber-800 font-bold hover:underline"
                  >
                    Log in
                  </button>
                </p>
              )}
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
