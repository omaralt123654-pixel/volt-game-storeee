import { useEffect, useRef } from 'react';
import { Search, CreditCard, Gamepad2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function HowToBuy() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (stepsRef.current) {
      const stepEls = stepsRef.current.querySelectorAll('.step-item');
      gsap.fromTo(
        stepEls,
        { opacity: 0, x: -30 },
        {
          opacity: 1, x: 0, stagger: 0.2, duration: 0.6, ease: 'power2.out',
          scrollTrigger: { trigger: stepsRef.current, start: 'top 80%' },
        }
      );
    }
  }, []);

  const steps = [
    { icon: Search, title: t.howToBuy.steps[0].title, desc: t.howToBuy.steps[0].desc },
    { icon: CreditCard, title: t.howToBuy.steps[1].title, desc: t.howToBuy.steps[1].desc },
    { icon: Gamepad2, title: t.howToBuy.steps[2].title, desc: t.howToBuy.steps[2].desc },
  ];

  return (
    <section
      ref={sectionRef}
      id="how-to-buy"
      style={{ background: '#111118', padding: '100px 0' }}
    >
      <div className="max-w-[1400px] mx-auto px-6">
        {/* Section title */}
        <div className="flex items-center gap-3 mb-12">
          <div className="w-10 h-[2px] bg-[#00d4ff]" />
          <h2 className="font-heading font-semibold text-[clamp(1.5rem,3vw,2.5rem)] text-[#f0f0f5]">
            {t.howToBuy.title}
          </h2>
        </div>

        {/* Steps */}
        <div ref={stepsRef} className="flex flex-col md:flex-row gap-8 md:gap-12">
          {steps.map((step, index) => (
            <div key={index} className="step-item flex-1 flex flex-col items-center text-center md:items-start md:text-left">
              {/* Step number */}
              <div className="w-12 h-12 rounded-full border-2 border-[#00d4ff] flex items-center justify-center text-[#00d4ff] font-bold text-lg mb-4">
                {index + 1}
              </div>

              {/* Connector line (desktop only) */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute left-full top-6 w-12 h-[2px] border-t-2 border-dashed border-[rgba(0,212,255,0.3)]" style={{ transform: 'translateX(24px)' }} />
              )}

              <step.icon className="w-8 h-8 text-[#00d4ff] mb-3" />
              <h3 className="text-lg font-semibold text-[#f0f0f5] mb-2">{step.title}</h3>
              <p className="text-sm text-[#8a8a9a] leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
