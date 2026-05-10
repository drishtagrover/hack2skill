import { useEffect, useRef } from 'react';

const LEFT = [
  { title:'Mentorship from Experts', desc:'Gain invaluable insights and guidance from experienced technologists and domain experts.' },
  { title:'Networking', desc:'Connect with peers, professionals, and innovation leaders from across the nation.' },
];
const RIGHT = [
  { title:'Internship Opportunities', desc:'Stand a chance to secure internships at top institutions and innovation labs.' },
  { title:'Real-World Impact', desc:'Contribute to meaningful challenges that aim to improve lives and systems at scale.' },
];

/* Concentric ring layers: size (px), animation delay (s), base border opacity */
const RINGS = [
  { size: 100, delay: 0.0,  opacity: 0.70 },
  { size: 160, delay: 0.3,  opacity: 0.55 },
  { size: 220, delay: 0.6,  opacity: 0.42 },
  { size: 285, delay: 0.9,  opacity: 0.30 },
  { size: 350, delay: 1.2,  opacity: 0.20 },
  { size: 420, delay: 1.5,  opacity: 0.12 },
  { size: 490, delay: 1.8,  opacity: 0.07 },
];

/* Radar rings that expand outward */
const RADAR = [{ delay: 0 }, { delay: 1.0 }, { delay: 2.0 }];

export default function WhyParticipate() {
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting)
          e.target.querySelectorAll('.reveal').forEach((el, i) =>
            setTimeout(() => el.classList.add('show'), i * 120)
          );
      });
    }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="whyparticipate" ref={ref} className="relative overflow-hidden" style={{ background: '#0a0a0f' }}>

      {/* Section label */}
      <div className="reveal text-center pt-16 pb-6">
        <p className="text-purple-400 text-xs tracking-widest uppercase font-semibold">WHY PARTICIPATE?</p>
      </div>

      <div className="flex" style={{ minHeight: 420 }}>

        {/* LEFT purple band */}
        <div className="flex-shrink-0 flex flex-col justify-center relative" style={{ width: '30%', background: '#7c3aed' }}>
          {LEFT.map((item, i) => (
            <div key={i} className="reveal px-6 md:px-8 py-7 border-b border-purple-500 last:border-0">
              <h3 className="text-white font-bold text-sm mb-2">{item.title}</h3>
              <p className="text-purple-100 text-xs leading-relaxed">{item.desc}</p>
            </div>
          ))}
          <div className="absolute right-0 top-[28%] w-6 h-16" style={{ background: 'rgba(255,255,255,0.15)' }} />
          <div className="absolute right-0 top-[63%] w-6 h-12" style={{ background: 'rgba(255,255,255,0.15)' }} />
        </div>

        {/* CENTER — astronaut + premium animated rings */}
        <div
          className="reveal flex-1 relative flex items-center justify-center overflow-hidden"
          style={{ background: 'radial-gradient(ellipse at 50% 58%, #1c0840 0%, #0d0618 45%, #0a0a0f 70%)' }}
        >

          {/* Deep ambient purple glow */}
          <div className="wp-ambient-glow" />

          {/* Static + pulsating concentric rings */}
          {RINGS.map((ring, i) => (
            <div
              key={`ring-${i}`}
              className="wp-ring wp-ring-pulse"
              style={{
                width:  ring.size,
                height: ring.size,
                animationDelay: `${ring.delay}s`,
                '--ring-opacity': ring.opacity,
              }}
            />
          ))}

          {/* Radar emanating rings */}
          {RADAR.map((r, i) => (
            <div
              key={`radar-${i}`}
              className="wp-radar-ring"
              style={{ animationDelay: `${r.delay}s` }}
            />
          ))}

          {/* Inner glowing core */}
          <div className="wp-core" />

          {/* Decorative tick marks around second-to-last ring */}
          {Array.from({ length: 16 }).map((_, i) => (
            <div
              key={`tick-${i}`}
              className="wp-tick"
              style={{ transform: `translate(-50%, -50%) rotate(${i * 22.5}deg) translateY(-208px)` }}
            />
          ))}

          {/* Astronaut — foreground */}
          <img
            src="/astronaut.png"
            alt="Astronaut"
            className="float-anim"
            style={{ height: '88%', maxHeight: 380, width: 'auto', objectFit: 'contain', position: 'relative', zIndex: 10 }}
          />
        </div>

        {/* RIGHT dark panel */}
        <div className="flex-shrink-0 flex flex-col justify-center relative" style={{ width: '30%', background: '#0a0a0f' }}>
          <div className="absolute left-0 top-[28%] w-6 h-16 bg-purple-700" />
          <div className="absolute left-0 top-[63%] w-6 h-12 bg-purple-700" />
          {RIGHT.map((item, i) => (
            <div key={i} className="reveal pl-10 pr-6 md:pr-8 py-7 border-b border-gray-800 last:border-0">
              <h3 className="text-white font-bold text-sm mb-2">{item.title}</h3>
              <p className="text-gray-400 text-xs leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}