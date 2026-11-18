import { useState } from 'react';
import { User, LogOut, ShieldAlert, Sparkles, Menu, X } from 'lucide-react';

interface NavbarProps {
  user: any;
  onOpenAuth: () => void;
  onOpenAdmin: () => void;
  onSignOut: () => void;
}

export function Navbar({ user, onOpenAuth, onOpenAdmin, onSignOut }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#0A192F]/90 backdrop-blur-md border-b border-[#14B8A6]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Branding & Logo */}
        <div 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center space-x-3 cursor-pointer group"
        >
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#14B8A6] to-[#0A192F] p-0.5 shadow-lg shadow-[#14B8A6]/30 flex items-center justify-center group-hover:scale-105 transition">
            <div className="w-full h-full bg-[#0A192F] rounded-xl flex items-center justify-center">
              <span className="text-[#14B8A6] font-black text-lg tracking-tighter">LR</span>
            </div>
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <span className="font-bold text-white text-lg tracking-tight">LRock.dev</span>
              <span className="text-xs bg-[#14B8A6]/20 text-[#14B8A6] border border-[#14B8A6]/30 px-1.5 py-0.5 rounded font-mono">GH 🇬🇭</span>
            </div>
            <p className="text-[11px] text-slate-300 font-medium">Web & Mobile Architect</p>
          </div>
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-200">
          <button onClick={() => scrollToSection('services')} className="hover:text-[#14B8A6] transition cursor-pointer">
            Services
          </button>
          <button onClick={() => scrollToSection('how-it-works')} className="hover:text-[#14B8A6] transition cursor-pointer">
            How It Works
          </button>
          <button onClick={() => scrollToSection('estimator')} className="hover:text-[#14B8A6] transition cursor-pointer">
            Project Estimator
          </button>
          <button onClick={() => scrollToSection('contact')} className="hover:text-[#14B8A6] transition cursor-pointer">
            Contact
          </button>
        </nav>

        {/* Right Auth / Actions */}
        <div className="hidden md:flex items-center space-x-4">
          {user ? (
            <div className="flex items-center space-x-3">
              <button
                onClick={onOpenAdmin}
                className="px-3.5 py-2 bg-[#1E293B] hover:bg-slate-700 text-[#14B8A6] border border-[#14B8A6]/40 rounded-xl text-xs font-semibold flex items-center space-x-2 transition cursor-pointer shadow-sm"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Inquiries Hub</span>
              </button>

              <div className="flex items-center space-x-2 bg-[#1E293B] px-3 py-1.5 rounded-xl border border-slate-700">
                <div className="w-7 h-7 rounded-lg bg-[#14B8A6] text-[#0A192F] font-bold flex items-center justify-center text-xs">
                  {user.isAnonymous ? 'G' : (user.email ? user.email.charAt(0).toUpperCase() : 'U')}
                </div>
                <div className="text-left max-w-[120px] truncate">
                  <p className="text-xs font-medium text-white truncate">
                    {user.isAnonymous ? 'Guest User' : user.email}
                  </p>
                </div>
                <button
                  onClick={onSignOut}
                  title="Sign Out"
                  className="p-1 text-slate-400 hover:text-red-400 transition ml-1"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              className="px-4 py-2 bg-[#14B8A6] hover:bg-[#0d9488] text-[#0A192F] text-xs font-bold rounded-xl transition shadow-lg shadow-[#14B8A6]/20 cursor-pointer"
            >
              Sign In / Sign Up
            </button>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center space-x-2">
          {user && (
            <button
              onClick={onOpenAdmin}
              className="px-2.5 py-1.5 bg-[#1E293B] text-[#14B8A6] border border-[#14B8A6]/40 rounded-lg text-xs font-semibold"
            >
              Hub
            </button>
          )}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-300 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0A192F] border-b border-slate-800 px-4 pt-2 pb-6 space-y-3">
          <button onClick={() => scrollToSection('services')} className="block w-full text-left py-2 text-slate-200 font-medium text-sm">
            Services
          </button>
          <button onClick={() => scrollToSection('how-it-works')} className="block w-full text-left py-2 text-slate-200 font-medium text-sm">
            How It Works
          </button>
          <button onClick={() => scrollToSection('estimator')} className="block w-full text-left py-2 text-slate-200 font-medium text-sm">
            Project Estimator
          </button>
          <button onClick={() => scrollToSection('contact')} className="block w-full text-left py-2 text-slate-200 font-medium text-sm">
            Contact
          </button>

          <div className="pt-3 border-t border-slate-800 flex flex-col space-y-2">
            {user ? (
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-300 truncate">
                  {user.isAnonymous ? 'Guest User' : user.email}
                </span>
                <button
                  onClick={onSignOut}
                  className="px-3 py-1.5 bg-red-500/20 text-red-300 text-xs rounded-lg font-medium"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <button
                onClick={() => { setMobileMenuOpen(false); onOpenAuth(); }}
                className="w-full py-2.5 bg-[#14B8A6] text-[#0A192F] font-bold rounded-xl text-xs"
              >
                Sign In / Sign Up
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
