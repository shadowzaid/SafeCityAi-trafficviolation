import { useEffect, useRef } from 'react';

export function Particles() {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let raf = 0;
    const dots = Array.from({ length: 80 }, () => ({
      x: Math.random(),
      y: Math.random(),
      vx: (Math.random() - 0.5) * 0.0012,
      vy: (Math.random() - 0.5) * 0.0012,
      r: 1 + Math.random() * 2,
    }));

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
    };
    resize();
    window.addEventListener('resize', resize);

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      dots.forEach((dot) => {
        dot.x = (dot.x + dot.vx + 1) % 1;
        dot.y = (dot.y + dot.vy + 1) % 1;
        ctx.beginPath();
        ctx.fillStyle = 'rgba(32, 211, 238, 0.72)';
        ctx.arc(dot.x * canvas.width, dot.y * canvas.height, dot.r * window.devicePixelRatio, 0, Math.PI * 2);
        ctx.fill();
      });
      raf = requestAnimationFrame(render);
    };
    render();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={ref} className="absolute inset-0 h-full w-full" aria-hidden="true" />;
}
