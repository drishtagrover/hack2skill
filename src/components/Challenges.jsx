import { useEffect, useRef } from 'react';

const challenges = [
  { n:'01', img:'/assets/challenge_01.jpg', text:'Develop an AI-driven solution to dynamically control traffic signals based on live camera feeds and vehicle density.' },
  { n:'02', img:'/assets/challenge_02.jpg', text:'Create a web or mobile application that integrates wearable data to provide health insights and medication reminders.' },
  { n:'03', img:'/assets/challenge_03.jpg', text:'Build an NLP-based tool to scan long legal contracts and output simplified summaries with key clauses and deadlines.' },
  { n:'04', img:'/assets/challenge_04.jpg', text:'Design a predictive model using remote sensing data and live hydrology feeds to forecast and alert flood risks in urban zones.' },
  { n:'05', img:'/assets/challenge_05.jpg', text:'Create a decentralized platform that allows institutions to issue and verify digital certificates securely.' },
  { n:'06', img:'/assets/challenge_06.jpg', text:'Design a prototype that enables prospective students to explore university campuses remotely with immersive visuals.' },
  { n:'07', img:'/assets/challenge_07.jpg', text:'Build a machine-learning system that classifies waste into biodegradable, recyclable, and hazardous categories using a live camera feed.', featured: true },
  { n:'08', img:'/assets/challenge_08.jpg', text:'Develop a communication app that uses peer-to-peer protocols or SMS fallback to function in areas with limited internet.' },
  { n:'09', img:'/assets/challenge_09.jpg', text:'Build an AI-driven app that uses computer vision to translate ISL gestures into text and speech in multiple Indian languages.' },
  { n:'10', img:'/assets/challenge_10.jpg', text:'Design a conversational assistant trained to provide mental health first aid and connect users to professionals during crises.' },
  { n:'11', img:'/assets/challenge_11.jpg', text:'Build a pipeline that processes aerial imagery to detect crop diseases and recommend corrective actions.' },
  { n:'12', img:'/assets/challenge_12.jpg', text:'Create a mobile assistant that helps visually impaired users navigate unfamiliar environments using spatial audio cues.' },
];

export default function Challenges() {
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) e.target.querySelectorAll('.reveal').forEach((el,i) => setTimeout(() => el.classList.add('show'), i*60));
      });
    }, { threshold: 0.05 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="challenges" ref={ref} className="py-20" style={{ background: '#0a0a0f' }}>
      <div className="max-w-4xl mx-auto px-6">
        <div className="reveal text-center mb-10">
          <p className="text-purple-400 text-xs tracking-widest uppercase font-semibold">CHALLENGES</p>
        </div>

        <div className="flex flex-col divide-y divide-gray-800">
          {challenges.map((c) => (
            <div key={c.n} className="reveal flex items-center gap-4 py-4 group">
              {/* Number */}
              <span className="text-gray-500 text-sm font-mono w-8 flex-shrink-0">[ {c.n} ]</span>
              {/* Thumbnail */}
              <div className="img-card w-20 h-14 rounded flex-shrink-0 overflow-hidden">
                <img src={c.img} alt={`Challenge ${c.n}`} />
              </div>
              {/* Text */}
              <p className="text-gray-300 text-sm leading-relaxed flex-1">{c.text}</p>
              {/* Featured tag */}
              {c.featured && (
                <span className="flex-shrink-0 px-3 py-1 text-xs bg-purple-600 text-white rounded">Learn More</span>
              )}
              {/* Arrow */}
              <button className="flex-shrink-0 w-7 h-7 flex items-center justify-center rounded-full border border-gray-700 text-gray-400 hover:border-purple-500 hover:text-purple-400 transition-colors text-xs">
                ↗
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
