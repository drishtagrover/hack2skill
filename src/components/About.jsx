import { useEffect, useRef } from 'react';

export default function About() {
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
    <section id="about" ref={ref} className="relative py-20" style={{ background: 'linear-gradient(180deg, #0a0a0f 0%, #0f0b20 50%, #0a0a0f 100%)' }}>
      {/* Checkerboard decorations left & right */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-16 hidden md:flex flex-col gap-0">
        {[...Array(3)].map((_,i) => (
          <div key={i} className="checker-pattern w-16 h-16 opacity-70" />
        ))}
      </div>
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-16 hidden md:flex flex-col gap-0">
        {[...Array(3)].map((_,i) => (
          <div key={i} className="checker-pattern w-16 h-16 opacity-70" />
        ))}
      </div>

      <div className="max-w-3xl mx-auto px-6 text-center">
        <div className="reveal">
          <p className="text-purple-400 text-xs tracking-widest uppercase font-semibold mb-3">ABOUT HACKATHON</p>
          <h2 className="text-white font-bold mb-6" style={{ fontSize: 'clamp(28px,4vw,48px)' }}>
            WHO CAN<br />PARTICIPATE?
          </h2>
          <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-8">
            Welcome to the Lorem Ipsum Innovation Hackathon, an exhilarating platform designed to foster innovation and creativity in the domain of advanced technology and futuristic solutions. Organized by the National Center for Applied Research and supported by Hack2skill, this hackathon invites undergraduate students, graduate/postgraduate students, and PhD researchers to collaborate and solve critical challenges.
          </p>
          <button className="px-8 py-3 rounded-full bg-purple-600 text-white font-semibold text-sm hover:bg-purple-700 transition-colors">
            Apply Now
          </button>
        </div>

        {/* WHO CAN PARTICIPATE boxes */}
        <div className="reveal mt-16">
          <p className="text-purple-400 text-xs tracking-widest uppercase font-semibold mb-6">WHO CAN PARTICIPATE?</p>
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: 'Undergraduate\nStudents', img: '/assets/student_1.jpg' },
              { label: 'Graduate/\nPostgraduate', img: null },
              { label: 'PhD Students/\nResearch Scholars', img: '/assets/student_grad.jpg' },
            ].map(({ label, img }, i) => (
              <div
                key={i}
                className="img-card rounded-xl overflow-hidden flex items-center justify-center text-center text-white font-semibold text-sm"
                style={{ height: 100, background: i === 1 ? '#fff' : 'rgba(30,20,50,0.8)', border: '1px solid rgba(124,58,237,0.3)', position: 'relative' }}
              >
                {img && <img src={img} alt={label} className="absolute inset-0 w-full h-full object-cover opacity-40" />}
                <span className="relative z-10 whitespace-pre-line" style={{ color: i === 1 ? '#7c3aed' : '#fff' }}>{label}</span>
              </div>
            ))}
          </div>
          <p className="text-gray-500 text-xs mt-4">
            Note: Working Professionals are not eligible to participate in the hackathon.
          </p>
        </div>
      </div>
    </section>
  );
}
