import { useEffect, useRef } from 'react';
import { X, Trash2, ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';
import gsap from 'gsap';

interface CartDrawerProps {
  onCheckout: () => void;
}

export default function CartDrawer({ onCheckout }: CartDrawerProps) {
  const { items, removeItem, total, itemCount, isOpen, setIsOpen } = useCart();
  const { t } = useLanguage();
  const drawerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      if (drawerRef.current) {
        gsap.fromTo(drawerRef.current, { x: '100%' }, { x: '0%', duration: 0.3, ease: 'power2.out' });
      }
      if (overlayRef.current) {
        gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3 });
      }
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
    }
    return () => document.removeEventListener('keydown', handleEsc);
  }, [isOpen, setIsOpen]);

  const handleClose = () => {
    if (drawerRef.current) {
      gsap.to(drawerRef.current, {
        x: '100%',
        duration: 0.3,
        ease: 'power2.in',
        onComplete: () => setIsOpen(false),
      });
    } else {
      setIsOpen(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-[199] bg-[rgba(0,0,0,0.6)]"
        onClick={handleClose}
      />

      {/* Drawer */}
      <div
        ref={drawerRef}
        className="fixed top-0 right-0 h-[100dvh] z-[200] flex flex-col"
        style={{
          width: '100%',
          maxWidth: '420px',
          background: '#111118',
          borderLeft: '1px solid rgba(255,255,255,0.08)',
          boxShadow: '-8px 0 40px rgba(0,0,0,0.5)',
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[rgba(255,255,255,0.08)]">
          <h3 className="text-lg font-semibold text-[#f0f0f5] font-heading">
            {t.cart.title}
            {itemCount > 0 && (
              <span className="ml-2 text-sm text-[#8a8a9a]">
                ({itemCount} {itemCount === 1 ? t.cart.item : t.cart.items})
              </span>
            )}
          </h3>
          <button
            onClick={handleClose}
            className="p-2 rounded-full hover:bg-[rgba(255,255,255,0.1)] transition-colors text-[#f0f0f5]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-[#8a8a9a]">
              <ShoppingCart className="w-12 h-12 mb-4 opacity-50" />
              <p>{t.cart.empty}</p>
            </div>
          ) : (
            <div className="space-y-0">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 py-4 border-b border-[rgba(255,255,255,0.05)]"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                    loading="lazy"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://via.placeholder.com/64/1a1a24/00d4ff?text=V';
                    }}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-[#f0f0f5] truncate">{item.name}</p>
                    <p className="text-sm font-semibold text-[#00d4ff] mt-1">
                      {item.price.toLocaleString()} EGP
                    </p>
                    {item.quantity > 1 && (
                      <p className="text-xs text-[#8a8a9a]">x{item.quantity}</p>
                    )}
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="p-2 text-[#8a8a9a] hover:text-[#ef4444] transition-colors flex-shrink-0"
                    aria-label={t.cart.remove}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-6 border-t border-[rgba(255,255,255,0.08)]">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[#8a8a9a]">{t.cart.subtotal}</span>
              <span className="text-xl font-bold text-[#00d4ff]">
                {total.toLocaleString()} EGP
              </span>
            </div>
            <button
              onClick={() => {
                handleClose();
                setTimeout(onCheckout, 350);
              }}
              className="w-full py-3.5 bg-[#00d4ff] text-[#0a0a0f] font-semibold text-base rounded-lg hover:bg-[#33ddff] transition-colors duration-300"
            >
              {t.cart.checkout} — {total.toLocaleString()} EGP
            </button>
          </div>
        )}
      </div>
    </>
  );
}
