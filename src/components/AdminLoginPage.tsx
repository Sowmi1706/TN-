import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  Mail, 
  AlertCircle, 
  Loader2, 
  ArrowLeft,
  KeyRound,
  CheckCircle2
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface AdminLoginPageProps {
  onSuccess: () => void;
  onBackToApp: () => void;
  onGoToCustomerLogin: () => void;
}

export const AdminLoginPage: React.FC<AdminLoginPageProps> = ({
  onSuccess,
  onBackToApp,
  onGoToCustomerLogin
}) => {
  const { loginAdmin } = useAuth();
  const [email, setEmail] = useState('admin@tnstories.com');
  const [password, setPassword] = useState('admin123');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const res = await loginAdmin(email, password);
    setLoading(false);

    if (res.success) {
      onSuccess();
    } else {
      setError(res.error || 'Invalid administrator credentials');
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12 bg-gradient-to-b from-stone-950 via-stone-900 to-amber-950/40 text-stone-100">
      <div className="w-full max-w-md bg-stone-900/95 border border-amber-900/40 rounded-2xl p-6 sm:p-8 shadow-2xl backdrop-blur-md space-y-6">
        
        {/* Navigation & Header */}
        <div className="flex items-center justify-between">
          <button
            onClick={onBackToApp}
            className="flex items-center gap-1.5 text-xs text-stone-400 hover:text-white transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to TN Stories</span>
          </button>

          <span className="text-[10px] bg-amber-500/10 text-amber-400 border border-amber-500/30 px-2 py-0.5 rounded font-mono">
            RESTRICTED ACCESS
          </span>
        </div>

        {/* Branding & Title */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-600 to-amber-900 flex items-center justify-center mx-auto shadow-lg border border-amber-500/40">
            <ShieldCheck className="w-8 h-8 text-amber-100" />
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Admin Portal Login
          </h1>
          <p className="text-xs text-stone-400 max-w-sm mx-auto leading-relaxed">
            Authorized Tamil Nadu Tourism administrators only. Manage destinations, review moderation, hotels, and booking requests.
          </p>
        </div>

        {/* Error notification */}
        {error && (
          <div className="p-3 bg-rose-950/60 border border-rose-800 rounded-xl text-xs text-rose-300 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* Admin Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div className="space-y-1.5">
            <label className="font-semibold text-stone-300 block">
              Admin Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-stone-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@tnstories.com"
                className="w-full bg-stone-950 border border-stone-800 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-amber-500"
                required
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="font-semibold text-stone-300 block">
              Security Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-stone-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-stone-950 border border-stone-800 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-amber-500"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-stone-950 font-bold uppercase tracking-wider text-xs transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Authenticating Admin...</span>
              </>
            ) : (
              <>
                <KeyRound className="w-4 h-4" />
                <span>Sign In as Administrator</span>
              </>
            )}
          </button>

          {/* Quick Demo Credentials Info */}
          <div className="p-3 bg-stone-950/70 border border-stone-800/80 rounded-xl text-[11px] text-stone-400 space-y-1">
            <div className="flex items-center gap-1.5 text-amber-300 font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Default Administrator Account:</span>
            </div>
            <p className="font-mono text-stone-300 pl-5">admin@tnstories.com / admin123</p>
          </div>

          {/* Link to Customer Login */}
          <div className="pt-2 text-center text-xs text-stone-500 border-t border-stone-800">
            <p>
              Are you a traveler or customer?{' '}
              <button
                type="button"
                onClick={onGoToCustomerLogin}
                className="text-amber-400 font-bold hover:underline cursor-pointer"
              >
                Go to Customer Login
              </button>
            </p>
          </div>

        </form>

      </div>
    </div>
  );
};
