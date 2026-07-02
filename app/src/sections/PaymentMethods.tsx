import { useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function PaymentMethods() {
  const { t } = useLanguage();
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (cardsRef.current) {
      const cards = cardsRef.current.querySelectorAll('.payment-card');
      gsap.fromTo(
        cards,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, stagger: 0.15, duration: 0.6, ease: 'power2.out',
          scrollTrigger: { trigger: cardsRef.current, start: 'top 80%' },
        }
      );
    }
  }, []);

  return (
    <section
      id="payment"
      style={{ background: '#0a0a0f', padding: '100px 0' }}
    >
      <div className="max-w-[1400px] mx-auto px-6">
        {/* Section title */}
        <div className="flex items-center gap-3 mb-12">
          <div className="w-10 h-[2px] bg-[#00d4ff]" />
          <h2 className="font-heading font-semibold text-[clamp(1.5rem,3vw,2.5rem)] text-[#f0f0f5]">
            {t.payment.title}
          </h2>
        </div>

        {/* Payment cards */}
        <div ref={cardsRef} className="grid md:grid-cols-3 gap-6">
          {/* Vodafone Cash */}
          <div
            className="payment-card rounded-xl p-8 flex flex-col items-center text-center"
            style={{
              background: '#1a1a24',
              border: '1px solid rgba(239,68,68,0.2)',
            }}
          >
            <div className="w-16 h-16 rounded-full bg-[rgba(239,68,68,0.1)] flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-[#ef4444]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2zm0 15l-5-2.18L7 18V5h10v13z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-[#f0f0f5] mb-2">{t.checkout.vodafoneCash}</h3>
            <p className="text-sm text-[#8a8a9a] mb-4">{t.payment.vodafoneDesc}</p>
            <div className="p-2 rounded-lg bg-white">
              <img
                src="/images/vodafone_cash_qr.png"
                alt="Vodafone Cash QR"
                className="w-[180px] h-[180px] object-contain"
              />
            </div>
          </div>

          {/* InstaPay - Coming Soon */}
          <div
            className="payment-card rounded-xl p-8 flex flex-col items-center text-center"
            style={{
              background: '#1a1a24',
              border: '1px solid rgba(255,255,255,0.1)',
            }}
          >
            <div className="w-16 h-16 rounded-full bg-[rgba(245,158,11,0.1)] flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-[#f59e0b]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
              </svg>
            </div>
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-lg font-semibold text-[#f0f0f5]">{t.checkout.instapay}</h3>
              <span
                className="text-xs px-3 py-0.5 rounded-full font-semibold"
                style={{ background: 'rgba(245,158,11,0.2)', color: '#f59e0b' }}
              >
                {t.checkout.comingSoon}
              </span>
            </div>
            <p className="text-sm text-[#8a8a9a]">{t.payment.instapayDesc}</p>
          </div>

          {/* Binance Pay */}
          <div
            className="payment-card rounded-xl p-8 flex flex-col items-center text-center"
            style={{
              background: '#1a1a24',
              border: '1px solid rgba(245,158,11,0.2)',
            }}
          >
            <div className="w-16 h-16 rounded-full bg-[rgba(245,158,11,0.1)] flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-[#f59e0b]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.31-8.86c-1.77-.45-2.34-.94-2.34-1.67 0-.84.79-1.43 2.1-1.43 1.38 0 1.9.66 1.94 1.64h1.71c-.05-1.34-.87-2.57-2.49-2.97V5H10.9v1.69c-1.51.32-2.72 1.3-2.72 2.81 0 1.79 1.49 2.69 3.66 3.21 1.95.46 2.34 1.15 2.34 1.87 0 .53-.39 1.39-2.1 1.39-1.6 0-2.23-.72-2.32-1.64H8.04c.1 1.7 1.36 2.66 2.86 2.97V19h2.34v-1.67c1.52-.29 2.72-1.16 2.73-2.77-.01-2.2-1.9-2.96-3.66-3.42z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-[#f0f0f5] mb-2">{t.checkout.binancePay}</h3>
            <p className="text-sm text-[#8a8a9a] mb-4">{t.payment.binanceDesc}</p>
            <div className="p-2 rounded-lg bg-white">
              <img
                src="/images/binance_pay_qr.png"
                alt="Binance Pay QR"
                className="w-[180px] h-[180px] object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
