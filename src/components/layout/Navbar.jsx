import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { Menu, X, Mail, Phone } from 'lucide-react';
import { FaInstagram, FaWhatsapp } from 'react-icons/fa';
import { cn } from '../../utils/cn';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Services', href: '#services' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  // Scroll progress bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 400, damping: 40 });

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Active section tracking via IntersectionObserver
  useEffect(() => {
    const sectionIds = navLinks.map((l) => l.href.replace('#', ''));
    const observers = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { threshold: 0, rootMargin: '-20% 0px -40% 0px' }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) target.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Scroll Progress Line */}
      <motion.div className="scroll-progress" style={{ scaleX }} />

      <header
        className={cn(
          'fixed top-0 left-0 w-full z-50 transition-all duration-500 px-6 md:px-12',
          scrolled
            ? 'py-3 bg-[var(--bg-navbar)] backdrop-blur-xl border-b border-[var(--border-subtle)] shadow-[var(--shadow-card)]'
            : 'py-6 bg-transparent'
        )}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo Brand – text brand */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center cursor-pointer group select-none"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <span className="text-xl md:text-2xl font-display font-extrabold tracking-wider">
              <span className="text-[#FF8C00] filter drop-shadow-[0_0_10px_rgba(255,140,0,0.5)]">
                NEX
              </span>
              <span className="text-[#1B3A5C] dark:text-[#1B3A5C] light:text-[#0F2744]">
                TIFY
              </span>
            </span>
          </motion.div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-2">
            <nav className="flex items-center gap-1">
              {navLinks.map((link, i) => {
                const isActive = activeSection === link.href.replace('#', '');
                return (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.07 }}
                    className={cn(
                      'relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 group',
                      isActive
                        ? 'text-[var(--text-primary)] font-semibold'
                        : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                    )}
                  >
                    {/* Active bg pill */}
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-lg bg-[var(--pill-bg)] border border-[var(--pill-border)]"
                        transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                      />
                    )}
                    <span className="relative z-10">{link.name}</span>
                    {/* Hover underline */}
                    <span
                      className={cn(
                        'absolute bottom-1 left-1/2 -translate-x-1/2 h-[2px] rounded-full bg-gradient-to-r from-[var(--accent)] to-[var(--accent-deep)] transition-all duration-300',
                        isActive
                          ? 'w-5 opacity-100'
                          : 'w-0 opacity-0 group-hover:w-4 group-hover:opacity-70'
                      )}
                    />
                  </motion.a>
                );
              })}
            </nav>
          </div>

          {/* Mobile Right Controls: Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-10 h-10 flex items-center justify-center rounded-lg glass text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={mobileMenuOpen ? 'close' : 'open'}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
                </motion.div>
              </AnimatePresence>
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="md:hidden absolute top-full left-4 right-4 mt-2 rounded-2xl bg-[var(--bg-panel)] backdrop-blur-2xl border border-[var(--border-subtle)] shadow-[var(--shadow-panel)] overflow-hidden"
            >
              <div className="flex flex-col p-4 gap-1">
                {navLinks.map((link, i) => {
                  const isActive = activeSection === link.href.replace('#', '');
                  return (
                    <motion.a
                      key={link.name}
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className={cn(
                        'flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200',
                        isActive
                          ? 'bg-[var(--pill-bg)] text-[var(--text-primary)] border border-[var(--border-subtle)] font-semibold'
                          : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--pill-bg)]'
                      )}
                    >
                      {isActive && (
                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
                      )}
                      {link.name}
                    </motion.a>
                  );
                })}



                <div className="flex items-center gap-4 px-4 pt-3 mt-1 border-t border-[var(--divider)]">
                  <a
                    href="https://instagram.com/_nextify._?obrf=MTFqeWY3aG42bXBmOQ%3D%3D"
                    target="_blank"
                    rel="noreferrer"
                    className="text-[var(--text-muted)] hover:text-[#FF5500] transition-colors"
                    aria-label="Instagram"
                    title="Instagram @_nextify._"
                  >
                    <FaInstagram size={19} />
                  </a>
                  <a
                    href="https://wa.me/918610851455?text=Hello%20Nextify!%20I%20have%20a%20project%20in%20mind%20and%20would%20like%20to%20discuss%20it%20with%20you."
                    target="_blank"
                    rel="noreferrer"
                    className="text-[var(--text-muted)] hover:text-[#25D366] transition-colors"
                    aria-label="WhatsApp"
                    title="WhatsApp"
                  >
                    <FaWhatsapp size={19} />
                  </a>
                  <a
                    href="mailto:tamilarasantamil1455@gmail.com"
                    className="text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors"
                    aria-label="Email"
                    title="Email"
                  >
                    <Mail size={18} />
                  </a>
                  <a
                    href="tel:+918610851455"
                    className="text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors"
                    aria-label="Call +91 86108 51455"
                    title="Call +91 86108 51455"
                  >
                    <Phone size={18} />
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
