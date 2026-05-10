import { useEffect, useRef } from 'react';

export default function Cursor() {
  const dot = useRef(null);
  const ring = useRef(null);

  useEffect(() => {
    let rx = 0, ry = 0;
    const move = (e) => {
      if (dot.current) { dot.current.style.left = e.clientX + 'px'; dot.current.style.top = e.clientY + 'px'; }
      rx += (e.clientX - rx) * 0.13;
      ry += (e.clientY - ry) * 0.13;
    };
    const tick = () => {
      if (ring.current) { ring.current.style.left = rx + 'px'; ring.current.style.top = ry + 'px'; }
      requestAnimationFrame(tick);
    };
    tick();
    document.addEventListener('mousemove', move);
    const onEnter = () => ring.current?.classList.add('hovering');
    const onLeave = () => ring.current?.classList.remove('hovering');
    document.querySelectorAll('a,button,.img-card').forEach(el => {
      el.addEventListener('mouseenter', onEnter);
      el.addEventListener('mouseleave', onLeave);
    });
    return () => document.removeEventListener('mousemove', move);
  }, []);

  return (
    <>
      <div ref={dot} className="cursor-dot" />
      <div ref={ring} className="cursor-ring" />
    </>
  );
}
