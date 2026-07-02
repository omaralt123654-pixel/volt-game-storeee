import { useEffect, useRef } from 'react';
import { X, ExternalLink, Clock, Gamepad2, Globe, Truck, Monitor, Eye, Heart } from 'lucide-react';
import type { Game } from '../types/game';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import gsap from 'gsap';

interface GameDetailModalProps {
  game: Game | null;
  onClose: () => void;
}

export default function GameDetailModal({ game, onClose }: GameDetailModalProps) {
  const { t } = useLanguage();
  const { addItem } = useCart();
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (game && modalRef.current) {
      gsap.fromTo(
        modalRef.current,
        { scale: 0.95, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.3, ease: 'power2.out' }
      );
    }
  }, [game]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!game) return null;

  const handleAddToCart = () => {
    addItem(game);
  };

  const savings = game.old_price > 0 ? game.old_price - game.price : 0;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ background: 'rgba(10,10,15,0.9)', backdropFilter: 'blur(8px)' }}
      onClick={onClose}
    >
      <div
        ref={modalRef}
        className="relative w-full max-w-[900px] max-h-[90vh] overflow-y-auto rounded-2xl border border-[rgba(255,255,255,0.08)]"
        style={{ background: '#111118' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-3 rounded-full bg-[rgba(255,255,255,0.1)] text-[#f0f0f5] hover:bg-[rgba(255,255,255,0.2)] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid md:grid-cols-2 gap-0">
          {/* Left: Image */}
          <div className="p-6">
            <img
              src={game.image}
              alt={game.name}
              className="w-full rounded-xl aspect-[460/215] object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://via.placeholder.com/460x215/1a1a24/00d4ff?text=VOLT';
              }}
            />
          </div>

          {/* Right: Details */}
          <div className="p-6 pt-4 md:pt-6">
            <h2 className="text-2xl font-bold text-[#f0f0f5] font-heading pr-12">{game.name}</h2>

            <p className="mt-3 text-sm text-[#8a8a9a] leading-relaxed">
              {game.description || 'No description available.'}
            </p>

            {/* Steam link */}
            <a
              href={game.steam_url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-1.5 text-sm text-[#00d4ff] hover:underline"
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink className="w-4 h-4" />
              {t.detail.steamPage}
            </a>

            {/* Price section */}
            <div className="mt-5">
              <div className="text-3xl font-bold text-[#00d4ff]">
                {game.price.toLocaleString()} EGP
              </div>
              {game.has_discount === 1 && game.old_price > 0 && (
                <>
                  <div className="text-base text-[#8a8a9a] line-through mt-1">
                    {game.old_price.toLocaleString()} EGP
                  </div>
                  <div className="text-sm text-[#22c55e] mt-1">
                    {t.detail.save} {savings.toLocaleString()} EGP
                  </div>
                </>
              )}
            </div>

            {/* Sale end date */}
            {game.sale_end_date && (
              <div className="mt-2 flex items-center gap-1.5 text-sm text-[#8a8a9a]">
                <Clock className="w-4 h-4" />
                {t.detail.offerEnds}: {game.sale_end_date}
              </div>
            )}

            {/* Add to Cart */}
            <button
              onClick={handleAddToCart}
              className="mt-5 w-full py-3.5 bg-[#00d4ff] text-[#0a0a0f] font-semibold text-base rounded-lg hover:bg-[#33ddff] transition-colors duration-300"
            >
              {t.detail.addToCart} — {game.price.toLocaleString()} EGP
            </button>

            {/* Info grid */}
            <div className="mt-5 grid grid-cols-2 gap-3">
              <div className="flex items-center gap-2 text-sm text-[#8a8a9a]">
                <Monitor className="w-4 h-4 text-[#00d4ff]" />
                <span>{t.detail.platform}: <span className="text-[#f0f0f5]">{game.platform}</span></span>
              </div>
              <div className="flex items-center gap-2 text-sm text-[#8a8a9a]">
                <Globe className="w-4 h-4 text-[#00d4ff]" />
                <span>{t.detail.region}: <span className="text-[#f0f0f5]">{game.region}</span></span>
              </div>
              <div className="flex items-center gap-2 text-sm text-[#8a8a9a]">
                <Truck className="w-4 h-4 text-[#00d4ff]" />
                <span>{t.detail.delivery}: <span className="text-[#f0f0f5]">{game.delivery_type}</span></span>
              </div>
              <div className="flex items-center gap-2 text-sm text-[#8a8a9a]">
                <Gamepad2 className="w-4 h-4 text-[#00d4ff]" />
                <span>{t.detail.type}: <span className="text-[#f0f0f5]">{game.product_type}</span></span>
              </div>
            </div>

            {/* Views and likes */}
            <div className="mt-4 flex gap-6 text-sm text-[#8a8a9a]">
              <span className="flex items-center gap-1.5">
                <Eye className="w-4 h-4" />
                {game.views_count.toLocaleString()} {t.detail.views}
              </span>
              <span className="flex items-center gap-1.5">
                <Heart className="w-4 h-4" />
                {game.likes_count.toLocaleString()} {t.detail.likes}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
