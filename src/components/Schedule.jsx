import { useState, useRef, useEffect } from 'react';

const events = [
  { title: 'Registrations and Idea\nSubmission Open', date: 'Thu, Jul 04, 2025' },
  { title: 'Introductory and Problem\nStatement Explainer Session', date: 'Thu, Jul 08, 2025' },
  { title: 'Mentor-Mentee\nConnects – Begins', date: 'Thu, Jul 08, 2025' },
  { title: 'Mentor-Mentee\nConnects – Ends', date: 'Tue, Jul 16, 2025' },
];

export default function Schedule() {
  const [active, setActive] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) e.target.querySelectorAll('.reveal').forEach((el,i) => setTimeout(() => el.classList.add('show'), i*120));
      });
    }, { threshold: 0.15 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="schedules" ref={ref} className="py-20" style={{ background: 'linear-gradient(180deg, #0a0a0f 0%, #0d0b1a 50%, #0a0a0f 100%)' }}>
      <div className="max-w-5xl mx-auto px-6">
        <div className="reveal text-center mb-12">
          <p className="text-purple-400 text-xs tracking-widest uppercase font-semibold">HACKATHON SCHEDULE</p>
        </div>

        {/* 4-column event labels */}
        <div className="reveal grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {events.map((ev, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`text-left transition-all duration-200 ${i === active ? 'opacity-100' : 'opacity-40 hover:opacity-70'}`}
            >
              <p className={`text-sm font-semibold whitespace-pre-line leading-snug mb-3 ${i === active ? 'text-purple-300' : 'text-gray-400'}`}>
                {ev.title}
              </p>
              {/* Progress bar */}
              <div className="h-1 rounded mb-3" style={{ background: 'rgba(124,58,237,0.2)' }}>
                <div
                  className="h-full rounded transition-all duration-500"
                  style={{ width: i <= active ? '100%' : '0%', background: 'linear-gradient(90deg, #7c3aed, #9f67f5)' }}
                />
              </div>
              <p className="text-white text-sm">{ev.date}</p>
            </button>
          ))}
        </div>

        {/* Interactive slider */}
        <div className="reveal relative mt-8 px-2">
          <div className="relative h-1 rounded" style={{ background: 'rgba(124,58,237,0.2)' }}>
            <div
              className="absolute h-full rounded transition-all duration-500"
              style={{ width: `${(active / (events.length-1)) * 100}%`, background: 'linear-gradient(90deg, #7c3aed, #9f67f5)' }}
            />
            {/* Dots */}
            {events.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 rounded-full border-2 border-white transition-all duration-300"
                style={{
                  left: `${(i/(events.length-1))*100}%`,
                  width: i===active?18:10, height: i===active?18:10,
                  background: i<=active?'#7c3aed':'rgba(124,58,237,0.3)',
                  boxShadow: i===active?'0 0 10px rgba(124,58,237,0.8)':'none',
                }}
                aria-label={events[i].title}
              />
            ))}
          </div>
          {/* Hidden range for keyboard/touch access */}
          <input
            type="range" min={0} max={events.length-1} step={1} value={active}
            onChange={e => setActive(+e.target.value)}
            className="timeline-thumb absolute inset-0 w-full opacity-0"
            style={{ height: 20, top: -8, zIndex: 10 }}
            aria-label="Timeline"
          />
        </div>
      </div>
    </section>
  );
}
