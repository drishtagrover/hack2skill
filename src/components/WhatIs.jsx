import { useEffect, useRef, useState } from 'react';

function useCountdown(target) {
  const [t, setT] = useState({ d:0,h:0,m:0,s:0 });
  useEffect(() => {
    const tick = () => {
      const diff = new Date(target) - Date.now();
      if (diff <= 0) return;
      setT({ d:Math.floor(diff/86400000), h:Math.floor((diff%86400000)/3600000), m:Math.floor((diff%3600000)/60000), s:Math.floor((diff%60000)/1000) });
    };
    tick(); const id = setInterval(tick,1000); return ()=>clearInterval(id);
  },[target]);
  return t;
}

// The collage images match the Figma pixel positions scaled to the right panel
// Page width 1920, collage occupies x=995-1744 (749px wide), y=2368-3343 (975px tall)
// We normalize to a 0-100% coordinate space within the right panel
const COLS_W = 749, COLS_H = 975, COLS_X0 = 995, COLS_Y0 = 2368;
function pos(x,y,w,h){ return { left:`${((x-COLS_X0)/COLS_W)*100}%`, top:`${((y-COLS_Y0)/COLS_H)*100}%`, width:`${(w/COLS_W)*100}%`, height:`${(h/COLS_H)*100}%` }; }

const IMAGES = [
  { src:'/assets/col_laptop.jpg',   alt:'Laptop',   style: pos(995,2532,402,268) },
  { src:'/assets/col_globe.jpg',    alt:'Globe',    style: pos(1420,2368,324,486) },
  { src:'/assets/col_vr.jpg',       alt:'VR',       style: pos(1045,2781,375,261) },
  { src:'/assets/col_audience.jpg', alt:'Audience', style: pos(1420,3009,324,216) },
  { src:'/assets/col_standup.jpg',  alt:'Standup',  style: pos(1032,3023,480,320) },
];

// Crosshair positions (from Figma)
const CROSSES = [
  pos(1395,2532,0,0), pos(1419,2532,0,0),
  pos(1395,2799,0,0), pos(1419,2799,0,0),
  pos(1419,3009,0,0),
];

export default function WhatIs() {
  const ref = useRef(null);
  const t = useCountdown('2025-07-04T00:00:00');
  const [hovered, setHovered] = useState(null);

  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) e.target.querySelectorAll('.reveal').forEach((el,i)=>setTimeout(()=>el.classList.add('show'),i*120));
      });
    },{ threshold:0.1 });
    if(ref.current) obs.observe(ref.current);
    return ()=>obs.disconnect();
  },[]);

  return (
    <section id="whatis" ref={ref} className="relative py-20 overflow-hidden"
      style={{background:'linear-gradient(180deg,#0a0a0f 0%,#100c22 60%,#0a0a0f 100%)'}}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          {/* Left: text */}
          <div className="reveal">
            <h2 className="text-white font-bold mb-6" style={{fontSize:'clamp(24px,3.5vw,42px)'}}>
              WHAT IS THE<br/>HACKATHON?
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              The Lorem Ipsum Innovation Hackathon is a flagship event crafted to uncover pioneering ideas
              in science, technology, and system design. As technological advancements accelerate globally,
              this initiative aims to bridge academic knowledge with practical implementation.
            </p>
            <p className="text-gray-400 text-sm leading-relaxed mb-8">
              Participants will work on challenge statements designed by leading R&D units, applying
              theoretical expertise to build innovative prototypes and solutions with potential real-world application.
            </p>
            <p className="text-gray-400 text-xs mb-3">Submission Closing In:</p>
            <div className="flex items-center gap-3 flex-wrap">
              <div className="countdown-box flex items-center px-4 py-2 rounded text-white text-sm font-mono"
                style={{border:'1px solid rgba(255,255,255,0.2)',background:'rgba(255,255,255,0.05)'}}>
                {String(t.d).padStart(2,'0')}d {String(t.h).padStart(2,'0')}h {String(t.m).padStart(2,'0')}m {String(t.s).padStart(2,'0')}s
              </div>
              <button className="px-6 py-2 rounded text-white text-sm font-semibold hover:bg-purple-600 transition-colors"
                style={{border:'1px solid rgba(255,255,255,0.3)'}}>
                Register Now
              </button>
            </div>
          </div>

          {/* Right: image collage with cursor hover animations */}
          <div className="reveal relative w-full" style={{paddingBottom:`${(COLS_H/COLS_W)*100}%`}}>
            <div className="absolute inset-0">
              {/* Crosshair + markers */}
              {CROSSES.map((s,i)=>(
                <div key={i} className="absolute text-gray-400 text-xs pointer-events-none select-none z-20"
                  style={{...s, transform:'translate(-50%,-50%)', lineHeight:1}}>+</div>
              ))}

              {/* Images */}
              {IMAGES.map((img,i)=>(
                <div
                  key={i}
                  className="absolute overflow-hidden"
                  style={{
                    ...img.style,
                    cursor:'none',
                    transition:'transform 0.4s cubic-bezier(0.25,0.46,0.45,0.94), box-shadow 0.4s ease, z-index 0s',
                    transform: hovered===i ? 'scale(1.05)' : 'scale(1)',
                    boxShadow: hovered===i ? '0 8px 40px rgba(124,58,237,0.6)' : '0 2px 10px rgba(0,0,0,0.4)',
                    zIndex: hovered===i ? 10 : 1,
                  }}
                  onMouseEnter={()=>setHovered(i)}
                  onMouseLeave={()=>setHovered(null)}
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    style={{
                      width:'100%', height:'100%', objectFit:'cover', display:'block',
                      transition:'transform 0.5s ease, filter 0.4s ease',
                      transform: hovered===i ? 'scale(1.08)' : 'scale(1)',
                      filter: hovered===i ? 'brightness(1.15) saturate(1.2)' : 'brightness(0.85)',
                    }}
                  />
                  {/* Purple overlay on hover */}
                  <div style={{
                    position:'absolute', inset:0,
                    background:'linear-gradient(135deg, rgba(124,58,237,0.55), transparent 60%)',
                    opacity: hovered===i ? 1 : 0,
                    transition:'opacity 0.4s ease',
                  }}/>
                  {/* Label on hover */}
                  <div style={{
                    position:'absolute', bottom:0, left:0, right:0,
                    background:'linear-gradient(to top, rgba(0,0,0,0.7), transparent)',
                    padding:'8px 10px',
                    transform: hovered===i ? 'translateY(0)' : 'translateY(100%)',
                    transition:'transform 0.35s ease',
                  }}>
                    <span style={{color:'#fff',fontSize:11,fontWeight:600,letterSpacing:'0.05em'}}>{img.alt}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
