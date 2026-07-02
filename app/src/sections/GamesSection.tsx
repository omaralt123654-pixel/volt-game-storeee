import { useState, useMemo, useRef, useEffect } from 'react';
import { Search } from 'lucide-react';
import type { Game } from '../types/game';
import { useLanguage } from '../context/LanguageContext';
import { useGames } from '../hooks/useGames';
import GameCard from '../components/GameCard';
import GameDetailModal from '../components/GameDetailModal';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type SortOption = 'popular' | 'priceLow' | 'priceHigh' | 'discount';

export default function GamesSection() {
  const { t } = useLanguage();
  const { games, loading, error } = useGames();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('popular');
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  // Entrance animation for title
  useEffect(() => {
    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.6, ease: 'power2.out',
          scrollTrigger: { trigger: titleRef.current, start: 'top 85%' },
        }
      );
    }
  }, []);

  const filteredGames = useMemo(() => {
    let result = [...games];

    // Search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(g => g.name.toLowerCase().includes(q));
    }

    // Sort
    switch (sortBy) {
      case 'priceLow':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'priceHigh':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'discount':
        result.sort((a, b) => b.discount_percent - a.discount_percent);
        break;
      default: // popular - by likes
        result.sort((a, b) => b.likes_count - a.likes_count);
    }

    return result;
  }, [games, searchQuery, sortBy]);

  if (loading) {
    return (
      <section id="games" className="py-20 px-6">
        <div className="max-w-[1400px] mx-auto text-center text-[#8a8a9a]">
          Loading games...
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="games" className="py-20 px-6">
        <div className="max-w-[1400px] mx-auto text-center text-[#ef4444]">
          Error loading games: {error}
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      id="games"
      className="py-[120px] pb-20 px-6"
      style={{ background: '#0a0a0f' }}
    >
      <div className="max-w-[1400px] mx-auto">
        {/* Section title */}
        <div ref={titleRef} className="flex items-center gap-3 mb-12">
          <div className="w-10 h-[2px] bg-[#00d4ff]" />
          <h2 className="font-heading font-semibold text-[clamp(1.5rem,3vw,2.5rem)] text-[#f0f0f5]">
            {t.games.title}
          </h2>
        </div>

        {/* Search and Sort bar */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8a8a9a]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.games.searchPlaceholder}
              className="w-full pl-12 pr-4 py-3.5 rounded-lg text-[#f0f0f5] placeholder-[#8a8a9a] outline-none transition-all duration-300 focus:border-[#00d4ff] focus:shadow-[0_0_0_3px_rgba(0,212,255,0.1)]"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
            />
          </div>

          {/* Sort dropdown */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="px-4 py-3.5 rounded-lg text-sm text-[#f0f0f5] outline-none cursor-pointer transition-all duration-300 focus:border-[#00d4ff]"
            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
          >
            <option value="popular">{t.games.sortOptions.popular}</option>
            <option value="priceLow">{t.games.sortOptions.priceLow}</option>
            <option value="priceHigh">{t.games.sortOptions.priceHigh}</option>
            <option value="discount">{t.games.sortOptions.discount}</option>
          </select>
        </div>

        {/* Results count */}
        <p className="text-sm text-[#8a8a9a] mb-6">
          {filteredGames.length} games
        </p>

        {/* Game grid */}
        {filteredGames.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredGames.map((game, index) => (
              <GameCard
                key={game.id}
                game={game}
                index={index}
                onSelect={setSelectedGame}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-[#8a8a9a]">
            No games found matching &quot;{searchQuery}&quot;
          </div>
        )}
      </div>

      {/* Game Detail Modal */}
      {selectedGame && (
        <GameDetailModal
          game={selectedGame}
          onClose={() => setSelectedGame(null)}
        />
      )}
    </section>
  );
}
