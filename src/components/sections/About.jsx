import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* ─────────────────────────────────────────────────────────────
   Static seed so particles don't change on re-render
───────────────────────────────────────────────────────────── */
const PARTICLES = [
  { left: '8%',  top: '18%', w: 2, h: 2, dur: 5.2, del: 0    },
  { left: '22%', top: '72%', w: 1.5, h: 1.5, dur: 4.1, del: 1.2 },
  { left: '38%', top: '35%', w: 2.5, h: 2.5, dur: 6.8, del: 0.5 },
  { left: '55%', top: '60%', w: 1.5, h: 1.5, dur: 4.9, del: 2.1 },
  { left: '71%', top: '22%', w: 2,   h: 2,   dur: 5.6, del: 0.8 },
  { left: '84%', top: '78%', w: 1.5, h: 1.5, dur: 3.9, del: 1.7 },
  { left: '14%', top: '52%', w: 1,   h: 1,   dur: 7.1, del: 0.3 },
  { left: '92%', top: '44%', w: 2,   h: 2,   dur: 4.7, del: 2.4 },
];

/* ─────────────────────────────────────────────────────────────
   NEXTIFY capability pillars shown in the right panel
───────────────────────────────────────────────────────────── */
const CAPABILITIES = [
  { label: 'DESIGN',  desc: 'Visual identity & UI' },
  { label: 'DEVELOP', desc: 'Web & interactive builds' },
  { label: 'CREATE',  desc: 'Content, video & brand' },
  { label: 'LAUNCH',  desc: 'Deploy, optimise, scale' },
];

/* ─────────────────────────────────────────────────────────────
   Subtle SVG grid
───────────────────────────────────────────────────────────── */
function GridBackground() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none overflow-hidden"
      style={{ opacity: 0.028 }}
    >
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="about-grid" x="0" y="0" width="64" height="64" patternUnits="userSpaceOnUse">
            <path d="M 64 0 L 0 0 0 64" fill="none" stroke="rgba(255,140,0,1)" strokeWidth="0.8" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#about-grid)" />
      </svg>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Main Component
