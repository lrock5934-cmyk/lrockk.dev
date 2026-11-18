import { useState } from 'react';
import { 
  auth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signInAnonymously 
} from '../lib/firebase';
import { ShieldCheck, Mail, Lock, User, Sparkles, ArrowRight, Loader2 } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose?: () => void;
  required?: boolean;
}

export function AuthModal({ isOpen, onClose, required = true }: AuthModalProps) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isSignUp) {
        try {
          await createUserWithEmailAndPassword(auth, email, password);
        } catch (err: any) {
          // Automatic fallback handling: if email is already in use, automatically sign in
          if (err.code === 'auth/email-already-in-use') {
            await signInWithEmailAndPassword(auth, email, password);
          } else {
            throw err;
          }
        }
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      if (onClose) onClose();
    } catch (err: any) {
      setError(err.message || 'Authentication failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleGuestLogin = async () => {
    setLoading(true);
    setError('');
    try {
      await signInAnonymously(auth);
      if (onClose) onClose();
    } catch (err: any) {
      setError('Guest login failed: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0A192F]/80 backdrop-blur-md p-4">
      <div className="bg-[#1E293B] border border-[#14B8A6]/30 rounded-2xl w-full max-w-md p-6 sm:p-8 shadow-2xl text-white relative">
        {/* Neon Developer Avatar Logo */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#14B8A6] to-[#0A192F] p-0.5 shadow-lg shadow-[#14B8A6]/20 mb-3 flex items-center justify-center">
            <div className="w-full h-full bg-[#0A192F] rounded-2xl flex items-center justify-center">
              <span className="text-[#14B8A6] font-black text-2xl tracking-tighter">LR</span>
            </div>
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-white">Welcome to LRock.dev</h2>
          <p className="text-sm text-slate-300 mt-1 text-center">
            Sign in to access developer services, project estimator, and direct contact portal.
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-xl text-red-200 text-xs">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">
              Email Address
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Mail className="w-4 h-4" />
              </span>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full pl-10 pr-4 py-2.5 bg-[#0A192F] border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-[#14B8A6] text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">
              Password
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Lock className="w-4 h-4" />
              </span>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 bg-[#0A192F] border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-[#14B8A6] text-sm"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[#14B8A6] hover:bg-[#0d9488] text-[#0A192F] font-bold rounded-xl transition shadow-lg shadow-[#14B8A6]/20 flex items-center justify-center space-x-2 text-sm cursor-pointer"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                <span>{isSignUp ? 'Create Account & Sign In' : 'Sign In'}</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="mt-4 text-center">
          <button
            type="button"
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-xs text-[#14B8A6] hover:underline font-medium"
          >
            {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
          </button>
        </div>

        <div className="mt-6 pt-6 border-t border-slate-700/60 text-center">
          <button
            type="button"
            onClick={handleGuestLogin}
            disabled={loading}
            className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold rounded-xl transition border border-slate-700 flex items-center justify-center space-x-2 text-xs cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-[#14B8A6]" />
            <span>Continue as Guest (Demo Mode)</span>
          </button>
        </div>
      </div>
    </div>
  );
}
