import { useState, useEffect, useRef } from 'react';

const faqs = [
  { q: 'Who can participate in the hackathon?', a: 'Undergraduate, Graduate/Postgraduate, and PhD students currently enrolled in an Indian institution.' },
  { q: 'What should be the ideal team size?', a: 'Each team must consist of 3 to 4 members, possibly from different colleges/universities.' },
  { q: 'What is the cost of participating?', a: 'Participation is entirely free. No registration or submission fee is required.' },
  { q: 'Can a recent graduate participate?', a: 'Only current students from the 2024–25 academic year are eligible.' },
];

export default function FAQ() {
  const [open, setOpen] = useState(null);
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) e.target.querySelectorAll('.reveal').forEach((el,i) => setTimeout(() => el.classList.add('show'), i*100));
      });
    }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="faqs" ref={ref} className="relative py-20 overflow-hidden" style={{ background: '#0a0a0f' }}>
      {/* Brain background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
        <img src="/assets/faq_brain_bg.jpg" alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, #0a0a0f 0%, transparent 30%, transparent 70%, #0a0a0f 100%)' }} />
      </div>

      <div className="relative max-w-4xl mx-auto px-6">
        <div className="reveal text-center mb-12">
          <p className="text-white font-semibold text-sm tracking-widest uppercase">FREQUENTLY ASKED QUESTION</p>
        </div>

        <div className="flex flex-col divide-y divide-gray-800">
          {faqs.map((f, i) => (
            <div key={i} className="reveal py-5">
              <button
                className="w-full flex items-start gap-4 text-left group"
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
              >
                <span className="flex-shrink-0 w-8 h-8 rounded text-xs font-bold flex items-center justify-center transition-colors"
                  style={{ background: open===i?'#7c3aed':'rgba(30,20,50,0.8)', color: open===i?'#fff':'#9f67f5', border: '1px solid rgba(124,58,237,0.3)' }}>
                  {String(i+1).padStart(2,'0')}
                </span>
                <span className={`text-sm font-semibold flex-1 transition-colors ${open===i?'text-purple-300':'text-white group-hover:text-purple-200'}`}>
                  {f.q}
                </span>
                {f.a && (
                  <span className="text-gray-400 text-sm flex-1 hidden md:block">{open===i ? f.a : ''}</span>
                )}
              </button>
              {open === i && (
                <p className="text-gray-400 text-sm mt-3 ml-12 md:hidden leading-relaxed">{f.a}</p>
              )}
              {/* Always show answer on md+ */}
              {open !== i && (
                <p className="text-gray-400 text-sm mt-3 ml-12 hidden md:block leading-relaxed">{f.a}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