───────────────────────────────────────────────────────────── */
export default function About() {
  const sectionRef  = useRef(null);
  const leftRef     = useRef(null);
  const rightRef    = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* Left column slides in from the left */
      gsap.fromTo(
        leftRef.current,
        { x: -40, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 1.1, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 78%', once: true },
        }
      );

      /* Right panel slides in from the right */
      gsap.fromTo(
        rightRef.current,
        { x: 50, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 1.1, ease: 'power3.out', delay: 0.12,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 78%', once: true },
        }
      );

      /* Capability rows stagger */
      gsap.fromTo(
        '.about-cap-row',
        { x: 20, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: 'power2.out', delay: 0.2,
          scrollTrigger: { trigger: rightRef.current, start: 'top 82%', once: true },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-28 md:py-40 px-6 md:px-12 overflow-hidden bg-[var(--bg-base)] transition-colors duration-300"
    >
      {/* ── Technical grid overlay ── */}
      <GridBackground />

      {/* ── Ambient glow ── */}
      <div
        aria-hidden="true"
        className="absolute top-[-8%] left-[-6%] w-[480px] h-[480px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(255,140,0,0.055) 0%, transparent 70%)' }}
      />
      <div
        aria-hidden="true"
        className="absolute bottom-[-10%] right-[-4%] w-[380px] h-[380px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(255,60,0,0.045) 0%, transparent 70%)' }}
      />

      {/* ── Sparse ambient particles ── */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none overflow-hidden">
        {PARTICLES.map((p, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              left: p.left,
              top: p.top,
              width: `${p.w}px`,
              height: `${p.h}px`,
              background: i % 2 === 0
                ? 'rgba(255, 140, 0, 0.55)'
                : 'rgba(255, 80, 0, 0.45)',
            }}
            animate={{ y: [0, -18, 0], opacity: [0.15, 0.6, 0.15] }}
            transition={{ duration: p.dur, repeat: Infinity, ease: 'easeInOut', delay: p.del }}
          />
        ))}
      </div>

      {/* ── Content ── */}
      <div className="max-w-7xl mx-auto relative z-10">

        {/* ── Two-column grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] xl:grid-cols-[1fr_460px] gap-16 xl:gap-24 items-start">

          {/* ─────────────── LEFT COLUMN ─────────────── */}
          <div ref={leftRef} className="flex flex-col gap-10">

            {/* Section label */}
            <div>
              <p
                className="section-num mb-7"
              >
                01 — About NEXTIFY
              </p>

              {/* Main headline */}
              <h2
                className="text-[2.35rem] md:text-[3.15rem] xl:text-[3.6rem] font-bold leading-[1.12] tracking-[-0.02em] text-[var(--text-primary)] mb-7"
                style={{ fontFamily: 'Manrope, Inter, sans-serif', fontWeight: 800 }}
              >
                We Build Digital{' '}
                <span
                  style={{
                    background: 'var(--heading-gradient)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  Experiences
                </span>{' '}
                That Make Businesses{' '}
                <span className="text-[var(--text-muted)]">Stand Out.</span>
              </h2>

              {/* Thin accent rule */}
              <div
                className="h-px w-16 mb-9"
                style={{ background: 'linear-gradient(to right, var(--accent), transparent)' }}
              />
            </div>

            {/* Body copy */}
            <div className="space-y-5 max-w-[580px]">
              <p
                className="text-[1.02rem] md:text-[1.07rem] leading-[1.85] text-[var(--text-primary)]"
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}
              >
                <span
                  className="font-semibold text-[var(--accent)]"
                >
                  NEXTIFY
                </span>{' '}
                is a creative digital studio focused on building modern websites, visual identities, and digital content for businesses, startups, and growing brands.
              </p>
              <p
                className="text-[0.95rem] md:text-[1rem] leading-[1.9] text-[var(--text-secondary)]"
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}
              >
                We combine strategy, design, development, and creativity to turn ideas into polished digital experiences that are built to look professional, perform smoothly, and create a strong brand presence.
              </p>
            </div>

          </div>

          {/* ─────────────── RIGHT PANEL ─────────────── */}
          <div
            ref={rightRef}
            className="relative lg:pt-[68px]"
          >
            {/* Panel container */}
            <div
              className="relative rounded-2xl overflow-hidden border border-[var(--border-subtle)] bg-[var(--bg-panel)] backdrop-blur-xl"
              style={{
                boxShadow: 'var(--shadow-panel)',
              }}
            >
              {/* Thin orange top line */}
              <div
                className="h-[2px] w-full"
                style={{ background: 'linear-gradient(90deg, var(--accent), rgba(255,60,0,0.6), transparent)' }}
              />

              <div className="p-8 md:p-10">

                {/* Panel label */}
                <p
                  className="text-[10px] tracking-[0.32em] uppercase font-semibold mb-9 text-[var(--text-muted)]"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  Our Capabilities
                </p>

                {/* Capability rows */}
                <div className="space-y-0 divide-y divide-[var(--divider)]">
                  {CAPABILITIES.map((cap, i) => (
                    <div
                      key={i}
                      className="about-cap-row group flex items-center justify-between py-5 cursor-default"
                    >
                      <div className="flex items-center gap-4">
                        {/* Row number */}
                        <span
                          className="text-[11px] font-mono tabular-nums text-[var(--text-muted)] w-5 flex-shrink-0"
                          style={{ fontFamily: 'Inter, sans-serif' }}
                        >
                          0{i + 1}
                        </span>

                        {/* Capability label */}
                        <span
                          className="text-[1.18rem] md:text-[1.3rem] font-bold tracking-[-0.01em] text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors duration-200"
                          style={{ fontFamily: 'Manrope, Inter, sans-serif', fontWeight: 700 }}
                        >
                          {cap.label}
                        </span>
                      </div>

                      {/* Descriptor */}
                      <span
                        className="text-[0.72rem] text-[var(--text-muted)] font-medium hidden sm:block group-hover:text-[var(--text-secondary)] transition-colors duration-200"
                        style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
                      >
                        {cap.desc}
                      </span>

                      {/* Arrow indicator */}
                      <svg
                        className="w-4 h-4 text-[var(--text-faint)] group-hover:text-[var(--accent)] group-hover:translate-x-0.5 transition-all duration-200 flex-shrink-0 ml-3"
                        fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}
                        aria-hidden="true"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  ))}
                </div>

              </div>

              {/* Subtle inner-corner accent */}
              <div
                aria-hidden="true"
                className="absolute top-0 right-0 w-32 h-32 pointer-events-none"
                style={{
                  background: 'radial-gradient(circle at top right, rgba(255,140,0,0.06), transparent 70%)',
                }}
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
