import { ShoppingCart, Zap } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import type { Language } from '../types/game';

interface NavbarProps {
  onScrollTo: (target: string) => void;
}

export default function Navbar({ onScrollTo }: NavbarProps) {
  const { lang, t, setLang } = useLanguage();
  const { itemCount, setIsOpen } = useCart();

  const handleLangToggle = () => {
    setLang((lang === 'en' ? 'ar' : 'en') as Language);
  };

  const navLinks = [
    { label: t.nav.games, target: '#games' },
    { label: t.nav.howToBuy, target: '#how-to-buy' },
    { label: t.nav.paymentMethods, target: '#payment' },
    { label: t.nav.contactUs, target: '#contact' },
  ];

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 h-[72px] flex items-center"
      style={{
        background: 'rgba(10, 10, 15, 0.85)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
      }}
    >
      <div className="w-full max-w-[1400px] mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => onScrollTo('#hero')}
          className="flex items-center gap-2 text-[#00d4ff] font-heading font-bold text-2xl tracking-tight hover:opacity-80 transition-opacity"
        >
          <Zap className="w-6 h-6" />
          <span>VOLT</span>
        </button>

        {/* Center Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.target}
              onClick={() => onScrollTo(link.target)}
              className="relative text-sm font-medium uppercase tracking-wider text-[#8a8a9a] hover:text-[#f0f0f5] transition-colors duration-300 group"
            >
              {link.label}
              <span className="absolute bottom-[-4px] left-0 w-full h-[2px] bg-[#00d4ff] transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]" />
            </button>
          ))}
        </div>

        {/* Right: Language + Cart */}
        <div className="flex items-center gap-4">
          {/* Language Toggle */}
          <button
            onClick={handleLangToggle}
            className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider border border-[rgba(255,255,255,0.1)] text-[#8a8a9a] hover:text-[#f0f0f5] hover:border-[#00d4ff] transition-all duration-300"
          >
            {lang === 'en' ? 'AR' : 'EN'}
          </button>

          {/* Cart */}
          <button
            onClick={() => setIsOpen(true)}
            className="relative p-2 text-[#f0f0f5] hover:text-[#00d4ff] transition-colors duration-300"
            aria-label="Open cart"
          >
            <ShoppingCart className="w-5 h-5" />
            {itemCount > 0 && (
              <span
                className="absolute -top-2 -right-2 min-w-[18px] h-[18px] flex items-center justify-center bg-[#00d4ff] text-[#0a0a0f] text-[10px] font-bold rounded-full px-1"
              >
                {itemCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}
