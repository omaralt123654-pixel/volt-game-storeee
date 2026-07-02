import { Check, Heart, Truck } from 'lucide-react';
import type { Game } from '../types/game';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';

interface GameCardProps {
  game: Game;
  index: number;
  onSelect: (game: Game) => void;
}

export default function GameCard({ game, index, onSelect }: GameCardProps) {
  const { t } = useLanguage();
  const { items, addItem } = useCart();
  const inCart = items.some(item => item.id === game.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem(game);
  };

  return (
    <div
      className="group bg-[#1a1a24] rounded-xl overflow-hidden border border-[rgba(255,255,255,0.05)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.4)] hover:border-[rgba(0,212,255,0.2)] cursor-pointer animate-fade-in"
      style={{ animationDelay: `${index * 0.05}s` }}
      onClick={() => onSelect(game)}
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter') onSelect(game); }}
    >
      {/* Image container */}
      <div className="relative overflow-hidden aspect-[460/215]">
        <img
          src={game.image}
          alt={game.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/460x215/1a1a24/00d4ff?text=VOLT';
          }}
        />

        {/* Discount badge */}
        {game.has_discount === 1 && (
          <span className="absolute top-3 left-3 bg-[#22c55e] text-[#0a0a0f] px-2.5 py-1 rounded text-xs font-bold">
            -{game.discount_percent}%
          </span>
        )}

        {/* Likes */}
        <span className="absolute top-3 right-3 bg-[rgba(0,0,0,0.6)] backdrop-blur-sm px-2.5 py-1 rounded-full text-xs text-[#f0f0f5] flex items-center gap-1">
          <Heart className="w-3 h-3" />
          {game.likes_count.toLocaleString()}
        </span>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-base font-semibold text-[#f0f0f5] leading-tight line-clamp-2 mb-2 min-h-[2.5rem]">
          {game.name}
        </h3>

        {/* Price row */}
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-[#00d4ff]">
            {game.price.toLocaleString()} EGP
          </span>
          {game.has_discount === 1 && game.old_price > 0 && (
            <span className="text-sm text-[#8a8a9a] line-through">
              {game.old_price.toLocaleString()} EGP
            </span>
          )}
        </div>

        {/* Delivery badge */}
        <div className="mt-2 flex items-center gap-1 text-xs text-[#8a8a9a]">
          <Truck className="w-3 h-3" />
          {t.games.delivery}
        </div>

        {/* Add to Cart button */}
        <button
          onClick={handleAddToCart}
          className={`mt-3 w-full py-2.5 rounded-md text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
            inCart
              ? 'bg-[rgba(34,197,94,0.1)] border border-[rgba(34,197,94,0.3)] text-[#22c55e]'
              : 'bg-[rgba(0,212,255,0.1)] border border-[rgba(0,212,255,0.3)] text-[#00d4ff] hover:bg-[#00d4ff] hover:text-[#0a0a0f]'
          }`}
        >
          {inCart ? (
            <>
              <Check className="w-4 h-4" />
              {t.games.inCart}
            </>
          ) : (
            t.games.addToCart
          )}
        </button>
      </div>
    </div>
  );
}
