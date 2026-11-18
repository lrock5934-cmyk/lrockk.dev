import { useState, useEffect } from 'react';
import { auth, onAuthStateChanged, signOut, User } from './lib/firebase';
import { AuthModal } from './components/AuthModal';
import { AdminMessagesModal } from './components/AdminMessagesModal';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { HowItWorks } from './components/HowItWorks';
import { ProjectEstimator } from './components/ProjectEstimator';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [adminModalOpen, setAdminModalOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthLoading(false);
      if (!currentUser) {
        setAuthModalOpen(true);
      } else {
        setAuthModalOpen(false);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setAuthModalOpen(true);
    } catch (err) {
      console.error('Sign out error:', err);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#0A192F] flex items-center justify-center text-white">
        <div className="text-center space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-[#14B8A6] text-[#0A192F] font-black text-2xl flex items-center justify-center mx-auto animate-pulse">
            LR
          </div>
          <p className="text-sm font-medium text-slate-300">Loading LRock.dev Portal...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A192F] text-white selection:bg-[#14B8A6] selection:text-[#0A192F]">
      {/* Mandatory Firebase Auth Gate Modal if user not signed in */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        required={true}
      />

      {/* Admin / Client Inquiries & Gmail Hub Modal */}
      <AdminMessagesModal
        isOpen={adminModalOpen}
        onClose={() => setAdminModalOpen(false)}
        userEmail={user?.email || (user?.isAnonymous ? 'Guest User' : null)}
      />

      {/* Navigation Header */}
      <Navbar
        user={user}
        onOpenAuth={() => setAuthModalOpen(true)}
        onOpenAdmin={() => setAdminModalOpen(true)}
        onSignOut={handleSignOut}
      />

      {/* Main Content Sections in Exact Order */}
      <main>
        {/* 1. Hero / Header */}
        <Hero />

        {/* 2. Services */}
        <Services />

        {/* 3. How It Works */}
        <HowItWorks />

        {/* 4. Interactive Project Estimator */}
        <ProjectEstimator />

        {/* 5. Contact LRock.dev */}
        <Contact />
      </main>

      {/* 6. Footer */}
      <Footer />
    </div>
  );
}
