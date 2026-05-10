import { useEffect, useRef } from 'react';

export default function Rewards() {
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
    <section id="rewards" ref={ref} className="py-20" style={{ background: 'linear-gradient(180deg, #0a0a0f 0%, #0d0b1a 50%, #0a0a0f 100%)' }}>
      <div className="max-w-4xl mx-auto px-6">
        <div className="reveal text-center mb-12">
          <p className="text-purple-400 text-xs tracking-widest uppercase font-semibold">REWARDS AND BENEFITS</p>
        </div>

        <div className="reveal grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1 */}
          <div className="rounded-2xl p-6" style={{ background: 'rgba(30,20,50,0.8)', border: '1px solid rgba(124,58,237,0.3)' }}>
            <p className="text-purple-400 text-xs font-semibold mb-3">Mentorship from Experts</p>
            <p className="text-gray-300 text-sm leading-relaxed">
              Work under the guidance of domain professionals and technology mentors.
            </p>
          </div>
          {/* Card 2 - white highlighted */}
          <div className="rounded-2xl p-6 flex items-center justify-center" style={{ background: '#fff', border: '2px solid #7c3aed' }}>
            <p className="text-purple-600 font-semibold text-center text-sm">
              Recognition and Internship Opportunities
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
