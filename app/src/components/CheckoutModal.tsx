import { useState, useEffect, useRef } from 'react';
import { X, AlertTriangle, CheckCircle, MessageCircle, Radio } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';
import type { PaymentMethod } from '../types/game';
import gsap from 'gsap';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CheckoutModal({ isOpen, onClose }: CheckoutModalProps) {
  const { items, total, clearCart } = useCart();
  const { t, lang } = useLanguage();
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('vodafone_cash');
  const [step, setStep] = useState<'summary' | 'paid'>('summary');
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && modalRef.current) {
      gsap.fromTo(
        modalRef.current,
        { scale: 0.95, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.3, ease: 'power2.out' }
      );
      setStep('summary');
      setPaymentMethod('vodafone_cash');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    if (isOpen) document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [isOpen]);

  const handleClose = () => {
    if (modalRef.current) {
      gsap.to(modalRef.current, {
        scale: 0.95, opacity: 0, duration: 0.2, ease: 'power2.in',
        onComplete: onClose,
      });
    } else {
      onClose();
    }
  };

  const handlePaid = () => {
    setStep('paid');
  };

  const getWhatsAppLink = () => {
    const itemsList = items.map(i => `- ${i.name} (${i.price.toLocaleString()} EGP)`).join('\n');
    const message = lang === 'ar'
      ? `مرحباً، لقد قمت بالدفع للطلب التالي:\n${itemsList}\n\nالمجموع: ${total.toLocaleString()} EGP\n\nطريقة الدفع: ${paymentMethod === 'vodafone_cash' ? 'فودافون كاش' : 'بينانس باي'}\n\nيرجى إرسال مفتاح Steam.`
      : `Hi, I have paid for the following order:\n${itemsList}\n\nTotal: ${total.toLocaleString()} EGP\n\nPayment: ${paymentMethod === 'vodafone_cash' ? 'Vodafone Cash' : 'Binance Pay'}\n\nPlease send my Steam key.`;
    return `https://wa.me/201080590462?text=${encodeURIComponent(message)}`;
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[300] flex items-center justify-center p-4"
      style={{ background: 'rgba(10,10,15,0.9)', backdropFilter: 'blur(8px)' }}
      onClick={handleClose}
    >
      <div
        ref={modalRef}
        className="relative w-full max-w-[600px] max-h-[90vh] overflow-y-auto rounded-2xl border border-[rgba(255,255,255,0.08)] p-6"
        style={{ background: '#111118' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-[rgba(255,255,255,0.1)] text-[#f0f0f5] hover:bg-[rgba(255,255,255,0.2)] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {step === 'summary' ? (
          <>
            <h2 className="text-2xl font-bold text-[#f0f0f5] font-heading mb-6 pr-12">
              {t.checkout.title}
            </h2>

            {/* Order Summary */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-[#8a8a9a] uppercase tracking-wider mb-3">
                {t.checkout.orderSummary}
              </h3>
              <div className="space-y-2 max-h-[200px] overflow-y-auto">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between items-center py-2 border-b border-[rgba(255,255,255,0.05)]">
                    <span className="text-sm text-[#f0f0f5] flex-1 mr-4">{item.name}</span>
                    <span className="text-sm font-semibold text-[#00d4ff]">{item.price.toLocaleString()} EGP</span>
                  </div>
                ))}
              </div>
              <div className="flex justify-between items-center mt-4 pt-3 border-t border-[rgba(255,255,255,0.1)]">
                <span className="font-semibold text-[#f0f0f5]">{t.cart.subtotal}</span>
                <span className="text-xl font-bold text-[#00d4ff]">{total.toLocaleString()} EGP</span>
              </div>
            </div>

            {/* Payment Method Selection */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-[#8a8a9a] uppercase tracking-wider mb-3">
                {t.checkout.paymentMethod}
              </h3>

              {/* Vodafone Cash */}
              <label
                className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all duration-300 mb-3 ${
                  paymentMethod === 'vodafone_cash'
                    ? 'border-[rgba(239,68,68,0.4)] bg-[rgba(239,68,68,0.05)]'
                    : 'border-[rgba(255,255,255,0.08)] hover:border-[rgba(255,255,255,0.15)]'
                }`}
                style={{ background: paymentMethod === 'vodafone_cash' ? 'rgba(239,68,68,0.05)' : '#1a1a24' }}
              >
                <Radio className={`w-5 h-5 flex-shrink-0 ${paymentMethod === 'vodafone_cash' ? 'text-[#ef4444]' : 'text-[#8a8a9a]'}`} />
                <div className="flex-1">
                  <div className="font-semibold text-[#f0f0f5]">{t.checkout.vodafoneCash}</div>
                  <div className="text-sm text-[#8a8a9a]">{t.checkout.payWithVodafone}</div>
                </div>
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === 'vodafone_cash'}
                  onChange={() => setPaymentMethod('vodafone_cash')}
                  className="sr-only"
                />
              </label>

              {/* Binance Pay */}
              <label
                className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all duration-300 mb-3 ${
                  paymentMethod === 'binance_pay'
                    ? 'border-[rgba(245,158,11,0.4)] bg-[rgba(245,158,11,0.05)]'
                    : 'border-[rgba(255,255,255,0.08)] hover:border-[rgba(255,255,255,0.15)]'
                }`}
                style={{ background: paymentMethod === 'binance_pay' ? 'rgba(245,158,11,0.05)' : '#1a1a24' }}
              >
                <Radio className={`w-5 h-5 flex-shrink-0 ${paymentMethod === 'binance_pay' ? 'text-[#f59e0b]' : 'text-[#8a8a9a]'}`} />
                <div className="flex-1">
                  <div className="font-semibold text-[#f0f0f5]">{t.checkout.binancePay}</div>
                  <div className="text-sm text-[#8a8a9a]">{t.checkout.payWithBinance}</div>
                </div>
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === 'binance_pay'}
                  onChange={() => setPaymentMethod('binance_pay')}
                  className="sr-only"
                />
              </label>

              {/* InstaPay - Coming Soon */}
              <div
                className="flex items-center gap-4 p-4 rounded-xl border border-[rgba(255,255,255,0.08)] opacity-60 cursor-not-allowed"
                style={{ background: '#1a1a24' }}
              >
                <Radio className="w-5 h-5 flex-shrink-0 text-[#8a8a9a]" />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-[#f0f0f5]">{t.checkout.instapay}</span>
                    <span className="text-xs px-3 py-0.5 rounded-full bg-[rgba(245,158,11,0.2)] text-[#f59e0b] font-semibold">
                      {t.checkout.comingSoon}
                    </span>
                  </div>
                  <div className="text-sm text-[#8a8a9a]">{t.checkout.instapayComing}</div>
                </div>
              </div>
            </div>

            {/* QR Code Display */}
            <div className="flex justify-center mb-6">
              <div className="p-4 rounded-xl bg-white">
                <img
                  src={paymentMethod === 'vodafone_cash' ? '/images/vodafone_cash_qr.png' : '/images/binance_pay_qr.png'}
                  alt={paymentMethod === 'vodafone_cash' ? 'Vodafone Cash QR' : 'Binance Pay QR'}
                  className="w-[200px] h-[200px] object-contain"
                />
              </div>
            </div>

            {/* Warning */}
            <div
              className="rounded-lg p-4 mb-6 flex gap-3"
              style={{
                background: 'rgba(245,158,11,0.1)',
                border: '1px solid rgba(245,158,11,0.3)',
              }}
            >
              <AlertTriangle className="w-5 h-5 text-[#f59e0b] flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-[#f59e0b]">{t.checkout.warningTitle}</p>
                <p className="text-sm text-[#f0f0f5] mt-1">{t.checkout.warningText}</p>
              </div>
            </div>

            {/* I've Paid Button */}
            <button
              onClick={handlePaid}
              className="w-full py-4 bg-[#22c55e] text-white font-bold text-base rounded-lg hover:bg-[#16a34a] transition-colors duration-300"
            >
              {t.checkout.ivePaid}
            </button>
          </>
        ) : (
          /* Post-Paid Screen */
          <div className="text-center py-8">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[rgba(34,197,94,0.1)] mb-6">
              <CheckCircle className="w-10 h-10 text-[#22c55e]" />
            </div>

            <h2 className="text-2xl font-bold text-[#f0f0f5] font-heading mb-2">
              {t.checkout.successTitle}
            </h2>
            <p className="text-[#8a8a9a] mb-8">
              {t.checkout.successMessage}
            </p>

            {/* Contact Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-[#25d366] text-white font-semibold rounded-lg hover:opacity-90 transition-opacity"
              >
                <MessageCircle className="w-5 h-5" />
                {t.checkout.contactWhatsApp}
              </a>
              <button
                onClick={() => {
                  navigator.clipboard?.writeText('omar400n');
                }}
                className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-[#5865F2] text-white font-semibold rounded-lg hover:opacity-90 transition-opacity"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                </svg>
                {t.checkout.contactDiscord}
              </button>
            </div>

            {/* Discord username display */}
            <p className="text-sm text-[#8a8a9a] mb-6">
              Discord: <span className="text-[#f0f0f5] font-mono">omar400n</span>
            </p>

            <p className="text-sm text-[#8a8a9a] max-w-[400px] mx-auto">
              {t.checkout.instructions}
            </p>

            <button
              onClick={() => {
                clearCart();
                handleClose();
              }}
              className="mt-8 px-8 py-3 bg-[rgba(0,212,255,0.1)] border border-[rgba(0,212,255,0.3)] text-[#00d4ff] font-semibold rounded-lg hover:bg-[#00d4ff] hover:text-[#0a0a0f] transition-all duration-300"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
