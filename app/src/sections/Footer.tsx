import { Zap } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer
      style={{
        background: '#0a0a0f',
        borderTop: '1px solid rgba(255,255,255,0.05)',
        padding: '48px 0',
      }}
    >
      <div className="max-w-[1400px] mx-auto px-6 text-center">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 text-[#00d4ff] font-heading font-bold text-xl mb-2">
          <Zap className="w-5 h-5" />
          <span>VOLT</span>
        </div>

        <p className="text-sm text-[#8a8a9a] mb-4">{t.footer.tagline}</p>

        {/* Payment labels */}
        <div className="flex items-center justify-center gap-4 mb-4">
          <span className="text-xs text-[#8a8a9a] px-3 py-1 rounded-full border border-[rgba(255,255,255,0.1)]">
            Vodafone Cash
          </span>
          <span className="text-xs text-[#8a8a9a] px-3 py-1 rounded-full border border-[rgba(255,255,255,0.1)]">
            InstaPay
          </span>
          <span className="text-xs text-[#8a8a9a] px-3 py-1 rounded-full border border-[rgba(255,255,255,0.1)]">
            Binance Pay
          </span>
        </div>

        <p className="text-xs text-[#8a8a9a]">{t.footer.copyright}</p>
      </div>
    </footer>
  );
}
