import { useState, useCallback } from 'react';
import './App.css';
import { LanguageProvider } from './context/LanguageContext';
import { CartProvider } from './context/CartContext';
import { useLenis } from './hooks/useLenis';
import Navbar from './components/Navbar';
import CartDrawer from './components/CartDrawer';
import CheckoutModal from './components/CheckoutModal';
import Hero from './sections/Hero';
import GamesSection from './sections/GamesSection';
import HowToBuy from './sections/HowToBuy';
import PaymentMethods from './sections/PaymentMethods';
import ContactSection from './sections/ContactSection';
import Footer from './sections/Footer';

function AppContent() {
  const [showCheckout, setShowCheckout] = useState(false);
  const { scrollTo } = useLenis();

  const handleScrollTo = useCallback((target: string) => {
    scrollTo(target);
  }, [scrollTo]);

  const handleCheckout = useCallback(() => {
    setShowCheckout(true);
  }, []);

  return (
    <div className="min-h-screen" style={{ background: '#0a0a0f', color: '#f0f0f5' }}>
      <Navbar onScrollTo={handleScrollTo} />
      <CartDrawer onCheckout={handleCheckout} />
      <CheckoutModal isOpen={showCheckout} onClose={() => setShowCheckout(false)} />

      <main>
        <Hero onScrollTo={handleScrollTo} />
        <GamesSection />
        <HowToBuy />
        <PaymentMethods />
        <ContactSection />
      </main>

      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </LanguageProvider>
  );
}
