import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { useTheme } from '../../context/ThemeContext';

const BRAND = 'NEXTIFY';

/* ──────────────────────────────────────────────────────────
   Event Horizon Canvas — Interstellar-style black hole
   ────────────────────────────────────────────────────────── */
function EventHorizonCanvas({ isDark }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;

    function resize() {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    // Particle ring system
    const PARTICLES = 320;
    const particles = Array.from({ length: PARTICLES }, (_, i) => {
      const angle = (i / PARTICLES) * Math.PI * 2;
      const radius = 50 + Math.random() * 250;
      const speed = (0.0003 + Math.random() * 0.0004) * (Math.random() < 0.5 ? 1 : -1);
      const opacity = 0.3 + Math.random() * 0.7;
      const size = 0.5 + Math.random() * 1.2;
      return { angle, radius, speed, opacity, size };
    });

    function draw() {
      const W = canvas.width;
      const H = canvas.height;
      const cx = W / 2;
      const cy = H / 2;

      // Clear with slight trail
      ctx.fillStyle = isDark ? 'rgba(5, 5, 7, 0.18)' : 'rgba(248, 249, 251, 0.28)';
      ctx.fillRect(0, 0, W, H);

      /* ── Outer nebula haze ── */
      const haze = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.min(W, H) * 0.65);
      haze.addColorStop(0, isDark ? 'rgba(255, 140, 0, 0.08)' : 'rgba(217, 107, 11, 0.08)');
      haze.addColorStop(0.3, isDark ? 'rgba(10, 22, 40, 0.06)' : 'rgba(27, 58, 92, 0.05)');
      haze.addColorStop(0.7, isDark ? 'rgba(10, 22, 40, 0.02)' : 'rgba(27, 58, 92, 0.02)');
      haze.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = haze;
      ctx.fillRect(0, 0, W, H);

      /* ── Accretion disk rings ── */
      const DISK_RINGS = [
        { r1: 10, r2: 240, alpha: isDark ? 0.22 : 0.16 },
        { r1: 5,  r2: 160, alpha: isDark ? 0.28 : 0.20 },
        { r1: 0,  r2: 110, alpha: isDark ? 0.35 : 0.25 },
      ];
      DISK_RINGS.forEach(({ r1, r2, alpha }) => {
        ctx.save();
        ctx.translate(cx, cy);
        ctx.scale(1, 0.32);
        const disk = ctx.createRadialGradient(0, 0, r1, 0, 0, r2);
        disk.addColorStop(0,   `rgba(255,200,80,${alpha})`);
        disk.addColorStop(0.35, `rgba(255,140,0,${alpha * 1.1})`);
        disk.addColorStop(0.75, isDark ? `rgba(10,22,40,${alpha * 0.8})` : `rgba(27,58,92,${alpha * 0.8})`);
        disk.addColorStop(1,   'rgba(0,0,0,0)');
        ctx.fillStyle = disk;
        ctx.beginPath();
        ctx.arc(0, 0, r2, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      /* ── Photon sphere lensing ring ── */
      ctx.save();
      ctx.translate(cx, cy);
      ctx.scale(1, 0.32);
      for (let ring = 0; ring < 3; ring++) {
        const r = 88 - ring * 8;
        const lg = ctx.createRadialGradient(0, 0, r - 4, 0, 0, r + 4);
        lg.addColorStop(0, `rgba(255,200,80,${(0.22 - ring * 0.05) * (isDark ? 1 : 0.8)})`);
        lg.addColorStop(0.5, `rgba(255,140,0,${(0.18 - ring * 0.04) * (isDark ? 1 : 0.8)})`);
        lg.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.strokeStyle = lg;
        ctx.lineWidth = 6 - ring * 1.5;
        ctx.beginPath();
        ctx.arc(0, 0, r, 0, Math.PI * 2);
        ctx.stroke();
      }
      ctx.restore();

      /* ── Animated particle stream ── */
      particles.forEach((p) => {
        p.angle += p.speed;
        const px = cx + Math.cos(p.angle) * p.radius;
        const py = cy + Math.sin(p.angle) * p.radius * 0.32;
        const distFromCenter = p.radius / 250;
        const particleAlpha = p.opacity * (1 - distFromCenter * 0.5) * (isDark ? 0.9 : 0.6);

        ctx.fillStyle = distFromCenter < 0.4
          ? `rgba(255, 230, 150, ${particleAlpha})`
          : distFromCenter < 0.7
          ? `rgba(255, 140, 0, ${particleAlpha})`
          : isDark
          ? `rgba(27, 58, 92, ${particleAlpha})`
          : `rgba(217, 107, 11, ${particleAlpha})`;

        ctx.beginPath();
        ctx.arc(px, py, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      animId = requestAnimationFrame(draw);
    }

    draw();
    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
    };
  }, [isDark]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ display: 'block' }}
    />
  );
}

export default function Hero() {
  const { isDark } = useTheme();
  const textRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.hero-sub',
        { opacity: 0, letterSpacing: '0.6em', y: 30 },
        { opacity: 1, letterSpacing: '0.35em', y: 0, duration: 1.3, delay: 1.4, ease: 'power4.out' }
      );
      gsap.fromTo(
        '.hero-line',
        { opacity: 0, scaleX: 0 },
        { opacity: 1, scaleX: 1, duration: 1.1, delay: 2.1, ease: 'power3.out', transformOrigin: 'center' }
      );
    }, textRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="home"
      className="relative w-full h-[100dvh] flex items-center justify-center overflow-hidden bg-[var(--bg-base)] transition-colors duration-300"
    >
      {/* ── Interstellar Event Horizon Canvas ── */}
      <EventHorizonCanvas isDark={isDark} />

      {/* ── Vignette to blend canvas edges into page ── */}
      <div
        className="absolute inset-0 pointer-events-none z-10 transition-all duration-300"
        style={{
          background: isDark
            ? 'radial-gradient(ellipse 80% 70% at 50% 50%, transparent 40%, rgba(5,5,7,0.65) 75%, rgba(5,5,7,0.97) 100%)'
            : 'radial-gradient(ellipse 80% 70% at 50% 50%, transparent 40%, rgba(248,249,251,0.60) 75%, rgba(248,249,251,0.96) 100%)',
        }}
      />

      {/* ── Main text content ── */}
      <div
        ref={textRef}
        className="relative z-40 flex flex-col items-center justify-center text-center select-none pointer-events-none"
      >
        {/* NEXTIFY letter by letter */}
        <div className="flex items-end gap-0 md:gap-1 mb-3 md:mb-5">
          {BRAND.split('').map((letter, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 70, rotateX: -90, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
              transition={{
                duration: 0.75,
                delay: 0.35 + i * 0.085,
                type: 'spring',
                stiffness: 180,
                damping: 15,
              }}
              className="font-display font-extrabold leading-none"
              style={{
                fontSize: 'clamp(3.5rem, 12vw, 8rem)',
                background:
                  i < 3
                    ? `linear-gradient(140deg, #FF9900 ${i * 12}%, #FF8C00 ${i * 12 + 30}%, #FF6B00 ${i * 12 + 60}%)`
                    : `linear-gradient(140deg, #1B3A5C ${i * 8}%, #112240 ${i * 8 + 30}%, #0A1628 ${i * 8 + 60}%)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                filter:
                  i < 3
                    ? `drop-shadow(0 0 ${18 + i * 4}px rgba(255,140,0,${0.5 + i * 0.04}))`
                    : isDark
                    ? `drop-shadow(0 0 ${18 + i * 4}px rgba(10,22,40,${0.6 + i * 0.04}))`
                    : `drop-shadow(0 0 ${10 + i * 2}px rgba(27,58,92,0.25))`,
                display: 'inline-block',
              }}
            >
              {letter}
            </motion.span>
          ))}
        </div>

        {/* Gradient divider */}
        <div
          className="hero-line w-48 md:w-80 h-[2px] mb-4 md:mb-6 rounded-full"
          style={{
            background: 'linear-gradient(to right, transparent, var(--accent), #1B3A5C, transparent)',
          }}
        />

        {/* PORTFOLIO */}
        <p
          className="hero-sub font-sans font-bold uppercase tracking-[0.35em] text-lg md:text-3xl text-[var(--text-primary)] transition-colors duration-300"
          style={{
            textShadow: isDark
              ? '0 0 30px rgba(255,140,0,0.4)'
              : '0 2px 10px rgba(0,0,0,0.06)',
          }}
        >
          Portfolio
        </p>
      </div>

      {/* ── Scroll indicator ── */}
      <motion.div
        className="absolute bottom-5 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[var(--text-muted)] text-[9px] font-mono tracking-widest uppercase z-30"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
      >
        <div
          className="w-[1px] h-8"
          style={{
            background: 'linear-gradient(to bottom, transparent, var(--accent), transparent)',
          }}
        />
        <span>Scroll</span>
      </motion.div>
    </section>
  );
}
