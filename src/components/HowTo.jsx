import { useEffect, useRef } from 'react';

const steps = [
  { num: '01', icon: '📋', title: 'Register\nfor Hackathon', desc: 'Sign up now to participate in the hackathon.' },
  { num: '02', icon: '👥', title: 'Form\nyour Teams', desc: 'Collaborate with like-minded individuals to form teams.' },
  { num: '03', icon: '🏔️', title: 'Choose\na Challenge', desc: 'Select from the list of challenges provided.' },
  { num: '04', icon: '🚀', title: 'Innovate\nand Develop', desc: 'Work on your solutions, supported by resources and mentorship.' },
  { num: '05', icon: '💡', title: 'Submit\nYour Solution', desc: 'Present your innovative ideas for evaluation.' },
];

export default function HowTo() {
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) e.target.querySelectorAll('.reveal').forEach((el,i) => setTimeout(() => el.classList.add('show'), i*100));
      });
    }, { threshold: 0.15 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="howtoparticipate" ref={ref} className="py-20" style={{ background: '#0a0a0f' }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="reveal text-center mb-12">
          <p className="text-purple-400 text-xs tracking-widest uppercase font-semibold">HOW TO PARTICIPATE?</p>
        </div>
        <div className="reveal grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
          {steps.map((s) => (
            <div key={s.num} className="flex flex-col items-center text-center gap-3">
              <div className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl"
                style={{ background: 'rgba(124,58,237,0.3)', border: '1px solid rgba(124,58,237,0.4)' }}>
                {s.icon}
              </div>
              <div>
                <p className="text-white font-semibold text-sm whitespace-pre-line leading-tight mb-1">{s.title}</p>
                <p className="text-gray-500 text-xs leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
