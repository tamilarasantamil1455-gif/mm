import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Code2, Smartphone, BrainCircuit, Clapperboard, PenTool, ArrowRight } from 'lucide-react';

/* ─────────────────────────────────────────────────────────────
   Service data — exactly five, no tech badges
───────────────────────────────────────────────────────────── */
const SERVICES = [
  {
    id: 'web',
    number: '01',
    title: 'Web Development',
    icon: Code2,
    description:
      'We design and develop modern, responsive websites that combine intuitive user experiences with reliable functionality, helping businesses establish a strong and effective digital presence.',
    motif: 'web',
  },
  {
    id: 'app',
    number: '02',
    title: 'App Development',
    icon: Smartphone,
    description:
      'We create intuitive mobile applications that simplify everyday tasks, improve user engagement, and turn ideas into seamless digital experiences.',
    motif: 'app',
  },
  {
    id: 'ai',
    number: '03',
    title: 'AI & Agentic Solutions',
    icon: BrainCircuit,
    description:
      'We build intelligent AI-powered solutions and autonomous workflows that streamline repetitive tasks, enhance productivity, and help businesses work smarter.',
    motif: 'ai',
  },
  {
    id: 'video',
    number: '04',
    title: 'Video Editing',
    icon: Clapperboard,
    description:
      'We transform raw footage into compelling visual stories through thoughtful editing, engaging transitions, and polished content that captures attention and communicates ideas effectively.',
    motif: 'video',
  },
  {
    id: 'graphic',
    number: '05',
    title: 'Graphic Design',
    icon: PenTool,
    description:
      'We create distinctive visual identities and impactful creative designs that communicate brand values, strengthen recognition, and leave a lasting impression.',
    motif: 'graphic',
  },
];

