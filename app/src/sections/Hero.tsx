import { useEffect, useRef } from 'react';
import Globe from '../components/Globe';
import { useLanguage } from '../context/LanguageContext';
import gsap from 'gsap';

interface HeroProps {
  onScrollTo: (target: string) => void;
}

export default function Hero({ onScrollTo }: HeroProps) {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.fromTo(eyebrowRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8 }, 0.3)
      .fromTo(titleRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8 }, 0.5)
      .fromTo(subtitleRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8 }, 0.7)
      .fromTo(ctaRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8 }, 0.9)
      .fromTo(statsRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8 }, 1.1);

    return () => { tl.kill(); };
  }, []);

  const stats = [
    { value: '181+', label: t.hero.stats.games },
    { value: '3', label: t.hero.stats.paymentMethods },
    { value: '24/7', label: t.hero.stats.support },
  ];

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative w-full overflow-hidden"
      style={{ height: '100vh' }}
    >
      <Globe />

      {/* Overlay gradient */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background: 'linear-gradient(135deg, rgba(10,10,15,0.7) 0%, rgba(10,10,15,0.3) 40%, rgba(10,10,15,0.6) 100%)',
        }}
      />

      {/* Text content */}
      <div
        className="absolute inset-0 z-[2] flex items-center"
        style={{ pointerEvents: 'none' }}
      >
        <div
          className="px-6 md:px-12 lg:px-20 max-w-[600px]"
          style={{ pointerEvents: 'auto' }}
        >
          <p
            ref={eyebrowRef}
            className="text-xs font-medium uppercase tracking-[0.15em] text-[#8a8a9a] mb-4 opacity-0"
          >
            {t.hero.eyebrow}
          </p>

          <h1
            ref={titleRef}
            className="font-heading font-bold text-[clamp(3rem,8vw,6rem)] leading-[1.05] text-[#f0f0f5] tracking-[-0.02em] whitespace-pre-line opacity-0"
          >
            {t.hero.title}
          </h1>

          <p
            ref={subtitleRef}
            className="text-lg font-normal text-[#8a8a9a] mt-6 max-w-[480px] opacity-0"
          >
            {t.hero.subtitle}
          </p>

          <button
            ref={ctaRef}
            onClick={() => onScrollTo('#games')}
            className="mt-8 px-8 py-3.5 bg-[#00d4ff] text-[#0a0a0f] font-semibold text-sm uppercase tracking-wider rounded hover:bg-[#33ddff] hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(0,212,255,0.3)] transition-all duration-300 opacity-0"
          >
            {t.hero.cta}
          </button>

          <div
            ref={statsRef}
            className="mt-12 flex gap-8 opacity-0"
          >
            {stats.map((stat) => (
              <div key={stat.label}>
                <div className="text-2xl font-bold text-[#00d4ff] font-mono">{stat.value}</div>
                <div className="text-xs text-[#8a8a9a] mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
