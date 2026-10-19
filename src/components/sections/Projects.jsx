import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, X, ZoomIn, Sparkles } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useProjects } from '../../context/ProjectsContext';

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const containerRef = useRef(null);
  const [selectedPoster, setSelectedPoster] = useState(null);
  const [activeGraded, setActiveGraded] = useState({});
  const { data } = useProjects();
  const { colorGrading: colorGradingItems, videos, websites, posters } = data;

  const toggleGrading = (id) => {
    setActiveGraded((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const isAllGraded = colorGradingItems.length > 0 && colorGradingItems.every((item) => activeGraded[item.id]);

  const toggleAllGrading = () => {
    if (isAllGraded) {
      setActiveGraded({});
    } else {
      const allTrue = {};
      colorGradingItems.forEach((item) => {
        allTrue[item.id] = true;
      });
      setActiveGraded(allTrue);
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.works-section').forEach((section) => {
        gsap.fromTo(section,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.85,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" ref={containerRef} className="py-28 px-6 md:px-12 relative z-10 bg-[var(--bg-base)] transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <div className="section-num">03 — Works</div>
        <h2 className="text-4xl md:text-6xl font-display font-bold mb-4 leading-tight text-[var(--heading-color)]">
          OUR <span className="text-gradient">WORKS</span>
        </h2>
        <p className="text-[var(--text-secondary)] mb-20 text-sm md:text-base max-w-md">
          A showcase of our digital creations, styling, editing, and web development.
        </p>

        {/* 1st Category: Colour Grading */}
        <div className="works-section mb-28">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-8">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#FF6B00] px-3 py-1 rounded-full border border-[#FF6B00]/30 bg-[#FF6B00]/10">
                01
              </span>
              <h3 className="text-xl md:text-2xl font-bold font-display text-[var(--text-primary)]">COLOUR GRADING</h3>
              <span className="text-xs text-[var(--text-muted)] font-mono">
                <span className="hidden md:inline">(Hover or click to reveal graded style)</span>
                <span className="md:hidden">(Tap image to reveal graded style)</span>
              </span>
            </div>

            {/* Quick Toggle All Button */}
            <button
              type="button"
              onClick={toggleAllGrading}
              className="text-[11px] font-mono px-3 py-1.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-panel)] text-[var(--text-secondary)] hover:text-[var(--accent)] hover:border-[var(--accent)]/40 transition-all flex items-center gap-1.5 cursor-pointer shadow-sm active:scale-95"
            >
              <Sparkles size={12} className="text-[#FF6B00]" />
              {isAllGraded ? 'Reset All to Original' : 'Reveal All Graded'}
            </button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {colorGradingItems.map((item) => {
              const isGraded = Boolean(activeGraded[item.id]);

              return (
                <div 
                  key={item.id} 
                  role="button"
                  tabIndex={0}
                  aria-pressed={isGraded}
                  aria-label={`Toggle colour grading for ${item.title}`}
                  onClick={() => toggleGrading(item.id)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      toggleGrading(item.id);
                    }
                  }}
                  className={`relative aspect-[3/4] rounded-xl overflow-hidden border transition-all duration-300 group cursor-pointer bg-[var(--bg-card)] shadow-[var(--shadow-card)] active:scale-[0.98] select-none ${
                    isGraded ? 'border-[#FF6B00]/60 ring-2 ring-[#FF6B00]/25' : 'border-[var(--border-subtle)]'
                  }`}
                >
                  {/* Before Image */}
                  <img 
                    src={item.before} 
                    alt={`${item.title} Original`} 
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 pointer-events-none ${
                      isGraded ? 'opacity-0' : 'opacity-100 md:group-hover:opacity-0'
                    }`}
                  />
                  {/* After Image */}
                  <img 
                    src={item.after} 
                    alt={`${item.title} Graded`} 
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 pointer-events-none ${
                      isGraded ? 'opacity-100' : 'opacity-0 md:group-hover:opacity-100'
                    }`}
                  />
                  
                  {/* Badge Indicator */}
                  <div
                    className={`absolute top-3 left-3 z-20 backdrop-blur-md px-2.5 py-1 rounded-md text-[10px] font-mono font-semibold uppercase tracking-wider border transition-all duration-300 select-none flex items-center gap-1.5 ${
                      isGraded
                        ? 'bg-emerald-950/85 text-emerald-400 border-emerald-500/40 shadow-[0_0_12px_rgba(16,185,129,0.3)]'
                        : 'bg-black/75 text-[#FF6B00] border-[#FF6B00]/30'
                    }`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${isGraded ? 'bg-emerald-400 animate-pulse' : 'bg-[#FF6B00]'}`} />
                    {isGraded ? (
                      <span>Graded (Tap to reset)</span>
                    ) : (
                      <>
                        <span className="hidden md:inline md:group-hover:hidden">Hover Me</span>
                        <span className="hidden md:group-hover:inline text-emerald-400">Graded</span>
                        <span className="md:hidden">Tap to Reveal</span>
                      </>
                    )}
                  </div>

                  {/* Top-Right Before/After Pill */}
                  <div className="absolute top-3 right-3 z-20 bg-black/75 backdrop-blur-md px-2 py-0.5 rounded text-[9px] font-mono font-medium border border-white/10 select-none pointer-events-none">
                    {isGraded ? (
                      <span className="text-emerald-400 font-bold">AFTER</span>
                    ) : (
                      <>
                        <span className="md:group-hover:hidden text-white/70">BEFORE</span>
                        <span className="hidden md:group-hover:inline text-emerald-400 font-bold">AFTER</span>
                      </>
                    )}
                  </div>

                  {/* Bottom Overlay Label */}
                  <div
                    className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-4 transition-opacity duration-300 z-20 pointer-events-none ${
                      isGraded ? 'opacity-100' : 'opacity-0 md:group-hover:opacity-100'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <p className="text-white text-xs font-mono font-medium">{item.title}</p>
                      <span className="text-[10px] font-mono text-[var(--accent)]">
                        {isGraded ? 'Graded View' : 'Original Photo'}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 2nd Category: Video Gallery */}
        <div className="works-section mb-28">
          <div className="flex items-center gap-3 mb-8">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#FF0033] px-3 py-1 rounded-full border border-[#FF0033]/30 bg-[#FF0033]/10">
              02
            </span>
            <h3 className="text-xl md:text-2xl font-bold font-display text-[var(--text-primary)]">VIDEO GALLERY</h3>
          </div>

          <div className={`grid gap-6 ${videos.length <= 2 ? 'grid-cols-1 sm:grid-cols-2 max-w-3xl mx-auto' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 items-start'}`}>
            {videos.map((vid) => (
              <div 
                key={vid.id} 
                className="relative mx-auto w-full rounded-2xl overflow-hidden border border-[var(--border-subtle)] group bg-black shadow-[var(--shadow-card)] transition-all duration-300 hover:border-[#FF0033]/50 flex flex-col"
              >
                <div className="relative w-full bg-black flex items-center justify-center">
                  <video 
                    src={vid.url} 
                    controls 
                    playsInline
                    preload="metadata"
                    className="w-full h-auto block max-h-[70vh] object-contain"
                  />
                  
                  {/* Tag Badge */}
                  {vid.tag && (
                    <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-md text-[10px] font-mono font-semibold text-[#FF0033] uppercase tracking-wider border border-[#FF0033]/30 pointer-events-none">
                      {vid.tag}
                    </div>
                  )}
                </div>

                {/* Title */}
                <div className="bg-[var(--bg-panel)] p-4 border-t border-[var(--border-subtle)]">
                  <h4 className="text-[var(--text-primary)] text-sm font-semibold tracking-wide text-center">{vid.title}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3rd Category: Websites */}
        <div className="works-section mb-28">
          <div className="flex items-center gap-3 mb-8">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#FF8800] px-3 py-1 rounded-full border border-[#FF8800]/30 bg-[#FF8800]/10">
              03
            </span>
            <h3 className="text-xl md:text-2xl font-bold font-display text-[var(--text-primary)]">WEBSITES</h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {websites.map((web) => (
              <div 
                key={web.id} 
                className="glass rounded-2xl overflow-hidden border border-[var(--border-subtle)] flex flex-col md:flex-row group hover:border-[var(--accent)] transition-all duration-300 bg-[var(--bg-panel)] shadow-[var(--shadow-card)]"
              >
                {/* Mockup screen preview */}
                <div className="md:w-1/2 relative overflow-hidden aspect-video md:aspect-auto">
                  <img 
                    src={web.image} 
                    alt={web.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-black/40 to-transparent pointer-events-none" />
                </div>

                {/* Content */}
                <div className="p-6 md:w-1/2 flex flex-col justify-between">
                  <div>
                    <h4 className="text-xl font-bold text-[var(--text-primary)] mb-2 leading-tight">{web.title}</h4>
                    <p className="text-[var(--text-secondary)] text-xs md:text-sm leading-relaxed mb-4">{web.description}</p>
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {web.tech.map((t) => (
                        <span 
                          key={t} 
                          className="px-2 py-0.5 rounded text-[10px] font-mono border border-[var(--border-subtle)] text-[var(--text-muted)] bg-[var(--pill-bg)]"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <motion.a
                    href={web.demo}
                    target="_blank"
                    rel="noreferrer"
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    className="flex items-center justify-center gap-1.5 w-full py-2.5 rounded-lg text-xs font-semibold text-white transition-all duration-200"
                    style={{
                      background: `linear-gradient(135deg, ${web.color}, ${web.color}dd)`,
                      boxShadow: `0 4px 15px ${web.color}40`,
                    }}
                  >
                    <ExternalLink size={12} />
                    Visit Live Link
                  </motion.a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 4th Category: Posters */}
        <div className="works-section">
          <div className="flex items-center gap-3 mb-8">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#E6002A] px-3 py-1 rounded-full border border-[#E6002A]/30 bg-[#E6002A]/10">
              04
            </span>
            <h3 className="text-xl md:text-2xl font-bold font-display text-[var(--text-primary)]">POSTERS</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {posters.map((pos) => (
              <div 
                key={pos.id} 
                onClick={() => setSelectedPoster(pos)}
                className="relative aspect-[3/4] rounded-xl overflow-hidden border border-[var(--border-subtle)] group cursor-zoom-in bg-[var(--bg-card)] shadow-[var(--shadow-card)]"
              >
                <img 
                  src={pos.url} 
                  alt={pos.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-5">
                  <div className="self-end w-9 h-9 rounded-full bg-black/70 backdrop-blur-md flex items-center justify-center border border-white/20 text-white">
                    <ZoomIn size={18} />
                  </div>
                  <p className="text-white text-xs font-mono font-medium">{pos.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox Modal for Posters */}
      <AnimatePresence>
        {selectedPoster && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[999] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 md:p-8"
            onClick={() => setSelectedPoster(null)}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="relative max-w-4xl max-h-[90vh] flex flex-col items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedPoster(null)}
                className="absolute -top-12 right-0 md:-right-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center backdrop-blur-md transition-colors border border-white/20 cursor-pointer"
                aria-label="Close preview"
              >
                <X size={20} />
              </button>
              <img
                src={selectedPoster.url}
                alt={selectedPoster.title}
                className="max-w-full max-h-[80vh] object-contain rounded-xl shadow-[0_0_50px_rgba(0,0,0,0.8)] border border-white/10"
              />
              <p className="mt-4 text-white text-sm font-mono tracking-wider">{selectedPoster.title}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