/* ─────────────────────────────────────────────────────────────
   Decorative SVG motifs per card (purely visual)
───────────────────────────────────────────────────────────── */
function CardMotif({ type }) {
  const base = 'absolute pointer-events-none select-none';
  if (type === 'web') return (
    <svg aria-hidden="true" className={`${base} bottom-4 right-4 opacity-[0.06]`} width="96" height="72" viewBox="0 0 96 72" fill="none">
      <rect x="0.5" y="0.5" width="95" height="71" rx="7.5" stroke="#FF7900" strokeWidth="1"/>
      <line x1="0" y1="14" x2="96" y2="14" stroke="#FF7900" strokeWidth="1"/>
      <circle cx="10" cy="7" r="2.5" fill="#FF7900"/>
      <circle cx="20" cy="7" r="2.5" fill="#FF7900"/>
      <circle cx="30" cy="7" r="2.5" fill="#FF7900"/>
      <rect x="8" y="22" width="30" height="4" rx="2" fill="#FF7900"/>
      <rect x="8" y="32" width="50" height="3" rx="1.5" fill="#FF7900"/>
      <rect x="8" y="40" width="40" height="3" rx="1.5" fill="#FF7900"/>
      <rect x="8" y="48" width="55" height="3" rx="1.5" fill="#FF7900"/>
      <rect x="8" y="56" width="35" height="3" rx="1.5" fill="#FF7900"/>
    </svg>
  );
  if (type === 'app') return (
    <svg aria-hidden="true" className={`${base} bottom-4 right-4 opacity-[0.06]`} width="52" height="84" viewBox="0 0 52 84" fill="none">
      <rect x="0.5" y="0.5" width="51" height="83" rx="9.5" stroke="#FF7900" strokeWidth="1"/>
      <line x1="0" y1="12" x2="52" y2="12" stroke="#FF7900" strokeWidth="0.8"/>
      <line x1="0" y1="72" x2="52" y2="72" stroke="#FF7900" strokeWidth="0.8"/>
      <circle cx="26" cy="78" r="3" stroke="#FF7900" strokeWidth="1"/>
      <rect x="20" y="6" width="12" height="3" rx="1.5" fill="#FF7900"/>
      <rect x="8" y="20" width="36" height="24" rx="3" stroke="#FF7900" strokeWidth="0.8"/>
      <rect x="8" y="52" width="16" height="12" rx="2" stroke="#FF7900" strokeWidth="0.8"/>
      <rect x="28" y="52" width="16" height="12" rx="2" stroke="#FF7900" strokeWidth="0.8"/>
    </svg>
  );
  if (type === 'ai') return (
    <svg aria-hidden="true" className={`${base} bottom-4 right-4 opacity-[0.06]`} width="90" height="80" viewBox="0 0 90 80" fill="none">
      <circle cx="45" cy="40" r="8" stroke="#FF7900" strokeWidth="1"/>
      <circle cx="10" cy="16" r="5" stroke="#FF7900" strokeWidth="1"/>
      <circle cx="80" cy="16" r="5" stroke="#FF7900" strokeWidth="1"/>
      <circle cx="10" cy="64" r="5" stroke="#FF7900" strokeWidth="1"/>
      <circle cx="80" cy="64" r="5" stroke="#FF7900" strokeWidth="1"/>
      <circle cx="45" cy="6" r="4" stroke="#FF7900" strokeWidth="1"/>
      <circle cx="45" cy="74" r="4" stroke="#FF7900" strokeWidth="1"/>
      <line x1="37.6" y1="35.5" x2="14.7" y2="19.2" stroke="#FF7900" strokeWidth="0.8"/>
      <line x1="52.4" y1="35.5" x2="75.3" y2="19.2" stroke="#FF7900" strokeWidth="0.8"/>
      <line x1="37.6" y1="44.5" x2="14.7" y2="60.8" stroke="#FF7900" strokeWidth="0.8"/>
      <line x1="52.4" y1="44.5" x2="75.3" y2="60.8" stroke="#FF7900" strokeWidth="0.8"/>
      <line x1="45" y1="32" x2="45" y2="10" stroke="#FF7900" strokeWidth="0.8"/>
      <line x1="45" y1="48" x2="45" y2="70" stroke="#FF7900" strokeWidth="0.8"/>
    </svg>
  );
  if (type === 'video') return (
    <svg aria-hidden="true" className={`${base} bottom-4 right-4 opacity-[0.06]`} width="92" height="60" viewBox="0 0 92 60" fill="none">
      <rect x="0.5" y="8.5" width="63" height="43" rx="3.5" stroke="#FF7900" strokeWidth="1"/>
      <path d="M64 22L91 10V50L64 38V22Z" stroke="#FF7900" strokeWidth="1"/>
      <line x1="0" y1="8" x2="64" y2="8" stroke="#FF7900" strokeWidth="1" strokeDasharray="4 4"/>
      <line x1="16" y1="8" x2="16" y2="52" stroke="#FF7900" strokeWidth="0.8"/>
      <line x1="32" y1="8" x2="32" y2="52" stroke="#FF7900" strokeWidth="0.8"/>
      <line x1="48" y1="8" x2="48" y2="52" stroke="#FF7900" strokeWidth="0.8"/>
    </svg>
  );
  return (
    <svg aria-hidden="true" className={`${base} bottom-4 right-4 opacity-[0.06]`} width="82" height="82" viewBox="0 0 82 82" fill="none">
      <circle cx="41" cy="41" r="30" stroke="#FF7900" strokeWidth="1"/>
      <circle cx="41" cy="41" r="18" stroke="#FF7900" strokeWidth="0.8" strokeDasharray="3 3"/>
      <circle cx="41" cy="41" r="5" fill="#FF7900" fillOpacity="0.5"/>
      <line x1="41" y1="11" x2="41" y2="23" stroke="#FF7900" strokeWidth="1"/>
      <line x1="41" y1="59" x2="41" y2="71" stroke="#FF7900" strokeWidth="1"/>
      <line x1="11" y1="41" x2="23" y2="41" stroke="#FF7900" strokeWidth="1"/>
      <line x1="59" y1="41" x2="71" y2="41" stroke="#FF7900" strokeWidth="1"/>
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────
   Single Service Card
───────────────────────────────────────────────────────────── */
function ServiceCard({ service, index }) {
  const Icon = service.icon;

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
      className="group relative rounded-2xl overflow-hidden cursor-default focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#FF7900] focus-visible:outline-offset-2"
      style={{
        background: '#101012',
        border: '1px solid #29292D',
        transition: 'border-color 250ms ease, box-shadow 250ms ease',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = 'rgba(255,121,0,0.45)';
        e.currentTarget.style.boxShadow = '0 20px 60px -12px rgba(255,121,0,0.12), 0 0 0 1px rgba(255,121,0,0.15)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = '#29292D';
        e.currentTarget.style.boxShadow = 'none';
      }}
      tabIndex={0}
    >
      {/* Top accent bar */}
      <div
        className="h-[1.5px] w-full transition-opacity duration-300 opacity-40 group-hover:opacity-100"
        style={{ background: 'linear-gradient(90deg, #FF7900, transparent 70%)' }}
        aria-hidden="true"
      />

      {/* Inner ambient glow on hover */}
      <div
        className="absolute top-0 left-0 w-48 h-48 rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: 'radial-gradient(circle, rgba(255,121,0,0.08) 0%, transparent 70%)', filter: 'blur(20px)' }}
        aria-hidden="true"
      />

      {/* Decorative background motif */}
      <CardMotif type={service.motif} />

      {/* Card content */}
      <div className="relative z-10 p-7 md:p-8 flex flex-col gap-5">
        {/* Icon + number row */}
        <div className="flex items-start justify-between">
          <motion.div
            className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{
              background: 'rgba(255,121,0,0.08)',
              border: '1px solid rgba(255,121,0,0.2)',
            }}
            whileHover={{ scale: 1.08 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            <Icon size={22} aria-hidden="true" style={{ color: '#FF7900' }} />
          </motion.div>
          <span
            className="text-xs font-mono font-medium tabular-nums"
            style={{ color: '#FF7900', opacity: 0.5, letterSpacing: '0.12em' }}
          >
            {service.number}
          </span>
        </div>

        {/* Title */}
        <h3
          className="text-lg md:text-xl font-bold leading-snug transition-colors duration-200 group-hover:text-[#FF9A35]"
          style={{
            fontFamily: "'Space Grotesk', Sora, Manrope, Inter, sans-serif",
            color: '#F5F5F5',
            fontWeight: 700,
          }}
        >
          {service.title}
        </h3>

        {/* Description */}
        <p
          className="text-sm leading-[1.8]"
          style={{ color: '#A1A1AA', fontFamily: 'Inter, sans-serif', fontWeight: 400 }}
        >
          {service.description}
        </p>
      </div>
    </motion.article>
  );
}

/* ─────────────────────────────────────────────────────────────
   Main Section Component
───────────────────────────────────────────────────────────── */
export default function Skills() {
  const sectionRef = useRef(null);
  useInView(sectionRef, { once: true, margin: '-80px' });

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative py-28 md:py-36 px-6 md:px-12 overflow-hidden"
      style={{ background: '#080808' }}
    >
      {/* Ambient gradients */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-1/3 w-[700px] h-[500px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(255,121,0,0.045) 0%, transparent 65%)', filter: 'blur(40px)' }}
      />
      <div
        aria-hidden="true"
        className="absolute bottom-0 right-1/4 w-[500px] h-[400px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(255,80,0,0.03) 0%, transparent 65%)', filter: 'blur(40px)' }}
      />

      {/* Dot grid */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,121,0,0.18) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          opacity: 0.06,
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* ── Section Header ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-end mb-20 md:mb-24">

          {/* Left: eyebrow + headline */}
          <div>
            <motion.p
              className="section-num mb-6"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
            >
              02 — Our Expertise
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.08 }}
              className="text-[2.4rem] md:text-[3.2rem] xl:text-[3.8rem] font-bold leading-[1.1] tracking-[-0.025em]"
              style={{
                fontFamily: "'Space Grotesk', Sora, Manrope, Inter, sans-serif",
                fontWeight: 800,
                color: '#F5F5F5',
              }}
            >
              Our Expertise.{' '}
              <br className="hidden sm:block" />
              <span style={{ color: '#FF7900' }}>Your Next Big Idea.</span>
            </motion.h2>

            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              whileInView={{ scaleX: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="h-[2px] w-14 mt-6 origin-left"
              style={{ background: 'linear-gradient(to right, #FF7900, transparent)' }}
              aria-hidden="true"
            />
          </div>

          {/* Right: supporting description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.15 }}
            className="lg:pb-3"
          >
            <p
              className="text-base md:text-[1.05rem] leading-[1.85] max-w-[520px]"
              style={{ color: '#A1A1AA', fontFamily: 'Inter, sans-serif' }}
            >
              We combine technology, intelligent solutions, and creative storytelling to turn ambitious ideas into meaningful digital experiences.
            </p>
          </motion.div>
        </div>

        {/* ── Service Cards — 3+2 grid ── */}
        <div className="space-y-6">
          {/* Row 1: 3 cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.slice(0, 3).map((service, i) => (
              <ServiceCard key={service.id} service={service} index={i} />
            ))}
          </div>

          {/* Row 2: 2 cards, centered on large screens */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:w-2/3 lg:mx-auto">
            {SERVICES.slice(3).map((service, i) => (
              <ServiceCard key={service.id} service={service} index={i + 3} />
            ))}
          </div>
        </div>

        {/* ── Closing CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-20 md:mt-24 relative rounded-2xl overflow-hidden"
          style={{ background: '#101012', border: '1px solid #29292D' }}
        >
          {/* Top accent bar */}
          <div
            className="h-[1.5px] w-full"
            style={{ background: 'linear-gradient(90deg, #FF7900 0%, rgba(255,154,53,0.5) 50%, transparent 100%)' }}
            aria-hidden="true"
          />

          {/* Background glow */}
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(255,121,0,0.06) 0%, transparent 60%)' }}
          />

          <div className="relative z-10 px-8 py-12 md:px-14 md:py-14 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            {/* Text */}
            <div className="space-y-3 max-w-xl">
              <p
                className="text-[10px] font-semibold uppercase tracking-[0.22em]"
                style={{ color: '#FF7900', fontFamily: 'Inter, sans-serif' }}
              >
                Let's Create Something Great
              </p>
              <h3
                className="text-2xl md:text-3xl font-bold leading-tight"
                style={{
                  fontFamily: "'Space Grotesk', Sora, Manrope, Inter, sans-serif",
                  fontWeight: 700,
                  color: '#F5F5F5',
                }}
              >
                Have an Idea in Mind?
              </h3>
              <p
                className="text-sm md:text-base leading-[1.8]"
                style={{ color: '#A1A1AA', fontFamily: 'Inter, sans-serif' }}
              >
                Tell us what you&apos;re planning. Let&apos;s explore how Nextify can help bring your vision to life.
              </p>
            </div>

            {/* CTA Button */}
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 320, damping: 22 }}
              className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl text-sm font-semibold flex-shrink-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#FF7900] focus-visible:outline-offset-2"
              style={{
                background: 'linear-gradient(135deg, #FF7900, #FF9A35)',
                color: '#fff',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 600,
                boxShadow: '0 8px 24px rgba(255,121,0,0.28)',
                letterSpacing: '0.01em',
              }}
              aria-label="Start a project with Nextify"
            >
              Start a Project
              <ArrowRight
                size={16}
                aria-hidden="true"
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
