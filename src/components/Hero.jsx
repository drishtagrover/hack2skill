import { useEffect, useRef, useState } from 'react';

export default function Hero() {
  const [time, setTime] = useState({ d: 16, h: 12, m: 42, s: 31 });

  useEffect(() => {
    const target = new Date('2025-07-04T00:00:00');
    const tick = () => {
      const diff = target - Date.now();
      if (diff <= 0) return;
      setTime({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff % 86400000) / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="about" className="relative min-h-screen overflow-hidden" style={{ background: '#0a0a0f' }}>
      {/* Purple blob background right */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img
          src="/assets/hero_bg.jpg"
          alt=""
          className="absolute right-0 top-0 h-full w-auto object-cover opacity-80"
          style={{ maxWidth: '60%' }}
        />
        {/* Dark overlay on left */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(90deg, #0a0a0f 40%, transparent 75%)' }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, transparent 60%, #0a0a0f 100%)' }} />
      </div>

      {/* Hero figure */}
      <div className="absolute bottom-0 left-8 md:left-24 lg:left-32" style={{ height: '85%', zIndex: 2 }}>
        <img
          src="/assets/hero_figure.jpg"
          alt="CODE THE FUTURE"
          className="h-full w-auto object-contain object-bottom"
          style={{ maxHeight: 700 }}
        />
        {/* Purple square backdrop behind figure */}
        <div className="absolute bottom-0 left-0 w-40 md:w-52" style={{
          height: '60%', background: '#7c3aed', zIndex: -1, right: 'auto',
          transform: 'translateX(-10%)',
        }} />
      </div>

      {/* Text content */}
      <div className="relative z-10 flex flex-col justify-center min-h-screen pl-8 md:pl-24 lg:pl-32 pt-24 pb-16">
        <div className="max-w-xl ml-24 md:ml-40 lg:ml-52">
          <h1 className="font-black leading-none text-white" style={{ fontSize: 'clamp(48px, 7vw, 96px)' }}>
            CODE THE
          </h1>
          <h1 className="font-black leading-none" style={{
            fontSize: 'clamp(48px, 7vw, 96px)',
            color: 'transparent',
            WebkitTextStroke: '2px #7c3aed',
          }}>
            FUTURE
          </h1>
          <p className="text-gray-300 text-sm mt-4 uppercase tracking-widest">
            WHERE INNOVATION BECOMES REALITY
          </p>
        </div>

        {/* Register Now button - bottom right area */}
        <div className="absolute bottom-8 right-8 md:right-16">
          <button className="px-6 py-3 bg-white text-gray-900 font-semibold text-sm rounded hover:bg-gray-100 transition-colors">
            Register Now
          </button>
        </div>
      </div>
    </section>
  );
}
