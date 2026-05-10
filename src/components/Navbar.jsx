import { useState, useEffect } from 'react';

const links = ['About', 'How to participate?', 'Challenges', 'Schedules', 'Rewards', 'FAQs'];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 px-4 transition-all duration-300`}>
      <div className={`flex items-center justify-between gap-8 px-5 py-2.5 rounded-full transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur shadow-lg' : 'bg-white/90 backdrop-blur shadow-md'
      }`} style={{ maxWidth: 900, width: '100%' }}>
        {/* Logo */}
        <img src="/assets/logo.jpg" alt="H2S Hack2Skill" className="h-7 w-auto object-contain" />

        {/* Desktop links */}
        <div className="hidden lg:flex items-center gap-6">
          {links.map(l => (
            <a
              key={l}
              href={`#${l.toLowerCase().replace(/\s+/g,'').replace('?','')}`}
              className="nav-link text-gray-700 text-sm font-medium hover:text-purple-600 transition-colors whitespace-nowrap"
            >
              {l}
            </a>
          ))}
        </div>

        {/* Sign In */}
        <button className="hidden lg:block px-5 py-2 rounded-full bg-purple-600 text-white text-sm font-semibold hover:bg-purple-700 transition-colors whitespace-nowrap">
          Sign In
        </button>

        {/* Mobile toggle */}
        <button className="lg:hidden p-1" onClick={() => setOpen(!open)} aria-label="Menu">
          <div className={`w-5 h-0.5 bg-gray-700 mb-1 transition-all ${open?'rotate-45 translate-y-1.5':''}`} />
          <div className={`w-5 h-0.5 bg-gray-700 mb-1 transition-all ${open?'opacity-0':''}`} />
          <div className={`w-5 h-0.5 bg-gray-700 transition-all ${open?'-rotate-45 -translate-y-1.5':''}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="absolute top-full left-4 right-4 mt-2 bg-white rounded-2xl shadow-xl p-5 flex flex-col gap-3">
          {links.map(l => (
            <a key={l} href={`#${l.toLowerCase().replace(/\s+/g,'').replace('?','')}`}
              className="text-gray-700 text-sm font-medium py-1" onClick={() => setOpen(false)}>
              {l}
            </a>
          ))}
          <button className="mt-2 px-5 py-2 rounded-full bg-purple-600 text-white text-sm font-semibold">Sign In</button>
        </div>
      )}
    </nav>
  );
}
