import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* ─────────────────────────────────────────────────────────────
   Subtle SVG grid
───────────────────────────────────────────────────────────── */
function GridOverlay() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none overflow-hidden"
      style={{ opacity: 0.022 }}
    >
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="ov-grid" x="0" y="0" width="72" height="72" patternUnits="userSpaceOnUse">
            <path d="M 72 0 L 0 0 0 72" fill="none" stroke="rgba(255,140,0,1)" strokeWidth="0.7" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#ov-grid)" />
      </svg>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Right panel — capabilities list
───────────────────────────────────────────────────────────── */
function CapabilityPanel() {
  const rows = [
    { code: 'WEB', label: 'Website Design & Build' },
    { code: 'ID',  label: 'Brand Identity' },
    { code: 'CNT', label: 'Content & Media' },
    { code: 'DPL', label: 'Deploy & Optimise' },
  ];

  return (
    <div className="relative w-full flex flex-col justify-center gap-0">
      <p
        className="text-[9px] tracking-[0.38em] uppercase font-semibold mb-8 text-[var(--text-muted)]"
        style={{ fontFamily: 'Inter, sans-serif' }}
      >
        NEXTIFY — Digital Studio
      </p>

      {rows.map(({ code, label }) => (
        <div
          key={code}
          className="ov-cap-row group flex items-center justify-between gap-5 py-5 border-b border-[var(--divider)] last:border-0 hover:pl-2 transition-all duration-300 cursor-default"
        >
          <div className="flex items-center gap-4 min-w-0">
            <span
              className="text-[10px] font-mono tabular-nums text-[var(--text-muted)] w-8 flex-shrink-0 group-hover:text-[var(--accent)] transition-colors duration-200"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              {code}
            </span>

            <span
              className="text-[0.88rem] font-medium text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors duration-200 truncate"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              {label}
            </span>
          </div>

          <span
            className="w-1.5 h-1.5 rounded-full bg-[var(--border-input)] group-hover:bg-[var(--accent)] group-hover:scale-125 transition-all duration-300 flex-shrink-0"
          />
        </div>
      ))}

      <div
        className="mt-9 h-[1px] w-full"
        style={{ background: 'linear-gradient(to right, var(--accent), transparent)' }}
      />
      <p
        className="mt-5 text-[9px] tracking-[0.3em] uppercase font-medium text-[var(--text-faint)]"
        style={{ fontFamily: 'Inter, sans-serif' }}
      >
        Est. — Creative Digital Agency
      </p>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Bottom capability blocks data
───────────────────────────────────────────────────────────── */
const BLOCKS = [
  {
    num: '01',
    title: 'BUILD',
    desc: 'Modern, responsive websites designed around real business needs.',
  },
  {
    num: '02',
    title: 'CREATE',
    desc: 'Visual identities, graphics, and digital content that make brands memorable.',
  },
  {
    num: '03',
    title: 'GROW',
    desc: 'Digital experiences focused on performance, usability, and long-term business value.',
  },
];

/* ─────────────────────────────────────────────────────────────
   Main Component
───────────────────────────────────────────────────────────── */
export default function Overview() {
  const sectionRef = useRef(null);
  const leftRef    = useRef(null);
  const rightRef   = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* Left column reveal */
      gsap.fromTo(
        leftRef.current,
        { x: -36, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 1.05, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 78%', once: true },
        }
      );

      /* Right panel reveal */
      gsap.fromTo(
        rightRef.current,
        { x: 36, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 1.05, ease: 'power3.out', delay: 0.1,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 78%', once: true },
        }
      );

      /* Capability row stagger */
      gsap.fromTo(
        '.ov-cap-row',
        { y: 16, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.5, stagger: 0.09, ease: 'power2.out', delay: 0.22,
          scrollTrigger: { trigger: rightRef.current, start: 'top 82%', once: true },
        }
      );


      /* Bottom blocks stagger */
      gsap.fromTo(
        '.ov-block',
        { y: 28, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.6, stagger: 0.13, ease: 'power3.out',
          scrollTrigger: { trigger: '.ov-blocks-row', start: 'top 85%', once: true },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="overview"
      ref={sectionRef}
      className="relative py-28 md:py-44 px-6 md:px-12 overflow-hidden bg-[var(--bg-base)] transition-colors duration-300"
    >
      <GridOverlay />

      {/* Ambient glows */}
      <div
        aria-hidden="true"
        className="absolute top-[-12%] right-[-8%] w-[520px] h-[520px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(255,140,0,0.04) 0%, transparent 70%)' }}
      />
      <div
        aria-hidden="true"
        className="absolute bottom-[-10%] left-[-5%] w-[380px] h-[380px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(255,60,0,0.03) 0%, transparent 70%)' }}
      />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* ── Top editorial two-column ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] xl:grid-cols-[1fr_440px] gap-16 xl:gap-28 items-start mb-24 md:mb-36">

          {/* LEFT */}
          <div ref={leftRef} className="flex flex-col gap-8">

            <p className="section-num">
              01 — Overview
            </p>

            <h2
              className="text-[2.4rem] md:text-[3.2rem] xl:text-[3.8rem] font-bold leading-[1.1] tracking-[-0.025em] text-[var(--text-primary)]"
              style={{ fontFamily: 'Manrope, Inter, sans-serif', fontWeight: 800 }}
            >
              Digital Solutions,{' '}
              <br className="hidden md:block" />
              <span
                style={{
                  background: 'var(--heading-gradient)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Built With Purpose.
              </span>
            </h2>

            <div
              className="h-px w-14"
              style={{ background: 'linear-gradient(to right, var(--accent), transparent)' }}
            />

            <p
              className="text-[1rem] md:text-[1.06rem] leading-[1.88] max-w-[540px] text-[var(--text-secondary)]"
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}
            >
              NEXTIFY helps businesses build a stronger digital presence through modern technology, thoughtful design, and creative content.
            </p>

          </div>

          {/* RIGHT */}
          <div ref={rightRef} className="lg:pt-[52px]">
            <div
              className="relative rounded-2xl overflow-hidden px-8 md:px-10 py-9 border border-[var(--border-subtle)] bg-[var(--bg-panel)] backdrop-blur-xl"
              style={{
                boxShadow: 'var(--shadow-panel)',
              }}
            >
              <div
                className="absolute top-0 left-0 right-0 h-[2px]"
                style={{ background: 'linear-gradient(90deg, var(--accent), rgba(255,55,0,0.5), transparent)' }}
              />
              <CapabilityPanel />
              <div
                aria-hidden="true"
                className="absolute top-0 right-0 w-28 h-28 pointer-events-none"
                style={{ background: 'radial-gradient(circle at top right, rgba(255,140,0,0.055), transparent 70%)' }}
              />
            </div>
          </div>

        </div>

        {/* ── Bottom three capability blocks ── */}
        <div className="ov-blocks-row grid grid-cols-1 md:grid-cols-3 gap-0 md:divide-x md:divide-[var(--divider)]">
          {BLOCKS.map(({ num, title, desc }) => (
            <div
              key={num}
              className="ov-block group relative px-0 md:px-10 py-10 md:py-0 first:md:pl-0 last:md:pr-0 border-b md:border-b-0 border-[var(--divider)] last:border-b-0 cursor-default"
            >
              {/* Hover top line */}
              <div
                className="absolute top-0 left-0 w-0 h-[1px] group-hover:w-full transition-all duration-500 ease-out md:left-10 first:md:left-0"
                style={{ background: 'linear-gradient(to right, var(--accent), transparent)' }}
              />

              <p
                className="text-[10px] font-mono tabular-nums text-[var(--text-muted)] mb-6 tracking-[0.2em]"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                {num}
              </p>

              <h3
                className="text-[1.65rem] md:text-[1.85rem] font-bold tracking-[-0.015em] text-[var(--text-primary)] mb-4 group-hover:text-[var(--accent)] transition-colors duration-200"
                style={{ fontFamily: 'Manrope, Inter, sans-serif', fontWeight: 800 }}
              >
                {title}
              </h3>

              <p
                className="text-[0.88rem] leading-[1.78] text-[var(--text-secondary)] group-hover:opacity-100 transition-opacity duration-200 max-w-[280px]"
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}
              >
                {desc}
              </p>

              <div className="mt-7 flex items-center gap-2">
                <div
                  className="w-6 h-[1px] group-hover:w-10 transition-all duration-300 ease-out"
                  style={{ background: 'var(--accent)' }}
                />
                <svg
                  className="w-3 h-3 text-[var(--text-faint)] group-hover:text-[var(--accent)] group-hover:translate-x-1 transition-all duration-200 flex-shrink-0"
                  fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}